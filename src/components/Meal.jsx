import React, { useEffect } from 'react';
import MealOrdersTable from './MealOrdersTable';

export default function Meal({ mealOrders, meal }) {
  useEffect(() => console.log('mealOrders', mealOrders), [mealOrders]);

  return (
    <>
      <p>
        {meal === 'lunch' ? 'Almuerzo' : 'Cena'}
      </p>
      <MealOrdersTable orders={mealOrders} />
    </>
  );
}
