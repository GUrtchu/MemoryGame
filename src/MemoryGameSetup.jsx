import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const MemoryGameSetup = () => {
  const [selectedTheme, setSelectedTheme] = useState("Numbers");
  const [timerDuration, setTimerDuration] = useState(1);
  const [selectedGrid, setSelectedGrid] = useState("4x4");

  const navigate = useNavigate();

  const startGame = () => {
    navigate("/game", {
      state: {
        theme: selectedTheme,
        timer: timerDuration,
        grid: selectedGrid,
      },
    });
  };

  const themes = ["Numbers", "Icons"];
  const timerOptions = [1, 3, 5];
  const gridOptions = ["4x4", "6x6"];

  return (
    <div className="setup-container">
      <header>
        <h1>Memory Game</h1>
      </header>

      <section className="option-section">
        <h3>Select Theme</h3>
        <div className="option-buttons">
          {themes.map((theme) => (
            <button
              key={theme}
              className={`option-btn ${
                selectedTheme === theme ? "selected" : ""
              }`}
              onClick={() => setSelectedTheme(theme)}
            >
              {theme}
            </button>
          ))}
        </div>
      </section>

      <section className="option-section">
        <h3>Timer Duration</h3>
        <div className="option-buttons">
          {timerOptions.map((minutes) => (
            <button
              key={minutes}
              className={`option-btn ${
                timerDuration === minutes ? "selected" : ""
              }`}
              onClick={() => setTimerDuration(minutes)}
            >
              {minutes}min
            </button>
          ))}
        </div>
      </section>

      <section className="option-section">
        <h3>Grid Size</h3>
        <div className="option-buttons">
          {gridOptions.map((size) => (
            <button
              key={size}
              className={`option-btn ${
                selectedGrid === size ? "selected" : ""
              }`}
              onClick={() => setSelectedGrid(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      <button className="start-button" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
};

export default MemoryGameSetup;
