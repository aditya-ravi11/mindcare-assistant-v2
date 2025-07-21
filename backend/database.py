import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env (if not already loaded)
load_dotenv()

# === Environment Variables ===
MONGO_URI = os.environ.get("MONGO_URI")
if not MONGO_URI:
    raise RuntimeError("MONGO_URI is not set in your environment variables or .env file.")

DB_NAME = os.environ.get("MONGO_DB_NAME", "mindcare")  # Default database name is 'mindcare'

# === MongoDB Client and Database ===
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# === Usage Example (for other modules) ===
# from database import db
# db.users.insert_one({...})
# db.moods.find({"user_id": ...})
