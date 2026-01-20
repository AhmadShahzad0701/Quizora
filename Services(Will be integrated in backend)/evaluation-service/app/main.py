from pathlib import Path
from dotenv import load_dotenv
import os

# 🔍 Find .env by walking up directories
current_file = Path(__file__).resolve()
env_path = None

for parent in current_file.parents:
    candidate = parent / ".env"
    if candidate.exists():
        env_path = candidate
        break

if env_path is None:
    raise RuntimeError("❌ .env file NOT FOUND anywhere above main.py")

load_dotenv(env_path, override=True)

print("ENV CHECK (GROQ_API_KEY):", os.getenv("GROQ_API_KEY"))
print("Loaded .env from:", env_path)

from fastapi import FastAPI
from app.api.evaluate import router as evaluate_router

app = FastAPI(title="Evaluation Service")

app.include_router(evaluate_router, prefix="/evaluate")

@app.get("/health")
def health_check():
    return {"status": "ok"}
