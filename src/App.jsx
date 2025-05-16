import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/Assets/Css/index.css';

import Nav from "./Views/App/Components/Nav";
import Register from "./Views/App/Home/Register";
import Login from "./Views/Main/Login";
import Home from "./Views/Main/Home";
import Jobs from "./Views/App/Jobs/Jobs";
import UserProfile from "./Views/Main/User/UserProfile";
import Footer from "./Views/App/Components/Footer";
import SearchUsers from "../src/Views/Main/User/Admin/SearchUsers";
import Application from "./Views/App/Admin/application";
import { AuthProvider } from "./Services/Context/authContext";   
import DashboardAdmin from "./Views/App/Admin/DashboardAdmin";
import NewJob from "./Views/App/Jobs/NewJob";
import ActionButtons from "./Views/App/Components/ActionButtons";
import Statistics from "./Views/App/Admin/Statistics";
import NewHospital from "./Views/App/Hospital/NewHospital";
import Hospital from "./Views/App/Hospital/Hospital";
import Leaderboard from "./Views/App/Jobs/Leaderboard";
import Requests from "./Views/App/Admin/Requests";
import HospitalLogin from "./Views/Main/User/Admin/Hospital/HospitalLogin";
import { HospitalAuthProvider } from "./Services/Context/hospitalContext";
import HospitalProfile from "./Views/Main/User/Admin/Hospital/HospitalProfile";
import HospitalHome from "./Views/App/Hospital/HospitalHome";
import SidebarLayout from "./Views/App/Components/SidebarLayout";
import Patients from "./Views/Main/User/Admin/Hospital/Patients";
import NewPatient from "./Views/App/Hospital/newPatient";

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
                  <Route path="/Patients" element={<Patients />} />
                  <Route path="/NewPatients" element={<NewPatient />} />
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
