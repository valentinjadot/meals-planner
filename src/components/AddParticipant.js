import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Switch, { SwitchProps } from "@mui/material/Switch";

import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Agrega tus preferencias 😋</DialogTitle>

      <FormControl
        component="fieldset"
        variant="standard"
        sx={{
          "& > :not(style)": { mx: 3 },
        }}
      >
        <TextField
          id="standard-basic"
          label="Ingresa tu nombre"
          variant="standard"
        />
        <FormGroup
          sx={{
            "& > :not(style)": { my: 2, width: "25ch" },
          }}
        >
          <FormControlLabel
            control={<Switch checked="" onChange="" name="gilad" />}
            label="Almuerzo en el local"
          />
          <FormControlLabel
            control={<Switch checked="" onChange="" name="jason" />}
            label="Ceno en el local"
          />
          <FormControlLabel
            control={<Switch checked="" onChange="" name="antoine" />}
            label="Soy Veggie/Vegano"
          />
          <FormControlLabel
            control={<Switch checked="" onChange="" name="antoine" />}
            label="Almuerzo para llevar"
          />
          <FormControlLabel
            control={<Switch checked="" onChange="" name="antoine" />}
            label="Cena para llevar"
          />
        </FormGroup>
        <FormHelperText>
          Ojo! Quedará así al menos que cambies tus preferencias
        </FormHelperText>
      </FormControl>
      <DialogActions>
        <Button autoFocus onClick="">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SimpleDialog;
