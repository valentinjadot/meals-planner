import React, { useEffect, useState } from "react";
import SimpleDialog from "./NewUserDialog";
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
import orderDate from "../utils/orderDate";
import resetDataHandler from "../utils/resetData";

const Participant = () => {
  const [participants, setParticipants] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openPass, setOpenPass] = useState(false);

  let date = orderDate();

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

  return (
    <div className="App">
      <p>Comidas para mañana! 🐷 🥬</p>
      <p>Fecha del pedido: {date}</p>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                    onChange={() => updateHandler(user, "lunch")}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={user.dinner}
                    onChange={() => updateHandler(user, "dinner")}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={user.ta_lunch}
                    onChange={() => updateHandler(user, "ta_lunch")}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={user.ta_dinner}
                    onChange={() => updateHandler(user, "ta_dinner")}
                    color="warning"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={user.vegan}
                    onChange={() => updateHandler(user, "vegan")}
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
      <Button
        variant="contained"
        color="success"
        onClick={() => resetDataHandler(participants)}
      >
        TEST
      </Button>
    </div>
  );
};

export default Participant;
