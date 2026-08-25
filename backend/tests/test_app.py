import importlib
import sys
import unittest
from unittest.mock import mock_open, patch

import pandas as pd


class StubPreprocessing:
    def __init__(self):
        self.last_raw = None

    def transform(self, raw):
        self.last_raw = raw.copy()
        return "processed-data"


class StubModel:
    def __init__(self):
        self.last_processed_data = None

    def predict_proba(self, processed_data):
        self.last_processed_data = processed_data
        return [[0.12345, 0.87654]]


class AppRoutesTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.stub_preprocessing = StubPreprocessing()
        cls.stub_model = StubModel()

        # The app loads model artifacts at import time; mock file, pickle, and json IO.
        with patch("builtins.open", mock_open(read_data=b"stub")), patch(
            "pickle.load", side_effect=[cls.stub_preprocessing, cls.stub_model]
        ), patch(
            "json.load", return_value={"35_32": 0.0269}
        ):
            sys.modules.pop("app", None)
            cls.app_module = importlib.import_module("app")

        cls.app_module.app.config["TESTING"] = True

    def setUp(self):
        self.client = self.app_module.app.test_client()

    def test_health_returns_healthy_status(self):
        response = self.client.get("/api/health")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {"status": "healthy"})

    def test_predict_vbac_transforms_input_and_returns_percentage(self):
        payload = {
            "laborAugmented": True,
            "laborInduced": False,
            "gestationalAgeInWeeks": 39,
            "priorBirthsNowLiving": 2,
            "numberOfPreviousCSections": 1,
            "fetalPresentationAtDelivery": 1,
            "bmi": 31,
        }

        response = self.client.post("/api/predict-vbac", json=payload)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {"vbac_prediction": 87.7})

        expected_raw = pd.DataFrame(
            [
                {
                    "augmentation_of_labor": 1.0,
                    "induction_of_labor": 0.0,
                    "prior_births_now_living": 2.0,
                    "number_of_previous_cesarean": 1.0,
                    "fetal_presentation_at_delivery": 1.0,
                    "combined_gestation_detail_in_weeks": 39.0,
                    "BMI": 31.0,
                }
            ]
        )

        pd.testing.assert_frame_equal(self.stub_preprocessing.last_raw, expected_raw)
        self.assertEqual(self.stub_model.last_processed_data, "processed-data")

    def test_predict_down_syndrome_returns_calibrated_percentage(self):
        payload = {
            "mothersAge": 35,
            "fathersAge": 32
        }
        response = self.client.post("/api/predict-down-syndrome", json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {"down_syndrome_prediction": 0.0269})

    def test_predict_down_syndrome_clips_out_of_bounds_ages(self):
        # Clip mother's age 5 (clips to 12) and father's age 105 (clips to 98)
        payload = {
            "mothersAge": 5,
            "fathersAge": 105
        }
        response = self.client.post("/api/predict-down-syndrome", json=payload)
        self.assertEqual(response.status_code, 200)
        # 12_98 is not in our stub_lookup_table (which only has 35_32),
        # so it should default to the baseline rate of 0.0235
        self.assertEqual(response.get_json(), {"down_syndrome_prediction": 0.0235})


if __name__ == "__main__":
    unittest.main()
