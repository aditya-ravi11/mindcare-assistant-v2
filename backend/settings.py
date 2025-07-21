from flask import Blueprint, request, jsonify, current_app
from database import db
import jwt

settings_bp = Blueprint('settings', __name__)

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

# GET /api/settings
@settings_bp.route('/settings', methods=['GET'])
@require_auth
def get_settings():
    user_id = request.user_id
    user = db.users.find_one({"_id": user_id}, {"settings": 1})
    if not user or "settings" not in user:
        # Return defaults if not set
        return jsonify({
            "settings": {
                "notifications": True,
                "dark_mode": False
            }
        }), 200
    return jsonify({"settings": user["settings"]}), 200

# PUT /api/settings
@settings_bp.route('/settings', methods=['PUT'])
@require_auth
def update_settings():
    user_id = request.user_id
    data = request.get_json()
    # Accept any subset of known preferences (add more as needed)
    allowed = {"notifications", "dark_mode"}
    settings_update = {k: v for k, v in data.items() if k in allowed}
    if not settings_update:
        return jsonify({"error": "No valid fields to update."}), 400

    result = db.users.update_one(
        {"_id": user_id},
        {"$set": {f"settings.{k}": v for k, v in settings_update.items()}}
    )
    if result.matched_count == 0:
        return jsonify({"error": "User not found."}), 404

    user = db.users.find_one({"_id": user_id}, {"settings": 1})
    return jsonify({"settings": user.get("settings", {})}), 200

# ==== Example Usage ====
# GET /api/settings (JWT required)
# PUT /api/settings { "notifications": false, "dark_mode": true }
