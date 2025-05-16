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

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {patients.map((patient) => (
          <div
            key={patient.patient_id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1.5rem",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "1rem", color: "#333" }}>{patient.patient_name}</h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
              <div style={{ flex: "1" }}>
                <h3>Dados do Paciente</h3>
                <p><strong>ID:</strong> {patient.patient_id}</p>
                <p><strong>CPF:</strong> {patient.cpf}</p>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>Data de Nascimento:</strong> {patient.birth_date}</p>
                <p><strong>Gênero:</strong> {patient.gender}</p>
                <p><strong>Telefone:</strong> {patient.phone}</p>
                <p><strong>Endereço:</strong> {patient.address}</p>
                <p><strong>Hospital ID:</strong> {patient.hospital_id}</p>
                <p><strong>Registrado em:</strong> {new Date(patient.register).toLocaleString()}</p>
              </div>

              <div style={{ flex: "1", backgroundColor: "#eef", padding: "1rem", borderRadius: "8px" }}>
                <h3>Contato Familiar</h3>
                <p><strong>Nome:</strong> {patient.family_contact_name}</p>
                <p><strong>Telefone:</strong> {patient.family_contact_phone}</p>
                <p><strong>Parentesco:</strong> {patient.family_contact_relationship}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
