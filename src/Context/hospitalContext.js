import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HospitalAuthContext = createContext();

export function HospitalAuthProvider({ children }) {
  const [hospital, setHospital] = useState(null);
  const token = localStorage.getItem("hospitalToken");

  useEffect(() => {
    if (token) {
      axios
        .get("https://healthpoint-backend-production.up.railway.app/hospitals/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setHospital(res.data))
        .catch(() => {
          setHospital(null);
          localStorage.removeItem("hospitalToken");
        });
    }
  }, [token]);

  return (
    <HospitalAuthContext.Provider value={{ hospital, setHospital }}>
      {children}
    </HospitalAuthContext.Provider>
  );
}
