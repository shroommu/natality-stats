import pandas as pd

import tkinter as tk
from tkinter import filedialog


def generate_chart_json_files(open_path: str, save_path: str):
    df = pd.read_parquet(open_path)

    mothers_single_year_age_value_counts = (
        df["mothers_single_year_age"].value_counts(sort=False).sort_index()
    )
    mothers_single_year_age_value_counts.to_json(
        f"{save_path}/mothers_single_year_age.json"
    )

    fathers_combined_age_value_counts = (
        df["fathers_combined_age"][df["fathers_combined_age"] != 99]
        .value_counts(sort=False)
        .sort_index()
    )
    fathers_combined_age_value_counts.to_json(f"{save_path}/fathers_combined_age.json")

    mothers_race_6_value_counts = (
        df["mothers_race_recode_6"].value_counts().sort_index()
    )

    mothers_race_6_value_counts.to_json(f"{save_path}/mothers_race.json")

    fathers_race_6_value_counts = (
        df["fathers_race_recode_6"][df["fathers_race_recode_6"] != 9]
        .value_counts()
        .sort_index()
    )
    fathers_race_6_value_counts.to_json(f"{save_path}/fathers_race.json")

    prior_births_now_living_value_counts = (
        df["prior_births_now_living"][df["prior_births_now_living"] != 99]
        .value_counts(sort=False)
        .sort_index()
    )
    prior_births_now_living_value_counts.to_json(
        f"{save_path}/prior_births_now_living.json"
    )

    interval_since_last_live_birth_value_counts = (
        pd.cut(
            df["interval_since_last_live_birth"].drop([888, 999], axis=0),
            bins=range(0, 361, 12),
            labels=range(0, 360, 12),
        )
        .value_counts(sort=False)
        .sort_index()
    )

    interval_since_last_live_birth_value_counts.to_json(
        f"{save_path}/interval_since_last_live_birth.json"
    )

    month_prenatal_care_started_value_counts = (
        df["month_prenatal_care_started"][df["month_prenatal_care_started"] != 99]
        .value_counts(sort=False)
        .sort_index()
    )

    month_prenatal_care_started_value_counts.to_json(
        f"{save_path}/month_prenatal_care_started.json"
    )

    number_of_prenatal_visits_value_counts = (
        df["number_of_prenatal_visits"][df["number_of_prenatal_visits"] < 48]
        .value_counts(sort=False)
        .sort_index()
    )

    number_of_prenatal_visits_value_counts.to_json(
        f"{save_path}/number_of_prenatal_visits.json"
    )

    mothers_height_value_counts = (
        df["mothers_height_in_inches"][df["mothers_height_in_inches"] != 99]
        .value_counts(sort=False)
        .sort_index()
    )
    mothers_height_value_counts.to_json(f"{save_path}/mothers_height_in_inches.json")

    BMI_value_counts = pd.cut(
        df["BMI"],
        bins=range(0, 61, 5),
        labels=range(0, 60, 5),
    ).value_counts(sort=False)

    BMI_value_counts.to_json(f"{save_path}/mothers_BMI.json")

    pre_pregnancy_weight_recode_value_counts = pd.cut(
        df["pre_pregnancy_weight_recode"],
        bins=range(0, 401, 10),
        labels=range(0, 400, 10),
    ).value_counts(sort=False)

    pre_pregnancy_weight_recode_value_counts.to_json(
        f"{save_path}/pre_pregnancy_weight_recode.json"
    )

    delivery_weight_recode_value_counts = pd.cut(
        df["delivery_weight_recode"],
        bins=range(0, 401, 10),
        labels=range(0, 400, 10),
    ).value_counts(sort=False)

    delivery_weight_recode_value_counts.to_json(
        f"{save_path}/delivery_weight_recode.json"
    )

    weight_gain_value_counts = pd.cut(
        df["weight_gain"],
        bins=range(0, 101, 10),
        labels=range(0, 100, 10),
    ).value_counts(sort=False)

    weight_gain_value_counts.to_json(f"{save_path}/weight_gain.json")


root = tk.Tk()
root.withdraw()

open_path = filedialog.askopenfilename(
    title="Select Natality Stats Parquet File",
    filetypes=(("Parquet files", "*.parquet"), ("All files", "*.*")),
)

save_path = tk.filedialog.askdirectory(
    title="Select Folder to Save Chart JSON Files",
)

generate_chart_json_files(open_path, save_path)
