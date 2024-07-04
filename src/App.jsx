import React, { useState } from 'react';
import HelloWorld from './components/HelloWorld';
import Roue from "./Roue";


function App() {
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <div className="app-container">
    <HelloWorld result={result} />
    <Roue setResult={setResult} />
    </div>
  );
}

export default App;
