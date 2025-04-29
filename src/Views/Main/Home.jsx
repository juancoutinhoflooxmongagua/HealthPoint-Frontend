import React from "react";
import hospitalImage from "../../Assets/Images/Hospital room-bro.png";
import VolunteerImage from "../../Assets/Images/Volunteering-bro.png";

export default function Home() {
  return (
    <div className="container">
      {/* Banner principal */}
      <div className="bg-white border-start border-4 border-success p-4 rounded shadow-sm mb-4">
        <h2 className="fw-bold mb-2 text-success">
          <i className="bi bi-heart-pulse-fill me-2"></i>Bem-vindo ao <span className="text-dark">HealthPoint</span>
        </h2>
        <p className="text-muted mb-0 small">Conectando voluntários e hospitais em uma só missão: salvar vidas.</p>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 g-4">
        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <img
              src={VolunteerImage}
              className="card-img-top"
              alt="Voluntário"
              style={{ maxHeight: "220px", objectFit: "contain", padding: "1rem" }}
            />
            <div className="card-body text-center py-3">
              <h5 className="card-title fw-semibold text-success">Você quer ser voluntário?</h5>
              <p className="card-text text-muted small mb-3">
                Cadastre-se como voluntário e ajude hospitais a salvar vidas.
              </p>
              <a href="/register" className="btn btn-outline-success rounded-pill btn-md px-4">
                Quero ser voluntário
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <img
              src={hospitalImage}
              className="card-img-top"
              alt="Hospital"
              style={{ maxHeight: "220px", objectFit: "contain", padding: "1rem" }}
            />
            <div className="card-body text-center py-3">
              <h5 className="card-title fw-semibold text-primary">Cadastrar meu hospital</h5>
              <p className="card-text text-muted small mb-3">
                Registre seu hospital e receba voluntários rapidamente.
              </p>
              <a href="/register" className="btn btn-outline-primary rounded-pill btn-md px-4">
                Cadastrar hospital
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="bg-light text-center p-4 mt-5 rounded shadow-sm">
        <h4 className="text-success fw-bold mb-2">Faça parte desta missão!</h4>
        <p className="text-muted small mb-0">Juntos, podemos fazer a diferença em milhares de vidas.</p>
      </div>
    </div>
  );
}
