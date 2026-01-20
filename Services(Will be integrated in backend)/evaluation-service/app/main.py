from dotenv import load_dotenv
load_dotenv()   # ← MUST be first thing in app
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


import os
print("ENV CHECK:", os.getenv("OPENROUTER_API_KEY"))


from fastapi import FastAPI
from app.api.evaluate import router as evaluate_router



app = FastAPI(title="Evaluation Service")

app.include_router(evaluate_router, prefix="/evaluate")

@app.get("/health")
def health_check():
    return {"status": "ok"}
