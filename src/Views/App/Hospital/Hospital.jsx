import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Hospital() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios
      .get("https://healthpoint-backend-production.up.railway.app/hospital")
      .then((res) => {
        setHospitals(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <main className="container my-5" style={{ maxWidth: "900px" }}>
      <h1 className="mb-4 text-primary text-center">Hospitais Cadastrados</h1>

      {hospitals.length > 0 ? (
        <div className="row g-4">
          {hospitals.map((hospital) => (
            <div className="col-md-6" key={hospital.hospital_id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h2 className="card-title h5 text-primary">{hospital.hospital_name}</h2>
                  <p className="mb-1"><strong>Endereço:</strong> {hospital.hospital_address}</p>
                  <p className="mb-1"><strong>Telefone:</strong> {hospital.hospital_phone}</p>
                  <p className="text-muted fst-italic" style={{ fontSize: "0.9rem" }}>
                    Criado em: {formatDate(hospital.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-secondary fs-5 mt-5">Nenhum hospital encontrado.</p>
      )}
    </main>
  );
}
