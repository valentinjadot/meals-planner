import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import dayjs from 'dayjs';
import Toggle from './Toggle';

export default function MealOrdersTableLine({ order, date, meal }) {
  const isToday = dayjs().isSame(dayjs(date), 'day');
  const isTomorrow = dayjs().add(1, 'day').isSame(dayjs(date), 'day');
  const isRegistrationClosed = (isToday || isTomorrow) && (new Date().getHours() >= 14);
  const takeAwayDeadline = meal === 'lunch' ? 11 : 17;
  const isTakeAwayClosed = isToday && (new Date().getHours() >= takeAwayDeadline);

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
          disabled={isRegistrationClosed}
        />
      </TableCell>
      <TableCell align="right">
        <Toggle
          orderId={order.id}
          name="isVegan"
          value={order.isVegan}
          disabled={isRegistrationClosed}
        />
      </TableCell>
      <TableCell align="right">
        <Toggle
          orderId={order.id}
          name="isTakeAway"
          value={order.isTakeAway}
          disabled={isTakeAwayClosed}
        />
      </TableCell>
    </TableRow>
  );
}
