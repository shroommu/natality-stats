from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudpickle as cpkl
from pandas import DataFrame

app = Flask(__name__)
CORS(app)

vbac_preprocessing = cpkl.load(open("models/vbac/preprocessor.pkl", "rb"))
vbac_model = cpkl.load(open("models/vbac/rfc_model.pkl", "rb"))

down_syndrome_preprocessing = cpkl.load(
    open("models/down_syndrome/preprocessor.pkl", "rb")
)
down_syndrome_model = cpkl.load(open("models/down_syndrome/xgb_model.pkl", "rb"))


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

    raw = DataFrame(
        [
            {
                "mothers_single_year_age": float(body["mothersAge"]),
                "fathers_combined_age": float(body["fathersAge"]),
            }
        ]
    )

    processed_data = down_syndrome_preprocessing.transform(raw)
    prediction = down_syndrome_model.predict_proba(processed_data)
    return jsonify(
        {"down_syndrome_prediction": round(float(prediction[0][1]) * 100, 1)}
    )
