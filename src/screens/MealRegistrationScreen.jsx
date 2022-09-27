import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import _ from 'lodash';
import NewUserDialog from '../components/NewUserDialog';
import SearchBar from '../components/SearchBar';
import DayOrders from '../components/DayOrders';
import useOrders from '../hooks/useOrders';

export default function MealRegistrationScreen() {
  const [openForm, setOpenForm] = useState(false);
  const [nameFilter, setNameFilter] = useState(false);
  const [orders, triggerReloadOrders] = useOrders();

  const isMatchingSearch = (order) => order.userName.toLowerCase().match(nameFilter.toLowerCase());

  const hasFilter = nameFilter && nameFilter.length > 0;
  const filteredOrders = (hasFilter ? orders.filter(isMatchingSearch) : orders);
  const ordersGroupedByDate = _.groupBy(filteredOrders, (e) => e.executionDate);
  const dates = Object.keys(ordersGroupedByDate);
  const userNames = [...new Set(orders.map((users) => users.userName))];

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

        <SearchBar options={userNames} onChange={setNameFilter} />

        {ordersGroupedByDate && dates.map((date) => (
          <DayOrders
            date={date}
            dayOrders={ordersGroupedByDate[date]}
            key={date}
          />
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
