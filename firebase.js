import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDE4H1XkAvGKPb2-BX31pEyRcAzIr0Yz00",
    authDomain: "cafin-acd98.firebaseapp.com",
    projectId: "cafin-acd98",
    storageBucket: "cafin-acd98.firebasestorage.app",
    messagingSenderId: "876228255197",
    appId: "1:876228255197:web:9fb364b1b49b5c80efaa34",
    measurementId: "G-LDGQRESFVC"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
    console.warn("Firestore persistence disabled:", err?.code || err);
});

export { app, auth, db };
