import React from "react";

export default function Home() {
  return (
    <div className="container mt-5 pt-4">
      <h1 className="mb-4 text-center text-success">Bem-vindo ao HealthPoint</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card h-100 shadow-sm">
            <img src="https://via.placeholder.com/400x200?text=Voluntário" className="card-img-top" alt="Voluntário" />
            <div className="card-body">
              <h5 className="card-title">Você quer ser voluntário?</h5>
              <p className="card-text">
                Cadastre-se como voluntário e ajude hospitais a salvar vidas. Seu tempo faz diferença.
              </p>
              <a href="/register" className="btn btn-success">Quero ser voluntário</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 shadow-sm">
            <img src="https://via.placeholder.com/400x200?text=Hospital" className="card-img-top" alt="Hospital" />
            <div className="card-body">
              <h5 className="card-title">Quero cadastrar o meu hospital</h5>
              <p className="card-text">
                Registre seu hospital na nossa plataforma e comece a receber voluntários rapidamente.
              </p>
              <a href="/register" className="btn btn-primary">Cadastrar hospital</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
