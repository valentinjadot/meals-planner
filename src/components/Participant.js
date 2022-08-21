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

// Whatsapp API
import { postMessage } from "../api/postMessage";

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
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [participants, setParticipants] = useState([]);

  const orderSummary = () => {
    const normalLunch = participants.filter(function (person) {
      if (!person.vegan) {
        return person.lunch;
      }
      return 0;
    }).length;

    const deliveryNormalLunch = participants.filter(function (person) {
      if (!person.vegan) {
        return person.ta_lunch;
      }
      return 0;
    }).length;

    const veganLunch = participants.filter(function (person) {
      if (person.vegan) {
        return person.lunch;
      }
      return 0;
    }).length;

    const deliveryVeganLunch = participants.filter(function (person) {
      if (person.vegan) {
        return person.ta_lunch;
      }
      return 0;
    }).length;

    const normalDinner = participants.filter(function (person) {
      if (!person.vegan) {
        return person.dinner;
      }
      return 0;
    }).length;

    const deliveryNormalDinner = participants.filter(function (person) {
      if (!person.vegan) {
        return person.ta_dinner;
      }
      return 0;
    }).length;

    const veganDinner = participants.filter(function (person) {
      if (person.vegan) {
        return person.dinner;
      }
      return 0;
    }).length;

    const deliveryVeganDinner = participants.filter(function (person) {
      if (person.vegan) {
        return person.ta_dinner;
      }
      return 0;
    }).length;

    return [
      normalLunch,
      veganLunch,
      deliveryNormalLunch,
      deliveryVeganLunch,
      normalDinner,
      veganDinner,
      deliveryNormalDinner,
      deliveryVeganDinner,
    ];
  };

  const submitHandler = () => {
    const order = orderSummary();
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
      <Button variant="contained" color="warning">
        Agregar invitado
      </Button>
      <br></br>
      <br></br>

      <Button variant="contained" color="success" onClick={submitHandler}>
        Enviar a Hugo
      </Button>
    </div>
  );
};

export default Participant;
