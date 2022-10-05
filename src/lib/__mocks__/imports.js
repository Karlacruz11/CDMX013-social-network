const user = {
  currentUser: {
    uid: 'ldfnj1324234kjasfs',
    email: 'user@user.com',
  },
};
export const createUserWithEmailAndPassword = () => Promise.resolve(user);
export const getAuth = () => user;
export const initializeApp = () => Promise.resolve({});
export const singIn = () => jest.fn();
export const providerGoogle = {};
