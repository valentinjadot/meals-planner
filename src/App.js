import meme from './meme.jpeg';
import './App.css';
import Participant from './components/Participant';
import fintualLogo from "./finLogo.gif"

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={meme} className="App-logo" alt="memeLogo" />
        <Participant/>
        <img src={fintualLogo}  alt="finLogo" />
      </header>
    </div>
  );
}

export default App;
