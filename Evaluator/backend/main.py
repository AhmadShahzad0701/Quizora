from fastapi import FastAPI, Request, UploadFile, File
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from backend.evaluator.evaluator import evaluate_quiz_data
import json
import os

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/", response_class=HTMLResponse)
async def evaluate(request: Request, quiz_file: UploadFile = File(...)):
    contents = await quiz_file.read()
    quiz_data = json.loads(contents)

    result = evaluate_quiz_data(quiz_data)

    return templates.TemplateResponse(
        "index.html",
        {"request": request, "result": result}
    )
