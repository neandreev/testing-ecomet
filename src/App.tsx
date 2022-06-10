import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Table from './components/Table';
import Episode from './components/Episode';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/episode/:id" element={<Episode />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
