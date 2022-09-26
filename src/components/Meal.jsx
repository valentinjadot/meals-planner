import React from 'react';
import _ from 'lodash';
import MealOrdersTable from './MealOrdersTable';

export default function Meal({ mealOrders, meal, date }) {
  const sortedMealOrders = () => _.sortBy(mealOrders, ['userName']);

  return (
    <>
      <p>
        {meal === 'lunch' ? 'Almuerzo' : 'Cena'}
      </p>
      <MealOrdersTable orders={sortedMealOrders()} date={date} meal={meal} />
    </>
  );
}
