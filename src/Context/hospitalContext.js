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
        // Se os dados do hospital forem válidos, armazenamos no estado
        setHospital(data);
      } else {
        // Caso os dados não sejam válidos, limpamos o estado
        setHospital(null);
        localStorage.removeItem("hospitalToken");
      }
    } catch (error) {
      console.error("Erro ao buscar perfil do hospital:", error);
      setHospital(null);
      localStorage.removeItem("hospitalToken");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("hospitalToken");
    if (token) {
      fetchHospitalProfile(token);
    }
  }, []);

  const loginHospital = ({ hospital_id, token }) => {
    localStorage.setItem("hospitalToken", token);
    setHospital({ hospital_id, token });  // Atualiza o estado com os dados do hospital
    fetchHospitalProfile(token);  // Carrega o perfil do hospital após o login
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
