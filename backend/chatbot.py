from flask import Blueprint, request, jsonify, current_app
from database import db
import jwt
import datetime

chatbot_bp = Blueprint('chatbot', __name__)

# ==== Helper: JWT Auth Decorator ====
def require_auth(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            parts = request.headers['Authorization'].split()
            if len(parts) == 2 and parts[0] == "Bearer":
                token = parts[1]
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            request.user_id = data['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired.'}), 401
        except Exception:
            return jsonify({'error': 'Token is invalid.'}), 401
        return f(*args, **kwargs)
    return decorated

# === Sample response logic for MVP ===
def basic_bot_response(message, mood=None):
    message = message.lower()
    # Simple intent-based rules (expand to ML or retrieval model later)
    if "hello" in message or "hi" in message:
        return "Hello! How are you feeling today?"
    elif "sad" in message or "down" in message:
        return "I'm sorry you're feeling this way. Would you like to talk about it or try some relaxation techniques?"
    elif "anxious" in message or "anxiety" in message:
        return "Anxiety can be overwhelming. Want to try a guided breathing exercise?"
    elif "stress" in message:
        return "Managing stress is important. Try taking deep breaths or taking a short walk if you can."
    elif "tips" in message or "help" in message:
        return "Here are some tips: 1) Talk to someone you trust. 2) Take breaks. 3) Try mindfulness exercises."
    elif "hopeless" in message or "suicide" in message:
        return "If you're struggling, please reach out to a professional or helpline. You're not alone."
    else:
        return "I'm here to listen. Tell me more about what's on your mind."

# ==== Endpoints ====

# POST /api/chatbot
@chatbot_bp.route('/chatbot', methods=['POST'])
@require_auth
def chatbot_reply():
    """
    Receives: { message: string, mood: string (optional) }
    Returns: { response: string }
    """
    data = request.get_json()
    message = data.get("message", "")
    mood = data.get("mood", None)
    user_id = request.user_id

    # Log chat (optional)
    chat_entry = {
        "user_id": user_id,
        "message": message,
        "bot_response": None,  # To be filled
        "timestamp": datetime.datetime.utcnow(),
        "mood": mood
    }

    # Generate response (swap for ML model later!)
    bot_response = basic_bot_response(message, mood)
    chat_entry["bot_response"] = bot_response

    # Save chat log (optional, but useful for analytics and mood trends)
    db.chatlogs.insert_one(chat_entry)

    return jsonify({"response": bot_response}), 200

# ==== Example Usage ====
# POST /api/chatbot with JSON: { "message": "I'm feeling anxious", "mood": "anxious" }
# Requires Authorization: Bearer <token> in headers
