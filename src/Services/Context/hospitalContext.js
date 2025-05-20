import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HospitalAuthContext = createContext();

export function HospitalAuthProvider({ children }) {
  const [hospital, setHospital] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("hospitalToken") || null);
  const [isLoading, setIsLoading] = useState(true); // NOVO: para controle de carregamento

  const fetchHospitalProfile = async (tokenToUse) => {
    try {
      const { data } = await axios.get(
        "https://healthpoint-backend-production.up.railway.app/hospital/profile",
        { headers: { Authorization: `Bearer ${tokenToUse}` } }
      );

      if (data?.hospital_id) {
        console.log("Perfil do hospital carregado:", data);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchHospitalProfile(token);
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const loginHospital = ({ token: newToken }) => {
    localStorage.setItem("hospitalToken", newToken);
    setToken(newToken);
    // ⚠️ Removido: setHospital({ hospital_id });
    fetchHospitalProfile(newToken);
  };

  const logoutHospital = () => {
    localStorage.removeItem("hospitalToken");
    setHospital(null);
    setToken(null);
  };

  return (
    <HospitalAuthContext.Provider
      value={{
        hospital,
        token,
        loginHospital,
        logoutHospital,
        isLoading, // exposto para componentes poderem usar
      }}
    >
      {children}
    </HospitalAuthContext.Provider>
  );
}
