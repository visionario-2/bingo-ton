let drawInterval;
let countdown = 5;
let drawn = [];

function initGame() {
  drawn = [];
  countdown = 5;
  document.getElementById("history").innerHTML = "";
  document.getElementById("currentNumber").innerText = "--";

  createPlayerCard();
  startDraw();
}

function startDraw() {
  drawInterval = setInterval(() => {
    countdown--;
    document.querySelector("#nextTimer span").innerText = countdown;

    if (countdown === 0) {
      countdown = 5;
      drawNumber();
    }
  }, 1000);
}

function drawNumber() {
  const n = Math.floor(Math.random() * 75) + 1;
  drawn.push(n);

  document.getElementById("currentNumber").innerText = n;

  const h = document.createElement("div");
  h.innerText = n;
  document.getElementById("history").appendChild(h);
}

function createPlayerCard() {
  const card = document.getElementById("playerCard");
  card.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const d = document.createElement("div");
    d.innerText = Math.floor(Math.random() * 75) + 1;
    card.appendChild(d);
  }
}

function claimBingo() {
  clearInterval(drawInterval);
  showResult();
}
