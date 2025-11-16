// src/public/js/relogio.js
export class Relogio {
  constructor(tempo) {
    this.tempoRestante = tempo; // em segundos
    this.visor = document.createElement("div");
    this.visor.id = "relogio";
    this.visor.style.fontSize = "20px";
    this.visor.style.fontWeight = "bold";
    this.visor.style.color = "#fff";
    this.visor.style.background = "#333";
    this.visor.style.padding = "10px 20px";
    this.visor.style.borderRadius = "10px";
    this.visor.style.position = "absolute";
    this.visor.style.top = "20px";
    this.visor.style.right = "20px";
    this.visor.tabIndex = "0";
    this.intervalo = null;
  }

  iniciar() {
    this.atualizarVisor();
    this.intervalo = setInterval(() => {
      this.tempoRestante--;

      if (this.tempoRestante <= 0) {
        this.parar();
        this.visor.textContent = "⏰ Tempo esgotado!";
        // Emite o evento para o jogo saber
        const evento = new CustomEvent("tempoEsgotado");
        window.dispatchEvent(evento);
      } else {
        this.atualizarVisor();
      }
    }, 1000);
  }

  atualizarVisor() {
    const minutos = Math.floor(this.tempoRestante / 60);
    const segundos = this.tempoRestante % 60;
    this.visor.textContent = `${minutos}:${segundos
      .toString()
      .padStart(2, "0")}`;
  }

  parar() {
    clearInterval(this.intervalo);
  }

  resetar(tempo) {
    this.parar();
    this.tempoRestante = tempo;
    this.atualizarVisor();
  }
  obterTempoRestante() {
    const minutos = Math.floor(this.tempoRestante / 60);
    const segundos = this.tempoRestante % 60;
    return { minutos, segundos };
  }
}
