// ===============================
// ESTADO GLOBAL
// ===============================
let selectedMode = 1;
let currentBet = 0.1;
let currentCards = 1;
let gameActive = false;

// ===============================
// SELEÇÃO DE MODO
// ===============================
function selectMode(mode) {
  selectedMode = mode;

  document.querySelectorAll(".modes button").forEach(btn => {
    btn.classList.remove("active");
  });

  const selectedButton = document.querySelector(
    `.modes button[data-mode="${mode}"]`
  );

  if (selectedButton) {
    selectedButton.classList.add("active");
  }
}

// ===============================
// INICIAR PARTIDA
// ===============================
async function startGame() {
  currentBet = parseFloat(document.getElementById("bet").value);
  currentCards = parseInt(document.getElementById("cards").value);

  // validações
  if (isNaN(currentBet) || currentBet < 0.1) {
    alert("A aposta mínima é 0.1 TON");
    return;
  }

  if (isNaN(currentCards) || currentCards < 1) {
    alert("Escolha pelo menos 1 cartela");
    return;
  }

  try {
    const res = await fetch("/api/game/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: selectedMode,
        bet: currentBet,
        cards: currentCards
      })
    });

    if (!res.ok) {
      alert("Erro ao iniciar a partida");
      return;
    }

    const data = await res.json();

    gameActive = true;
    showGameScreen();
    initGame(data);

  } catch (err) {
    console.error(err);
    alert("Erro de conexão com o servidor");
  }
}

// ===============================
// CONTROLE DE TELAS
// ===============================
function showGameScreen() {
  document.getElementById("menuScreen").classList.remove("active");
  document.getElementById("gameScreen").classList.add("active");

  // garante que o botão bingo só aparece no jogo
  const bingoBtn = document.getElementById("bingoBtn");
  if (bingoBtn) bingoBtn.style.display = "block";
}

function returnToMenu() {
  gameActive = false;

  document.getElementById("gameScreen").classList.remove("active");
  document.getElementById("menuScreen").classList.add("active");

  // esconde bingo fora do jogo
  const bingoBtn = document.getElementById("bingoBtn");
  if (bingoBtn) bingoBtn.style.display = "none";

  // limpa estado do jogo
  if (typeof resetGame === "function") {
    resetGame();
  }
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  selectMode(1);

  // por segurança, o botão bingo começa escondido
  const bingoBtn = document.getElementById("bingoBtn");
  if (bingoBtn) bingoBtn.style.display = "none";
});
