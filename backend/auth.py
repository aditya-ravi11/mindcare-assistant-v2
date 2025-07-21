from flask import Blueprint, request, jsonify, current_app
from database import db
import bcrypt
import jwt
import datetime
import os

auth_bp = Blueprint('auth', __name__)

# ==== Helper functions ====
def generate_jwt(user_id, email):
    """Generate a JWT token for the user."""
    payload = {
        "user_id": str(user_id),
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    secret = current_app.config['SECRET_KEY']
    token = jwt.encode(payload, secret, algorithm="HS256")
    return token

def verify_password(password, hashed):
    """Check plain password against hashed."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

# ==== Endpoints ====

# POST /api/signup {name, email, password}
@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({"error": "Missing fields"}), 400

    # Check if user exists
    if db.users.find_one({'email': email}):
        return jsonify({"error": "User already exists"}), 409

    # Hash the password
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create user
    user = {
        "name": name,
        "email": email,
        "password": hashed_pw,
        "created_at": datetime.datetime.utcnow()
    }
    result = db.users.insert_one(user)
    user["_id"] = str(result.inserted_id)
    user.pop("password")  # Do not return password hash

    # Generate token
    token = generate_jwt(user["_id"], email)

    return jsonify({"user": user, "token": token}), 201

# POST /api/login {email, password}
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = db.users.find_one({'email': email})
    if not user or not verify_password(password, user['password']):
        return jsonify({"error": "Invalid credentials"}), 401

    user["_id"] = str(user["_id"])
    user.pop("password")
    token = generate_jwt(user["_id"], email)

    return jsonify({"user": user, "token": token}), 200

# (Optional) Add password reset and email verification in future for production!
