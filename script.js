(function () {
  const ADMIN_EMAILS = [
    "hemanrhprasath.hp@gmail.com",
    "hemanthprasath.hp@gmail.com"
  ];
  const ADMIN_EMAIL = ADMIN_EMAILS[0];
  const ADMIN_PASSWORD = "Pr@s@th0304";

  window.login = function login() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
    const password = passwordInput ? passwordInput.value.trim() : "";

    if (ADMIN_EMAILS.includes(email) && password === ADMIN_PASSWORD) {
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminEmail", email);
      window.location.href = "dashboard.html";
      return;
    }

    alert("Invalid credentials");
  };

  const gate = document.getElementById("secretGate");
  const gateLink = document.getElementById("adminGateLink");
  const toast = document.getElementById("gateToast");
  let clickCount = 0;
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1800);
  }

  if (gate && gateLink) {
    gate.addEventListener("click", () => {
      clickCount += 1;
      const remaining = Math.max(5 - clickCount, 0);

      if (clickCount >= 5) {
        gateLink.classList.add("visible");
        showToast("Owner gate opened.");
        return;
      }

      showToast(`${remaining} more click${remaining === 1 ? "" : "s"} to open owner gate.`);
    });
  }

  document.querySelectorAll(".contact-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get("subject") || "Portfolio inquiry");
      const body = encodeURIComponent(
        `Name: ${data.get("name") || ""}\nEmail: ${data.get("email") || ""}\n\n${data.get("message") || ""}`
      );
      window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
    });
  });

  const instagramModal = document.getElementById("instagramModal");
  const instagramOpeners = document.querySelectorAll("[data-instagram-popup]");
  const instagramClosers = document.querySelectorAll("[data-instagram-close]");

  function setInstagramModal(open) {
    if (!instagramModal) return;
    instagramModal.classList.toggle("open", open);
    instagramModal.setAttribute("aria-hidden", open ? "false" : "true");
  }

  instagramOpeners.forEach((button) => {
    button.addEventListener("click", () => setInstagramModal(true));
  });

  instagramClosers.forEach((button) => {
    button.addEventListener("click", () => setInstagramModal(false));
  });

  if (instagramModal) {
    instagramModal.addEventListener("click", (event) => {
      if (event.target === instagramModal) setInstagramModal(false);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setInstagramModal(false);
  });
})();
