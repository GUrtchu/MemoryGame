import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

function MemoryGame() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const selectedTimer = state?.timer || 1;
  const selectedGrid = state?.grid || "4x4";
  const selectedTheme = state?.theme || "Numbers";

  const [cards, setCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(selectedTimer * 60);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const generateCards = () => {
    const icons = ["🐶", "🐱", "🦄", "🐯", "🐸", "🦁", "🐼", "🐨"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const selectedSet = selectedTheme === "Icons" ? icons : numbers;

    const paired = [...selectedSet, ...selectedSet].map((value, index) => ({
      id: `${index}-${value}`,
      value,
    }));

    const shuffled = paired.sort(() => 0.5 - Math.random());

    setCards(shuffled);
    setMatchedCards([]);
    setFlippedIndex([]);
    setMessage("");
    setGameOver(false);
  };

  const onClick = (index) => {
    if (
      gameOver ||
      flippedIndex.length === 2 ||
      matchedCards.includes(index) ||
      flippedIndex.includes(index)
    )
      return;

    const newIndex = [...flippedIndex, index];
    setFlippedIndex(newIndex);

    if (newIndex.length === 2) {
      if (cards[newIndex[0]].value === cards[newIndex[1]].value) {
        setMatchedCards((prev) => [...prev, ...newIndex]);
      }
      setTimeout(() => {
        setFlippedIndex([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (timeRemaining === 0 || gameOver) return;

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval);
          setMessage("❌ You lost");
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, gameOver]);

  useEffect(() => {
    generateCards();
  }, [selectedTheme, selectedGrid]);

  useEffect(() => {
    const totalMatches = selectedGrid === "6x6" ? 36 : 16;
    if (
      matchedCards.length === totalMatches &&
      timeRemaining > 0 &&
      !gameOver
    ) {
      setMessage("🎉 Congratulations! You Win 🏆");
      setGameOver(true);
    }
  }, [matchedCards, timeRemaining, selectedGrid, gameOver]);

  return (
    <div className="memory-game-container">
      <h1 className="game-title-centered">memory</h1>

      {!gameOver && (
        <div className="big-timer">
          <span role="img" aria-label="timer">
            ⏳
          </span>{" "}
          {timeRemaining}s
        </div>
      )}

      {message && <div className="message-banner">{message}</div>}

      <div
        className={`card-grid ${
          selectedGrid === "6x6" ? "grid-6x6" : "grid-4x4"
        }`}
      >
        {cards.map((card, i) => (
          <div
            key={card.id}
            onClick={() => onClick(i)}
            className={`card ${
              flippedIndex.includes(i) || matchedCards.includes(i)
                ? "flipped"
                : ""
            }`}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-buttons">
        <button
          onClick={() => {
            generateCards();
            setTimeRemaining(selectedTimer * 60);
            setGameOver(false);
          }}
        >
          Restart Game
        </button>
        <button onClick={() => navigate("/")}>New Game</button>
      </div>
    </div>
  );
}

export default MemoryGame;
