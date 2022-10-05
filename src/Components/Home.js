import { getAuth } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import {
  onGetPosts, addLikes, removeLikes,
}
  from '../lib/Posts.js';
import {
  singOut, deleteUserPost, updatePost, createUserPost,
} from '../Controller/home-controller.js';

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

  //                          NEW POST
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
  // Msg Error
  const msgError = document.createElement('div');
  msgError.setAttribute('class', 'msgerror-feed');
  msgError.textContent = 'Please, write something';
  // Container divs post
  const containerDivs = document.createElement('div');
  containerDivs.setAttribute('class', 'container-posts');
  // share button
  const shareButton = document.createElement('button');
  shareButton.setAttribute('class', 'sharebutton-feed');
  shareButton.textContent = 'Share';

  //                             ALL POSTS
  let allPost = [];
  onGetPosts((querySnapshot) => {
    // Remove all child
    let child = containerDivs.lastElementChild;
    while (child) {
      containerDivs.removeChild(child);
      child = containerDivs.lastElementChild;
    }

    allPost = [];
    querySnapshot.forEach((doc) => {
      const auth = getAuth();
      const user = auth.currentUser;
      const posts = doc.data();
      allPost.push(posts);
      // post feed container
      const postContainer = document.createElement('div');
      postContainer.setAttribute('class', 'post-feed');
      // header post
      const headerPost = document.createElement('div');
      headerPost.setAttribute('class', 'header-post');
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
      userNamePostContainer.textContent = posts.email;
      // Create edit icon
      const optionsDiv = document.createElement('div');
      optionsDiv.setAttribute('class', 'options-div');
      const editIcon = document.createElement('img');
      editIcon.src = '../img/edit-icon.png';
      editIcon.setAttribute('class', 'edit-icon');
      // Div icons edit
      const divIconsedit = document.createElement('div');
      divIconsedit.setAttribute('class', 'edit-options');
      // Edit save icon
      const saveEdit = document.createElement('img');
      saveEdit.src = '../img/save-post.png';
      saveEdit.setAttribute('class', 'save-Edit');
      // Cancel icon
      const cancelEdit = document.createElement('img');
      cancelEdit.src = '../img/cancel-post.png';
      cancelEdit.setAttribute('class', 'cancel-edit');
      divIconsedit.append(saveEdit, cancelEdit);
      // Delete post
      const deleteIcon = document.createElement('img');
      deleteIcon.setAttribute('class', `delete trash${doc.id}`);
      deleteIcon.src = '../img/delete.png';
      optionsDiv.append(editIcon, deleteIcon);
      headerPost.append(imgPostContainer, userNamePostContainer, optionsDiv);
      // Show incons just in current user post
      if (user.uid !== posts.uid){
        deleteIcon.style.visibility = 'hidden';
        editIcon.style.visibility = 'hidden';
      }
      // text container
      const textPostContainer = document.createElement('div');
      textPostContainer.setAttribute('class', `text-feed text-feed${doc.id}`);
      textPostContainer.setAttribute('contenteditable', 'false');
      textPostContainer.textContent = posts.post;
      // Container text-options
      const textoptionsContainer = document.createElement('div');
      textoptionsContainer.setAttribute('class', 'text-options');
      textoptionsContainer.append(textPostContainer, divIconsedit);
      // Footer
      const footerPost = document.createElement('div');
      footerPost.setAttribute('class', 'footer-post');
      postContainer.append(headerPost, textoptionsContainer, footerPost);
      // container likes
      const containerLikes = document.createElement('div');
      containerLikes.setAttribute('class', 'container-likes');
      // container heart
      const containerHeart = document.createElement('div');
      containerHeart.setAttribute('class', 'container-heart');
      // icon heart
      const iconHeart = document.createElement('div');
      iconHeart.setAttribute('class', ` icon-heart heart-${doc.id}`);
      const beforeHeart = document.createElement('div');
      beforeHeart.setAttribute('class', `icon-heart-before heart-${doc.id}`);

      // likes container
      const likesCounter = document.createElement('div');
      likesCounter.setAttribute('class', 'likes');
      // number of likes
      const numberLikes = document.createElement('div');
      numberLikes.setAttribute('class', 'number-likes');
      let countLikes = 0;
      if (posts.likes.length !== undefined){
        countLikes = posts.likes.length;
      }

      numberLikes.textContent = countLikes;
      // likes text
      const textLikes = document.createElement('div');
      textLikes.setAttribute('class', 'text-likes');
      textLikes.textContent = ' likes';

      likesCounter.append(numberLikes, textLikes);
      containerHeart.append(iconHeart, beforeHeart);
      containerLikes.append(containerHeart, likesCounter);
      footerPost.append(containerLikes);
      containerDivs.append(postContainer);
      // Modal
      const modalContainer = document.createElement('div');
      modalContainer.setAttribute('class', `modal modal-${doc.id}`);

      const modalContent = document.createElement('div');
      modalContent.setAttribute('class', 'modal-content');

      const modalClose = document.createElement('span');
      modalClose.setAttribute('class', `close close-${doc.id}`);
      modalClose.textContent = 'X';

      const modalText = document.createElement('p');
      modalText.setAttribute('class', 'modal-text');
      modalText.textContent = 'Are you sure?, You won´t be able to revert this!';

      const buttonConfirm = document.createElement('button');
      buttonConfirm.setAttribute('class', 'button-confirm');
      buttonConfirm.textContent = 'Confirm';

      modalContent.append(modalClose, modalText, buttonConfirm);
      modalContainer.appendChild(modalContent);
      postContainer.appendChild(modalContainer);
      // Fill heart if user liked post

      if (posts.likes.includes(user.uid) && document.querySelector(`.icon-heart.heart-${doc.id}`) != null){
        document.querySelector(`.icon-heart.heart-${doc.id}`).style = 'background:rgba(239, 137, 156, 1)';
        document.querySelector(`.icon-heart-before.heart-${doc.id}`).style = 'background:rgba(239, 137, 156, 1)';
      }
      //  Likes and dislikes
      containerHeart.addEventListener('click', (e) => {
        e.preventDefault();
        if (posts.likes.includes(user.uid)){
          removeLikes(doc.id);
        } else {
          addLikes(doc.id);
        }
      });
      // EDIT POST
      // Hide edit and delete icon
      let oldPost;
      editIcon.addEventListener('click', (e) => {
        oldPost = textPostContainer.textContent;
        textPostContainer.setAttribute('contenteditable', 'true');
        textPostContainer.focus();
        saveEdit.style.visibility = 'visible';
        cancelEdit.style.visibility = 'visible';
        deleteIcon.style.visibility = 'hidden';
        editIcon.style.visibility = 'hidden';
      });

      // Save edited post
      saveEdit.addEventListener('click', (e) => {
        const newValue = document.querySelector(`.text-feed.text-feed${doc.id}`);
        updatePost(newValue.textContent, doc.id);
      });

      // Cancel edit
      cancelEdit.addEventListener('click', (e) => {
        textPostContainer.textContent = oldPost;
        textPostContainer.setAttribute('contenteditable', 'false');
        textPostContainer.blur();
        saveEdit.style.visibility = 'hidden';
        cancelEdit.style.visibility = 'hidden';
        deleteIcon.style.visibility = 'visible';
        editIcon.style.visibility = 'visible';
      });
      // DELETE POST
      // Modal Events (Cancel delete)
      const span = document.querySelector(`.close.close-${doc.id}`);

      if (span != null){
        span.addEventListener('click', (e) => {
          e.preventDefault();
          modalContainer.style.display = 'none';
        });
      }
      //
      deleteIcon.addEventListener('click', (e) => {
        e.preventDefault();
        if (user.uid === posts.uid){
          document.querySelector(`.modal-${doc.id}`).style.display = 'block';
        } else {
          document.querySelector(`.modal-${doc.id}`).style.display = 'none';
        }
      });

      // Modal confirm botton
      buttonConfirm.addEventListener('click', (e) => {
        e.preventDefault();
        deleteUserPost(user.uid, posts.uid, doc.id);
      });
    });
  });

  feedContainer.append(postDiv, containerDivs);
  containerButton.append(msgError, shareButton);
  postDiv.append(inputDiv, containerButton);
  mainContainer.append(containerHello, feedContainer);
  fatherOfAll.append(background, headerFeed, mainContainer);

  // Sing out
  logOut.addEventListener('click', () => {
    singOut();
  });

  // Share post
  shareButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputPostValue = document.querySelector('#inputpost-feed').value;
    createUserPost(inputPostValue);
  });

  return fatherOfAll;
}
