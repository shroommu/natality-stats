from flask import Flask
import pickle as pkl

app = Flask(__name__)

# vbac_model = pkl.load(open("models/vbac/rfc_model.pkl", "rb"))


@app.route("/api/health")
def health():
    return {"status": "healthy"}


@app.route("/api/predict-vbac")
def predict_vbac(parameters={}):
    return {
        "parameters": parameters,
        "vbac_prediction": "This is a placeholder prediction.",
    }
