let card = [];
let drawSequence = [];
let drawnNumbers = [];
let drawIndex = 0;
let drawInterval = null;

function initGame(data) {
  card = data.user_card;
  drawSequence = data.draw_sequence;
  drawIndex = 0;
  drawnNumbers = [];

  document.getElementById("userCard").innerHTML = "";
  document.getElementById("history").innerText = "";
  document.getElementById("currentNumber").innerText = "--";
  document.getElementById("message").innerText = "";

  renderCard(card);

  drawInterval = setInterval(drawNumber, 2000);

  document.getElementById("bingoBtn").onclick = checkBingo;
}

function renderCard(card) {
  const container = document.getElementById("userCard");

  card.forEach(num => {
    const div = document.createElement("div");
    div.className = "cell";
    div.innerText = num;

    div.onclick = () => {
      if (drawnNumbers.includes(num)) {
        div.classList.toggle("marked");
      }
    };

    container.appendChild(div);
  });
}

function drawNumber() {
  if (drawIndex >= drawSequence.length) return;

  const number = drawSequence[drawIndex++];
  drawnNumbers.push(number);

  document.getElementById("currentNumber").innerText = number;
  document.getElementById("history").innerText = drawnNumbers.join(", ");
}

async function checkBingo() {
  const res = await fetch("/api/check_bingo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      card: card,
      drawnNumbers: drawnNumbers
    })
  });

  const data = await res.json();

  if (data.win) {
    document.getElementById("message").innerText = "🎉 BINGO! Você ganhou!";
    clearInterval(drawInterval);

    setTimeout(() => {
      returnToMenu();
    }, 3000);
  } else {
    document.getElementById("message").innerText = "Ainda não é bingo!";
  }
}
