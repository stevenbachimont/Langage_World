import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import itemsObject from "../data/languages.json";
import './Wheel.css'; 

const itemsArray = Object.values(itemsObject.languages);

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const getColorById = (id) => {
  return id % 2 === 0 ? 'blue' : 'teal';
};

const Wheel = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spin = () => {
    if (spinning) return;

    const randomRotation = getRandomInt(3600) + 3600;
    setSpinning(true);
    setRotation(rotation + randomRotation);

    setTimeout(() => {
      const finalRotation = (rotation + randomRotation) % 360;
      const wedgeIndex = Math.floor((finalRotation / 360) * itemsArray.length);
      const selectedItem = itemsArray[itemsArray.length - 1 - wedgeIndex];

      confetti();
      setResult(selectedItem);
      setSpinning(false);
    }, 5000);
  };

  return (
    <div className="spin-page">
      <div className="spin-container">
        <button className="spin-container__button" onClick={spin} disabled={spinning}>
          {spinning ? 'Spinning...' : 'Spin'}
        </button>
        <div className="spin-container__wheel" style={{ transform: `rotate(${rotation}deg)` }}>
          {itemsArray.map((item, index) => (
            <div
              key={index}
              className="spin-container__wheel__item"
              style={{
                transform: `rotate(${index * (360 / itemsArray.length)}deg)`,
                backgroundColor: getColorById(item.id),
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="spin-result">
        {result && (
          <>
            <h2>{result.language}</h2>
            <p>{result.hello_world}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Wheel;