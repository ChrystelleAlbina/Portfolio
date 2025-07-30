class SakuraPetal {
  constructor(container) {
    this.container = container;
    this.element = document.createElement("div");
    this.element.className = "petal";

    // Variations de pétales
    const variants = ["", "variant-1", "variant-2", "variant-3"];
    this.element.classList.add(
      variants[Math.floor(Math.random() * variants.length)]
    );

    this.reset();
    this.setupEventListeners();
    container.appendChild(this.element);
  }

  reset() {
    // Position initiale aléatoire en haut de l'écran
    this.x = Math.random() * window.innerWidth;
    this.y = -20;

    // Vitesses aléatoires
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = Math.random() * 2 + 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 4;

    // Propriétés du mouvement
    this.swayAmplitude = Math.random() * 2 + 1;
    this.swayFrequency = Math.random() * 0.02 + 0.01;
    this.time = 0;

    // Taille aléatoire
    const size = Math.random() * 10 + 10;
    this.element.style.width = size + "px";
    this.element.style.height = size + "px";

    this.updatePosition();
  }

  setupEventListeners() {
    this.element.addEventListener("click", () => {
      this.rotationSpeed += (Math.random() - 0.5) * 10;
      this.vx += (Math.random() - 0.5) * 5;
      this.vy += Math.random() * 2;
    });
  }

  update(mouseX, mouseY) {
    this.time += 1;

    // Effet de souris (attraction/répulsion)
    if (mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100;
        this.vx += (dx / distance) * force * 0.3;
        this.vy += (dy / distance) * force * 0.3;
      }
    }

    // Mouvement de balancement (effet de vent)
    const sway = Math.sin(this.time * this.swayFrequency) * this.swayAmplitude;
    this.vx += sway * 0.1;

    // Effet de vent aléatoire
    this.vx += (Math.random() - 0.5) * 0.1;

    // Mise à jour de la position
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;

    // Friction
    this.vx *= 0.99;
    this.vy *= 0.995;

    // Gravité
    this.vy += 0.05;

    // Rebond sur les bords latéraux
    if (this.x < -20) {
      this.x = window.innerWidth + 20;
    } else if (this.x > window.innerWidth + 20) {
      this.x = -20;
    }

    // Reset si le pétale sort de l'écran par le bas
    if (this.y > window.innerHeight + 50) {
      this.reset();
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.transform = `rotate(${this.rotation}deg)`;
  }
}

class SakuraEffect {
  constructor() {
    this.container = document.getElementById("sakuraContainer");
    this.petals = [];
    this.mouseX = null;
    this.mouseY = null;

    this.init();
    this.setupEventListeners();
    this.animate();
  }

  init() {
    // Créer des pétales
    const petalCount = window.innerWidth < 768 ? 15 : 25;
    for (let i = 0; i < petalCount; i++) {
      setTimeout(() => {
        this.petals.push(new SakuraPetal(this.container));
      }, i * 200);
    }
  }

  setupEventListeners() {
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    document.addEventListener("mouseleave", () => {
      this.mouseX = null;
      this.mouseY = null;
    });

    // Gestion du redimensionnement
    window.addEventListener("resize", () => {
      // Ajuster le nombre de pétales selon la taille de l'écran
      const targetCount = window.innerWidth < 768 ? 15 : 25;
      const currentCount = this.petals.length;

      if (currentCount < targetCount) {
        for (let i = currentCount; i < targetCount; i++) {
          this.petals.push(new SakuraPetal(this.container));
        }
      } else if (currentCount > targetCount) {
        for (let i = currentCount - 1; i >= targetCount; i--) {
          this.container.removeChild(this.petals[i].element);
          this.petals.pop();
        }
      }
    });
  }

  animate() {
    this.petals.forEach((petal) => {
      petal.update(this.mouseX, this.mouseY);
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialiser l'effet quand la page est chargée
document.addEventListener("DOMContentLoaded", () => {
  new SakuraEffect();
});



