import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    { icon: "bi-eye", title: "Ver Vagas", path: "/jobs" },
    { icon: "bi-plus-square", title: "Criar Vaga", path: "/NewJob" },
    { icon: "bi-person-lines-fill", title: "Ver Usuários", path: "/SearchUsers" },
    { icon: "bi-file-earmark-text", title: "Ver Aplicações", path: "/Requests" },
    { icon: "bi-trophy", title: "Ver Leaderboard", path: "/leaderboard" },
    { icon: "bi-house-door", title: "Criar Novo Hospital", path: "/NewHospital" },
    { icon: "bi-hospital", title: "Gerenciar Hospitais", path: "/Hospital" },
    { icon: "bi-graph-up", title: "Ver Estatísticas", path: "/Statistics" },
  ];

  return (
    <main className="container my-5 p-4 bg-light rounded shadow-sm">
      <h1 className="mb-5 text-primary fw-bold text-center">Painel Administrativo Hospitalar</h1>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {cards.map(({ icon, title, path }) => (
          <div key={title} className="col">
            <div
              className="card h-100 border-primary shadow-sm hover-shadow"
              style={{ cursor: "pointer", transition: "transform 0.15s ease-in-out" }}
              onClick={() => navigate(path)}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') navigate(path); }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-primary">
                <i className={`bi ${icon} fs-1 mb-3`}></i>
                <h5 className="card-title text-center">{title}</h5>
                <button
                  className="btn btn-primary btn-lg mt-3 px-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(path);
                  }}
                >
                  Acessar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
