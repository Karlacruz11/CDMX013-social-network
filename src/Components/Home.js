import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { signoutPage } from '../lib/Auth.js';
import { savePost, onGetPosts } from '../lib/Store.js';

/* eslint-disable space-before-blocks */
export function home(){
  // Father container
  const fatherOfAll = document.createElement('div');
  fatherOfAll.setAttribute('class', 'fatherOfAll-feed');
  const background = document.createElement('img');
  background.setAttribute('class', 'background-feed');
  background.src = '../img/Imgfeed.png';
  // Header
  const headerFeed = document.createElement('header');
  headerFeed.setAttribute('class', 'header-feed');
  // IMG LOGO GYM
  const logoGym = document.createElement('img');
  logoGym.setAttribute('class', 'logogym-feed');
  logoGym.src = '../img/logo.png';
  // Create logout icon
  const logOut = document.createElement('img');
  logOut.src = '../img/power-off.png';
  logOut.setAttribute('class', 'log-out');
  headerFeed.append(logoGym, logOut);
  // Creates main
  const mainContainer = document.createElement('main');
  mainContainer.setAttribute('class', 'main-feed');
  /* // IMG background */

  // container Hello
  const containerHello = document.createElement('div');
  containerHello.setAttribute('class', 'containerhello-div');
  // Create Div feed tittle and icon
  const helloDiv = document.createElement('div');
  helloDiv.setAttribute('class', 'hello-div');
  // Create text for home view
  const welcomeTxt = document.createElement('div');
  welcomeTxt.textContent = 'Hello';
  welcomeTxt.setAttribute('class', 'feed-title');
  // IMG icon
  const iconGym = document.createElement('img');
  iconGym.setAttribute('class', 'icon-feed');
  iconGym.src = '../img/icon.png';
  // Text
  const questionText = document.createElement('div');
  questionText.setAttribute('class', 'question-feed');
  questionText.textContent = 'What´s going on?';
  helloDiv.append(welcomeTxt, iconGym);
  containerHello.append(helloDiv, questionText);
  // feed Container
  const feedContainer = document.createElement('div');
  feedContainer.setAttribute('id', 'feed');

  // Div new Post
  const postDiv = document.createElement('div');
  postDiv.setAttribute('class', 'post-input');
  // Div input
  const inputDiv = document.createElement('div');
  inputDiv.setAttribute('class', 'input-feed');
  // Img input
  const inputImg = document.createElement('img');
  inputImg.src = '../img/user-img.png';
  inputImg.setAttribute('class', 'userimg-feed');
  // input
  const createPost = document.createElement('textarea');
  createPost.setAttribute('cols', '40');
  createPost.setAttribute('rows', '2');
  createPost.setAttribute('placeholder', 'Ask to your partner...');
  createPost.setAttribute('class', 'newpost-feed');
  createPost.setAttribute('id', 'inputpost-feed');
  
  // icon
  const writeIcon = document.createElement('img');
  writeIcon.src = '../img/write-icon.png';
  writeIcon.setAttribute('class', 'writeicon-feed');
  inputDiv.append(inputImg, createPost, writeIcon);
  // Container button
  const containerButton = document.createElement('div');
  containerButton.setAttribute('class', 'containerbutton-feed');
   // Msg Error " "
   const msgError = document.createElement('div');
   msgError.setAttribute('class', 'msgerror-feed');
   msgError.textContent = 'please, write something';
  // Container divs post
  const containerDivs = document.createElement('div');
  containerDivs.setAttribute('class', 'container-posts');
  // share button
  const shareButton = document.createElement('button');
  shareButton.setAttribute('class', 'sharebutton-feed');
  shareButton.textContent = 'share';

  let allPost = [];
  let userName;
  let userEmail;
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userName = auth.currentUser.displayName;
      auth.currentUser.providerData.forEach((profile) => {
        userName = profile.displayName;
        userEmail = profile.email;
      });
      console.log(userName, userEmail);
    } else {
      console.log('not working');
    }
  });

  onGetPosts((querySnapshot) => {
    allPost = [];
    // containerDivs.remove();
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      allPost.push(post);
    });

    let child = containerDivs.lastElementChild;
    while (child) {
      containerDivs.removeChild(child);
      child = containerDivs.lastElementChild;
    }

    allPost.forEach((posts) => {
      // post feed container 
      const postContainer = document.createElement('div');
      postContainer.setAttribute('class', 'post-feed');
      // header post
      const headerPost = document.createElement('div');
      headerPost.setAttribute('class','header-post')
      // Create container img post
      const imgPostContainer = document.createElement('div');
      imgPostContainer.setAttribute('class', 'img-post');
      const createImgPost = document.createElement('img');
      createImgPost.setAttribute('class', 'userimg-feed');
      createImgPost.src = '../img/user-img.png';
      imgPostContainer.appendChild(createImgPost);
      // Create username div
      const userNamePostContainer = document.createElement('div');
      userNamePostContainer.setAttribute('class', 'user-post');
      userNamePostContainer.textContent = posts.name;
      headerPost.append(imgPostContainer, userNamePostContainer);
      // text container
      const textPostContainer = document.createElement('div');
      textPostContainer.setAttribute('class', 'text-feed');
      textPostContainer.textContent = posts.post;
      // Footer
      const footerPost = document.createElement('div');
      footerPost.setAttribute('class','footer-post');
      postContainer.append(headerPost, textPostContainer, footerPost);

      containerDivs.append(postContainer);
    });
  });

  console.log(allPost);
  feedContainer.append(postDiv, containerDivs);
  containerButton.append(msgError, shareButton);
  postDiv.append(inputDiv, containerButton);
  mainContainer.append(containerHello, feedContainer);
  fatherOfAll.append(background, headerFeed, mainContainer);

  logOut.addEventListener('click', () => {
    signoutPage().then(() => {
      // Sign-out successful.
      console.log('si cerro');
    }).catch((error) => {
      // An error happened.
    });
  });

  shareButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('enviado');
    const inputPostValue = document.querySelector('#inputpost-feed').value;
    if(inputPostValue == ""){
      msgError.style = 'visibility: visible';
      console.log('error');
    }else{
      console.log(inputPostValue);
      savePost(inputPostValue, userName, userEmail);
      const newValue = document.querySelector('#inputpost-feed');
      newValue.value = '';
      // Aqui tenemos que lograr que el post que se guarde se relacione con el userName
      console.log('userName', userName);
    }

    });

  return fatherOfAll;
}
