import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Nav from "./Views/Components/Nav"; 
import Register from "./Main/Register"; 
import Login from "./Main/Login"; 
import Home from "./Main/Home"; 

export default function App() {
  return (
    <Router>
      {/* Colocando a navegação em todos os componentes */}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
