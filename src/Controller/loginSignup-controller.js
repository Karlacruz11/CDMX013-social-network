import {
  newUser, resultRedirect, credential, loginUser,
} from '../lib/Auth.js';
import { onNavigate } from '../main.js';

export const createUser = (inputmailValue, inputpasswordValue) => {
  newUser(inputmailValue, inputpasswordValue)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      onNavigate('/home');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// LOGIN WITH EMAIL AND PASSWORD
export const signInWithEmail = (inputmailValue, inputpasswordValue) => {
  loginUser(inputmailValue, inputpasswordValue)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const alertMsg = document.querySelector('#alert-msg');
      if (errorCode === 'auth/wrong-password') {
        alertMsg.textContent = 'Email or password incorrect';
        alertMsg.style = 'display: block';
      } else {
        alertMsg.textContent = 'User not found';
        alertMsg.style = 'display: block';
      }
    });
};
// LOGIN WITH GOOGLE
export const redirectGoogle = () => {
  resultRedirect().then((result) => {
    const credentialGoogle = credential(result);
    const token = credentialGoogle.accessToken;
    // The signed-in user info.
    const user = result.user;
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// LOGIN WITH GITHUB
export const redirectGithub = () => {
  resultRedirect().then((result) => {
    const credentialGithub = credential(result);
    const token = credentialGithub.accessToken;
    // The signed-in user info.
    const user = result.user;
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
