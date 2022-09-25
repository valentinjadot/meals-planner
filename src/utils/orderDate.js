const isFridayOrWeekend = (date) => [5, 6, 0].includes(date.getDay());
const dayAfter = (day) => new Date(new Date(day).setDate(day.getDate() + 1));

export default function orderDate() {
  const today = new Date();
  let futureDate = new Date(today);

  if (isFridayOrWeekend(today)) {
    while (isFridayOrWeekend(futureDate)) {
      futureDate = dayAfter(futureDate);
    }
  } else {
    futureDate = dayAfter(today);
  }
  return futureDate;
}
