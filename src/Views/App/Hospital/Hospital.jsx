import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Hospital() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredHospitals = hospitals.filter((hospital) => {
    const searchLower = search.toLowerCase();
    return (
      hospital.hospital_name.toLowerCase().includes(searchLower) ||
      hospital.hospital_address.toLowerCase().includes(searchLower) ||
      hospital.hospital_phone.toLowerCase().includes(searchLower)
    );
  });

  return (
    <main className="container my-5" style={{ maxWidth: "1000px" }}>
      <h1 className="mb-4 text-center fw-bold text-primary">
        🏥 Hospitais Cadastrados
      </h1>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Pesquisar por nome, endereço ou telefone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredHospitals.length > 0 ? (
        <div className="row g-4">
          {filteredHospitals.map((hospital) => (
            <div className="col-md-6 col-lg-4" key={hospital.hospital_id}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{ transition: "transform 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary fw-semibold">
                    {hospital.hospital_name}
                  </h5>
                  <p className="mb-2">
                    <strong>📍 Endereço:</strong> {hospital.hospital_address}
                  </p>
                  <p className="mb-2">
                    <strong>📞 Telefone:</strong> {hospital.hospital_phone}
                  </p>
                  <p className="text-muted fst-italic" style={{ fontSize: "0.85rem" }}>
                    Criado em: {formatDate(hospital.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-secondary fs-5 mt-5">
          Nenhum hospital encontrado.
        </p>
      )}
    </main>
  );
}
