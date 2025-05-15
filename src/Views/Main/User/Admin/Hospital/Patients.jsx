import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Token não encontrado");
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
      .catch((err) => {
        console.error(err);
        setError("Erro ao buscar pacientes");
      });
  }, [token]);

  return (
    <main>
      <h1>Pacientes do Hospital</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {patients.map((patient) => (
          <li key={patient.patient_id}>
            <strong>{patient.patient_name}</strong> - {patient.cpf}
          </li>
        ))}
      </ul>
    </main>
  );
}
