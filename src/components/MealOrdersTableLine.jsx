import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import Toggle from './Toggle';

export default function MealOrdersTableLine({ order }) {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      key={order.id}
    >
      <TableCell component="th" scope="row">
        {order.userName}
      </TableCell>
      <TableCell align="center">
        <Toggle
          orderId={order.id}
          name="isFin"
          value={order.isFin}
          disabled
        />
        {/* <Switch defaultChecked={order.isFin} disabled /> */}
      </TableCell>
      <TableCell align="right">
        <Toggle
          orderId={order.id}
          name="isActive"
          value={order.isActive}
        />
      </TableCell>
      <TableCell align="right">
        <Toggle
          orderId={order.id}
          name="isTakeAway"
          value={order.isTakeAway}
        />
      </TableCell>
      <TableCell align="right">
        <Toggle
          orderId={order.id}
          name="isVegan"
          value={order.isVegan}
        />
      </TableCell>
    </TableRow>
  );
}
