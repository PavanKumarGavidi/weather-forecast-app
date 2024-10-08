import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqpwd89V5atg3pZfng8vtVMMu3BZ4noQc",
    authDomain: "ev-charging-app-57334.firebaseapp.com",
    databaseURL: "https://ev-charging-app-57334-default-rtdb.firebaseio.com",
    projectId: "ev-charging-app-57334",
    storageBucket: "ev-charging-app-57334.appspot.com",
    messagingSenderId: "1011505310657",
    appId: "1:1011505310657:web:85c74bdfa0685d30bcdd40"
  };  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
