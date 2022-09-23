import './App.css';
import './responsive.css';
import React from 'react';
import Participant from './components/Participant';
import meme from './meme.jpeg';
import finLogo from './finLogo.gif';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SousChef</h1>
        <img src={finLogo} alt="finLogo" />
      </header>

      <div className="App-body">
        <Participant />
      </div>
    </div>
  );
}

export default App;
