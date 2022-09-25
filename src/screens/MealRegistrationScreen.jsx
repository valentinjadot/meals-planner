import React, { useState } from 'react';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import NewUserDialog from '../components/NewUserDialog';
import MealRegistrationTable from '../components/MealRegistrationTable';
import orderDate from '../utils/orderDate';
import useUsers from '../hooks/useUsers';

export default function MealRegistrationScreen() {
  const [openForm, setOpenForm] = useState(false);
  const [users, triggerReloadUsers] = useUsers();
  const date = orderDate();

  return (
    <React.StrictMode>
      <div className="App">
        <h3>Comidas para mañana! 🐷 🥬</h3>
        <p>
          Fecha del pedido:
          {' '}
          {dayjs(date).locale('es').format('dddd, MMMM D')}
        </p>

        {/* <Countdown users={users} /> */}
        {users && <MealRegistrationTable users={users} />}

        <br />

        <Button
          variant="contained"
          color="warning"
          onClick={() => setOpenForm(true)}
        >
          Agregar invitado
        </Button>

        <NewUserDialog
          open={openForm}
          onClose={() => setOpenForm(false)}
          onNewUser={triggerReloadUsers}
        />
      </div>
    </React.StrictMode>
  );
}
