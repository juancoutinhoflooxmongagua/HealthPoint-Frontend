import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/Assets/Css/index.css';

import Nav from "./Views/Components/Nav";
import Register from "./Views/Main/Register";
import Login from "./Views/Main/Login";
import Home from "./Views/Main/Home";
import Jobs from "./Views/Main/Jobs/Jobs";
import UserProfile from "./Views/Main/User/UserProfile";
import Footer from "./Views/Components/Footer";
import SearchUsers from "../src/Views/Main/User/Admin/SearchUsers";
import Application from "./Views/application";
import { AuthProvider } from "./Context/authContext";   
import DashboardAdmin from "./Views/Main/User/Admin/DashboardAdmin";

// Importando o ActionButtons
import ActionButtons from "./Views/Components/ActionButtons";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="main bg-light">
          <Nav />
          <div className="container bg-light mt-5 pt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/SearchUsers" element={<SearchUsers />} />
              <Route path="/Jobs" element={<Jobs />} />
              <Route path="/Application" element={<Application />} />
              <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
            </Routes>
          </div>
          <Footer />
          <ActionButtons />
        </div>
      </Router>
    </AuthProvider>
  );
}
