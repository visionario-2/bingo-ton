from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from game_service import start_game
from bingo_validator import check_bingo
from pydantic import BaseModel
import os

app = FastAPI()

# ===============================
# SERVIR MINI APP (FRONT)
# ===============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONT_DIR = os.path.join(BASE_DIR, "..", "miniapp")

app.mount("/static", StaticFiles(directory=FRONT_DIR), name="static")


@app.get("/")
def root():
    return FileResponse(os.path.join(FRONT_DIR, "index.html"))


# ===============================
# API DO JOGO
# ===============================

class StartGameRequest(BaseModel):
    mode: int
    bet: float
    cards: int


@app.post("/api/game/start")
def api_start_game(_: StartGameRequest):
    return start_game()


class BingoCheck(BaseModel):
    card: list
    drawnNumbers: list


@app.post("/api/check_bingo")
def api_check_bingo(data: BingoCheck):
    win = check_bingo(data.card, data.drawnNumbers)
    return {
        "win": win
    }
