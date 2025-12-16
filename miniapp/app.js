// CLIQUE PARA MARCAR A CARTELA
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    if (!cell.classList.contains("marked") && !cell.classList.contains("free")) {
      cell.classList.add("marked");
      cell.style.background = "radial-gradient(circle, #00ffcc, #008877)";
      cell.style.color = "#000";
    }
  });
});

// BOTÃO BINGO (TEMPORÁRIO — SEM VALIDAÇÃO AINDA)
document.querySelector(".bingo-btn").addEventListener("click", () => {
  alert("🚧 Validação real do BINGO será adicionada na próxima etapa.");
});
