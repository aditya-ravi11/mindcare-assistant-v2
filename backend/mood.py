from flask import Blueprint, request, jsonify, current_app
from database import db
import jwt
import datetime

mood_bp = Blueprint('mood', __name__)

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

# ==== Endpoints ====

# POST /api/mood
@mood_bp.route('/mood', methods=['POST'])
@require_auth
def add_mood():
    user_id = request.user_id
    data = request.get_json()
    mood = data.get('mood')        # e.g., "happy", "sad", "anxious", or emoji
    timestamp = data.get('timestamp')  # Optional; if not given, use now

    if not mood:
        return jsonify({"error": "Mood is required."}), 400
    if not timestamp:
        timestamp = datetime.datetime.utcnow()
    else:
        timestamp = datetime.datetime.fromisoformat(timestamp)

    mood_entry = {
        "user_id": user_id,
        "mood": mood,
        "timestamp": timestamp,
        "note": data.get('note', "")  # Optional field for user notes
    }
    db.moods.insert_one(mood_entry)
    mood_entry["_id"] = str(mood_entry["_id"])
    return jsonify({"mood": mood_entry}), 201

# GET /api/moods?limit=30
@mood_bp.route('/moods', methods=['GET'])
@require_auth
def get_moods():
    user_id = request.user_id
    limit = int(request.args.get("limit", 30))  # Default to last 30 moods
    moods = (
        db.moods.find({"user_id": user_id})
        .sort("timestamp", -1)
        .limit(limit)
    )
    mood_list = []
    for mood in moods:
        mood["_id"] = str(mood["_id"])
        if isinstance(mood["timestamp"], datetime.datetime):
            mood["timestamp"] = mood["timestamp"].isoformat()
        mood_list.append(mood)
    return jsonify({"moods": mood_list[::-1]}), 200  # Return oldest first

# ==== Example Usage ====
# POST /api/mood with JSON: { "mood": "happy", "timestamp": "...", "note": "Felt good after walk" }
# GET /api/moods (Authorization header required)
