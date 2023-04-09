// Import the functions you need from the SDKs you need
import lodash from 'lodash';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider,signOut } from 'firebase/auth';

const { memoize } = lodash;


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNNBiUk8vJCF5a9CnnW1Xc4ftXIQw_rqk",
    authDomain: "cric-eafdb.firebaseapp.com",
    projectId: "cric-eafdb",
    storageBucket: "cric-eafdb.appspot.com",
    messagingSenderId: "118555486401",
    appId: "1:118555486401:web:e2d5903212a7b683f08c40",
    measurementId: "G-MC75Y4RBJ0"
};




// Initialize Firebase
export const initFirebase = memoize(() => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();


    function signIn() {

        return function () {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    // const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
        }
    }

    function signOutFromApp() {
        return function () {
            signOut(auth).then(() => {
                // Sign-out successful.
              }).catch(() => {
                // An error happened.
              });

        };
    }








    return { app, analytics, auth, onAuthStateChanged, signIn,signOutFromApp }
})

