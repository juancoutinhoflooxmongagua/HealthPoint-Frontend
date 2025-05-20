import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Views/Assets/Css/index.css';

// Contexts
import { AuthProvider } from "./Services/Context/authContext";
import { HospitalAuthProvider } from "./Services/Context/hospitalContext";
import { ThemeProvider } from "./Services/Context/themeContext";

// Components
import Nav from "./Views/App/Components/Nav";
import Footer from "./Views/App/Components/Footer";
import ActionButtons from "./Views/App/Components/ActionButtons";
import SidebarLayout from "./Views/App/Components/SidebarLayout";
import NotificationsPage from "./Views/App/Components/Notifications";

// Basics
import Register from "./Views/App/Home/Register";
import Login from "./Views/App/Home/Login";
import Home from "./Views/App/Home/Home";
import Jobs from "./Views/App/Jobs/Jobs";
import ConfigPage from "./Views/App/Components/Config";

// Users
import UserProfile from "./Views/App/Users/UserProfile";
import Leaderboard from "./Views/App/Jobs/Leaderboard";

// Admin
import SearchUsers from "./Views/App/Admin/SearchUsers";
import Hospital from "./Views/App/hospital/Hospital";
import NewHospital from "./Views/App/hospital/NewHospital";
import DashboardAdmin from "./Views/App/Admin/DashboardAdmin";
import Statistics from "./Views/App/Admin/Statistics";
import Requests from "./Views/App/Admin/Requests";
import Application from "./Views/App/Admin/application";

// Hospital
import HospitalLogin from "./Views/App/hospital/HospitalLogin";
import NewJob from "./Views/App/Jobs/NewJob";
import HospitalProfile from "./Views/App/hospital/HospitalProfile";
import HospitalHome from "./Views/App/hospital/HospitalHome";
import Patients from "./Views/App/hospital/Patients";
import NewPatient from "./Views/App/hospital/newPatient";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HospitalAuthProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Nav></Nav>
            <div className="main">
              {/* Navbar sempre visível */}
              <div className="rgb-tape"></div>

              <Routes>
                {/* Rotas sem Sidebar */}
                <Route path="/" element={<div className="w-100 px-4 mt-5 pt-3"><Home /></div>} />
                <Route path="/register" element={<div className="w-100 px-4 mt-5 pt-3"><Register /></div>} />
                <Route path="/login" element={<div className="w-100 px-4 mt-5 pt-3"><Login /></div>} />
                <Route path="/HospitalLogin" element={<div className="w-100 px-4 mt-5 pt-3"><HospitalLogin /></div>} />
                <Route path="/UserProfile" element={<div className="w-100 px-4 mt-5 pt-3"><UserProfile /></div>} />
                <Route path="/Jobs" element={<div className="w-100 px-4 mt-5 pt-3"><Jobs /></div>} />
                <Route path="/Jobs/:id" element={<div className="w-100 px-4 mt-5 pt-3"><Jobs /></div>} />
                <Route path="/SearchUsers" element={<div className="w-100 px-4 mt-5 pt-3"><SearchUsers /></div>} />
                <Route path="/Application" element={<div className="w-100 px-4 mt-5 pt-3"><Application /></div>} />
                <Route path="/DashboardAdmin" element={<div className="w-100 px-4 mt-5 pt-3"><DashboardAdmin /></div>} />
                <Route path="/Statistics" element={<div className="w-100 px-4 mt-5 pt-3"><Statistics /></div>} />
                <Route path="/NewHospital" element={<div className="w-100 px-4 mt-5 pt-3"><NewHospital /></div>} />
                <Route path="/Leaderboard" element={<div className="w-100 px-4 mt-5 pt-3"><Leaderboard /></div>} />
                <Route path="/Requests" element={<div className="w-100 px-4 mt-5 pt-3"><Requests /></div>} />

                {/* Rotas com Sidebar */}
                <Route element={<SidebarLayout />}>
                  <Route path="/Notifications" element={<div className="w-100 px-4 mt-5 pt-3"><NotificationsPage /></div>} />
                  <Route path="/Config" element={<ConfigPage />} />
                  <Route path="/HospitalHome" element={<HospitalHome />} />
                  <Route path="/HospitalProfile" element={<HospitalProfile />} />
                  <Route path="/NewJob" element={<NewJob />} />
                  <Route path="/Hospital" element={<Hospital />} />
                  <Route path="/Patients" element={<Patients />} />
                  <Route path="/NewPatients" element={<NewPatient />} />
                </Route>
              </Routes>

              <Footer />
              <ActionButtons />
            </div>
          </BrowserRouter>
        </HospitalAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
