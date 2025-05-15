import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import { HospitalAuthProvider } from "./Context/hospitalContext";
import HospitalProfile from "./Views/Main/User/Admin/Hospital/HospitalProfile";
import HospitalHome from "./Views/Main/User/Admin/Hospital/HospitalHome";
import SidebarLayout from "./Views/Components/SidebarLayout";

export default function App() {
  return (
    <AuthProvider>
      <HospitalAuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="main bg-light">
            <Nav />
            <div className="rgb-tape"></div>
            <div className="container bg-light mt-5 pt-3">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/HospitalLogin" element={<HospitalLogin />} />

                <Route path="/UserProfile" element={<UserProfile />} />
                <Route path="/Jobs" element={<Jobs />} />
                <Route path="/Jobs/:id" element={<Jobs />} />

                <Route path="/SearchUsers" element={<SearchUsers />} />
                <Route path="/Application" element={<Application />} />
                <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
                <Route path="/Statistics" element={<Statistics />} />
                <Route path="/NewHospital" element={<NewHospital />} />
                <Route path="/Leaderboard" element={<Leaderboard />} />
                <Route path="/Requests" element={<Requests />} />
               
                <Route element={<SidebarLayout />}>
                  <Route path="/HospitalHome" element={<HospitalHome />} />
                  <Route path="/HospitalProfile" element={<HospitalProfile />} />
                  <Route path="/NewJob" element={<NewJob />} />
                  <Route path="/Hospital" element={<Hospital />} />
                </Route>
              </Routes>
            </div>
            <Footer />
            <ActionButtons />
          </div>
        </BrowserRouter>
      </HospitalAuthProvider>
    </AuthProvider>
  );
}
