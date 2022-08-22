// Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";

const firebaseConfig = {
  databaseURL: `${process.env.REACT_APP_FIREBASE_DB_URL}`,
};
const app = initializeApp(firebaseConfig);
const firebaseData = ref(getDatabase());

const updateData = (data) => {
  const db = getDatabase();
  const updates = {};
  updates["/users/"] = data;
  return update(ref(db), updates);
};
