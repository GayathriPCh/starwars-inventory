import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDVC6R1lY0RwrG-hRgIHyec1vfKDXlzAkY",
    authDomain: "inventory-management-app-c7b6f.firebaseapp.com",
    projectId: "inventory-management-app-c7b6f",
    storageBucket: "inventory-management-app-c7b6f.appspot.com",
    messagingSenderId: "176426361792",
    appId: "1:176426361792:web:4c92087062300e8662de25"
 };
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };