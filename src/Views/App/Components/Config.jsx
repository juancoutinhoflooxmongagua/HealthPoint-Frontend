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
    <div
      className={`d-flex justify-content-center align-items-center`}
      style={{ minHeight: "80vh", padding: "1rem" }}
    >
      <div
        className={`card shadow-sm p-4 w-100 ${
          theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"
        }`}
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-4 text-center">
          <h1 className="fw-bold border-bottom pb-3">Configurações</h1>
        </div>

        <div className="mb-4">
          <h6 className="text-muted">
            Tema Atual:{" "}
            <span className="fw-semibold">{getThemeName()}</span>
          </h6>
        </div>

        <div className="d-grid gap-2">
          <button
            onClick={toggleTheme}
            className={`btn btn-${
              theme === "dark" ? "light" : "primary"
            } btn-lg`}
          >
            Alternar Tema
          </button>
        </div>
      </div>
    </div>
  );
}
