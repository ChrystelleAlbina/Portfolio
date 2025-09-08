# Blog Firebase - Music Blog

Un blog moderne avec authentification Firebase, thème sombre gothique et système de commentaires.

## 🚀 Fonctionnalités

- **Authentification Firebase** : Connexion et inscription sécurisées
- **Articles** : Création, affichage et gestion d'articles
- **Commentaires** : Système de commentaires en temps réel
- **Thème Gothique** : Popup dramatique pour basculer en mode sombre
- **Design Responsive** : Compatible mobile et desktop
- **Interface Moderne** : Effets visuels et animations fluides

## 📦 Installation

### 1. Configuration Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez les services suivants :
   - **Authentication** (Email/Password)
   - **Firestore Database**

### 2. Configuration du projet

1. Dans Firebase Console, allez dans **Paramètres du projet** > **Général**
2. Dans la section "Vos applications", cliquez sur **Ajouter une application** et sélectionnez **Web**
3. Enregistrez votre application et copiez la configuration
4. Remplacez les valeurs dans `config.js` :

```javascript
export const firebaseConfig = {
  apiKey: "votre-api-key",
  authDomain: "votre-project-id.firebaseapp.com",
  projectId: "votre-project-id",
  storageBucket: "votre-project-id.appspot.com",
  messagingSenderId: "votre-messaging-sender-id",
  appId: "votre-app-id"
};
```

### 3. Règles de sécurité Firestore

Dans Firebase Console > Firestore Database > Règles, utilisez :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Articles - lecture publique, écriture pour utilisateurs connectés
    match /articles/{articleId} {
      allow read: if true;
      allow write: if request.auth != null;
      
      // Commentaires
      match /comments/{commentId} {
        allow read: if true;
        allow write: if request.auth != null;
      }
    }
    
    // Profils utilisateurs
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4. Serveur local

Servez les fichiers via un serveur HTTP (requis pour les modules ES6) :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (live-server)
npx live-server

# Avec PHP
php -S localhost:8000
```

## 📁 Structure du projet

```
├── blog.html          # Page principale
├── blog.css           # Styles CSS
├── blog.js            # JavaScript principal (Firebase)
├── theme-gothic.js    # Système de thème gothique
├── config.js          # Configuration Firebase
├── README.md          # Documentation
└── image/            # Dossier des images
    ├── background.webp
    └── bg-darkMode.webp
```

## 🎨 Personnalisation

### Thèmes

- **Mode clair** : Thème par défaut avec arrière-plan personnalisé
- **Mode sombre** : Thème gothique avec popup dramatique

### Images de fond

Placez vos images dans le dossier `image/` :
- `background.webp` : Arrière-plan mode clair
- `bg-darkMode.webp` : Arrière-plan mode sombre (optionnel)

### Couleurs

Modifiez les variables CSS dans `blog.css` :

```css
:root {
  --bg-0: #11ff00;
  --text: #000303;
  --accent-gold: #d4af53;
  --neon-cyan: #00d4ff;
  /* ... autres variables */
}
```

## 🔧 Utilisation

### Connexion/Inscription

1. Cliquez sur "Se connecter" ou "S'inscrire"
2. Remplissez le formulaire
3. Une fois connecté, le panel admin apparaît

### Création d'articles

1. Connectez-vous
2. Cliquez sur "✍️ Nouvel Article"
3. Remplissez le titre et le contenu
4. Cochez "Publier immédiatement" si souhaité
5. Cliquez sur "Enregistrer"

### Commentaires

1. Connectez-vous
2. Tapez votre commentaire sous un article
3. Cliquez sur "Commenter"

### Changement de thème

1. Cliquez sur le bouton "🌙 Dark" en haut à droite
2. Une popup gothique apparaît
3. Choisissez "💀 Oui, j'accepte" pour le mode sombre
4. Ou "✨ Non, rester en lumière" pour annuler

## 🐛 Dépannage

### La popup de thème ne s'affiche pas

- Vérifiez que `theme-gothic.js` est bien chargé
- Ouvrez la console pour voir les erreurs
- Assurez-vous que l'élément `#gothicPopup` existe dans le HTML

### Articles ne se chargent pas

- Vérifiez votre configuration Firebase dans `config.js`
- Assurez-vous que Firestore est activé
- Vérifiez les règles de sécurité Firestore
- Créez l'index composite suggéré dans la console Firebase

### Erreurs d'authentification

- Vérifiez que l'authentification Email/Password est activée
- Vérifiez les domaines autorisés dans Firebase Console

## 📱 Responsive

Le blog est entièrement responsive et s'adapte aux écrans :
- Desktop (1024px+)
- Tablette (768px-1023px)
- Mobile (320px-767px)

## 🎭 Fonctionnalités avancées

### Popup gothique

- Animations fluides avec CSS transforms
- Particules flottantes
- Effets de lumière et d'ombre
- Support clavier (ESC pour fermer)
- Clic extérieur pour fermer

### Système de commentaires

- Commentaires en temps réel
- Affichage de l'auteur et de la date
- Interface intuitive

### Gestion des erreurs

- Messages d'erreur informatifs
- Fallback pour les requêtes Firestore
- Gestion gracieuse des échecs de connexion

## 📄 Licence

Ce projet est libre d'utilisation pour des projets personnels et commerciaux.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter de nouvelles fonctionnalités

---

**Profitez de votre blog Firebase ! 🎉**