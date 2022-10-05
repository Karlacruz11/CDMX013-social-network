/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect,
  getRedirectResult, GithubAuthProvider, signOut, providerGoogle,
} from './imports.js';
import { app } from './Config.js';

const auth = getAuth(app);
export const user = auth.currentUser;
// CREATE USER WITH EMAIL AND PASSWORD
export const newUser = (inputmailValue, inputpasswordValue) => createUserWithEmailAndPassword(auth, inputmailValue, inputpasswordValue);
// LOGIN WITH EMAIL AND PASSWORD
export const loginUser = (inputmailValue, inputpasswordValue) => signInWithEmailAndPassword(auth, inputmailValue, inputpasswordValue);
// LOGIN WITH GOOGLE

export const singIn = () => {
  const provider = providerGoogle;
  signInWithRedirect(auth, provider);
};
export const resultRedirect = () => getRedirectResult(auth);
export const credential = (result) => provider.credentialFromResult(result);
// LOGIN WITH GITHUB

export const signInWithGithub = () => {
  const providerGithub = new GithubAuthProvider();
  signInWithRedirect(auth, providerGithub);
};
// SIGNOUT
export const signoutPage = () => signOut(auth);
/* // UPDATE INFO
export const updateInfo = (name) => updateProfile(auth.currentUser, {
  displayName: name,
}).then(() => {
  // Profile updated!
  // ...
  console.log('name updated');
}).catch((error) => {
  // An error occurred
  // ...
  console.log('no name');
});
*/
