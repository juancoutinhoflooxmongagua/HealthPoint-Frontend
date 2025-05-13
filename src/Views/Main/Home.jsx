import React, { useContext } from "react";
import { AuthContext } from "../../Context/authContext";
import { HospitalAuthContext } from "../../Context/hospitalContext";
import hospitalImage from "../../Assets/Images/Hospital room-bro.png";
import VolunteerImage from "../../Assets/Images/Volunteering-bro.png";

import UserDashboard from "./User/UserDashboard";
import HospitalDashboard from "./User/Admin/Hospital/HospitalDashboard";
import AdminDashboard from "../Main/User/Admin/AdminDashboard"

export default function Home() {
  const { user } = useContext(AuthContext);
  const { hospital } = useContext(HospitalAuthContext);

  const loggedAs = hospital ? 'hospital' : user ? 'user' : null;

  return (
    <div className="container">
      <div className="bg-primary text-white border-start border-4 border-light p-4 rounded shadow-sm mb-4">
        <h2 className="fw-bold mb-2">
          <i className="bi bi-heart-pulse-fill me-2"></i>Bem-vindo ao <span className="text-light">HealthPoint</span>
        </h2>
        <p className="text-light mb-0 small">Conectando voluntários e hospitais em uma só missão: salvar vidas.</p>
      </div>

      {loggedAs === 'user' && (
        user.user_role === "admin" ? (
          <AdminDashboard user={user} />
        ) : (
          <UserDashboard user={user} />
        )
      )}

      {loggedAs === 'hospital' && <HospitalDashboard hospital={hospital} />}

      {!loggedAs && (
        <div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100 border-0 shadow-lg bg-primary text-white">
                <img src={VolunteerImage} className="card-img-top" alt="Voluntário"
                  style={{ maxHeight: "220px", objectFit: "contain", padding: "1rem" }} />
                <div className="card-body text-center py-3">
                  <h5 className="card-title fw-semibold">Você quer ser voluntário?</h5>
                  <p className="card-text text-light mb-3">Cadastre-se como voluntário e ajude hospitais a salvar vidas.</p>
                  <a href="/register" className="btn btn-outline-light rounded-pill btn-md px-4">Quero ser voluntário</a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card h-100 border-0 shadow-lg bg-primary text-white">
                <img src={hospitalImage} className="card-img-top" alt="Hospital"
                  style={{ maxHeight: "220px", objectFit: "contain", padding: "1rem" }} />
                <div className="card-body text-center py-3">
                  <h5 className="card-title fw-semibold">Cadastrar meu hospital</h5>
                  <p className="card-text text-light mb-3">Registre seu hospital e receba voluntários rapidamente.</p>
                  <a href="/HospitalLogin" className="btn btn-outline-light rounded-pill btn-md px-4">Cadastrar hospital</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary text-center p-4 mt-5 rounded shadow-lg">
            <h4 className="text-white fw-bold mb-2">Faça parte desta missão!</h4>
            <p className="text-light small mb-0">Juntos, podemos fazer a diferença em milhares de vidas.</p>
          </div>
        </div>
      )}
    </div>
  );
}
