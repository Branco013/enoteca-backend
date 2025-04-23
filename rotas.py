from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal

app = APIRouter()

# Exemplo de rota
@app.get("/ping")
def ping():
    return {"message": "pong"}

# Aqui você pode importar e incluir outras rotas