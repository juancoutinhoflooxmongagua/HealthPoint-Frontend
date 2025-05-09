import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="container mt-5">
      <h1 className="mb-4 text-primary">Painel Administrativo Hospitalar</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="card border-primary mb-3 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-eye fs-1 text-primary"></i>
              <h5 className="card-title mt-2 text-primary">Ver Vagas</h5>
              <button className="btn btn-primary mt-2" onClick={() => navigate("/Jobs")}>
                Acessar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-primary mb-3 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-plus-square fs-1 text-primary"></i>
              <h5 className="card-title mt-2 text-primary">Criar Vaga</h5>
              <button className="btn btn-primary mt-2" onClick={() => navigate("/NewJob")}>
                Acessar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-primary mb-3 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-people fs-1 text-primary"></i>
              <h5 className="card-title mt-2 text-primary">Ver Usuários</h5>
              <button className="btn btn-primary mt-2" onClick={() => navigate("/SearchUsers")}>
                Acessar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-primary mb-3 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-file-earmark-text fs-1 text-primary"></i>
              <h5 className="card-title mt-2 text-primary">Ver Aplicações</h5>
              <button className="btn btn-primary mt-2" onClick={() => navigate("/Application")}>
                Acessar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
