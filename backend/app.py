import os
from flask import Flask
from flask_cors import CORS

# Load environment variables (for Flask config, secret key, etc)
from dotenv import load_dotenv
load_dotenv()

def create_app():
    app = Flask(__name__)

    # Set secret key from .env (for sessions/JWT, etc)
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", "super-secret-key")

    # Allow CORS (configure allowed origins in production!)
    CORS(app, supports_credentials=True)

    # Import and register Blueprints
    from auth import auth_bp
    from profile import profile_bp
    from chatbot import chatbot_bp
    from mood import mood_bp
    from resources import resources_bp
    from dashboard import dashboard_bp
    from settings import settings_bp

    # Register Blueprints with common prefix
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(profile_bp, url_prefix='/api')
    app.register_blueprint(chatbot_bp, url_prefix='/api')
    app.register_blueprint(mood_bp, url_prefix='/api')
    app.register_blueprint(resources_bp, url_prefix='/api')
    app.register_blueprint(dashboard_bp, url_prefix='/api')
    app.register_blueprint(settings_bp, url_prefix='/api')

    # Health check endpoint
    @app.route("/api/health", methods=["GET"])
    def health():
        return {"status": "ok"}, 200

    return app

if __name__ == "__main__":
    # Run app (debug=True for development only!)
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
