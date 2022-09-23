const orderDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1).toString();
  const tomorrowDate = today.toDateString();
  const friday = new Date().getDay() === 5;

  if (friday) {
    const fridayDate = new Date();
    fridayDate.setDate(fridayDate.getDate() + 3).toString();
    const mondayDate = fridayDate.toDateString();
    return mondayDate;
  }
  return tomorrowDate;
};

export default orderDate;
