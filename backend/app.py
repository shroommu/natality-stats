from flask import Flask

app = Flask(__name__)

@app.route("/api/health")
def health():
    return Flask.make_response({"status": "healthy"}, 200)