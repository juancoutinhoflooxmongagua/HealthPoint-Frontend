import React from "react";

export default function HospitalDashboard({ hospital }) {
  return (
    <div className="alert alert-success text-center" role="alert">
      <strong>Olá, {hospital.hospital_name}!</strong> Gerencie suas vagas e receba voluntários.
      <div className="row mt-3">
        <div className="col">
          <div className="card border-0 shadow-lg bg-success text-white text-center p-4">
            <h5 className="card-title fw-semibold">Minhas Vagas</h5>
            <p className="card-text">Gerencie as vagas para receber voluntários.</p>
            <a href="/HospitalDashboard" className="btn btn-outline-light rounded-pill">Ver Vagas</a>
          </div>
        </div>
      </div>
    </div>
  );
}
