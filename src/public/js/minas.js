import { Aviso } from "./avisos.js";
import { Relogio } from "./Relogio.js";
import { Sons } from "./Sons.js";
export function campoMinado(pminas, tempo) {
  let verdade = true;
  let c = 0;
  const linhas = 16;
  const colunas = 16;
  const tamanhoCelula = 42;
  const tabuleiroBorderWidth = 2;

  // matriz de minas
  const minas = Array.from({ length: linhas }, () =>
    Array.from({ length: colunas }, () => 0)
  );

  // gerar minas (agora exato)
  const totalMinas = Math.floor(linhas * colunas * pminas);
  let minasColocadas = 0;
  while (minasColocadas < totalMinas) {
    const x = Math.floor(Math.random() * linhas);
    const y = Math.floor(Math.random() * colunas);
    if (minas[x][y] === 0) {
      minas[x][y] = 1;
      minasColocadas++;
    }
  }
  // contar minas ao redor
  function contarMinasAoRedor(linha, coluna) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const novaLinha = linha + i;
        const novaColuna = coluna + j;
        if (
          novaLinha >= 0 &&
          novaLinha < linhas &&
          novaColuna >= 0 &&
          novaColuna < colunas
        ) {
          count += minas[novaLinha][novaColuna];
        }
      }
    }
    return count;
  }

  // criar container principal
  const container = document.createElement("div");
  container.id = "container";
  container.style.position = "relative";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.height = "100vh";
  container.style.width = "100%";
  container.style.backgroundColor = "#2c3e50";
  document.body.appendChild(container);

  // criar tabuleiro visual
  const tabuleiroVisual = document.createElement("div");
  tabuleiroVisual.setAttribute("role", "grid");
  tabuleiroVisual.setAttribute(
    "aria-label",
    "Campo minado. Use as setas para navegar, Enter para revelar e espaço para marcar bandeira."
  );
  tabuleiroVisual.style.width = `${
    tamanhoCelula * linhas + tabuleiroBorderWidth * 2
  }px`;
  tabuleiroVisual.style.aspectRatio = "1 / 1";
  tabuleiroVisual.style.display = "flex";
  tabuleiroVisual.style.flexWrap = "wrap";
  tabuleiroVisual.style.border = `${tabuleiroBorderWidth}px solid black`;
  tabuleiroVisual.style.backgroundColor = "#1c1c1c";
  container.appendChild(tabuleiroVisual);
  // criar aviso
  const gerenciarAviso = new Aviso();
  // criar relogio
  const relogio = new Relogio(tempo);
  container.appendChild(relogio.visor);

  // colocando sons
  const gerenciarAudio = new Sons();
  gerenciarAudio.jogo.play();

  relogio.iniciar();
  // evento tempo esgotado
  window.addEventListener("tempoEsgotado", () => {
    gerenciarAudio.alarm.loop = true;
    gerenciarAudio.alarm.play();
    verdade = false;
    // mouse relogio
    document.documentElement.style.cursor = "wait";
    // precisa para carregar o mouse
    setTimeout(() => {
      gerenciarAviso.ctempo();
      const eventoFim = new CustomEvent("jogoFinalizado", {
        detail: { venceu: false },
      });
      window.dispatchEvent(eventoFim);
      relogio.parar();
      setTimeout(() => location.reload(), 2000);
    }, 50);
  });

  //revelar células ao redor
  function envolta(linha, coluna) {
    const celula = tabuleiroVisual.querySelector(
      `[data-linha='${linha}'][data-coluna='${coluna}']`
    );

    // já aberta ou marcada
    if (!celula || celula.dataset.aberto || celula.textContent === "🚩") {
      return;
    }

    celula.dataset.aberto = true;
    celula.classList.add("clicado");
    c++;

    const minasAoRedor = contarMinasAoRedor(linha, coluna);

    if (minasAoRedor > 0) {
      celula.textContent = minasAoRedor;
      celula.setAttribute(
        "aria-label",
        `célula revelada com ${minasAoRedor} minas ao redor`
      );
      celula.setAttribute("data-aberto", "true");
      celula.setAttribute("data-linha", linha);
      celula.setAttribute("data-coluna", coluna);
      celula.setAttribute("data-linha", linha);
      celula.setAttribute("data-coluna", coluna);
      celula.style.backgroundColor = "#a9a9a9ff";
      celula.style.color = "blue";
      gerenciarAudio.numeros.play();
      return;
    } else {
      // Se é zero, mostra só ela
      celula.textContent = "";
      celula.setAttribute("data-aberto", "true");
      celula.setAttribute("aria-label", "célula revelada sem minas ao redor");
      celula.style.backgroundColor = "#a9a9a9ff";
      gerenciarAudio.click.play();
    }
  }

  // revelar célula
  function revelar(linha, coluna) {
    const celula = tabuleiroVisual.querySelector(
      `[data-linha='${linha}'][data-coluna='${coluna}']`
    );

    // já aberta ou marcada
    if (!celula || celula.dataset.aberto || celula.textContent === "🚩") {
      return;
    }

    celula.dataset.aberto = true;
    celula.classList.add("clicado");
    c++;

    const minasAoRedor = contarMinasAoRedor(linha, coluna);

    if (minasAoRedor > 0) {
      celula.textContent = minasAoRedor;
      celula.setAttribute(
        "aria-label",
        `célula revelada com ${minasAoRedor} minas ao redor`
      );
      celula.style.backgroundColor = "#a9a9a9ff";
      celula.style.color = "blue";
      gerenciarAudio.numeros.play();
      return;
    } else {
      // Se é zero, mostra só ela
      celula.textContent = "";
      celula.setAttribute("aria-label", "célula revelada sem minas ao redor");
      celula.style.backgroundColor = "#a9a9a9ff";
      gerenciarAudio.click.play();

      // Revela apenas as 8 adjacentes SEM CHAMAR revelar() de novo
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;

          const novaLinha = linha + dx;
          const novaColuna = coluna + dy;

          if (
            novaLinha >= 0 &&
            novaLinha < linhas &&
            novaColuna >= 0 &&
            novaColuna < colunas
          ) {
            setTimeout(() => envolta(novaLinha, novaColuna), 15);
          }
        }
      }
    }
  }

  // criar células
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      const celula = document.createElement("div");
      celula.classList.add("celula");
      celula.setAttribute("role", "gridcell");
      const letraColuna = String.fromCharCode(65 + j); // A, B, C, D...
      celula.setAttribute(
        "aria-label",
        `Linha ${i + 1}, Coluna ${letraColuna}. Célula não revelada.`
      );

      celula.setAttribute("tabindex", "0");
      celula.setAttribute("data-linha", i);
      celula.setAttribute("data-coluna", j);
      celula.style.width = `${tamanhoCelula}px`;
      celula.style.height = `${tamanhoCelula}px`;
      celula.style.backgroundColor = "lightgray";
      celula.style.border = "2px solid #636363ff";
      celula.style.boxSizing = "border-box";
      celula.style.cursor = "pointer";
      celula.style.display = "flex";
      celula.style.alignItems = "center";
      celula.style.justifyContent = "center";
      celula.style.fontWeight = "bold";
      celula.style.fontSize = "40px";
      //mudando o mouse
      if (verdade) {
        celula.addEventListener("mouseenter", () => {
          if (
            celula.classList.contains("celula") &&
            celula.textContent === "🚩"
          ) {
            celula.style.cursor = "pointer";
          } else if (celula.classList.contains("clicado")) {
            celula.style.cursor = "not-allowed";
          }
        });
        // voltando ao normal
        celula.addEventListener("mouseleave", () => {
          celula.style.cursor = "default";
        });
      }

      // clique
      celula.addEventListener("click", () => {
        if (!verdade) return;
        if (celula.classList.contains("clicado") || celula.textContent === "🚩")
          return;

        const linha = parseInt(celula.getAttribute("data-linha"));
        const coluna = parseInt(celula.getAttribute("data-coluna"));

        if (minas[linha][coluna] === 1) {
          celula.style.backgroundColor = "red";
          celula.textContent = "💣";
          verdade = false;
          celula.setAttribute("aria-label", "mina revelada");
          document.documentElement.style.cursor =
            'url("src/public/img/bomba.jpg"), auto';
          setTimeout(() => {
            gerenciarAviso.cbomba();
            gerenciarAudio.bomba.play();

            // revelar todas as minas
            for (let x = 0; x < linhas; x++) {
              for (let y = 0; y < colunas; y++) {
                if (minas[x][y] === 1) {
                  const cMina = tabuleiroVisual.querySelector(
                    `[data-linha='${x}'][data-coluna='${y}']`
                  );
                  // mostrar vídeo de explosão na célula
                  if (cMina) {
                    cMina.style.backgroundColor = "red";
                    cMina.innerHTML = "";
                    const vv = document.createElement("video");
                    vv.src = "src/public/img/Bomba.mp4";
                    vv.autoplay = true;
                    vv.muted = true;
                    vv.playsInline = true;
                    vv.className = "explosion-video";
                    vv.setAttribute("aria-hidden", "true");
                    cMina.appendChild(vv);
                    const __p = vv.play();
                    if (__p && __p.catch) __p.catch(() => {});
                  }
                }
              }
            }

            const eventoFim = new CustomEvent("jogoFinalizado", {
              detail: { venceu: false },
            });
            window.dispatchEvent(eventoFim);
            relogio.parar();
            setTimeout(() => {
              location.reload();
            }, 3000);
          }, 50);
        } else {
          revelar(linha, coluna);
        }

        // vitória
        if (c >= linhas * colunas - totalMinas - 1) {
          verdade = false;
          gerenciarAviso.cvitoria();
          gerenciarAudio.vitoria.play();
          const eventoFim = new CustomEvent("jogoFinalizado", {
            detail: { venceu: true },
          });
          window.dispatchEvent(eventoFim);
          relogio.parar();
          setTimeout(() => container.remove(), 3000);
        }
      });

      // botão direito (bandeira)
      celula.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (celula.classList.contains("clicado")) return;
        if (celula.textContent === "🚩") {
          gerenciarAudio.bandeira.play();
          celula.textContent = "";
          celula.setAttribute("aria-label", "célula não revelada");
        } else {
          gerenciarAudio.bandeira.play();
          celula.textContent = "🚩";
          celula.setAttribute("aria-label", "bandeira marcada");
          celula.style.color = "red";
          celula.style.fontSize = "30px";
        }
      });

      // teclado
      celula.addEventListener("keydown", (e) => {
        const linha = parseInt(celula.getAttribute("data-linha"));
        const coluna = parseInt(celula.getAttribute("data-coluna"));
        let novaLinha = linha;
        let novaColuna = coluna;

        if (e.key === "ArrowUp") novaLinha = Math.max(0, linha - 1);
        else if (e.key === "ArrowDown")
          novaLinha = Math.min(linhas - 1, linha + 1);
        else if (e.key === "ArrowLeft") novaColuna = Math.max(0, coluna - 1);
        else if (e.key === "ArrowRight")
          novaColuna = Math.min(colunas - 1, coluna + 1);
        else if (e.key === "Enter") {
          e.preventDefault();
          celula.click();
          return;
        } else if (e.key === " ") {
          e.preventDefault();
          celula.dispatchEvent(new Event("contextmenu"));
          return;
        }
        if (e.code === "KeyC") {
          const { minutos, segundos } = relogio.obterTempoRestante();
          relogio.visor.ariaLive = "assertive";
          relogio.visor.ariaLabel = `Faltam ${minutos} ${
            minutos >= 2 ? "minutos" : "minuto"
          } e ${segundos} ${segundos >= 2 ? "segundos" : "segundo"} segundos.`;
          setTimeout(() => (relogio.visor.ariaLive = "off"), 100);
        }

        const novaCelula = tabuleiroVisual.querySelector(
          `[data-linha='${novaLinha}'][data-coluna='${novaColuna}']`
        );
        if (novaCelula) novaCelula.focus();
      });

      tabuleiroVisual.appendChild(celula);
    }
  }

  // foco inicial
  const primeira = tabuleiroVisual.querySelector(
    "[data-linha='0'][data-coluna='0']"
  );
  if (primeira) primeira.focus();
}
