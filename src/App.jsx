import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemoryGameSetup from "./MemoryGameSetup";  
import MemoryGame from "./MemoryGame";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MemoryGameSetup />} />  
        <Route path="/game" element={<MemoryGame />} />  
      </Routes>
    </Router>
  );
}

export default App;
