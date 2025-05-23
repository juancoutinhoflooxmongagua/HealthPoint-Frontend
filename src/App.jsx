import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Views/Assets/Css/index.css';
import { AuthProvider } from "./Services/Context/authContext";
import { HospitalAuthProvider } from "./Services/Context/hospitalContext";
import { ThemeProvider } from "./Services/Context/themeContext";
import { MessageProvider } from "./Services/Context/messageContext";
import Nav from "./Views/App/Components/Nav";
import Footer from "./Views/App/Components/Footer";
import ActionButtons from "./Views/App/Components/ActionButtons";
import SidebarLayout from "./Views/App/Components/SidebarLayout";
import NotificationsPage from "./Views/App/Components/Notifications";
import ConfigPage from "./Views/App/Components/Config";
import Register from "./Views/App/Home/Register";
import Login from "./Views/App/Home/Login";
import Home from "./Views/App/Home/Home";
import Jobs from "./Views/App/Jobs/Jobs";
import UserProfile from "./Views/App/Users/UserProfile";
import Leaderboard from "./Views/App/Jobs/Leaderboard";
import SearchUsers from "./Views/App/Admin/SearchUsers";
import Hospital from "./Views/App/Hospital/Hospital.jsx";
import NewHospital from "./Views/App/Hospital/NewHospital";
import DashboardAdmin from "./Views/App/Admin/DashboardAdmin";
import Statistics from "./Views/App/Admin/Statistics";
import Requests from "./Views/App/Admin/Requests";
import Application from "./Views/App/Admin/application";
import HospitalLogin from "./Views/App/Hospital/HospitalLogin";
import NewJob from "./Views/App/Jobs/NewJob";
import HospitalProfile from "./Views/App/Hospital/HospitalProfile";
import HospitalHome from "./Views/App/Hospital/HospitalHome";
import Patients from "./Views/App/Hospital/Patient/Patients";
import NewPatient from "./Views/App/Hospital/Patient/newPatient";

export default function App() {
  return (
    <MessageProvider>
      <ThemeProvider>
        <AuthProvider>
          <HospitalAuthProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Nav />
              <div className="flex min-h-screen">
                <SidebarLayout />
                <main className="flex-1 bg-gray-50 dark:bg-gray-900 transition-all duration-300 md:ml-64">
                  <div className="p-6 pt-20">
                    <Routes>

                      {/* Rotas públicas */}
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/HospitalLogin" element={<HospitalLogin />} />
                      <Route path="/NewHospital" element={<NewHospital />} />

                      {/* Rotas privadas */}
                      <Route path="/" element={<Home />} />
                      <Route path="/UserProfile" element={<UserProfile />} />
                      <Route path="/Jobs" element={<Jobs />} />
                      <Route path="/Jobs/:id" element={<Jobs />} />
                      <Route path="/Leaderboard" element={<Leaderboard />} />
                      <Route path="/HospitalHome" element={<HospitalHome />} />
                      <Route path="/HospitalProfile" element={<HospitalProfile />} />
                      <Route path="/NewJob" element={<NewJob />} />
                      <Route path="/Patients" element={<Patients />} />
                      <Route path="/NewPatients" element={<NewPatient />} />
                      <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
                      <Route path="/SearchUsers" element={<SearchUsers />} />
                      <Route path="/Application" element={<Application />} />
                      <Route path="/Statistics" element={<Statistics />} />
                      <Route path="/Requests" element={<Requests />} />
                      <Route path="/Hospital" element={<Hospital />} />
                      <Route path="/Notifications" element={<NotificationsPage />} />
                      <Route path="/Config" element={<ConfigPage />} />
                    </Routes>
                  </div>
                </main>
              </div>
              <Footer />
              <ActionButtons />
            </BrowserRouter>
          </HospitalAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </MessageProvider>
  );
}