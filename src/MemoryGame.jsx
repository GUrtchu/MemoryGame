import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function MemoryGame() {
  const { state } = useLocation();

  const selectedTimer = state?.timer || 1;
  const selectedGrid = state?.grid || "4x4";
  const selectedTheme = state?.theme || "Numbers";

  const [cards, setCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(selectedTimer * 60);

  const generateCards = () => {
    const icons = ["🐶", "🐱", "🦄", "🐯", "🐸", "🦁", "🐼", "🐨"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const selectedSet = selectedTheme === "Icons" ? icons : numbers;
    const shuffled = [...selectedSet, ...selectedSet].sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setMatchedCards([]);
    setFlippedIndex([]);
  };

  const onClick = (index) => {
    if (flippedIndex.length === 2 || matchedCards.includes(index) || flippedIndex.includes(index)) return;
    const newIndex = [...flippedIndex, index];
    setFlippedIndex(newIndex);

    if (newIndex.length === 2) {
      if (cards[newIndex[0]] === cards[newIndex[1]]) {
        setMatchedCards((prev) => [...prev, ...newIndex]);
      }
      setTimeout(() => {
        setFlippedIndex([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (timeRemaining === 0) return;
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval);
          setMatchedCards([]);
          alert("Time's up! You lost!");
          generateCards();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining]);

  useEffect(() => {
    generateCards();
  }, [selectedTheme, selectedGrid]);

  useEffect(() => {
    if (matchedCards.length === (selectedGrid === "6x6" ? 18 : 8)) {
      alert("You win!");
      generateCards();
    }
  }, [matchedCards]);

  return (
    <div className="memory-game-container">
      <h1 className="game-title">Memory Game</h1>
      <div className="timer-container">
        {timeRemaining > 0 && <h2 className="time-remaining">Time Remaining: {timeRemaining}s</h2>}
      </div>
      <div className={`card-grid ${selectedGrid === "6x6" ? "grid-6x6" : "grid-4x4"}`}>
        {cards.map((el, i) => (
          <div
            key={i}
            onClick={() => onClick(i)}
            className={`card ${flippedIndex.includes(i) || matchedCards.includes(i) ? "flipped" : ""}`}
          >
            {flippedIndex.includes(i) || matchedCards.includes(i) ? el : "?"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
