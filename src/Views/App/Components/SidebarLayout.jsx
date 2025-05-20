// SidebarLayout.js
import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { useTheme } from "../../../Services/Context/themeContext";

export default function SidebarLayout() {
  const { logoutHospital } = useContext(HospitalAuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutHospital();
    navigate("/HospitalLogin");
  };

  // Define estilos dinâmicos para tema escuro/claro
  const isDark = theme === "dark";
  const sidebarClass = `border-end shadow d-flex flex-column justify-content-between ${
    isDark ? "bg-dark text-light" : "bg-white"
  }`;

  const mainStyle = {
    marginLeft: "250px",
    width: "100%",
    padding: "2rem",
    background: isDark ? "#1e1e1e" : "#f8f9fa",
    color: isDark ? "#f1f1f1" : "#212529"
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        className={sidebarClass}
        style={{
          width: "250px",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          padding: "1.5rem",
          zIndex: 1000
        }}
      >
        <div>
          <h4 className="mb-4">Painel</h4>
          <nav className="nav flex-column">
            <Link className="nav-link" to="/Notifications">🔔 Notificações</Link>
            <Link className="nav-link" to="/HospitalHome">🏠 Início</Link>
            <Link className="nav-link" to="/HospitalProfile">🏥 Perfil</Link>
            <Link className="nav-link" to="/NewJob">➕ Nova Vaga</Link>
            <Link className="nav-link" to="/NewPatients">🧑‍⚕️ Novo Paciente</Link>
            <Link className="nav-link" to="/Config">⚙️ Configurações</Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className={`btn ${isDark ? "btn-outline-light" : "btn-outline-danger"} mt-4`}
        >
          🚪 Sair
        </button>
      </aside>

      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
}
