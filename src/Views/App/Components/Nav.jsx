import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { AuthContext } from "../../../Services/Context/authContext";

export default function Nav() {
  const { user, logoutUser } = useContext(AuthContext);
  const { hospital, logoutHospital } = useContext(HospitalAuthContext);

  const handleLogout = () => {
    if (user) logoutUser();
    if (hospital) logoutHospital();
  };

  const loggedAs = hospital ? "hospital" : user ? "user" : null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          HealthPoint
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {loggedAs === "hospital" && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeclassname="active"
                    to="/HospitalProfile"
                  >
                    Perfil Hospital
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger ms-3"
                    type="button"
                  >
                    Sair
                  </button>
                </li>
              </>
            )}

            {loggedAs === "user" && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeclassname="active"
                    to="/UserProfile"
                  >
                    Perfil
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeclassname="active"
                    to="/Notifications"
                  >
                    Notificações
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger ms-3"
                    type="button"
                  >
                    Sair
                  </button>
                </li>
              </>
            )}

            {!loggedAs && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeclassname="active"
                    to="/login"
                  >
                    Login Usuário
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeclassname="active"
                    to="/HospitalLogin"
                  >
                    Login Hospital
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
