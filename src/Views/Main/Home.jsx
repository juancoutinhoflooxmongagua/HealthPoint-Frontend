import React, { useContext } from "react";
import { AuthContext } from "../../Context/authContext"; 
import hospitalImage from "../../Assets/Images/Hospital room-bro.png";
import VolunteerImage from "../../Assets/Images/Volunteering-bro.png";
import DashboardAdmin from "./User/Admin/DashboardAdmin";

export default function Home() {
  const { user } = useContext(AuthContext); 

  return (
    <div className="container">
      {/* Banner principal */}
      <div className="bg-primary text-white border-start border-4 border-light p-4 rounded shadow-sm mb-4">
        <h2 className="fw-bold mb-2">
          <i className="bi bi-heart-pulse-fill me-2"></i>Bem-vindo ao <span className="text-light">HealthPoint</span>
        </h2>
        <p className="text-light mb-0 small">Conectando voluntários e hospitais em uma só missão: salvar vidas.</p>
      </div>

      {user && (
        <main>
          <div className="alert alert-primary text-center" role="alert">
            <strong>Olá, {user.user_name}!</strong> Estamos felizes por tê-lo conosco na missão de salvar vidas.
          </div>

          {/* Dashboard Admin visível apenas para admins */}
          {user.user_role === "admin" && <DashboardAdmin />}

          {/* Mostrar o Painel de Usuário somente se o usuário não for admin */}
          {user.user_role !== "admin" && (
            <>
              <h3 className="mt-2">Painel De usuário</h3>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                <div className="col">
                  <div className="card h-100 border-0 shadow-lg bg-primary text-white d-flex flex-column">
                    <div className="card-body text-center py-3 d-flex flex-column justify-content-between">
                      <i className="bi bi-clipboard-check mb-3" style={{ fontSize: "2rem" }}></i>
                      <h5 className="card-title fw-semibold">Ver Vagas</h5>
                      <p className="card-text text-light mb-3">Confira as vagas disponíveis para voluntários em hospitais.</p>
                      <div className="mt-auto">
                        <a href="/Jobs" className="btn btn-outline-light rounded-pill btn-md px-4">Ver vagas</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card h-100 border-0 shadow-lg bg-primary text-white d-flex flex-column">
                    <div className="card-body text-center py-3 d-flex flex-column justify-content-between">
                      <i className="bi bi-building mb-3" style={{ fontSize: "2rem" }}></i>
                      <h5 className="card-title fw-semibold">Se tornar um hospital</h5>
                      <p className="card-text text-light mb-3">Registre seu hospital na plataforma e receba voluntários.</p>
                      <div className="mt-auto">
                        <a href="/DashboardAdmin" className="btn btn-outline-light rounded-pill btn-md px-4">Quero ser hospital</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      )}

      {!user && (
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
                  <a href="/register" className="btn btn-outline-light rounded-pill btn-md px-4">Cadastrar hospital</a>
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
