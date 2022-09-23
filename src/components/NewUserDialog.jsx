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

// Firebase
import { initializeApp } from 'firebase/app';
import {
  getDatabase, ref, child, get, set,
} from 'firebase/database';

function NewUserDialog(props) {
  const { onClose, open } = props;
  const [indexParticipant, setIndexParticipant] = useState();
  const [name, setName] = useState('');
  const [fin, setFin] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [taLunch, setTaLunch] = useState(false);
  const [taDinner, setTaDinner] = useState(false);

  const firebaseConfig = {
    databaseURL: `${process.env.REACT_APP_FIREBASE_DB_URL}`,
  };
  const app = initializeApp(firebaseConfig);
  const firebaseData = ref(getDatabase());

  get(child(firebaseData, 'users'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setIndexParticipant([snapshot.val()][0].length);
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });

  function writeUserData() {
    const db = getDatabase();
    set(ref(db, `users/${indexParticipant}`), {
      uid: indexParticipant,
      name,
      lunch,
      dinner,
      vegan,
      ta_lunch: taLunch,
      ta_dinner: taDinner,
      fin,
    });
  }

  const submitHandler = () => {
    writeUserData();
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
            control={<Switch checked={fin} onChange={() => setFin(!fin)} />}
            label="Soy estudiante de la FIN"
          />
          <FormControlLabel
            control={
              <Switch checked={lunch} onChange={() => setLunch(!lunch)} />
            }
            label="Almuerzo en el local"
          />
          <FormControlLabel
            control={
              <Switch checked={dinner} onChange={() => setDinner(!dinner)} />
            }
            label="Cena en el local"
          />
          <FormControlLabel
            control={
              <Switch checked={vegan} onChange={() => setVegan(!vegan)} />
            }
            label="Soy Veggie/Vegano"
          />
          <FormControlLabel
            control={
              <Switch checked={taLunch} onChange={() => setTaLunch(!taLunch)} />
            }
            label="Almuerzo para llevar"
          />
          <FormControlLabel
            control={(
              <Switch
                checked={taDinner}
                onChange={() => setTaDinner(!taDinner)}
              />
            )}
            label="Cena para llevar"
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
