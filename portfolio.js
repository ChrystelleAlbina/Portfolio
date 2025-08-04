// ✨ Sparkle effect (mode clair uniquement)
const root = document.getElementById("app");
const urls = ["/image/P2.svg"];
const classes = ["star-1"];
let sparkleEnabled = true;

function createStar(x, y) {
  if (!sparkleEnabled) return;
  const star = document.createElement("img");
  const idx = Math.floor(Math.random() * classes.length);
  star.classList.add("star", classes[idx], "fall");
  star.setAttribute("src", urls[idx]);
  star.setAttribute("style", `position:fixed; top: ${y}px; left: ${x}px;`);
  root.appendChild(star);
  setTimeout(() => star.remove(), 1250);
}

window.addEventListener("mousemove", (e) => {
  requestAnimationFrame(() => createStar(e.clientX, e.clientY));
});

function handleSparkle(theme) {
  sparkleEnabled = theme === "light";
  if (!sparkleEnabled) {
    // Supprimer les étoiles restantes
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => star.remove());
  }
}

// 🌧️ Rain effect (mode sombre uniquement)
const rainContainer = document.createElement("div");
rainContainer.classList.add("rain");
document.body.appendChild(rainContainer);

function createRain() {
  rainContainer.innerHTML = ""; // Nettoyer les gouttes
  const numberOfDrops = 100;

  for (let i = 0; i < numberOfDrops; i++) {
    const drop = document.createElement("div");
    drop.classList.add("drop");
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = Math.random() * 1 + 0.5 + "s";
    drop.style.animationDelay = Math.random() * 5 + "s";
    rainContainer.appendChild(drop);
  }
}

function handleRain(theme) {
  if (theme === "dark") {
    createRain();
    rainContainer.style.display = "block";
  } else {
    rainContainer.innerHTML = "";
    rainContainer.style.display = "none";
  }
}

// 🌗 Dark mode toggle + mémorisation
const toggle = document.getElementById("darkModeToggle");
const toggleImg = toggle.querySelector("img");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    toggleImg.src = "/image/light.webp";
    toggleImg.alt = "Passer en mode clair";
  } else {
    document.body.classList.remove("dark-mode");
    toggleImg.src = "/image/dark.webp";
    toggleImg.alt = "Passer en mode sombre";
  }

  handleSparkle(theme);
  handleRain(theme);
}

toggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  const theme = isDark ? "dark" : "light";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
});
