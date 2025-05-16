import React from "react";

export default function UserDashboard({ user }) {
  return (
    <>
      <h3 className="mt-2">Painel De Usuário</h3>
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
  );
}
