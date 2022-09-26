import Switch from '@mui/material/Switch';
import React, { useState } from 'react';

import updateOrder from '../queries/updateOrder';

export default function Toggle({
  orderId, name, value, disabled = false,
}) {
  const [stateValue, setStateValue] = useState(value);

  const handleToggle = () => {
    const changesToOrder = {};
    const newValue = !stateValue;
    changesToOrder[name] = newValue;

    updateOrder({ orderId, changesToOrder });
    setStateValue(newValue);
  };

  return (
    <Switch
      checked={stateValue}
      onChange={() => handleToggle()}
      color="warning"
      disabled={disabled}
    />
  );
}
