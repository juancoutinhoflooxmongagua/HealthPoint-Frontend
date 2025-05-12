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
import NewJob from "./Views/Main/Jobs/NewJob";
import ActionButtons from "./Views/Components/ActionButtons";
import Statistics from "./Views/Main/User/Admin/Statistics";
import NewHospital from "./Views/Main/User/Admin/Hospital/NewHospital";
import Hospital from "./Views/Main/User/Admin/Hospital/Hospital";
import Leaderboard from "./Views/Main/Jobs/Leaderboard";
import Requests from "./Views/Main/User/Admin/Requests";
import HospitalLogin from "./Views/Main/User/Admin/Hospital/HospitalLogin";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="main bg-light">
          <Nav />
          <div className="rgb-tape"></div>
          <div className="container bg-light mt-5 pt-3">
            <Routes>
              
              {/* Rotas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/HospitalLogin" element={<HospitalLogin />}></Route>
              {/* Rotas de Voluntários */}
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/Jobs" element={<Jobs />} />

              {/* Rotas de administrador */}
              <Route path="/Jobs/:id" element={<Jobs />} />
              <Route path="/SearchUsers" element={<SearchUsers />} />              
              <Route path="/NewJob" element={<NewJob />} />
              <Route path="/Application" element={<Application />} />
              <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
              <Route path="/Statistics" element={<Statistics />} />
              <Route path="/NewHospital" element={<NewHospital />} />
              <Route path="/Hospital" element={<Hospital />} />
              <Route path="/Leaderboard" element={<Leaderboard />} />
              <Route path="/Requests" element={<Requests />} />
            </Routes>
          </div>
          <Footer />
          <ActionButtons />
        </div>
      </Router>
    </AuthProvider>
  );
}
