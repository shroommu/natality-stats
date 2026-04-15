from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle as pkl

app = Flask(__name__)
CORS(app)

# vbac_model = pkl.load(open("models/vbac/rfc_model.pkl", "rb"))


@app.route("/health")
def health():
    return jsonify({"status": "healthy"})


@app.route("/predict-vbac", methods=["POST"])
def predict_vbac():
    print(request.json)

    return jsonify(
        {
            "vbac_prediction": "This is a placeholder prediction.",
        }
    )
