// config.js - Firebase configuration
// Replace with your actual Firebase configuration
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Instructions:
// 1. Go to Firebase Console (https://console.firebase.google.com)
// 2. Create a new project or select existing one
// 3. Go to Project Settings > General
// 4. Scroll down to "Your apps" section
// 5. Click "Add app" and select Web (</>) 
// 6. Register your app and copy the config object
// 7. Replace the values above with your actual configuration
//
// Don't forget to:
// - Enable Authentication (Email/Password)
// - Create Firestore database
// - Set up security rules for Firestore