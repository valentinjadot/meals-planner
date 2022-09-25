import React, { useState } from 'react';

// MUI
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

import createUser from '../queries/createUser';

// Firebase
function NewUserDialog(props) {
  const { onClose, open, onNewUser } = props;
  const [name, setName] = useState('');
  const [isFin, setIsFin] = useState(false);
  const [isVegan, setIsVegan] = useState(false);

  const submitHandler = () => {
    createUser({ name, isFin, isVegan });
    onNewUser();
    onClose(true);
  };

  return (
    <Dialog onClose={() => onClose(true)} open={open}>
      <DialogTitle>Agrega tus preferencias 😋</DialogTitle>

      <FormControl
        component="fieldset"
        variant="standard"
        sx={{
          '& > :not(style)': { mx: 3 },
        }}
      >
        <TextField
          id="standard-basic"
          label="Ingresa tu nombre"
          variant="standard"
          onChange={(input) => setName(input.target.value)}
        />

        <FormGroup
          sx={{
            '& > :not(style)': { my: 2, width: '25ch' },
          }}
        >
          <FormControlLabel
            control={<Switch checked={isFin} onChange={() => setIsFin(!isFin)} />}
            label="Soy estudiante de la FIN"
          />
          <FormControlLabel
            control={
              <Switch checked={isVegan} onChange={() => setIsVegan(!isVegan)} />
            }
            label="Soy Veggie/Vegano"
          />
        </FormGroup>
        <FormHelperText>
          Ojo! La base de datos se reiniciará todos los días
        </FormHelperText>
      </FormControl>
      <DialogActions>
        <Button autoFocus onClick={submitHandler} disabled={!name}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewUserDialog;
