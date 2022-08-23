// Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";

const firebaseConfig = {
  databaseURL: `${process.env.REACT_APP_FIREBASE_DB_URL}`,
};
const app = initializeApp(firebaseConfig);
const firebaseData = ref(getDatabase());

const updateHandler = (user, atributte) => {
  const db = getDatabase();
  const updates = {};
  if (atributte === "lunch") {
    const updateData = {
      ...user,
      lunch: !user.lunch,
      ta_lunch: user.lunch,
    };
    updates[`/users/${user.uid}/`] = updateData;
    return update(ref(db), updates);
  } else if (atributte === "dinner") {
    const updateData = {
      ...user,
      dinner: !user.dinner,
      ta_dinner: user.dinner,
    };
    updates[`/users/${user.uid}/`] = updateData;
    return update(ref(db), updates);
  } else if (atributte === "ta_lunch") {
    const updateData = {
      ...user,
      ta_lunch: !user.ta_lunch,
      lunch: user.ta_lunch,
    };
    updates[`/users/${user.uid}/`] = updateData;
    return update(ref(db), updates);
  } else if (atributte === "ta_dinner") {
    const updateData = {
      ...user,
      ta_dinner: !user.ta_dinner,
      dinner: user.ta_dinner,
    };
    updates[`/users/${user.uid}/`] = updateData;
    return update(ref(db), updates);
  } else {
    const updateData = {
      ...user,
      vegan: !user.vegan,
    };
    updates[`/users/${user.uid}/`] = updateData;
    return update(ref(db), updates);
  }
};

export default updateHandler;
