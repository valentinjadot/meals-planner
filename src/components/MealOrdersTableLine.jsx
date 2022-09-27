import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import Toggle from './Toggle';
import deadlinesUtil from '../utils/deadlinesUtil';

export default function MealOrdersTableLine({ order, date, meal }) {
  const [orderDesactivated, setOrderDesactivated] = useState(!order.isActive);
  const { isRegistrationClosed, isTakeAwayClosed } = deadlinesUtil({ date, meal });

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
          value={order.isActive}
          disabled={isRegistrationClosed}
          type="checkbox"
          onChange={() => setOrderDesactivated((prevValue) => !prevValue)}
        />
      </TableCell>
      <TableCell align="right">
        <Toggle
          orderId={order.id}
          name="isVegan"
          value={order.isVegan}
          disabled={isRegistrationClosed || orderDesactivated}
        />
      </TableCell>
      <TableCell align="right">
        <Toggle
          orderId={order.id}
          name="isTakeAway"
          value={order.isTakeAway}
          disabled={isTakeAwayClosed || orderDesactivated}
        />
      </TableCell>
    </TableRow>
  );
}
