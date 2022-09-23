import React, { useEffect, useState } from 'react';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

// Firebase
import { initializeApp } from 'firebase/app';
import {
  getDatabase, ref, child, get,
} from 'firebase/database';
import Countdown from './Countdown';
import NewUserDialog from './NewUserDialog';

// Utils
import updateHandler from '../utils/updateData';
import orderDate from '../utils/orderDate';

function Participant() {
  const [participants, setParticipants] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openPass, setOpenPass] = useState(false);

  const date = orderDate();

  useEffect(() => {
    const firebaseConfig = {
      databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    };
    const app = initializeApp(firebaseConfig);
    const firebaseData = ref(getDatabase());

    get(child(firebaseData, 'users'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setParticipants([snapshot.val()][0]);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <h3>Comidas para mañana! 🐷 🥬</h3>
      <p>
        Fecha del pedido:
        {date}
      </p>

      <Countdown participants={participants} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 50 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="center">FIN</TableCell>
              <TableCell align="center">Almuerzo</TableCell>
              <TableCell align="center">Cena</TableCell>
              <TableCell align="center">TA Almuerzo</TableCell>
              <TableCell align="center">TA Cena</TableCell>
              <TableCell align="center">Vegano</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants?.map((user, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center">
                  <Switch defaultChecked={user.fin} disabled />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={user.lunch}
                    onChange={() => updateHandler(user, 'lunch')}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={user.dinner}
                    onChange={() => updateHandler(user, 'dinner')}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={user.ta_lunch}
                    onChange={() => updateHandler(user, 'ta_lunch')}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={user.ta_dinner}
                    onChange={() => updateHandler(user, 'ta_dinner')}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={user.vegan}
                    onChange={() => updateHandler(user, 'vegan')}
                    color="warning"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <Button
        variant="contained"
        color="warning"
        onClick={() => setOpenForm(true)}
      >
        Agregar invitado
      </Button>
      <NewUserDialog open={openForm} onClose={() => setOpenForm(false)} />
    </div>
  );
}

export default Participant;
