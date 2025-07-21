from flask import Blueprint, request, jsonify, current_app
from database import db
import jwt
import datetime

dashboard_bp = Blueprint('dashboard', __name__)

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

# ==== Dashboard Endpoint ====

# GET /api/dashboard
@dashboard_bp.route('/dashboard', methods=['GET'])
@require_auth
def get_dashboard():
    user_id = request.user_id

    # === Aggregate moods ===
    moods_cursor = db.moods.find({"user_id": user_id}).sort("timestamp", 1)
    moods = list(moods_cursor)
    total_moods = len(moods)

    # Mood count by type
    mood_counts = {}
    streak = 0
    longest_streak = 0
    prev_day = None
    active_days = set()

    # Calculate mood trend (by day) and streaks
    mood_trend = []
    for mood in moods:
        date = mood["timestamp"].date() if isinstance(mood["timestamp"], datetime.datetime) else datetime.datetime.fromisoformat(mood["timestamp"]).date()
        active_days.add(date)
        mood_trend.append({"date": date.isoformat(), "mood": mood["mood"]})
        # Mood counts
        mood_type = mood["mood"]
        mood_counts[mood_type] = mood_counts.get(mood_type, 0) + 1
        # Streak calc
        if prev_day is not None and (date - prev_day).days == 1:
            streak += 1
        else:
            streak = 1
        prev_day = date
        if streak > longest_streak:
            longest_streak = streak

    # Achievements (example logic)
    achievements = []
    if total_moods >= 1:
        achievements.append("First Mood Logged")
    if longest_streak >= 7:
        achievements.append("7-Day Mood Streak")
    if "happy" in mood_counts and mood_counts["happy"] >= 10:
        achievements.append("10 Happy Days")
    if total_moods >= 30:
        achievements.append("30 Days of Tracking")

    dashboard_data = {
        "total_moods": total_moods,
        "active_days": len(active_days),
        "longest_streak": longest_streak,
        "mood_counts": mood_counts,
        "mood_trend": mood_trend[-30:],  # Last 30 days for chart
        "achievements": achievements
    }
    return jsonify(dashboard_data), 200

# ==== Example Usage ====
# GET /api/dashboard (JWT required in Authorization header)
