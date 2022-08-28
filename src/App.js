import "./App.css";
import "./responsive.css";
import Participant from "./components/Participant";
import meme from "./meme.jpeg";
import finLogo from "./finLogo.gif";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={meme} className="App-logo" alt="memeLogo" />
      </header>

      <div className="App-body">
        <Participant />
        <img src={finLogo} alt="finLogo" />
      </div>
    </div>
  );
}

export default App;
