import { GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';

export { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';
export {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithRedirect, getRedirectResult, GithubAuthProvider, signOut,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';

export const providerGoogle = new GoogleAuthProvider();
