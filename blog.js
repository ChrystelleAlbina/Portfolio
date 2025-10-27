// blog.js - Main JavaScript file for Firebase blog functionality
import { firebaseConfig } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Global variables
let currentUser = null;
let currentEditingArticle = null;
let isAdmin = false;
let commentsClickListenerAttached = false;
let lastVisible = null;
const articlesPerPage = 10;

// Modal functions
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "block";
    modal.classList.add("active");
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("active");
  }
}

// Make modal functions globally accessible
window.openModal = openModal;
window.closeModal = closeModal;

// Authentication functions
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    closeModal("loginModal");
    showMessage("Connexion réussie!", "success");
  } catch (error) {
    showMessage("Erreur de connexion : " + error.message, "error");
  }
}

async function handleRegister(event) {
  event.preventDefault();
  const displayName = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });

    // Create user profile in database
    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      email,
      displayName,
      role: "user",
      createdAt: serverTimestamp(),
    });

    closeModal("registerModal");
    showMessage("Inscription réussie!", "success");
  } catch (error) {
    showMessage("Erreur d'inscription : " + error.message, "error");
  }
}

async function logout() {
  try {
    await signOut(auth);
    showMessage("Déconnexion réussie!", "success");
  } catch (error) {
    showMessage("Erreur de déconnexion : " + error.message, "error");
  }
}

// Message display function
function showMessage(message, type = "info") {
  const container = document.getElementById("messageContainer");
  if (!container) return;

  const messageDiv = document.createElement("div");
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    font-weight: 500;
    animation: slideIn 0.3s ease;
  `;

  // Style based on type
  switch (type) {
    case "success":
      messageDiv.style.backgroundColor = "rgba(34, 197, 94, 0.1)";
      messageDiv.style.color = "#22c55e";
      messageDiv.style.border = "1px solid rgba(34, 197, 94, 0.3)";
      break;
    case "error":
      messageDiv.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
      messageDiv.style.color = "#ef4444";
      messageDiv.style.border = "1px solid rgba(239, 68, 68, 0.3)";
      break;
    default:
      messageDiv.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
      messageDiv.style.color = "#3b82f6";
      messageDiv.style.border = "1px solid rgba(59, 130, 246, 0.3)";
  }

  container.appendChild(messageDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Article functions
async function handleArticleSubmit(event) {
  event.preventDefault();
  if (!auth.currentUser) {
    showMessage("Vous devez être connecté pour publier un article.", "error");
    return;
  }

  const title = document.getElementById("articleTitle").value.trim();
  const content = document.getElementById("articleContent").value.trim();
  const published = document.getElementById("articlePublished").checked;

  if (!title || !content) {
    showMessage("Titre et contenu sont requis.", "error");
    return;
  }

  const user = auth.currentUser;
  const authorName = user?.displayName || user?.email || "Admin";

  try {
    await addDoc(collection(db, "articles"), {
      title,
      content,
      published,
      authorId: user?.uid || null,
      authorName,
      createdAt: serverTimestamp(),
    });
    
    closeModal("articleModal");
    showMessage("Article créé avec succès!", "success");
    
    // Reset pagination to see new article at top
    lastVisible = null;
    await loadArticlesWithPagination(false);
  } catch (error) {
    console.error("Erreur création article:", error);
    showMessage(`Échec de la création de l'article: ${error.message}`, "error");
  }
}

