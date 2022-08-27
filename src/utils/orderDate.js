const orderDate = () => {
  let today = new Date();
  today.setDate(today.getDate() + 1).toString();
  let tomorrowDate = today.toDateString();
  let friday = new Date().getDay() === 5;

  if (friday) {
    let fridayDate = new Date();
    fridayDate.setDate(fridayDate.getDate() + 3).toString();
    let mondayDate = fridayDate.toDateString();
    return mondayDate;
  }
  return tomorrowDate;
};

export default orderDate;
