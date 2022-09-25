import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect } from 'react';
import useUsersOrders from '../hooks/useUsersOrders';
import useCreateMissingOrders from '../hooks/useCreateMissingOrders';

import MealRegistrationTableLine from './MealRegistrationTableLine';

export default function MealRegistrationTable({ users }) {
  const [usersOrders, triggerReloadUsersOrders] = useUsersOrders(users);
  const [newOrders] = useCreateMissingOrders(users, usersOrders);

  useEffect(() => {
    triggerReloadUsersOrders();
  }, [newOrders]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 50 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="center">FIN</TableCell>
            <TableCell align="center">Quiero comer!</TableCell>
            <TableCell align="center">Take away?</TableCell>
            <TableCell align="center">Vegano?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersOrders && usersOrders?.map((userOrder) => (
            <MealRegistrationTableLine
              userOrder={userOrder}
              key={userOrder.users.id}
              onChange={triggerReloadUsersOrders}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
