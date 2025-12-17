from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os

app = FastAPI()

# ==============================
# FRONTEND — MINI APP
# ==============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONT_DIR = os.path.join(BASE_DIR, "..", "miniapp")

app.mount(
    "/miniapp",
    StaticFiles(directory=FRONT_DIR, html=True),
    name="miniapp"
)

# ==============================
# API
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
