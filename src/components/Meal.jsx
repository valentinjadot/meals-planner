import React, { useEffect } from 'react';
import _ from 'lodash';
import MealOrdersTable from './MealOrdersTable';

export default function Meal({ mealOrders, meal }) {
  useEffect(() => console.log('mealOrders', mealOrders), [mealOrders]);

  const sortedMealOrders = () => _.sortBy(mealOrders, ['userName']);

  return (
    <>
      <p>
        {meal === 'lunch' ? 'Almuerzo' : 'Cena'}
      </p>
      <MealOrdersTable orders={sortedMealOrders()} />
    </>
  );
}
