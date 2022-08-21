import React, { useEffect, useState } from "react";
import SimpleDialog from "./AddParticipant";

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
import { getDatabase, ref, child, get, set } from "firebase/database";

// Whatsapp API
import { postMessage } from "../api/postMessage";

// Utils
import orderSummary from "../utils/orderSummary";

const Participant = () => {
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
          setIndexParticipant([snapshot.val()][0].length);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [participants, setParticipants] = useState([]);
  const [indexParticipant, setIndexParticipant] = useState();

  console.log("INDICE DE PARTICIPANTES: ", indexParticipant);

  const submitHandler = () => {
    const order = orderSummary(participants);
    postMessage("hola soy la data");
    console.log(`ALMUERZO 

      - Almuerzos normales: ${order[0]}
      - Almuerzos veganos: ${order[1]}
      - Para llevar normales: ${order[2]}
      - Para llevar veganos: ${order[3]}
      
      CENA 
      
      - Cenas normales: ${order[4]}
      - Cenas veganas: ${order[5]}
      - Para llevar normales: ${order[6]}
      - Para llevar veganos: ${order[7]}`);

    // mandar mensaje de whatsapp
  };

  function writeUserData(data) {
    const db = getDatabase();
    set(ref(db, "users/" + indexParticipant), {
      name: data.name,
      lunch: data.lunch,
      dinner: data.dinner,
      vegan: data.vegan,
      ta_lunch: data.ta_lunch,
      ta_dinner: data.ta_dinner,
    });
  }

  const submitNewParticipant = () => {
    setOpen(true);

    /*     writeUserData({
      name: "Cecilia Ramallo",
      lunch: true,
      dinner: true,
      vegan: false,
      ta_lunch: false,
      ta_dinner: false,
    }); */
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

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
            {participants?.map((person, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {person.name}
                </TableCell>
                <TableCell align="right">
                  <Switch defaultChecked color="warning" />
                </TableCell>
                <TableCell align="right">
                  <Switch defaultChecked color="warning" />
                </TableCell>
                <TableCell align="right">
                  <Switch defaultChecked color="warning" />
                </TableCell>
                <TableCell align="right">
                  <Switch defaultChecked color="warning" />
                </TableCell>
                <TableCell align="right">
                  <Switch defaultChecked color="warning" />
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
        onClick={submitNewParticipant}
      >
        Agregar invitado
      </Button>
      <br></br>
      <br></br>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />

      <Button variant="contained" color="success" onClick={submitHandler}>
        Enviar a Hugo
      </Button>
    </div>
  );
};

export default Participant;
