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
              <button className="btn btn-primary mt-2" onClick={() => navigate("/jobs")}>
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
              <i className="bi bi-person-lines-fill fs-1 text-primary"></i>
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
              <button className="btn btn-primary mt-2" onClick={() => navigate("/Requirements")}>
                Acessar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-primary mb-3 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-trophy fs-1 text-primary"></i>
              <h5 className="card-title mt-2 text-primary">Ver Leaderboard</h5>
              <button className="btn btn-primary mt-2" onClick={() => navigate("/leaderboard")}>
                Acessar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-primary mb-3 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-house-door fs-1 text-primary"></i>
              <h5 className="card-title mt-2 text-primary">Criar Novo Hospital</h5>
              <button className="btn btn-primary mt-2" onClick={() => navigate("/NewHospital")}>
                Acessar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-primary mb-3 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-hospital fs-1 text-primary"></i>
              <h5 className="card-title mt-2 text-primary">Gerenciar Hospitais</h5>
              <button className="btn btn-primary mt-2" onClick={() => navigate("/Hospital")}>
                Acessar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-primary mb-3 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-graph-up fs-1 text-primary"></i>
              <h5 className="card-title mt-2 text-primary">Ver Estatísticas</h5>
              <button className="btn btn-primary mt-2" onClick={() => navigate("/statistics")}>
                Acessar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
