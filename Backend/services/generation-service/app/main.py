from pathlib import Path
from dotenv import load_dotenv
import os
import json

# 🔍 Find .env by walking up directories
current_file = Path(__file__).resolve()
env_path = None

for parent in current_file.parents:
    candidate = parent / ".env"
    if candidate.exists():
        env_path = candidate
        break

# #region agent log
try:
    workspace_root = None
    for p in current_file.parents:
        if (p / "Backend").exists() and (p / "Frontend").exists():
            workspace_root = p
            break
    log_path = (workspace_root / ".cursor" / "debug.log") if workspace_root else Path(".cursor/debug.log")
    log_path.parent.mkdir(parents=True, exist_ok=True)
    with open(log_path, "a", encoding="utf-8") as f:
        f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"A","location":"main.py:env_search","message":"Searching for .env file","data":{"env_path_found":str(env_path) if env_path else None,"current_file":str(current_file),"log_path":str(log_path)},"timestamp":int(__import__("time").time()*1000)})+"\n")
except Exception as e: pass
# #endregion

if env_path is None:
    # #region agent log
    try:
        workspace_root = None
        for p in current_file.parents:
            if (p / "Backend").exists() and (p / "Frontend").exists():
                workspace_root = p
                break
        log_path = (workspace_root / ".cursor" / "debug.log") if workspace_root else Path(".cursor/debug.log")
        log_path.parent.mkdir(parents=True, exist_ok=True)
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"A","location":"main.py:env_not_found","message":".env file NOT FOUND","data":{},"timestamp":int(__import__("time").time()*1000)})+"\n")
    except Exception as e: pass
    # #endregion
    raise RuntimeError("❌ .env file NOT FOUND anywhere above main.py")

load_dotenv(env_path, override=True)

# #region agent log
api_key = os.getenv("OPENROUTER_API_KEY")
api_key_preview = api_key[:10] + "..." if api_key and len(api_key) > 10 else (api_key if api_key else None)
try:
    workspace_root = None
    for p in current_file.parents:
        if (p / "Backend").exists() and (p / "Frontend").exists():
            workspace_root = p
            break
    log_path = (workspace_root / ".cursor" / "debug.log") if workspace_root else Path(".cursor/debug.log")
    log_path.parent.mkdir(parents=True, exist_ok=True)
    with open(log_path, "a", encoding="utf-8") as f:
        f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"B","location":"main.py:env_loaded","message":"Environment loaded","data":{"env_file":str(env_path),"api_key_exists":bool(api_key),"api_key_length":len(api_key) if api_key else 0,"api_key_preview":api_key_preview},"timestamp":int(__import__("time").time()*1000)})+"\n")
except Exception as e: pass
# #endregion

from fastapi import FastAPI
from app.api import quiz

app = FastAPI(title="Generation Service")

app.include_router(quiz.router)
