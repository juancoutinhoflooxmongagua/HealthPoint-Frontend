import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { HospitalAuthContext } from "../../../../../Context/hospitalContext";

export default function Patients() {
  const { hospital, token } = useContext(HospitalAuthContext);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("Hospital não autenticado");
      return;
    }

    axios
      .get("https://healthpoint-backend-production.up.railway.app/patients", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPatients(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Erro ao buscar pacientes");
      });
  }, [token]);

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Lista de Pacientes</h1>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      {patients.length === 0 && !error && <p>Nenhum paciente encontrado.</p>}

      <div style={{ display: "grid", gap: "1rem" }}>
        {patients.map((patient) => (
          <div
            key={patient.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ margin: "0 0 0.5rem" }}>{patient.patient_name}</h2>
            <p><strong>ID:</strong> {patient.patient_id}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>CPF:</strong> {patient.cpf}</p>
            <p><strong>Data de Nascimento:</strong> {patient.birth_date}</p>
            <p><strong>Telefone:</strong> {patient.phone}</p>
            <p><strong>Endereço:</strong> {patient.address}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
