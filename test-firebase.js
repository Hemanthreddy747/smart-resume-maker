const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} = require("firebase/firestore");
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testFirestore() {
  try {
    console.log("Testing Firestore connection...");

    // Test writing
    const testDocRef = doc(db, "test", "testDoc");
    await setDoc(testDocRef, {
      message: "Hello from test!",
      timestamp: new Date(),
    });
    console.log("✅ Write test passed");

    // Test reading
    const docSnap = await getDoc(testDocRef);
    if (docSnap.exists()) {
      console.log("✅ Read test passed:", docSnap.data());
    } else {
      console.log("❌ Read test failed: document not found");
    }

    // Test collection read
    const querySnapshot = await getDocs(collection(db, "test"));
    console.log(
      "✅ Collection read test passed, docs count:",
      querySnapshot.size
    );
  } catch (error) {
    console.error("❌ Firestore test failed:", error.message);
  }
}

testFirestore();
