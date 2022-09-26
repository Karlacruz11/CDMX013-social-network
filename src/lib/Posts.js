import {
  getFirestore, collection, addDoc/* , getDocs */,
  onSnapshot, query, orderBy, serverTimestamp, updateDoc, doc,
  arrayUnion, arrayRemove
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { app } from './config.js';

const db = getFirestore(app);
const q = query(collection(db, 'posts'), orderBy('time', 'desc'));

export const savePost = (post) => {
  const auth = getAuth();
  const user = auth.currentUser;
  return addDoc(collection(db, 'posts'), {
    post, uid: user.uid, email: user.email, time: serverTimestamp(), likes: [],
  });
};

export const onGetPosts = (callback) => onSnapshot(q, callback);

export const addLikes = async (idPost) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const likesRef = doc(db, 'posts', idPost);

  await updateDoc(likesRef, {
    likes: arrayUnion(user.uid),
  });
};

export const removeLikes = async (idPost) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const likesRef = doc(db, 'posts', idPost);

  await updateDoc(likesRef, {
    likes: arrayRemove(user.uid),
  });
};

/*export const verifyLikes = (idPost) => {
  const auth = getAuth();
  const user = auth.currentUser;

  console.log((db, 'posts', idPost).likes);

  //if(doc(db, 'posts', idPost).likes)
}*/