import { useEffect, useState } from "react";
import "./App.css";
import Card from "./assets/components/Card";

function App() {
  const [cards, setCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState([]);

  const generateCards = () => {
    const characters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
    ];
    const shuffled = characters.sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setMatchedCards([]);
    setFlippedIndex([]);
  };

  useEffect(() => {
    generateCards();
  }, []);

  useEffect(() => {
    if (matchedCards.length === 16) {
      alert("YOU WIN");
      generateCards();
    }
  }, [matchedCards]);

  const onClick = (index) => {
    if (
      flippedIndex.length === 2 ||
      matchedCards.includes(index) ||
      flippedIndex.includes(index)
    )
      return;

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

  return (
    <div className="w-[500px] mx-auto mt-[50px] text-center">
      <button
        onClick={generateCards}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Restart Game
      </button>

      <div className="border-2 border-black grid grid-cols-4 gap-3 place-items-center py-4">
        {cards.map((el, i) => (
          <Card
            key={i}
            item={el}
            onClick={() => onClick(i)}
            isFlipped={flippedIndex.includes(i) || matchedCards.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
