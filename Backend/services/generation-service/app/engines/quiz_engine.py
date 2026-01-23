import os
import json
import requests
from pathlib import Path
from fastapi import HTTPException
from app.utils.prompt_builder import build_quiz_prompt

# #region agent log
def get_log_path():
    try:
        current_file = Path(__file__).resolve()
        workspace_root = None
        for p in current_file.parents:
            if (p / "Backend").exists() and (p / "Frontend").exists():
                workspace_root = p
                break
        log_path = (workspace_root / ".cursor" / "debug.log") if workspace_root else Path(".cursor/debug.log")
        log_path.parent.mkdir(parents=True, exist_ok=True)
        return log_path
    except:
        return Path(".cursor/debug.log")
# #endregion

def generate_quiz(payload):

    # #region agent log
    try:
        log_path = get_log_path()
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"C","location":"quiz_engine.py:function_entry","message":"generate_quiz called","data":{"payload_keys":list(payload.dict().keys()) if hasattr(payload,"dict") else str(type(payload))},"timestamp":int(__import__("time").time()*1000)})+"\n")
    except Exception as e: pass
    # #endregion

    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

    # #region agent log
    api_key_preview = OPENROUTER_API_KEY[:10] + "..." if OPENROUTER_API_KEY and len(OPENROUTER_API_KEY) > 10 else (OPENROUTER_API_KEY if OPENROUTER_API_KEY else None)
    try:
        log_path = get_log_path()
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"B","location":"quiz_engine.py:api_key_check","message":"API key retrieved from env","data":{"api_key_exists":bool(OPENROUTER_API_KEY),"api_key_length":len(OPENROUTER_API_KEY) if OPENROUTER_API_KEY else 0,"api_key_preview":api_key_preview,"api_key_starts_with_sk":OPENROUTER_API_KEY.startswith("sk-") if OPENROUTER_API_KEY else False},"timestamp":int(__import__("time").time()*1000)})+"\n")
    except Exception as e: pass
    # #endregion

    if not OPENROUTER_API_KEY:
        # #region agent log
        try:
            log_path = get_log_path()
            with open(log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"A","location":"quiz_engine.py:api_key_missing","message":"API key is None or empty","data":{},"timestamp":int(__import__("time").time()*1000)})+"\n")
        except Exception as e: pass
        # #endregion
        raise HTTPException(
            status_code=500,
            detail="OPENROUTER_API_KEY not set"
        )

    prompt = build_quiz_prompt(payload)

    # #region agent log
    auth_header_preview = f"Bearer {OPENROUTER_API_KEY[:10]}..." if OPENROUTER_API_KEY and len(OPENROUTER_API_KEY) > 10 else f"Bearer {OPENROUTER_API_KEY}" if OPENROUTER_API_KEY else "Bearer None"
    try:
        log_path = get_log_path()
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"D","location":"quiz_engine.py:before_request","message":"Before OpenRouter request","data":{"auth_header_preview":auth_header_preview,"url":"https://openrouter.ai/api/v1/chat/completions","model":"openai/gpt-4o-mini","prompt_length":len(prompt)},"timestamp":int(__import__("time").time()*1000)})+"\n")
    except Exception as e: pass
    # #endregion

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Quizora Generation Service"
            },
            json={
                "model": "openai/gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": "You generate quizzes for exams."},
                    {"role": "user", "content": prompt}
                ]
            },
            timeout=30
        )
    except Exception as e:
        # #region agent log
        try:
            log_path = get_log_path()
            with open(log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"E","location":"quiz_engine.py:request_exception","message":"Request exception occurred","data":{"error":str(e),"error_type":type(e).__name__},"timestamp":int(__import__("time").time()*1000)})+"\n")
        except Exception as e2: pass
        # #endregion
        raise HTTPException(
            status_code=500,
            detail=f"OpenRouter request failed: {str(e)}"
        )

    # #region agent log
    try:
        log_path = get_log_path()
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"C","location":"quiz_engine.py:response_received","message":"OpenRouter response received","data":{"status_code":response.status_code,"response_preview":response.text[:200] if response.text else None},"timestamp":int(__import__("time").time()*1000)})+"\n")
    except Exception as e: pass
    # #endregion

    if response.status_code != 200:
        # #region agent log
        try:
            log_path = get_log_path()
            with open(log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":"C","location":"quiz_engine.py:http_error","message":"OpenRouter HTTP error","data":{"status_code":response.status_code,"response_body":response.text,"headers":dict(response.headers)},"timestamp":int(__import__("time").time()*1000)})+"\n")
        except Exception as e: pass
        # #endregion
        raise HTTPException(
            status_code=500,
            detail={
                "error": "OpenRouter HTTP error",
                "status_code": response.status_code,
                "body": response.text
            }
        )

    result = response.json()

    if "choices" not in result:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "OpenRouter response missing choices",
                "response": result
            }
        )

    raw_output = result["choices"][0]["message"]["content"]

    try:
        quiz_json = json.loads(raw_output)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "AI returned invalid JSON",
                "raw_output": raw_output
            }
        )

    return quiz_json
