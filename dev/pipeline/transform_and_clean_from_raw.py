import pandas as pd
import numpy as np

import tkinter as tk
from tkinter import filedialog

from tqdm import tqdm

from bin.constants import NATALITY_STATS_NAMES_AND_COLS_DICT


def select_file():
    root = tk.Tk()
    root.withdraw()
    file_path = filedialog.askopenfilename(
        title="Select Natality Stats File",
        filetypes=(("Text files", "*.txt"), ("All files", "*.*")),
    )
    return file_path


def read_fwf_data(file_path: str) -> pd.DataFrame:

    df = pd.concat(
        [
            chunk
            for chunk in tqdm(
                pd.read_fwf(
                    file_path,
                    colspecs=list(NATALITY_STATS_NAMES_AND_COLS_DICT.values()),
                    names=list(NATALITY_STATS_NAMES_AND_COLS_DICT.keys()),
                    converters={n: str for n in NATALITY_STATS_NAMES_AND_COLS_DICT},
                    header=None,
                    chunksize=50000,
                ),
                desc="Loading data",
            )
        ]
    )

    df = df.reset_index(drop=True)
    return df


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    flag_column_names = df.filter(regex="(.*imputed.*|.*flag.*)$", axis=1).columns

    df = df.drop(list(flag_column_names), axis="columns")
    df = df.drop(["birth_year"], axis="columns")
    df = df.drop(
        [
            "reported_mothers_age_used",
            "assistive_reproductive_technology",
            "fertility_enhancing_drugs",
            "trial_of_labor_attempted_if_cesarean",
            "paternity_acknowledged",
        ],
        axis="columns",
    )
    return df


def set_types(df: pd.DataFrame) -> pd.DataFrame:
    df = df.replace(
        {"Y": 1, "N": 0, "U": np.nan, "X": np.nan, "M": 0, "F": 1, "C": 1, "P": 2}
    )
    for column_name, dtype in zip(df.columns, df.dtypes):
        if dtype == "float64":
            df[column_name] = pd.to_numeric(df[column_name], downcast="float")
        else:
            df[column_name] = pd.to_numeric(df[column_name], downcast="integer")
    return df


df = read_fwf_data(select_file())
df = clean_data(df)
df = set_types(df)
save_path = tk.filedialog.asksaveasfilename(
    title="Save Cleaned Data",
    filetypes=(("Parquet files", "*.parquet"), ("All files", "*.*")),
    defaultextension=".parquet",
)
df.to_parquet(save_path)
