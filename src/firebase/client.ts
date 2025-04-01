// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAMYQj0bEO3o58EFNzu-JPVI4Ex5881xt4",
	authDomain: "preppy-db9e8.firebaseapp.com",
	projectId: "preppy-db9e8",
	storageBucket: "preppy-db9e8.firebasestorage.app",
	messagingSenderId: "902383529305",
	appId: "1:902383529305:web:7c363899129b7df3327048",
	measurementId: "G-P0FDT773BM",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);