// Load articles with pagination
async function loadArticlesWithPagination(isNext = true) {
  const container = document.getElementById("articlesContainer");
  if (!container) return;
  
  container.innerHTML = '<div class="loading"><div class="spinner"></div>Chargement des articles...</div>';

  try {
    let baseConstraints = [
      where("published", "in", [true, "true"]),
      orderBy("createdAt", "desc"),
      limit(articlesPerPage),
    ];

    if (isNext && lastVisible) {
      baseConstraints = [
        where("published", "in", [true, "true"]),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(articlesPerPage),
      ];
    }

    const qBase = query(collection(db, "articles"), ...baseConstraints);
    const snapshot = await getDocs(qBase);

    container.innerHTML = "";

    if (!snapshot.empty) {
      lastVisible = snapshot.docs[snapshot.docs.length - 1];

      snapshot.forEach((docSnap) => {
        const article = docSnap.data();
        const articleId = docSnap.id;

        const createdAtText = article.createdAt?.toDate
          ? article.createdAt.toDate().toLocaleString()
          : "";

        container.innerHTML += `
          <div class="article" data-article-id="${articleId}">
            <h2>${article.title || "(Sans titre)"}</h2>
            <div class="meta">${createdAtText} - Par ${article.authorName || "Anonyme"}</div>
            <p>${article.content || ""}</p>

            <div class="comments" id="comments-${articleId}">
              <div class="comments-list" id="comments-list-${articleId}"></div>
              <div class="comment-form">
                <input type="text" id="comment-input-${articleId}" placeholder="Votre commentaire..." />
                <button class="comment-submit" data-article-id="${articleId}">Commenter</button>
              </div>
            </div>
          </div>`;

        // Load comments for this article
        loadComments(articleId).catch(() => {});
      });

      // Event delegation for comment forms (only once)
      if (!commentsClickListenerAttached) {
        container.addEventListener("click", async (e) => {
          const target = e.target;
          if (target && target.classList.contains("comment-submit")) {
            const articleId = target.getAttribute("data-article-id");
            const input = document.getElementById(`comment-input-${articleId}`);
            const text = (input?.value || "").trim();
            if (!text) return;
            await addComment(articleId, text);
            input.value = "";
            await loadComments(articleId);
          }
        });
        commentsClickListenerAttached = true;
      }

      // Reapply theme after rendering
      if (typeof window.initGothicTheme === "function") {
        try {
          window.initGothicTheme();
        } catch (e) {
          console.warn("Theme reinitialization failed:", e);
        }
      }
    } else {
      container.innerHTML = "<p>Aucun article à afficher.</p>";
    }
  } catch (error) {
    console.error("Erreur chargement articles:", error);
    
    // Fallback without composite index
    try {
      const qFallback = query(
        collection(db, "articles"),
        orderBy("createdAt", "desc"),
        limit(articlesPerPage)
      );
      const snap = await getDocs(qFallback);
      
      container.innerHTML = "";
      
      if (snap.empty) {
        container.innerHTML = "<p>Aucun article à afficher.</p>";
        return;
      }
      
      snap.forEach((docSnap) => {
        const a = docSnap.data();
        const isPublished = a.published === true || a.published === "true";
        if (!isPublished) return;
        
        const createdAtText = a.createdAt?.toDate
          ? a.createdAt.toDate().toLocaleString()
          : "";
          
        container.innerHTML += `
          <div class="article" data-article-id="${docSnap.id}">
            <h2>${a.title || "(Sans titre)"}</h2>
            <div class="meta">${createdAtText} - Par ${a.authorName || "Anonyme"}</div>
            <p>${a.content || ""}</p>
            <div class="comments" id="comments-${docSnap.id}">
              <div class="comments-list" id="comments-list-${docSnap.id}"></div>
              <div class="comment-form">
                <input type="text" id="comment-input-${docSnap.id}" placeholder="Votre commentaire..." />
                <button class="comment-submit" data-article-id="${docSnap.id}">Commenter</button>
              </div>
            </div>
          </div>`;
        loadComments(docSnap.id).catch(() => {});
      });
      
      if (!commentsClickListenerAttached) {
        container.addEventListener("click", async (e) => {
          const target = e.target;
          if (target && target.classList.contains("comment-submit")) {
            const articleId = target.getAttribute("data-article-id");
            const input = document.getElementById(`comment-input-${articleId}`);
            const text = (input?.value || "").trim();
            if (!text) return;
            await addComment(articleId, text);
            input.value = "";
            await loadComments(articleId);
          }
        });
        commentsClickListenerAttached = true;
      }
      
      // Reapply theme in fallback too
      if (typeof window.initGothicTheme === "function") {
        try {
          window.initGothicTheme();
        } catch (e) {
          console.warn("Theme reinitialization failed:", e);
        }
      }
      
      // Inform user about potential index need
      container.innerHTML += `<div class="info">Astuce: si tous les articles n'apparaissent pas, créez l'index Firestore suggéré dans la console.</div>`;
    } catch (fallbackError) {
      console.error("Erreur fallback articles:", fallbackError);
      container.innerHTML = `<p>Erreur lors du chargement des articles. ${fallbackError.message}</p>`;
    }
  }
}

