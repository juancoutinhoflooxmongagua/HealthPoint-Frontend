import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";

export default function Nav() {
  const { user, setUser } = useContext(AuthContext); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top py-2 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand text-white d-flex align-items-center" to="/">
          <i className="bi bi-hospital me-2" style={{ fontSize: "1.3rem" }}></i>HealthPoint
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
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/UserProfile">
                    Meu Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
