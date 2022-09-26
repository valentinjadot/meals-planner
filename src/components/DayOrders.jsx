import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import Meal from './Meal';

export default function DayOrders({ date, dayOrders }) {
  useEffect(() => console.log('dayOrders', dayOrders), [dayOrders]);

  const meals = Object.keys(dayOrders);

  const formattedDate = () => dayjs(date).locale('es').format('dddd, MMMM D');

  return (
    <>
      <h3>
        {formattedDate()}
      </h3>

      {dayOrders && meals.map((meal) => (
        <Meal mealOrders={dayOrders[meal]} meal={meal} key={meal} />
      ))}
    </>
  );
}
