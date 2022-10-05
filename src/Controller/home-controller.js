import { signoutPage } from '../lib/Auth.js';
import { deletePost, editPost, savePost } from '../lib/Posts.js';

export const singOut = () => {
  signoutPage().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};

export const createUserPost = (inputPostValue) => {
  if (inputPostValue === '') {
    const msgError = document.querySelector('.msgerror-feed');
    msgError.style = 'visibility: visible';
  } else {
    savePost(inputPostValue);
    const newValue = document.querySelector('#inputpost-feed');
    newValue.value = '';
  }
};

export const deleteUserPost = (userId, postId, docId) => {
  if (userId === postId) {
    deletePost(docId);
  }
};

export const updatePost = (value, docId) => {
  if (value !== '') {
    editPost(docId, value);
  }
};
