import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import Toggle from './Toggle';

const TWENTY_FOUR_HOURS = 24;
const END_OF_LUNCH_HOUR = 14;
const MORNING_NOTIFICATION_HOUR = 11;
const AFTERNOON_NOTIFICATION_HOUR = 17;

export default function MealOrdersTableLine({ order, date, meal }) {
  const [orderDesactivated, setOrderDesactivated] = useState(!order.isActive);
  const now = dayjs();
  const orderDate = dayjs(date);
  const registrationDeadline = orderDate.hour(END_OF_LUNCH_HOUR).subtract(TWENTY_FOUR_HOURS, 'hours');
  const isRegistrationClosed = now.isAfter(registrationDeadline);
  const takeAwayDeadline = meal === 'lunch'
    ? orderDate.hour(MORNING_NOTIFICATION_HOUR)
    : orderDate.hour(AFTERNOON_NOTIFICATION_HOUR);
  const isTakeAwayClosed = now.isAfter(takeAwayDeadline);

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
