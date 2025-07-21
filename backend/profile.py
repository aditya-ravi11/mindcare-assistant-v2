from flask import Blueprint, request, jsonify, current_app
from database import db
import jwt

profile_bp = Blueprint('profile', __name__)

# ==== Helper: JWT Auth Decorator ====
def require_auth(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # JWT can be in Authorization header: "Bearer <token>"
        if 'Authorization' in request.headers:
            parts = request.headers['Authorization'].split()
            if len(parts) == 2 and parts[0] == "Bearer":
                token = parts[1]
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            user_id = data['user_id']
            user = db.users.find_one({'_id': db.users.codec_options.document_class(user_id)})
            if not user:
                return jsonify({'error': 'User not found.'}), 404
            # Attach user_id to request context
            request.user_id = user_id
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired.'}), 401
        except Exception as e:
            return jsonify({'error': 'Token is invalid.'}), 401
        return f(*args, **kwargs)
    return decorated

# ==== Endpoints ====

# GET /api/profile (requires JWT)
@profile_bp.route('/profile', methods=['GET'])
@require_auth
def get_profile():
    user_id = request.user_id
    user = db.users.find_one({'_id': user_id}, {'password': 0})
    if not user:
        return jsonify({"error": "User not found."}), 404
    user["_id"] = str(user["_id"])
    return jsonify({"user": user}), 200

# PUT /api/profile (requires JWT)
@profile_bp.route('/profile', methods=['PUT'])
@require_auth
def update_profile():
    user_id = request.user_id
    data = request.get_json()
    update_fields = {}
    # Only allow certain fields to be updated
    allowed_fields = ["name", "avatar", "age", "goals"]
    for field in allowed_fields:
        if field in data:
            update_fields[field] = data[field]
    if not update_fields:
        return jsonify({"error": "No valid fields to update."}), 400
    result = db.users.update_one({'_id': user_id}, {'$set': update_fields})
    if result.matched_count == 0:
        return jsonify({"error": "User not found."}), 404
    user = db.users.find_one({'_id': user_id}, {'password': 0})
    user["_id"] = str(user["_id"])
    return jsonify({"user": user}), 200

# ==== Example Usage ====
# Frontend must include "Authorization: Bearer <token>" header in requests.
# Editable fields: name, avatar, age, goals.
# Non-editable: email, password, join date, etc.
