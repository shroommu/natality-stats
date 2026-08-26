from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudpickle as cpkl
import json
from pandas import DataFrame

app = Flask(__name__)
CORS(app)

vbac_preprocessing = cpkl.load(open("models/vbac/preprocessor.pkl", "rb"))
vbac_model = cpkl.load(open("models/vbac/rfc_model.pkl", "rb"))

with open("models/down_syndrome/lookup_table.json", "r") as f:
    down_syndrome_lookup = json.load(f)


@app.route("/api/health")
def health():
    return jsonify({"status": "healthy"})


@app.route("/api/predict-vbac", methods=["POST"])
def predict_vbac():
    body = request.json

    raw = DataFrame(
        [
            {
                "augmentation_of_labor": 1.0 if body["laborAugmented"] else 0.0,
                "induction_of_labor": 1.0 if body["laborInduced"] else 0.0,
                "prior_births_now_living": float(body["priorBirthsNowLiving"]),
                "number_of_previous_cesarean": float(body["numberOfPreviousCSections"]),
                "fetal_presentation_at_delivery": float(
                    body["fetalPresentationAtDelivery"]
                ),
                "combined_gestation_detail_in_weeks": float(
                    body["gestationalAgeInWeeks"]
                ),
                "BMI": float(body["bmi"]),
            }
        ]
    )

    processed_data = vbac_preprocessing.transform(raw)
    prediction = vbac_model.predict_proba(processed_data)
    return jsonify({"vbac_prediction": round(float(prediction[0][1]) * 100, 1)})


@app.route("/api/predict-down-syndrome", methods=["POST"])
def predict_down_syndrome():
    body = request.json
    try:
        m_age = int(body["mothersAge"])
        f_age = int(body["fathersAge"])
    except (KeyError, ValueError, TypeError):
        return jsonify({"error": "Invalid input parameters"}), 400

    # Clip age parameters to lookup boundaries (Mother: 12-50, Father: 9-98)
    m_age_clipped = max(12, min(50, m_age))
    f_age_clipped = max(9, min(98, f_age))

    key = f"{m_age_clipped}_{f_age_clipped}"
    prediction = down_syndrome_lookup.get(key, 0.0235)  # default to baseline rate
    return jsonify({"down_syndrome_prediction": prediction})
