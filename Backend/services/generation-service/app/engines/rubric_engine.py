def generate_rubric(payload):
    return {
        "question": payload.question,
        "criteria": [
            {"level": "Excellent", "marks": 5},
            {"level": "Good", "marks": 3},
            {"level": "Poor", "marks": 1}
        ]
    }
