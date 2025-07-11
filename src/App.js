// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskTracker from './TaskTracker';
import About from './About';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#f3f4f6' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/About">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TaskTracker />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
