import React, { useState } from 'react';
import Button from '@mui/material/Button';
import NewUserDialog from '../components/NewUserDialog';
import DayOrders from '../components/DayOrders';
import useOrders from '../hooks/useOrders';

export default function MealRegistrationScreen() {
  const [openForm, setOpenForm] = useState(false);
  const [orders, triggerReloadOrders] = useOrders();

  const dates = Object.keys(orders);

  return (
    <React.StrictMode>
      <div className="App">
        <Button
          variant="contained"
          color="warning"
          onClick={() => setOpenForm(true)}
        >
          Agregar invitado
        </Button>

        <h3>Comidas! 🐷 🥬</h3>

        {orders && dates.map((date) => (
          <DayOrders date={date} dayOrders={orders[date]} key={date} />
        ))}

        <NewUserDialog
          open={openForm}
          onClose={() => setOpenForm(false)}
          onNewUser={triggerReloadOrders}
        />
      </div>
    </React.StrictMode>
  );
}
