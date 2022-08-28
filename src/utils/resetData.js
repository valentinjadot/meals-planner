// Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update, remove } from "firebase/database";

const firebaseConfig = {
  databaseURL: `${process.env.REACT_APP_FIREBASE_DB_URL}`,
};
const app = initializeApp(firebaseConfig);
const firebaseData = ref(getDatabase());

const resetDataHandler = (participants) => {
  const db = getDatabase();

  participants.forEach((user) => {
    if (!user.fin) {
      const finReset = {};
      finReset[`/users/${user.uid}/`] = null;
      update(ref(db), finReset);
      return;
    } else {
      const finReset = {};
      const finResetData = {
        ...user,
        lunch: true,
        dinner: true,
        ta_lunch: false,
        ta_dinner: false,
      };

      finReset[`/users/${user.uid}/`] = finResetData;
      update(ref(db), finReset);
      return;
    }
  });
};

export default resetDataHandler;
