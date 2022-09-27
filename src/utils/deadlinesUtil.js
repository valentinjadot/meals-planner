import dayjs from 'dayjs';

export default function deadlinesUtil({ date, meal }) {
  const TWENTY_FOUR_HOURS = 24;
  const END_OF_LUNCH_HOUR = 14;
  const MORNING_NOTIFICATION_HOUR = 11;
  const AFTERNOON_NOTIFICATION_HOUR = 17;

  const now = dayjs();
  const orderDate = dayjs(date);
  const registrationDeadline = orderDate.hour(END_OF_LUNCH_HOUR).subtract(TWENTY_FOUR_HOURS, 'hours');
  const isRegistrationClosed = now.isAfter(registrationDeadline);
  const takeAwayDeadline = meal === 'lunch'
    ? orderDate.hour(MORNING_NOTIFICATION_HOUR)
    : orderDate.hour(AFTERNOON_NOTIFICATION_HOUR);
  const isTakeAwayClosed = now.isAfter(takeAwayDeadline);

  return {
    isRegistrationClosed,
    isTakeAwayClosed,
  };
}
