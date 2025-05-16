import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HospitalAuthContext = createContext();

export function HospitalAuthProvider({ children }) {
  const [hospital, setHospital] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("hospitalToken") || null);

  const fetchHospitalProfile = async (tokenToUse) => {
    try {
      const { data } = await axios.get(
        "https://healthpoint-backend-production.up.railway.app/hospital/profile",
        { headers: { Authorization: `Bearer ${tokenToUse}` } }
      );

      if (data?.hospital_id) {
        setHospital(data);
        setToken(tokenToUse);
      } else {
        setHospital(null);
        setToken(null);
        localStorage.removeItem("hospitalToken");
      }
    } catch (error) {
      console.error("Erro ao buscar perfil do hospital:", error);
      setHospital(null);
      setToken(null);
      localStorage.removeItem("hospitalToken");
    }
  };

  useEffect(() => {
    if (token) {
      fetchHospitalProfile(token);
    }
  }, [token]);

  const loginHospital = ({ hospital_id, token: newToken }) => {
    localStorage.setItem("hospitalToken", newToken);
    setToken(newToken);
    setHospital({ hospital_id }); // vai atualizar com fetch do perfil
    fetchHospitalProfile(newToken);
  };

  const logoutHospital = () => {
    localStorage.removeItem("hospitalToken");
    setHospital(null);
    setToken(null);
  };

  return (
    <HospitalAuthContext.Provider value={{ hospital, token, loginHospital, logoutHospital }}>
      {children}
    </HospitalAuthContext.Provider>
  );
}
