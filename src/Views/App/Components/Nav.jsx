import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { AuthContext } from "../../../Services/Context/authContext";

export default function Nav() {
  const { user, logoutUser } = useContext(AuthContext);
  const { hospital, logoutHospital } = useContext(HospitalAuthContext);

  const handleLogout = () => {
    if (user) logoutUser();
    if (hospital) logoutHospital();
  };

  const loggedAs = hospital ? 'hospital' : user ? 'user' : null;

  return (
    <nav>
      <header>
        <h1>
          <Link to="/">HealthPoint</Link>
        </h1>
        <ul>
          {loggedAs === 'hospital' && (
            <>
              <li>
                <Link to="/HospitalProfile">Perfil Hospital</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Sair</button>
              </li>
            </>
          )}

          {loggedAs === 'user' && (
            <>
              <li>
                <Link to="/UserProfile">Perfil</Link>
              </li>
              <li>
                <Link to="/Notifications">Notificações</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Sair</button>
              </li>
            </>
          )}

          {!loggedAs && (
            <>
              <li>
                <Link to="/login">Login Usuário</Link>
              </li>
              <li>
                <Link to="/HospitalLogin">Login Hospital</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </nav>
  );
}
