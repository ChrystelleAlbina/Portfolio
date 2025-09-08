// theme-gothic.js - Script pour la popup gothique du changement de thème
let currentTheme = "light";

// Initialiser le thème au chargement de la page
function initGothicTheme() {
  // Charger le thème sauvegardé
  const savedTheme = localStorage.getItem("blogTheme");
  if (savedTheme === "dark") {
    currentTheme = "dark";
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    document.body.classList.add("bg-darkMode");
    const btn = document.getElementById("themeToggle");
    if (btn) btn.innerHTML = "☀️ Light";
  } else {
    // S'assurer que le thème par défaut est appliqué correctement
    currentTheme = "light";
    document.body.classList.remove("dark");
    document.body.classList.remove("bg-darkMode");
    if (!document.body.classList.contains("light")) {
      document.body.classList.add("light");
    }
    const btn = document.getElementById("themeToggle");
    if (btn) btn.innerHTML = "🌙 Dark";
  }

  // Attacher l'événement au bouton de bascule
  const themeToggleBtn = document.getElementById("themeToggle");
  if (themeToggleBtn && !themeToggleBtn._gothicBound) {
    themeToggleBtn.addEventListener("click", attemptThemeChange);
    themeToggleBtn._gothicBound = true;
  }

  // Observer les changements de classes sur <body> et réappliquer si nécessaire
  if (!window._gothicThemeObserver) {
    const observer = new MutationObserver(() => {
      const savedTheme = localStorage.getItem("blogTheme");
      if (savedTheme === "dark") {
        if (!document.body.classList.contains("dark")) {
          document.body.classList.remove("light");
          document.body.classList.add("dark");
        }
        if (!document.body.classList.contains("bg-darkMode")) {
          document.body.classList.add("bg-darkMode");
        }
      }
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window._gothicThemeObserver = observer;
  }
}

// Initialisation robuste: exécuter immédiatement si le DOM est prêt, sinon attendre
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGothicTheme);
} else {
  initGothicTheme();
}

// Exposer pour réinitialiser après changements d'UI (ex: connexion)
window.initGothicTheme = initGothicTheme;

function attemptThemeChange() {
  if (currentTheme === "light") {
    showGothicPopup();
  } else {
    switchToLight();
  }
}

function showGothicPopup() {
  const popup = document.getElementById("gothicPopup");
  if (!popup) {
    console.error("Gothic popup element not found!");
    return;
  }
  
  popup.classList.add("show");
  document.body.style.overflow = "hidden";

  // Effet dramatique d'entrée
  setTimeout(() => {
    const gothicPopup = document.querySelector(".gothic-popup");
    if (gothicPopup) {
      gothicPopup.style.transform = "scale(1.05)";
      setTimeout(() => {
        gothicPopup.style.transform = "scale(1)";
      }, 100);
    }
  }, 300);
}

function hideGothicPopup() {
  const popup = document.getElementById("gothicPopup");
  if (popup) {
    popup.classList.remove("show");
  }
  document.body.style.overflow = "auto";
}

function acceptDarkSide() {
  hideGothicPopup();

  // Transition dramatique
  document.body.style.transition = "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)";

  setTimeout(() => {
    switchToDark();

    // Effet de tremblement dramatique
    document.body.style.animation = "shake 0.5s ease-in-out";
    setTimeout(() => {
      document.body.style.animation = "";
    }, 500);
  }, 200);
}

function declineDarkSide() {
  // Animation de "soulagement"
  const popup = document.querySelector(".gothic-popup");
  if (popup) {
    popup.style.transform = "scale(0.95)";
    popup.style.filter = "brightness(1.2)";

    setTimeout(() => {
      hideGothicPopup();
      popup.style.transform = "scale(1)";
      popup.style.filter = "brightness(1)";
    }, 300);
  } else {
    hideGothicPopup();
  }
}

function switchToDark() {
  currentTheme = "dark";
  document.body.classList.remove("light");
  document.body.classList.add("dark");
  document.body.classList.add("bg-darkMode");
  
  const btn = document.getElementById("themeToggle");
  if (btn) btn.innerHTML = "☀️ Light";
  
  localStorage.setItem("blogTheme", "dark");

  // Message de bienvenue dramatique dans la console
  console.log(
    "🦇 Bienvenue dans les ténèbres... Votre transformation est complète! 💀"
  );
}

function switchToLight() {
  currentTheme = "light";
  document.body.classList.remove("dark");
  document.body.classList.remove("bg-darkMode");
  document.body.classList.add("light");
  
  const btn = document.getElementById("themeToggle");
  if (btn) btn.innerHTML = "🌙 Dark";
  
  localStorage.setItem("blogTheme", "light");

  console.log(
    "✨ Retour à la lumière... Vous avez échappé à l'emprise des ténèbres! ☀️"
  );
}

// Fermer la popup en cliquant à l'extérieur
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("gothicPopup");
  if (popup) {
    popup.addEventListener("click", function (e) {
      if (e.target === this) {
        declineDarkSide();
      }
    });
  }
});

// Support clavier (ESC pour fermer)
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const popup = document.getElementById("gothicPopup");
    if (popup && popup.classList.contains("show")) {
      declineDarkSide();
    }
  }
});

// Rendre les fonctions accessibles globalement pour les attributs onclick
window.attemptThemeChange = attemptThemeChange;
window.acceptDarkSide = acceptDarkSide;
window.declineDarkSide = declineDarkSide;