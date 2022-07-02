import "./App.css";
import Home from "./Home";
import Mint from "./Mint";
import Nav from "./Nav";
import { useState } from "react";

function App() {
  const [connecctstatus, setConnectedstatus] = useState(false);
  return (
    <div className="App">
      <Nav connecctstatus={connecctstatus} />
      <Home />
      <Mint
        connecctstatus={connecctstatus}
        setConnectedstatus={setConnectedstatus}
      />
    </div>
  );
}

export default App;
