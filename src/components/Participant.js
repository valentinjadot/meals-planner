import React, { useEffect, useState } from "react";
import SimpleDialog from "./SimpleDialog";
import PassDialog from "./PassDialog";

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

// Utils
import updateHandler from "../utils/updateData";

const Participant = () => {
  const [participants, setParticipants] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openPass, setOpenPass] = useState(false);

  useEffect(() => {
    const firebaseConfig = {
      databaseURL: `${process.env.REACT_APP_FIREBASE_DB_URL}`,
    };
    const app = initializeApp(firebaseConfig);
    const firebaseData = ref(getDatabase());

    get(child(firebaseData, `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setParticipants([snapshot.val()][0]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [participants]);

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1).toString();
  let tomorrowDate = tomorrow.toDateString();

  return (
    <div className="App">
      <p>Comidas para mañana! 🐷 🥬</p>
      <p>Fecha del pedido: {tomorrowDate}</p>

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
            {participants?.map((person, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {person.name}
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={person.lunch}
                    onChange={() => updateHandler(person, "lunch")}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={person.dinner}
                    onChange={() => updateHandler(person, "dinner")}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={person.ta_lunch}
                    onChange={() => updateHandler(person, "ta_lunch")}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={person.ta_dinner}
                    onChange={() => updateHandler(person, "ta_dinner")}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={person.vegan}
                    onChange={() => updateHandler(person, "vegan")}
                    color="warning"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Button
        variant="contained"
        color="warning"
        onClick={() => setOpenForm(true)}
      >
        Agregar invitado
      </Button>
      <br></br>
      <br></br>
      <SimpleDialog open={openForm} onClose={() => setOpenForm(false)} />
      <PassDialog
        open={openPass}
        participants={participants}
        onClose={() => setOpenPass(false)}
      />

      <Button
        variant="contained"
        color="success"
        onClick={() => setOpenPass(true)}
      >
        Enviar a Hugo
      </Button>
    </div>
  );
};

export default Participant;
