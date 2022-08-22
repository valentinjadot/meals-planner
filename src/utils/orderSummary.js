export const orderSummary = (participants) => {
  const normalLunch = participants.filter(function (person) {
    if (!person.vegan) {
      return person.lunch;
    }
    return 0;
  }).length;

  const deliveryNormalLunch = participants.filter(function (person) {
    if (!person.vegan) {
      return person.ta_lunch;
    }
    return 0;
  }).length;

  const veganLunch = participants.filter(function (person) {
    if (person.vegan) {
      return person.lunch;
    }
    return 0;
  }).length;

  const deliveryVeganLunch = participants.filter(function (person) {
    if (person.vegan) {
      return person.ta_lunch;
    }
    return 0;
  }).length;

  const normalDinner = participants.filter(function (person) {
    if (!person.vegan) {
      return person.dinner;
    }
    return 0;
  }).length;

  const deliveryNormalDinner = participants.filter(function (person) {
    if (!person.vegan) {
      return person.ta_dinner;
    }
    return 0;
  }).length;

  const veganDinner = participants.filter(function (person) {
    if (person.vegan) {
      return person.dinner;
    }
    return 0;
  }).length;

  const deliveryVeganDinner = participants.filter(function (person) {
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
};
