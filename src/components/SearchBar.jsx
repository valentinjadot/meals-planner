import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const savedFilter = localStorage.getItem('filteredName');

export default function SearchBar({ options, onChange }) {
  const [filteredName, setFilteredName] = useState(savedFilter);

  const saveInLocalStorage = () => localStorage.setItem('filteredName', filteredName);

  const saveFilter = () => {
    saveInLocalStorage();
    onChange(filteredName);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => saveFilter(), 100);
    return () => clearTimeout(timeOutId);
  }, [filteredName]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Autocomplete
        freeSolo
        inputValue={filteredName || ''}
        onInputChange={(e, newInputValue) => setFilteredName(newInputValue)}
        sx={{ width: '100%' }}
        options={options}
        autoHighlight
        getOptionLabel={(option) => option}
        renderOption={(props, option) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Box component="li" {...props}>
            {option}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="Filtrar por nombre"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
      />
    </ThemeProvider>
  );
}
