from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle as pkl
from pandas import DataFrame

app = Flask(__name__)
CORS(app)

preprocessing = pkl.load(open("models/vbac/preprocessing_pipeline.pkl", "rb"))
vbac_model = pkl.load(open("models/vbac/rfc_model.pkl", "rb"))


@app.route("/health")
def health():
    return jsonify({"status": "healthy"})


@app.route("/predict-vbac", methods=["POST"])
def predict_vbac():
    body = request.json

    raw = DataFrame(
        [
            {
                "augmentation_of_labor": 1.0 if body["laborAugmented"] else 0.0,
                "induction_of_labor": 1.0 if body["laborInduced"] else 0.0,
                "attendant_at_birth": float(body["attendantAtBirth"]),
                "combined_gestation_detail_in_weeks": float(
                    body["gestationalAgeInWeeks"]
                ),
                "time_of_birth": float(body["timeOfBirth"]),
                "prior_births_now_living": float(body["priorBirthsNowLiving"]),
                "number_of_previous_cesarean": float(body["numberOfPreviousCSections"]),
                "BMI": float(body["bmi"]),
                "birth_weight_in_grams": float(body["birthWeightInGrams"]),
                "weight_gain": float(body["weightGain"]),
                "interval_since_last_live_birth": float(
                    body["intervalSinceLastLiveBirth"]
                ),
                "number_of_prenatal_visits": float(body["numberOfPrenatalVisits"]),
                "mothers_single_year_age": float(body["mothersAge"]),
            }
        ]
    )

    processed_data = preprocessing.transform(raw)
    prediction = vbac_model.predict_proba(processed_data)
    return jsonify({"vbac_prediction": round(float(prediction[0][1]) * 100, 1)})
