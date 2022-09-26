import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import Meal from './Meal';

export default function DayOrders({ date, dayOrders }) {
  const isToday = () => dayjs().isSame(dayjs(date), 'day');

  const meals = Object.keys(dayOrders).sort().reverse();

  const formattedDate = () => dayjs(date).locale('es').format('dddd, MMMM D');

  return (
    <>
      <h3>
        {formattedDate()}
      </h3>

      {dayOrders && meals.map((meal) => (
        <Meal mealOrders={dayOrders[meal]} meal={meal} key={meal} isToday={isToday()} />
      ))}
    </>
  );
}
