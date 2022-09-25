const resetDataHandler = (users) => {
  const db = getDatabase();

  users.forEach((user) => {
    if (!user.fin) {
      const finReset = {};
      finReset[`/users/${user.uid}/`] = null;
      update(ref(db), finReset);
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
    }
  });
};

export default resetDataHandler;
