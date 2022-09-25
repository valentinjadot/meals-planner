import './App.css';
import './responsive.css';
import React from 'react';
import { Provider } from 'react-supabase';
import supabaseClient from './config/supabase';
import MealRegistrationScreen from './screens/MealRegistrationScreen';
import finLogo from './finLogo.gif';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SousChef</h1>
      </header>

      <div className="App-body">
        <Provider value={supabaseClient}>
          <MealRegistrationScreen />
        </Provider>
        <img src={finLogo} alt="finLogo" />
      </div>
    </div>
  );
}

export default App;
