import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Gallery />} /> 
        <Route path="/favorites" element={<Favorites />} /> 
      </Routes>
    </Router>
  );
}

export default App;
