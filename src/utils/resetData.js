// Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update, remove } from "firebase/database";

const firebaseConfig = {
  databaseURL: `${process.env.REACT_APP_FIREBASE_DB_URL}`,
};
const app = initializeApp(firebaseConfig);
const firebaseData = ref(getDatabase());

const resetDataHandler = (user) => {
  console.log(user);
  /*   const db = getDatabase();
  const finReset = {};

  const finResetData = {
    ...user,
    lunch: true,
    dinner: true,
    ta_lunch: false,
    ta_dinner: false,
  };

  if (!user.fin) {
    remove(ref(db), `/users/${user.uid}/`);
    return;
  } else {
    finReset[`/users/${user.uid}/`] = finResetData;
    update(ref(db), finReset);
    return;
  } */
};

export default resetDataHandler;
