from flask import Blueprint, request, jsonify
from database import db

resources_bp = Blueprint('resources', __name__)

# ==== Endpoints ====

# GET /api/resources
@resources_bp.route('/resources', methods=['GET'])
def get_resources():
    """
    Returns a list of mental health resources, articles, or tips.
    Optionally supports ?topic= for filtering by topic/tag.
    """
    topic = request.args.get("topic")
    query = {}
    if topic:
        query["topics"] = topic  # Assume each resource has a 'topics': [str, ...]
    resources = list(db.resources.find(query))
    for res in resources:
        res["_id"] = str(res["_id"])
    return jsonify({"resources": resources}), 200

# POST /api/resources (for admin use)
@resources_bp.route('/resources', methods=['POST'])
def add_resource():
    """
    Adds a new resource/article to the database.
    Only for admin use—protect with auth or disable in production.
    """
    data = request.get_json()
    required_fields = ["title", "summary", "content", "topics"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing fields."}), 400
    db.resources.insert_one(data)
    return jsonify({"message": "Resource added."}), 201

# ==== Example Resource Schema ====
# {
#   "title": "Breathing Techniques for Stress",
#   "summary": "Simple exercises to help you relax.",
#   "content": "Step 1: ... Step 2: ...",
#   "topics": ["stress", "breathing", "relaxation"],
#   "image_url": "https://example.com/img.jpg"
# }
