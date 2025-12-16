from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

from backend.game_service import start_game
from backend.bingo_validator import check_bingo

app = FastAPI()

# ===============================
# SERVIR MINI APP (FRONTEND)
# ===============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONT_DIR = os.path.join(BASE_DIR, "..", "miniapp")

app.mount("/static", StaticFiles(directory=FRONT_DIR), name="static")

@app.get("/")
def root():
    return FileResponse(os.path.join(FRONT_DIR, "index.html"))

# ===============================
# MODELOS
# ===============================
class StartGameRequest(BaseModel):
    mode: int
    bet: float
    cards: int

class BingoCheck(BaseModel):
    card: list
    drawnNumbers: list

# ===============================
# API DO JOGO
# ===============================
@app.post("/api/game/start")
def api_start_game(data: StartGameRequest):
    return start_game(
        mode=data.mode,
        bet=data.bet,
        cards=data.cards
    )

@app.post("/api/check_bingo")
def api_check_bingo(data: BingoCheck):
    win = check_bingo(data.card, data.drawnNumbers)
    return {"win": win}
