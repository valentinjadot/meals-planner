import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import React, { useState } from 'react';

import updateOrder from '../queries/updateOrder';

export default function MealRegistrationTableLine({ userOrder, onChange }) {
  const [order, setOrder] = useState(userOrder);

  const handleToggle = (attribute) => {
    const changesToOrder = {};
    changesToOrder[attribute] = !order[attribute];
    updateOrder(order.id, changesToOrder);
    const newValue = {
      ...order,
      ...changesToOrder,
    };
    setOrder(newValue);
    onChange();
  };

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      key={order.id}
    >
      <TableCell component="th" scope="row">
        {order.users.name}
      </TableCell>
      <TableCell align="center">
        <Switch defaultChecked={order.users.is_fin} disabled />
      </TableCell>
      <TableCell align="right">
        <Switch
          checked={order.is_valid}
          onChange={() => handleToggle('is_valid')}
          color="warning"
        />
      </TableCell>
      <TableCell align="right">
        <Switch
          checked={order.is_take_away}
          onChange={() => handleToggle('is_take_away')}
          color="warning"
        />
      </TableCell>
      <TableCell align="right">
        <Switch
          checked={order.is_vegan}
          onChange={() => handleToggle('is_vegan')}
          color="warning"

        />
      </TableCell>
    </TableRow>
  );
}
