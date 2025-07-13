// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyALTT8VdMgajyDB_XBbwj9l_iEDlc7wSvo",
  authDomain: "profaceapp-06.firebaseapp.com",
  projectId: "profaceapp-06",
  storageBucket: "profaceapp-06.firebasestorage.app",
  messagingSenderId: "300080277426",
  appId: "1:300080277426:web:59ae1d2a4ee2cc14d126ab",
  measurementId: "G-16Y3NSG2H3"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Initialisation Analytics (Web uniquement)
let analytics;
isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

export { app, analytics, logEvent };
