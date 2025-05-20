// SidebarLayout.js
import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";

export default function SidebarLayout() {
  const { logoutHospital } = useContext(HospitalAuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutHospital();
    navigate("/HospitalLogin");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        className="border-end bg-white shadow d-flex flex-column justify-content-between"
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
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-outline-danger mt-4"
        >
          🚪 Sair
        </button>
      </aside>

      <main
        style={{
          marginLeft: "250px",
          width: "100%",
          padding: "2rem",
          background: "#f8f9fa"
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
