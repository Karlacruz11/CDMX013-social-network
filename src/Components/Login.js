/* eslint-disable no-unused-expressions */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */

import {
  singIn, signInWithGithub,
}
  from '../lib/Auth.js';
import { onNavigate } from '../main.js';
import { redirectGoogle, signInWithEmail, redirectGithub } from '../Controller/loginSignup-controller.js';

export function login() {
  // Container for main and footer
  const fatherOfAll = document.createElement('div');
  // Creates main
  const mainContainer = document.createElement('main');
  // Div Login IMG, TXT
  const loginDiv = document.createElement('div');
  loginDiv.setAttribute('class', 'loginDiv');
  // Img Confetti
  const loginImg = document.createElement('img');
  loginImg.setAttribute('class', 'confetti-img');
  loginImg.src = './img/confetti.jpg';
  // Login Text
  const titleLogin = document.createElement('h2');
  titleLogin.setAttribute('class', 'login-title');
  titleLogin.innerHTML = 'Login';
  // Welcome Text
  const welcomeText = document.createElement('p');
  welcomeText.setAttribute('class', 'welcome-text');
  welcomeText.innerHTML = 'Welcome! Please enter your details';

  loginDiv.append(loginImg, titleLogin, welcomeText);

  const formContainer = document.createElement('div');
  formContainer.setAttribute('class', 'login-container');
  // Login Form
  const loginForm = document.createElement('form');
  loginForm.setAttribute('class', 'form-login');
  // Mail
  const labelMail = document.createElement('label');
  labelMail.setAttribute('for', 'mail');
  labelMail.textContent = 'Mail';
  const inputMail = document.createElement('input');
  inputMail.setAttribute('type', 'email');
  inputMail.setAttribute('id', 'mail');
  inputMail.setAttribute('required', 'required');
  // Password
  const labelPassword = document.createElement('label');
  labelPassword.setAttribute('class', 'passLogin');
  labelPassword.setAttribute('for', 'password');
  labelPassword.textContent = 'Password';
  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('id', 'password');
  inputPassword.setAttribute('required', 'required');
  // aler msg
  const alertMsg = document.createElement('div');
  alertMsg.setAttribute('id', 'alert-msg');
  // Login btn
  const btnLogin = document.createElement('button');
  btnLogin.textContent = 'Login';
  btnLogin.setAttribute('class', 'login');
  btnLogin.setAttribute('type', 'submit');
  btnLogin.setAttribute('value', 'submit');

  // Footer
  const loginFooter = document.createElement('footer');
  const footerText = document.createElement('p');
  footerText.setAttribute('class', 'footer-text');
  footerText.textContent = 'Or login with...';
  loginFooter.setAttribute('class', 'login-footer');
  // logos container
  const logosContainer = document.createElement('div');
  logosContainer.setAttribute('class', 'logos-container');
  // logo google IMG
  const logoGoogle = document.createElement('img');
  logoGoogle.setAttribute('class', 'login-google');
  logoGoogle.src = '../img/google-logo.png';

  // github logo IMG
  const logoGithub = document.createElement('img');
  logoGithub.setAttribute('class', 'login-Github');
  logoGithub.src = '../img/gitHub-logo.png';
 
  const createAccount = document.createElement('div');
  createAccount.setAttribute('class', 'register-login');
  const footerQuestion = document.createElement('div');
  footerQuestion.setAttribute('class', 'footer-text');
  footerQuestion.textContent = 'Don´t have an account?';
  
  const registerText = document.createElement('div');
  registerText.setAttribute('class', 'register-text');
  registerText.textContent = 'Sign up';
  registerText.addEventListener('click', () => {
    onNavigate('/register');
  });
  createAccount.append(footerQuestion, registerText);
  logosContainer.append(logoGoogle, logoGithub);
  // Insert footer text
  loginFooter.append(footerText, logosContainer, createAccount);
  // Insert form elements
  // eslint-disable-next-line max-len
  loginForm.append(labelMail, inputMail, labelPassword, inputPassword, alertMsg, btnLogin);
  formContainer.append(loginForm);
  // Insert everything to main
  mainContainer.append(loginDiv, formContainer);
  // Inser to div father of all
  fatherOfAll.append(mainContainer, loginFooter);
  
  // Login email and password
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputmailValue = document.querySelector('#mail').value;
    const inputpasswordValue = document.querySelector('#password').value;
    signInWithEmail(inputmailValue, inputpasswordValue);
  });

  // LOGIN WITH GOOGLE
  logoGoogle.addEventListener('click', () => {
    singIn();
    redirectGoogle();
  });
  // LOGIN WITH GITHUB
  logoGithub.addEventListener('click', () => {
    signInWithGithub();
    redirectGithub();
  });

  inputMail.addEventListener('click', (e) => {
    e.preventDefault();
    alertMsg.style = 'display: none';
  });

  inputPassword.addEventListener('click', (e) => {
    e.preventDefault();
    alertMsg.style = 'display: none';
  });

  return fatherOfAll;
}
