// Views/App/Components/Config.jsx
import React from "react";
import { useTheme } from "../../../Services/Context/themeContext"; // <-- Correto

export default function Config() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h5 className="mb-0">Configurações</h5>
      </div>
      <div className="card-body">
        <h6 className="card-subtitle mb-3 text-muted">Tema Atual: {theme === "light" ? "Claro" : "Escuro"}</h6>
        <button onClick={toggleTheme} className="btn btn-primary">
          Alternar Tema
        </button>
      </div>
    </div>
  );
}
