import React, { useState } from "react";

// MUI
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

// Utils
import { orderSummary } from "../utils/orderSummary";
import resetDataHandler from "../utils/resetData";

// Whatsapp API
import { postMessage } from "../api/postMessage";

const PassDialog = (props) => {
  const { onClose, open, participants } = props;
  const [pass, setPass] = useState("");

  const submitHandler = () => {
    if (pass === process.env.REACT_APP_WHATSAPP_PASS) {
      const order = orderSummary(participants);
      postMessage(order);
      resetDataHandler(participants);
      onClose(true);
      return;
    }
    return;
  };

  return (
    <Dialog onClose={() => onClose(true)} open={open}>
      <DialogTitle>Contraseña mega secreta 💩</DialogTitle>

      <FormControl
        component="fieldset"
        variant="standard"
        sx={{
          "& > :not(style)": { mx: 3 },
        }}
      >
        <TextField
          id="standard-basic"
          label="Secreto"
          variant="standard"
          onChange={(input) => setPass(input.target.value)}
        />

        <FormHelperText>Misterio de la FIN</FormHelperText>
      </FormControl>
      <DialogActions>
        <Button autoFocus onClick={submitHandler}>
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PassDialog;
