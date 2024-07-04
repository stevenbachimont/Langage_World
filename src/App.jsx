import React, { useState } from 'react';
import HelloWorld from './components/HelloWorld';
import languagesData from './data/languages.json';

import Roue from "./Roue";



function App() {
  // const [count, setCount] = useState(0)
  const [languageIndex, setLanguageIndex] = useState(0);

  const handleLanguageChange = () => {
    const randomIndex = Math.floor(Math.random() * languagesData.languages.length);
    setLanguageIndex(randomIndex);
};


  return (
    <>
    <HelloWorld languageIndex={languageIndex} />
<Roue onSpinEnd={handleLanguageChange} />
    </>
  );
}

export default App;
