import React from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import Meal from './Meal';

export default function DayOrders({ date, dayOrders }) {
  const ordersGroupedByMeal = _.groupBy(dayOrders, (order) => order.meal);
  const meals = Object.keys(ordersGroupedByMeal).sort().reverse();
  const formattedDate = dayjs(date).locale('es').format('dddd, MMMM D');

  return (
    <>
      <h3>
        {formattedDate}
      </h3>

      {ordersGroupedByMeal && meals.map((meal) => (
        <Meal mealOrders={ordersGroupedByMeal[meal]} meal={meal} key={meal} date={date} />
      ))}
    </>
  );
}
