export class Aviso {
  ctempo() {
    // Criar overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";
    overlay.style.cursor = "wait";

    // Acessibilidade
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "mensagem-alerta");

    // Criar caixa do aviso
    const aviso = document.createElement("div");
    aviso.style.background = "rgba(0, 0, 0, 0.8)";
    aviso.style.color = "white";
    aviso.style.padding = "20px 40px";
    aviso.style.borderRadius = "12px";
    aviso.style.fontSize = "20px";
    aviso.style.textAlign = "center";
    aviso.style.minWidth = "300px";
    aviso.style.boxShadow = "0 0 10px black";

    // Mensagem
    const mensagem = document.createElement("div");
    mensagem.id = "mensagem-alerta";
    mensagem.textContent = "⏰ O tempo acabou! Fim de jogo!";
    mensagem.style.marginBottom = "20px";

    // Botão OK
    const btnOk = document.createElement("button");
    btnOk.textContent = "OK";
    btnOk.style.padding = "10px 20px";
    btnOk.style.fontSize = "16px";
    btnOk.style.border = "none";
    btnOk.style.borderRadius = "8px";
    btnOk.style.cursor = "pointer";
    btnOk.style.backgroundColor = "#3498db";
    btnOk.style.color = "white";
    btnOk.setAttribute("aria-label", "Fechar aviso: O tempo acabou");

    // Fechar modal
    btnOk.addEventListener("click", () => {
      overlay.remove();
      document.body.style.pointerEvents = "auto";
      document.documentElement.style.cursor = "default";
    });

    aviso.appendChild(mensagem);
    aviso.appendChild(btnOk);
    overlay.appendChild(aviso);
    document.body.appendChild(overlay);

    // Bloquear interação com o resto da página
    document.body.style.pointerEvents = "none";
    overlay.style.pointerEvents = "auto";

    // Foco automático no botão
    btnOk.focus();

    // Anunciar a mensagem automaticamente para leitores de tela
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "assertive");
    liveRegion.setAttribute("role", "alert");
    liveRegion.style.position = "absolute";
    liveRegion.style.left = "-9999px";
    liveRegion.textContent = mensagem.textContent;
    document.body.appendChild(liveRegion);

    setTimeout(() => {
      liveRegion.remove();
    }, 1000);

    // Trava o foco dentro do modal (tab trapping)
    overlay.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        btnOk.focus();
      } else if (e.key === "Escape") {
        // Opcional: permitir fechar com ESC
        btnOk.click();
      }
    });
  }
  cbomba() {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";
    overlay.style.cursor = "wait";

    // Acessibilidade
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "mensagem-alerta");

    // Criar caixa do aviso
    const aviso = document.createElement("div");
    aviso.style.background = "#b62323d2";
    aviso.style.color = "white";
    aviso.style.padding = "20px 40px";
    aviso.style.borderRadius = "12px";
    aviso.style.fontSize = "20px";
    aviso.style.textAlign = "center";
    aviso.style.minWidth = "300px";
    aviso.style.boxShadow = "0 0 10px black";

    // Mensagem
    const mensagem = document.createElement("div");
    mensagem.id = "mensagem-alerta";
    mensagem.textContent = "Você clicou numa mina!";
    mensagem.style.marginBottom = "20px";

    // Botão OK
    const btnOk = document.createElement("button");
    btnOk.textContent = "OK";
    btnOk.style.padding = "10px 20px";
    btnOk.style.fontSize = "16px";
    btnOk.style.border = "none";
    btnOk.style.borderRadius = "8px";
    btnOk.style.cursor = "pointer";
    btnOk.style.backgroundColor = "#3498db";
    btnOk.style.color = "white";
    btnOk.setAttribute("aria-label", "Fechar aviso: O tempo acabou");

    // Fechar modal
    btnOk.addEventListener("click", () => {
      overlay.remove();
      document.body.style.pointerEvents = "auto";
      document.documentElement.style.cursor = "default";
    });

    aviso.appendChild(mensagem);
    aviso.appendChild(btnOk);
    overlay.appendChild(aviso);
    document.body.appendChild(overlay);

    // Bloquear interação com o resto da página
    document.body.style.pointerEvents = "none";
    overlay.style.pointerEvents = "auto";

    // Foco automático no botão
    btnOk.focus();

    // Anunciar a mensagem automaticamente para leitores de tela
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "assertive");
    liveRegion.setAttribute("role", "alert");
    liveRegion.style.position = "absolute";
    liveRegion.style.left = "-9999px";
    liveRegion.textContent = mensagem.textContent;
    document.body.appendChild(liveRegion);

    setTimeout(() => {
      liveRegion.remove();
    }, 1000);

    // Trava o foco dentro do modal (tab trapping)
    overlay.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        btnOk.focus();
      } else if (e.key === "Escape") {
        // Opcional: permitir fechar com ESC
        btnOk.click();
      }
    });
  }
  cvitoria() {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgb(0,0,0)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";
    overlay.style.cursor = "wait";

    // Acessibilidade
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "mensagem-alerta");

    // Criar caixa do aviso
    const aviso = document.createElement("div");
    aviso.style.background = "#e7e428a5";
    aviso.style.color = "white";
    aviso.style.padding = "20px 40px";
    aviso.style.borderRadius = "12px";
    aviso.style.fontSize = "30px";
    aviso.style.textAlign = "center";
    aviso.style.minWidth = "300px";
    aviso.style.boxShadow = "0 0 10px black";

    // Mensagem
    const mensagem = document.createElement("div");
    mensagem.id = "mensagem-alerta";
    mensagem.textContent = "Parabéns, você sobreviveu por mais um dia!🏆";
    mensagem.style.marginBottom = "20px";

    // Botão OK
    const btnOk = document.createElement("button");
    btnOk.textContent = "OK";
    btnOk.style.padding = "10px 20px";
    btnOk.style.fontSize = "16px";
    btnOk.style.border = "none";
    btnOk.style.borderRadius = "8px";
    btnOk.style.cursor = "pointer";
    btnOk.style.backgroundColor = "#3498db";
    btnOk.style.color = "white";
    btnOk.setAttribute("aria-label", "Fechar aviso: O tempo acabou");

    // Fechar modal
    btnOk.addEventListener("click", () => {
      overlay.remove();
      document.body.style.pointerEvents = "auto";
      document.documentElement.style.cursor = "default";
    });

    aviso.appendChild(mensagem);
    aviso.appendChild(btnOk);
    overlay.appendChild(aviso);
    document.body.appendChild(overlay);

    // Bloquear interação com o resto da página
    document.body.style.pointerEvents = "none";
    overlay.style.pointerEvents = "auto";

    // Foco automático no botão
    btnOk.focus();

    // Anunciar a mensagem automaticamente para leitores de tela
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "assertive");
    liveRegion.setAttribute("role", "alert");
    liveRegion.style.position = "absolute";
    liveRegion.style.left = "-9999px";
    liveRegion.textContent = mensagem.textContent;
    document.body.appendChild(liveRegion);

    setTimeout(() => {
      liveRegion.remove();
    }, 1000);

    // Trava o foco dentro do modal (tab trapping)
    overlay.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        btnOk.focus();
      } else if (e.key === "Escape") {
        // Opcional: permitir fechar com ESC
        btnOk.click();
      }
    });
  }
}
