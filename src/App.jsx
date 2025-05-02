import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/Assets/Css/index.css';

import Nav from "./Views/Components/Nav";
import Register from "./Views/Main/Register";
import Login from "./Views/Main/Login";
import Home from "./Views/Main/Home";
import UserProfile from "./Views/Main/User/UserProfile";
import Footer from "./Views/Components/Footer";

import { AuthProvider } from "./Context/authContext";   

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="main">
          <Nav />
          <div className="container mt-5 pt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/UserProfile" element={<UserProfile/>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
