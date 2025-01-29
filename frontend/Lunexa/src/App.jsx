import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
      
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>} />
        {/* Add other routes here */}
        </Routes>
      
    </Router>
  );
}

export default App;