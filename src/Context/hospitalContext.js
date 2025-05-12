import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HospitalAuthContext = createContext();

export function HospitalAuthProvider({ children }) {
  const [hospital, setHospital] = useState(null);

  const fetchHospitalProfile = async (token) => {
    try {
      const { data } = await axios.get("https://healthpoint-backend-production.up.railway.app/hospital/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data?.hospital_id) {
        setHospital(data);
      } else {
        setHospital(null);
        localStorage.removeItem("hospitalToken");
      }
    } catch {
      setHospital(null);
      localStorage.removeItem("hospitalToken");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("hospitalToken");
    if (token) fetchHospitalProfile(token);
  }, []);

  const loginHospital = ({ hospital_id, token }) => {
    localStorage.setItem("hospitalToken", token);
    fetchHospitalProfile(token);
  };

  const logoutHospital = () => {
    localStorage.removeItem("hospitalToken");
    setHospital(null);
  };

  return (
    <HospitalAuthContext.Provider value={{ hospital, loginHospital, logoutHospital }}>
      {children}
    </HospitalAuthContext.Provider>
  );
}
