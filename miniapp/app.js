let selectedMode = 1;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goToMenu() {
  showScreen("screen-menu");
}

function goToConfig() {
  showScreen("screen-config");
}

function selectMode(mode) {
  selectedMode = mode;
  document.querySelectorAll(".modes button").forEach(b => b.classList.remove("active"));
  document.querySelector(`.modes button[data-mode="${mode}"]`).classList.add("active");
}

function startGame() {
  showScreen("screen-game");
  initGame();
}

function showResult() {
  showScreen("screen-result");
}
