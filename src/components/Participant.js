import React, { useEffect, useState } from "react";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";

// Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

const Participant = () => {
  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      databaseURL: `${process.env.REACT_APP_FIREBASE_DB_URL}`, //process.env.FIREBASE_DB_URL,
    };
    const app = initializeApp(firebaseConfig);

    // Initialize Realtime Database and get a reference to the service

    const dbRef = ref(getDatabase());
    get(child(dbRef, `data/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setParticipants([snapshot.val()]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [participants, setParticipants] = useState([]);

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  let tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1).toString();

  let text = tomorrow.toDateString();

  return (
    <div className="App">
      <p>Comidas para mañana!</p>
      <p>Fecha: {text}</p>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Almuerzo</TableCell>
              <TableCell align="right">Cena</TableCell>
              <TableCell align="right">TA Almuerzo</TableCell>
              <TableCell align="right">TA Cena</TableCell>
              <TableCell align="right">Vegano</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((person) => (
              <TableRow
                key={person.uid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {person.uid.name}
                </TableCell>
                <TableCell align="right">
                  <Switch
                    {...label}
                    defaultChecked={person.uid.lunch}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    {...label}
                    defaultChecked={person.uid.dinner}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    {...label}
                    defaultChecked={person.uid.aw_lunch}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    {...label}
                    defaultChecked={person.uid.aw_dinner}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    {...label}
                    defaultChecked={person.uid.vegan}
                    color="warning"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Button variant="contained" color="warning">
        Agregar invitado
      </Button>
      <br></br>
      <br></br>

      <Button variant="contained" color="success">
        Enviar a Hugo
      </Button>
    </div>
  );
};

export default Participant;
