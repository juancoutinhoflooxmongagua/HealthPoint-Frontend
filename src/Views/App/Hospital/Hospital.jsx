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

  return (
    <main>
      <h1>Hospitais Cadastrados</h1>

      {hospitals.length > 0 ? (
        <ul>
          {hospitals.map((hospital) => (
            <li key={hospital.hospital_id}>
              <h2>{hospital.hospital_name}</h2>
              <p><strong>Endereço:</strong> {hospital.hospital_address}</p>
              <p><strong>Telefone:</strong> {hospital.hospital_phone}</p>
              <p><strong>Criado no Sistema em:</strong> {hospital.created_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum hospital encontrado.</p>
      )}
    </main>
  );
}
