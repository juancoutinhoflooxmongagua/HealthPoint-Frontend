import React from "react";
import { useTheme } from "../../../Services/Context/themeContext";

export default function Config() {
  const { theme, toggleTheme } = useTheme();

  const getThemeName = () => {
    if (theme === "light") return "Claro";
    if (theme === "dark") return "Escuro";
    if (theme === "frutiger") return "Frutiger Aero";
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h5 className="mb-0">Configurações</h5>
      </div>
      <div className="card-body">
        <h6 className="card-subtitle mb-3 text-muted">
          Tema Atual: {getThemeName()}
        </h6>
        <button onClick={toggleTheme} className="btn btn-primary">
          Alternar Tema
        </button>
      </div>
    </div>
  );
}
