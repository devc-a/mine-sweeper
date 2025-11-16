import { campoMinado } from "./minas.js";
document.addEventListener("DOMContentLoaded", () => {
  // pegando o form
  const form = document.getElementById("dificuldade");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // pegando elementos
    const facil = document.getElementById("facil");
    const medio = document.getElementById("medio");
    const dificil = document.getElementById("dificil");
    const personalizado = document.getElementById("personalizado");
    const segundosInput = document.getElementById("segundos");
    const minutosInput = document.getElementById("minutos");
    const minasInput = document.getElementById("minas");

    const segundos = Number(segundosInput.value);
    const minutos = Number(minutosInput.value);
    const minas = Number(minasInput.value);

    // cálculo de tempo e minas
    const tempoTotal = minutos * 60 + segundos;
    const minasTotal = minas / 100;

    let tempo = 0;
    let pminas = 0;

    // opções predefinidas
    if (facil.checked) {
      tempo = 300; // 5 min
      pminas = 0.33;
    } else if (medio.checked) {
      tempo = 120; // 2 min
      pminas = 0.47;
    } else if (dificil.checked) {
      tempo = 30; // 30 segundos
      pminas = 0.56;
    } else if (tempoTotal > 0 && minasTotal > 0 && personalizado.checked) {
      tempo = tempoTotal;
      pminas = minasTotal;
    } else {
      alert("⚠️ Você não selecionou uma dificuldade nem definiu tempo/minas!");
      return;
    }

    // esconde o formulário
    form.style.display = "none";

    // envia os parâmetros para iniciar o jogo
    campoMinado(pminas, tempo);
  });
});