// Comment functions
async function loadComments(articleId) {
  const commentsContainer = document.getElementById(`comments-list-${articleId}`);
  if (!commentsContainer) return;
  
  commentsContainer.innerHTML = "";

  try {
    const qComments = query(
      collection(db, "articles", articleId, "comments"),
      orderBy("createdAt", "asc")
    );
    const snap = await getDocs(qComments);
    
    if (snap.empty) {
      commentsContainer.innerHTML = '<div class="comment-empty">Aucun commentaire</div>';
      return;
    }
    
    snap.forEach((d) => {
      const c = d.data();
      const when = c.createdAt?.toDate
        ? c.createdAt.toDate().toLocaleString()
        : "";
      commentsContainer.innerHTML += `
        <div class="comment">
          <div class="comment-meta">${c.authorName || "Anonyme"} - ${when}</div>
          <div class="comment-text">${c.text || ""}</div>
        </div>`;
    });
  } catch (error) {
    console.error("Erreur chargement commentaires:", error);
    commentsContainer.innerHTML = '<div class="comment-empty">Erreur lors du chargement des commentaires</div>';
  }
}

async function addComment(articleId, text) {
  if (!auth.currentUser) {
    showMessage("Vous devez être connecté pour commenter.", "error");
    return;
  }
  
  const user = auth.currentUser;
  const authorName = user.displayName || user.email || "Utilisateur";
  
  try {
    await addDoc(collection(db, "articles", articleId, "comments"), {
      text,
      userId: user.uid,
      authorName,
      createdAt: serverTimestamp(),
    });
    showMessage("Commentaire ajouté!", "success");
  } catch (error) {
    console.error("Erreur ajout commentaire:", error);
    showMessage("Erreur lors de l'ajout du commentaire.", "error");
  }
}

// Load articles function
async function loadArticles() {
  // Always start from the first page after (re)loading or login
  lastVisible = null;
  await loadArticlesWithPagination(false);
}

// Authentication state observer
onAuthStateChanged(auth, async (user) => {
  currentUser = user;

  if (user) {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        isAdmin = userData.role === "admin";
        document.getElementById("userInfo").textContent = `Bonjour, ${
          userData.displayName || user.email
        }`;
      } else {
        // Create profile if it doesn't exist
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName || user.email.split("@")[0],
          role: "user",
          createdAt: serverTimestamp(),
        });
        isAdmin = false;
        document.getElementById("userInfo").textContent = `Bonjour, ${
          user.displayName || user.email.split("@")[0]
        }`;
      }

      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("registerBtn").style.display = "none";
      document.getElementById("logoutBtn").style.display = "block";

      // Make "New Article" button available to any logged-in user
      document.getElementById("adminPanel").style.display = "block";
    } catch (error) {
      console.error("Erreur récupération profil :", error);
    }
  } else {
    document.getElementById("userInfo").textContent = "";
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("registerBtn").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("adminPanel").style.display = "none";
    isAdmin = false;
  }

  loadArticles();
});

// DOM Content Loaded event
document.addEventListener("DOMContentLoaded", () => {
  // Auth button event listeners
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const newArticleBtn = document.getElementById("newArticleBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("loginModal"));
  }
  
  if (registerBtn) {
    registerBtn.addEventListener("click", () => openModal("registerModal"));
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  if (newArticleBtn) {
    newArticleBtn.addEventListener("click", () => {
      currentEditingArticle = null;
      document.getElementById("articleModalTitle").textContent = "Nouvel Article";
      document.getElementById("articleForm").reset();
      openModal("articleModal");
    });
  }

  // Form event listeners
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const articleForm = document.getElementById("articleForm");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
  
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }
  
  if (articleForm) {
    articleForm.addEventListener("submit", handleArticleSubmit);
  }

  // Close modals when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
      e.target.classList.remove("active");
    }
  });
});