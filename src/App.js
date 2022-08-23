import "./App.css";
import Participant from "./components/Participant";
import meme from "./meme.jpeg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={meme} className="App-logo" alt="memeLogo" />
        <Participant />
        <img src={meme} alt="finLogo" />
      </header>
    </div>
  );
}

export default App;
