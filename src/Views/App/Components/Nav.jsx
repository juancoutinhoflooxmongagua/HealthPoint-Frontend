import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { AuthContext } from "../../../Services/Context/authContext";
export default function Nav() {
  const { user, logout: logoutUser } = useContext(AuthContext);
  const { hospital, logoutHospital } = useContext(HospitalAuthContext);

  const handleLogout = () => {
    if (user) logoutUser();
    if (hospital) logoutHospital();
  };

  const loggedAs = hospital ? 'hospital' : user ? 'user' : null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">HealthPoint</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {loggedAs === 'hospital' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/HospitalProfile">Perfil Hospital</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Sair</button>
                </li>
              </>
            )}
            {loggedAs === 'user' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/UserProfile">Perfil</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Sair</button>
                </li>
              </>
            )}
            {!loggedAs && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login Usuário</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/HospitalLogin">Login Hospital</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
