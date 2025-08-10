import { Routes, Route, Link } from 'react-router-dom';
import BubbleSortPage from './pages/BubbleSortPage';
import InsertionSortPage from './pages/InsertionSortPage';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
      <div className="main-cont">
        <nav style={{ marginBottom: '1.5rem' }}>
          <Link to="/bubble" style={{ marginRight: '2rem' }}>Bubble Sort</Link>
          <Link to="/insertion">Insertion Sort</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bubble" element={<BubbleSortPage />} />
          <Route path="/insertion" element={<InsertionSortPage />} />
        </Routes>
      </div>
  );
}

export default App;
