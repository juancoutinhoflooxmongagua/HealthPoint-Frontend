import React from "react";
import hospitalImage from "../../Assets/Images/Hospital room-bro.png";
import VolunteerImage from "../../Assets/Images/Volunteering-bro.png";

export default function Home() {
  return (
    <div className="container">
      <div className="bg-success p-5 rounded shadow-sm mb-4 text-center">
        <h1 className=" mb-2 text-light">Bem-vindo ao <span>HealthPoint</span></h1>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-3">
        <div className="col">
          <div className="card h-100 shadow-sm">
            <img
              src={VolunteerImage}
              className="card-img-top"
              alt="Voluntário"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
            <div className="card-body py-3">
              <h5 className="card-title fs-5">Você quer ser voluntário?</h5>
              <p className="card-text small">
                Cadastre-se como voluntário e ajude hospitais a salvar vidas. Seu tempo faz diferença.
              </p>
              <a href="/register" className="btn btn-success btn-sm">Quero ser voluntário</a>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 shadow-sm">
            <img
              src={hospitalImage}
              className="card-img-top"
              alt="Hospital"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
            <div className="card-body py-3">
              <h5 className="card-title fs-5">Quero cadastrar o meu hospital</h5>
              <p className="card-text small">
                Registre seu hospital na nossa plataforma e comece a receber voluntários rapidamente.
              </p>
              <a href="/register" className="btn btn-primary btn-sm">Cadastrar hospital</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-success p-5 mt-3 rounded shadow-sm mb-4 text-center">
        <h1 className=" mb-2 text-light">Faça parte desta Missão!</h1>
      </div>

    </div>
  );
}
