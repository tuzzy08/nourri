// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: `${process.env.FIREBASE_API_KEY}`,
	authDomain: `${process.env.AUTH_DOMAIN}`,
	projectId: `${process.env.PROJECT_ID}`,
	storageBucket: `${process.env.STORAGE_BUCKET}`,
	messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`,
	appId: `${process.env.APP_ID}`,
	measurementId: `${process.env.MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
