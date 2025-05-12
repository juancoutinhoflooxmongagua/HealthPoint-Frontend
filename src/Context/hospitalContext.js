import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HospitalAuthContext = createContext();

export function HospitalAuthProvider({ children }) {
  const [hospital, setHospital] = useState(null);
  const token = localStorage.getItem("hospitalToken");

  useEffect(() => {
    if (token) {
      axios
        .get("https://healthpoint-backend-production.up.railway.app/hospital/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setHospital(res.data))
        .catch((err) => {
          console.error("Erro no backend:", err); // Exibe mais detalhes do erro
          setHospital(null);
          localStorage.removeItem("hospitalToken"); // Limpa o token caso a autenticação falhe
        });
    } else {
      setHospital(null); // Limpa o hospital caso não haja token
    }
  }, [token]);

  return (
    <HospitalAuthContext.Provider value={{ hospital, setHospital }}>
      {children}
    </HospitalAuthContext.Provider>
  );
}
