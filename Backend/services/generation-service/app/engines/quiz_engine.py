import os
import json
import requests
from pathlib import Path
from fastapi import HTTPException
from app.utils.prompt_builder import build_quiz_prompt
from app.engines.llm_provider import LLMProvider

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

    # API key check is now handled inside LLMProvider (will fallback to LLAMA  if not set)

    prompt = build_quiz_prompt(payload)

    # #region agent log - Before LLM request
    try:
        log_path = get_log_path()
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps({
                "sessionId": "debug-session",
                "runId": "run1",
                "hypothesisId": "D",
                "location": "quiz_engine.py:before_llm_request",
                "message": "Before LLM request (OpenRouter/LLAMA)",
                "data": {"prompt_length": len(prompt)},
                "timestamp": int(__import__("time").time() * 1000)
            }) + "\n")
    except Exception as e:
        pass
    # #endregion

    try:
        # Initialize LLM Provider with automatic fallback
        llm = LLMProvider()
        
        # Generate quiz
        system_message = "You generate quizzes for exams."
        raw_output, metadata = llm.generate(prompt, system_message)
        
        # #region agent log - After LLM response
        try:
            log_path = get_log_path()
            with open(log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps({
                    "sessionId": "debug-session",
                    "runId": "run1",
                    "hypothesisId": "C",
                    "location": "quiz_engine.py:llm_response_received",
                    "message": "LLM response received",
                    "data": {
                        "provider": metadata["provider"],
                        "response_time": metadata["response_time"],
                        "success": metadata["success"],
                        "response_preview": raw_output[:200] if raw_output else None
                    },
                    "timestamp": int(__import__("time").time() * 1000)
                }) + "\n")
        except Exception as e:
            pass
        # #endregion
        
        # Log which provider was used (console output for demo)
        print(f"📊 [Quiz Generated] {metadata['provider']} | ⏱️ {metadata['response_time']}")
        
        # Check if generation was successful
        if not metadata["success"]:
            raise HTTPException(
                status_code=500,
                detail=f"All providers failed. Error: {metadata.get('error', 'Unknown error')}"
            )
        
        # Parse JSON response
        try:
            quiz_json = json.loads(raw_output)
        except json.JSONDecodeError as e:
            # #region agent log - JSON parse error
            try:
                log_path = get_log_path()
                with open(log_path, "a", encoding="utf-8") as f:
                    f.write(json.dumps({
                        "sessionId": "debug-session",
                        "runId": "run1",
                        "hypothesisId": "E",
                        "location": "quiz_engine.py:json_parse_error",
                        "message": "JSON parse failed",
                        "data": {
                            "error": str(e),
                            "provider": metadata["provider"],
                            "raw_output": raw_output[:500]
                        },
                        "timestamp": int(__import__("time").time() * 1000)
                    }) + "\n")
            except Exception as e2:
                pass
            # #endregion
            
            raise HTTPException(
                status_code=500,
                detail={
                    "error": f"AI returned invalid JSON from {metadata['provider']}",
                    "raw_output": raw_output[:500]
                }
            )
        
        return quiz_json
        
    except HTTPException:
        # Re-raise HTTPException as-is
        raise
        
    except Exception as e:
        # #region agent log - General error
        try:
            log_path = get_log_path()
            with open(log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps({
                    "sessionId": "debug-session",
                    "runId": "run1",
                    "hypothesisId": "E",
                    "location": "quiz_engine.py:generation_exception",
                    "message": "Quiz generation exception",
                    "data": {
                        "error": str(e),
                        "error_type": type(e).__name__
                    },
                    "timestamp": int(__import__("time").time() * 1000)
                }) + "\n")
        except Exception as e2:
            pass
        # #endregion
        
        raise HTTPException(
            status_code=500,
            detail=f"Quiz generation failed: {str(e)}"
        )
    
        
