import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyAhSms29uTboFte08NZeyElvIhC93lHeKQ",
    authDomain: "studybuddy-efb6a.firebaseapp.com",
    projectId: "studybuddy-efb6a",
    storageBucket: "studybuddy-efb6a.appspot.com",
    messagingSenderId: "978895466861",
    appId: "1:978895466861:web:c49801397d7e123da66a64"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;