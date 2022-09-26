import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react';

import MealOrdersTableLine from './MealOrdersTableLine';

export default function MealOrdersTable({ orders, date, meal }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 50 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="center">FIN</TableCell>
            <TableCell align="center">Quiero comer!</TableCell>
            <TableCell align="center">Vegano?</TableCell>
            <TableCell align="center">Take away?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders?.map((order) => (
            <MealOrdersTableLine
              order={order}
              key={order.id}
              date={date}
              meal={meal}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
