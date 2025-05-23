import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { AuthContext } from "../../../Services/Context/authContext";
import { useTheme } from "../../../Services/Context/themeContext";

export default function SidebarLayout() {
  const { logoutHospital, hospital } = useContext(HospitalAuthContext);
  const { logoutUser, user } = useContext(AuthContext);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const sidebarClass = `d-flex flex-column flex-shrink-0 p-3 border-end shadow ${
    isDark ? "bg-dark text-light" : "bg-white"
  }`;

  const mainStyle = {
    marginLeft: (hospital || user) ? "250px" : "0",
    width: "100%",
    padding: "2rem",
    background: isDark ? "#1e1e1e" : "#f8f9fa",
    color: isDark ? "#f1f1f1" : "#212529",
    minHeight: "100vh"
  };

  const handleLogout = () => {
    if (hospital) {
      logoutHospital();
    } else if (user) {
      logoutUser();
    }
  };

  const renderLinks = () => {
    if (hospital) {
      return (
        <>
          <Link className="nav-link" to="/Notifications">🔔 Notificações</Link>
          <Link className="nav-link" to="/HospitalHome">🏥 Início Hospital</Link>
          <Link className="nav-link" to="/HospitalProfile">🩺 Perfil Hospital</Link>
          <Link className="nav-link" to="/NewJob">➕ Nova Vaga</Link>
          <Link className="nav-link" to="/NewPatients">🧑‍⚕️ Novo Paciente</Link>
          <Link className="nav-link" to="/Config">⚙️ Configurações</Link>
        </>
      );
    } else if (user) {
      return (
        <>
          <Link className="nav-link" to="/Notifications">🔔 Notificações</Link>
          <Link className="nav-link" to="/UserProfile">👤 Meu Perfil</Link>
          <Link className="nav-link" to="/Jobs">💼 Vagas</Link>
          <Link className="nav-link" to="/Leaderboard">🏆 Ranking</Link>
          <Link className="nav-link" to="/Config">⚙️ Configurações</Link>
        </>
      );
    }
    return null;
  };

  return (
    <div style={{ display: "flex" }}>
      {(hospital || user) && (
        <aside
          className={sidebarClass}
          style={{
            width: "250px",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 1000
          }}
        >
          <div>
            <h4 className="mb-4">Painel</h4>
            <nav className="nav nav-pills flex-column">
              {renderLinks()}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className={`btn ${isDark ? "btn-outline-light" : "btn-outline-danger"} mt-4`}
          >
            🚪 Sair
          </button>
        </aside>
      )}

      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
}
