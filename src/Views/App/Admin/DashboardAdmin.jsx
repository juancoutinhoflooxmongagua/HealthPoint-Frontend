import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../Services/Context/themeContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const cards = [
    {
      icon: "bi-eye",
      title: "Vagas",
      path: "/jobs",
      description: "Gerencie e visualize as vagas disponíveis.",
    },
    {
      icon: "bi-plus-square",
      title: "Criar Vaga",
      path: "/NewJob",
      description: "Cadastre uma nova oportunidade de trabalho.",
    },
    {
      icon: "bi-person-lines-fill",
      title: "Usuários",
      path: "/SearchUsers",
      description: "Consulte os usuários cadastrados.",
    },
    {
      icon: "bi-file-earmark-text",
      title: "Aplicações",
      path: "/Requests",
      description: "Acompanhe as candidaturas nas vagas.",
    },
    {
      icon: "bi-trophy",
      title: "Leaderboard",
      path: "/leaderboard",
      description: "Veja os usuários com mais participações.",
    },
    {
      icon: "bi-house-door",
      title: "Novo Hospital",
      path: "/NewHospital",
      description: "Cadastre um novo hospital no sistema.",
    },
    {
      icon: "bi-hospital",
      title: "Hospitais",
      path: "/Hospital",
      description: "Gerencie os hospitais cadastrados.",
    },
    {
      icon: "bi-graph-up",
      title: "Estatísticas",
      path: "/Statistics",
      description: "Visualize métricas e dados do sistema.",
    },
  ];

  return (
    <main
      className={`container my-5 p-4 rounded shadow-sm ${
        isDark ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <h1 className="mb-4 fw-bold text-center">Painel Administrativo</h1>
      <p className="text-center mb-5 text-muted">
        Acesse rapidamente as funcionalidades e acompanhe a gestão da sua
        instituição.
      </p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {cards.map(({ icon, title, path, description }) => (
          <div key={title} className="col">
            <div
              className={`card h-100 shadow-sm border-0 ${
                isDark ? "bg-secondary text-light" : "bg-white text-dark"
              }`}
              style={{
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onClick={() => navigate(path)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 6px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0,0,0,0.08)";
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(path);
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-start">
                <div className="mb-3">
                  <i
                    className={`bi ${icon} fs-3 ${
                      isDark ? "text-light" : "text-primary"
                    }`}
                  ></i>
                </div>
                <h5 className="fw-bold">{title}</h5>
                <p className="text-muted small">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
