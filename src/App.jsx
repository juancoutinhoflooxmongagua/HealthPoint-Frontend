import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./Services/Context/authContext";
import { HospitalAuthProvider } from "./Services/Context/hospitalContext";
import { ThemeProvider } from "./Services/Context/themeContext";
import { MessageProvider } from "./Services/Context/messageContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Nav from "./Views/App/Components/Nav";
import Footer from "./Views/App/Components/Footer";

import Register from "./Views/App/Home/Register";
import Login from "./Views/App/Home/Login";
import Home from "./Views/App/Home/Home";
import HospitalLogin from "./Views/App/Hospital/HospitalLogin";
import NewHospital from "./Views/App/Hospital/NewHospital";
import UserProfile from "./Views/App/Users/UserProfile";
import Jobs from "./Views/App/Jobs/Jobs";
import Leaderboard from "./Views/App/Jobs/Leaderboard";
import NotificationsPage from "./Views/App/Components/Notifications";
import ConfigPage from "./Views/App/Components/Config";
import HospitalHome from "./Views/App/Hospital/HospitalHome";
import HospitalProfile from "./Views/App/Hospital/HospitalProfile";
import NewJob from "./Views/App/Jobs/NewJob";
import Patients from "./Views/App/Hospital/Patient/Patients";
import NewPatient from "./Views/App/Hospital/Patient/newPatient";
import DashboardAdmin from "./Views/App/Admin/DashboardAdmin";
import SearchUsers from "./Views/App/Admin/SearchUsers";
import Application from "./Views/App/Admin/application";
import Statistics from "./Views/App/Admin/Statistics";
import Requests from "./Views/App/Admin/Requests";
import Hospital from "./Views/App/Hospital/Hospital.jsx";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/HospitalLogin" element={<PageTransition><HospitalLogin /></PageTransition>} />
        <Route path="/NewHospital" element={<PageTransition><NewHospital /></PageTransition>} />

        <Route path="/UserProfile" element={<PageTransition><UserProfile /></PageTransition>} />
        <Route path="/Jobs" element={<PageTransition><Jobs /></PageTransition>} />
        <Route path="/Jobs/:id" element={<PageTransition><Jobs /></PageTransition>} />
        <Route path="/Leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
        <Route path="/Notifications" element={<PageTransition><NotificationsPage /></PageTransition>} />
        <Route path="/Config" element={<PageTransition><ConfigPage /></PageTransition>} />
        <Route path="/HospitalHome" element={<PageTransition><HospitalHome /></PageTransition>} />
        <Route path="/HospitalProfile" element={<PageTransition><HospitalProfile /></PageTransition>} />
        <Route path="/NewJob" element={<PageTransition><NewJob /></PageTransition>} />
        <Route path="/Patients" element={<PageTransition><Patients /></PageTransition>} />
        <Route path="/NewPatients" element={<PageTransition><NewPatient /></PageTransition>} />
        <Route path="/DashboardAdmin" element={<PageTransition><DashboardAdmin /></PageTransition>} />
        <Route path="/SearchUsers" element={<PageTransition><SearchUsers /></PageTransition>} />
        <Route path="/Application" element={<PageTransition><Application /></PageTransition>} />
        <Route path="/Statistics" element={<PageTransition><Statistics /></PageTransition>} />
        <Route path="/Requests" element={<PageTransition><Requests /></PageTransition>} />
        <Route path="/Hospital" element={<PageTransition><Hospital /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <MessageProvider>
      <ThemeProvider>
        <AuthProvider>
          <HospitalAuthProvider>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Nav />
                
                <div className="flex-1 pt-16">
                  <AnimatedRoutes />
                </div>
                
                <Footer />
              </div>
            </BrowserRouter>
          </HospitalAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </MessageProvider>
  );
}