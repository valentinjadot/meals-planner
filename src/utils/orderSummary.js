export default function orderSummary(participants) {
  const normalLunch = participants.filter((person) => {
    if (!person.vegan) {
      return person.lunch;
    }
    return 0;
  }).length;

  const deliveryNormalLunch = participants.filter((person) => {
    if (!person.vegan) {
      return person.ta_lunch;
    }
    return 0;
  }).length;

  const veganLunch = participants.filter((person) => {
    if (person.vegan) {
      return person.lunch;
    }
    return 0;
  }).length;

  const deliveryVeganLunch = participants.filter((person) => {
    if (person.vegan) {
      return person.ta_lunch;
    }
    return 0;
  }).length;

  const normalDinner = participants.filter((person) => {
    if (!person.vegan) {
      return person.dinner;
    }
    return 0;
  }).length;

  const deliveryNormalDinner = participants.filter((person) => {
    if (!person.vegan) {
      return person.ta_dinner;
    }
    return 0;
  }).length;

  const veganDinner = participants.filter((person) => {
    if (person.vegan) {
      return person.dinner;
    }
    return 0;
  }).length;

  const deliveryVeganDinner = participants.filter((person) => {
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
