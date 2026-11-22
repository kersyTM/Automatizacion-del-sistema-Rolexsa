(function () {
  "use strict";

  // =========================================================
  // 1. LÓGICA DE NAVEGACIÓN (Routing por Hash)
  // =========================================================
  const screens = document.querySelectorAll(".screen");
  const sidebarLinks = document.querySelectorAll(".rx-sidebar-link");

  function navigateTo(hash) {
    
    const id = (hash || "").replace("#", "") || "dashboard";
    const target = document.getElementById(id);

   
    if (!target) {
      console.warn("Pantalla no encontrada:", id);
      return; 
    }

   
    screens.forEach((s) => s.classList.remove("active"));
    
   
    target.classList.add("active");

    
    sidebarLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + id) {
        link.classList.add("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

 
  window.addEventListener("hashchange", () => {
    navigateTo(location.hash);
  });

  
  window.addEventListener("DOMContentLoaded", () => {
    if (!location.hash || location.hash === "#login") {
      location.hash = "#dashboard";
    } else {
      navigateTo(location.hash);
    }
  });

  // =========================================================
  // 2. ALERTAS SIMULADAS (Botones de acción)
  // =========================================================
  document.querySelectorAll("[data-alert]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault(); 
      alert(el.dataset.alert);
    });
  });

  // =========================================================
  // 3. RED NEURONAL (Simulación de Pronóstico)
  // =========================================================
  const btnPronostico = document.getElementById("btnPronostico");
  if (btnPronostico) {
    btnPronostico.addEventListener("click", () => {
      const result = document.getElementById("pronosticoResult");
      result.classList.remove("d-none");
      result.innerHTML = "<strong>Pronóstico generado:</strong> 52 unidades. Versión del modelo: v1.2 aprobada.";
    });
  }

  // =========================================================
  // 4. CHAT DEL AGENTE VIRTUAL
  // =========================================================
  const chatForm = document.getElementById("chatForm");
  if (chatForm) {
    const chatBox = document.getElementById("chatBox");
    const chatInput = document.getElementById("chatInput");

    function addMessage(text, isUser) {
      const div = document.createElement("div");
      div.className = "p-3";
      div.style.maxWidth = "80%";
      div.style.borderRadius = "12px";
      div.style.lineHeight = "1.4";
      
      if (isUser) {
        div.style.background = "var(--rx-blue-primary)";
        div.style.color = "#fff";
        div.style.alignSelf = "flex-end";
      } else {
        div.style.background = "#e0f5f7";
        div.style.color = "#0b3a40";
        div.style.alignSelf = "flex-start";
      }
      
      div.textContent = text;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      addMessage(text, true);
      chatInput.value = "";

      const t = text.toLowerCase();
      let response = "No encontré coincidencias. Indica código, marca o medidas del repuesto.";

      if (t.includes("rodamiento") || t.includes("6205")) {
        response = "Encontré estas opciones: SKF 6205-2RS y NTN 6205-2RS. Ambas tienen existencias.";
      } else if (t.includes("reten")) {
        response = "Para retenes necesito el diámetro interior, exterior y ancho.";
      }

      setTimeout(() => addMessage(response, false), 400);
    });
  }
})();