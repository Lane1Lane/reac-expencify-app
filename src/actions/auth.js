import { firebase, googleAuthProvider } from '../firebase/firebase';

firebase.auth().languageCode = 'ru';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
};

export const logout = () => ({
    type: 'LOGIN'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    }
}

export const createUser = (email, password) => {
    return () => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
};

export const signInWithEmail = (email, password) => {
    return () => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
};


export const resetPassword = (email) => {
    return () => {
        return firebase.auth().sendPasswordResetEmail(email);
    }
};