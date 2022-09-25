export default function orderSummary(users) {
  const normalLunch = users.filter((person) => {
    if (!person.vegan) {
      return person.lunch;
    }
    return 0;
  }).length;

  const deliveryNormalLunch = users.filter((person) => {
    if (!person.vegan) {
      return person.ta_lunch;
    }
    return 0;
  }).length;

  const veganLunch = users.filter((person) => {
    if (person.vegan) {
      return person.lunch;
    }
    return 0;
  }).length;

  const deliveryVeganLunch = users.filter((person) => {
    if (person.vegan) {
      return person.ta_lunch;
    }
    return 0;
  }).length;

  const normalDinner = users.filter((person) => {
    if (!person.vegan) {
      return person.dinner;
    }
    return 0;
  }).length;

  const deliveryNormalDinner = users.filter((person) => {
    if (!person.vegan) {
      return person.ta_dinner;
    }
    return 0;
  }).length;

  const veganDinner = users.filter((person) => {
    if (person.vegan) {
      return person.dinner;
    }
    return 0;
  }).length;

  const deliveryVeganDinner = users.filter((person) => {
    if (person.vegan) {
      return person.ta_dinner;
    }
    return 0;
  }).length;

  return [
    normalLunch,
    veganLunch,
    deliveryNormalLunch,
    deliveryVeganLunch,
    normalDinner,
    veganDinner,
    deliveryNormalDinner,
    deliveryVeganDinner,
  ];
}
