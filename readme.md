# 🌸 Portfolio Chrystelle Albina

> Développeuse Web & Web Mobile - Portfolio interactif avec effets visuels immersifs

## 📖 Description

Portfolio personnel présentant mes compétences en développement web front-end, avec des animations avancées, des effets visuels immersifs et un design responsive. Le site propose une expérience utilisateur unique avec des pétales de sakura animés, des effets de particules et un design glassmorphisme moderne.

## 🌐 Démonstration

- **Portfolio en ligne** : [À déployer]
- **Projets présentés** :
  - [Evenement & Co](https://projetevenement.netlify.app/)
  - [Ink Pulse](https://inkpulse.netlify.app/)
  - [Devine le nombre](https://elnombre.netlify.app/)

## ✨ Fonctionnalités

### 🎨 Effets Visuels

- **Pétales de Sakura animés** avec physique réaliste (gravité, friction, vent)
- **Interaction souris** (attraction/répulsion des particules)
- **Effet Sparkle** en mode clair
- **Effet de pluie** en mode sombre
- **Glassmorphisme** et effets de flou
- **Animations CSS3** avancées

### 🌗 Thèmes

- **Mode clair/sombre** avec toggle
- **Mémorisation des préférences** (localStorage)
- **Adaptation automatique** des effets selon le thème

### 📱 Responsive Design

- **Design Mobile-First** avec breakpoints optimisés
- **Support complet** : smartphones, tablettes, desktop
- **Mode paysage** spécialement géré
- **Unités fluides** (clamp, vw, vh)
- **Accessibilité** (prefers-reduced-motion)

### 🎯 Sections

- **Page d'accueil** avec navigation glassmorphisme
- **Portfolio complet** avec présentation détaillée
- **CV intégré** avec expériences et formations
- **Showcase projets** avec effets de texte animés
- **Liens sociaux** (GitHub, LinkedIn)

## 🛠️ Technologies Utilisées

### Frontend

- **HTML5** - Structure sémantique
- **CSS3** - Animations, transitions, responsive
- **JavaScript ES6+** - Programmation orientée objet
- **SVG** - Graphiques vectoriels pour les pétales

### Design & UX

- **Glassmorphisme** - Effets de verre moderne
- **Animations fluides** - 60fps optimisé
- **Curseur personnalisé** - Expérience immersive
- **Police Cinzel** - Typographie élégante

### Outils

- **Live Server** - Serveur de développement
- **Figma** - Design et prototypage
- **Krita** - Création graphique

## 📁 Structure du Projet

```
portfolio/
├── index.html              # Page d'accueil
├── portfolio.html           # Portfolio et CV complet
├── github.html             # Showcase des projets
├── 404.css                 # Styles page d'accueil
├── portfolio.css           # Styles portfolio (avec dark mode)
├── github.css              # Styles page projets
├── 404.js                  # Animation pétales de sakura
├── portfolio.js            # Dark mode + effets particules
├── image/                  # Assets graphiques
│   ├── chrystelle.webp    # Photo de profil
│   ├── back404.webp       # Background principal
│   ├── cursor.png         # Curseur personnalisé
│   ├── P2.svg            # Étoiles pour effet sparkle
│   ├── video.mp4         # Vidéo background texte
│   ├── favicon.png       # Icône du site
│   └── [autres assets]   # Logos, images projets
└── .vscode/
    └── settings.json      # Configuration Live Server
```

## 🚀 Installation & Utilisation

### Prérequis

- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur local (Live Server recommandé)

### Installation

1. **Cloner le repository**

```bash
git clone [url-du-repo]
cd portfolio-chrystelle
```

2. **Lancer avec Live Server**

```bash
# Si vous utilisez VS Code avec Live Server
# Clic droit sur index.html > "Open with Live Server"

# Ou serveur Python simple
python -m http.server 5501
```

3. **Ouvrir dans le navigateur**

```
http://localhost:5501
```

### Utilisation

- **Navigation** : Cliquez sur les cartes glassmorphisme de la page d'accueil
- **Interactions** : Bougez la souris pour interagir avec les pétales
- **Mode sombre** : Toggle disponible sur la page portfolio
- **Responsive** : Testez sur différents appareils et orientations

## 🎨 Personnalisation

### Modifier les couleurs

```css
:root {
  --color-bg: #1f004ef2;
  --color-text: white;
  --color-accent: #9e0acbfb;
}
```

### Ajuster les animations

```javascript
// Dans 404.js - Modifier le nombre de pétales
const petalCount = window.innerWidth < 768 ? 15 : 25;

// Dans portfolio.js - Modifier la durée des effets
setTimeout(() => star.remove(), 1250);
```

### Responsive breakpoints

```css
@media (max-width: 480px) {
  /* Smartphones */
}
@media (min-width: 481px) and (max-width: 768px) {
  /* Tablettes */
}
@media (min-width: 1200px) {
  /* Desktop */
}
```

## 🌟 Fonctionnalités Avancées

### Physique des Pétales

- **Gravité** et **friction** réalistes
- **Effet de vent** avec balancement
- **Collision** et rebond sur les bords
- **Interaction souris** avec force d'attraction

### Optimisations Performance

- **RequestAnimationFrame** pour animations fluides
- **Lazy loading** des images
- **Compression** des assets (WebP)
- **Adaptation** du nombre de particules selon l'appareil

### Accessibilité

- **Alt tags** sur toutes les images
- **Navigation clavier**
- **Respect prefers-reduced-motion**
- **Contraste** optimisé pour les deux thèmes

## 📧 Contact

**Chrystelle Albina**

- **Email** : albina.chrystelle@gmail.com
- **Téléphone** : 06 33 68 49 19
- **GitHub** : [ChrystelleALBINA](https://github.com/ChrystelleALBINA)
- **LinkedIn** : [chrystelle-albina](https://www.linkedin.com/in/chrystelle-albina-8509a944/)

## 🎓 Formation & Compétences

### Formation Actuelle

- **2025** - TP Développeur Web et Web Mobile (Nepsod)

### Compétences Techniques

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Frameworks** : React (en apprentissage)
- **Design** : Figma, Krita, UI/UX
- **Outils** : Git, GitHub, VSCode, Bootstrap
- **Base de données** : PHP, MySQL (notions)

### Soft Skills

- Logique et résolution de problèmes
- Curiosité et apprentissage continu
- Créativité et sens esthétique
- Passion pour l'innovation

## 📄 Licence

© 2025 Portfolio Chrystelle Albina. All rights reserved.

---

_Développé avec passion par Chrystelle Albina - Future développeuse web_
