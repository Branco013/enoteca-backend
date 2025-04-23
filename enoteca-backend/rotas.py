from fastapi import APIRouter

app = APIRouter()

@app.get("/ping")
def ping():
    return {"message": "pong"}
