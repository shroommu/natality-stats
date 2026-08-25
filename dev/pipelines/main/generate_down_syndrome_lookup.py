import pickle as pkl
import json
import pandas as pd
import numpy as np

def generate_lookup():
    print("Loading preprocessing and model...")
    preprocessor_path = "backend/models/down_syndrome/preprocessor.pkl"
    model_path = "backend/models/down_syndrome/xgb_model.pkl"
    
    with open(preprocessor_path, "rb") as f:
        preprocessor = pkl.load(f)
        
    with open(model_path, "rb") as f:
        model = pkl.load(f)
        
    w = 500.0  # scale_pos_weight
    lookup_table = {}
    
    print("Generating age combinations...")
    # Prepare combinations in batch for performance
    records = []
    keys = []
    
    for m_age in range(12, 51):
        for f_age in range(9, 99):
            records.append({
                "mothers_single_year_age": float(m_age),
                "fathers_combined_age": float(f_age)
            })
            keys.append(f"{m_age}_{f_age}")
            
    # Convert to DataFrame
    df_raw = pd.DataFrame(records)
    
    # Process
    print("Transforming features...")
    df_processed = preprocessor.transform(df_raw)
    
    # Predict probabilities
    print("Predicting probabilities and calibrating...")
    p_shifted_array = model.predict_proba(df_processed)[:, 1]
    
    for key, p_shifted in zip(keys, p_shifted_array):
        # Apply inverse of scale_pos_weight = 500 shift
        p_calibrated = p_shifted / (p_shifted + w * (1.0 - p_shifted))
        # Store as percentage rounded to 4 decimal places
        lookup_table[key] = round(float(p_calibrated) * 100.0, 4)
        
    # Output to file
    output_path = "backend/models/down_syndrome/lookup_table.json"
    print(f"Writing lookup table to {output_path}...")
    with open(output_path, "w") as f:
        json.dump(lookup_table, f, indent=2)
        
    # Print some stats
    vals = list(lookup_table.values())
    print(f"Successfully generated {len(vals)} combinations.")
    print(f"Min probability: {min(vals)}%")
    print(f"Max probability: {max(vals)}%")

if __name__ == "__main__":
    generate_lookup()
