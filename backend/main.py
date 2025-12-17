from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

app.mount(
    "/miniapp",
    StaticFiles(directory="miniapp", html=True),
    name="miniapp"
)


# ==============================
# FRONTEND (Mini App)
# ==============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONT_DIR = os.path.join(BASE_DIR, "..", "miniapp")

app.mount("/static", StaticFiles(directory=FRONT_DIR), name="static")

@app.get("/")
def root():
    return FileResponse(os.path.join(FRONT_DIR, "index.html"))

# ==============================
# API (por enquanto simples)
# ==============================
class StartGameRequest(BaseModel):
    mode: int
    bet: float
    cards: int

@app.post("/api/game/start")
def start_game(data: StartGameRequest):
    return {
        "status": "ok",
        "mode": data.mode,
        "bet": data.bet,
        "cards": data.cards
    }

