import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { HospitalAuthContext } from "../../../../Services/Context/hospitalContext";
import { useTheme } from "../../../../Services/Context/themeContext";
import { useMessage } from "../../../../Services/Context/messageContext"; 

export default function PatientsAccordion() {
  const { token } = useContext(HospitalAuthContext);
  const { theme } = useTheme();

  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Filtra pacientes pelo nome (case insensitive)
  const filteredPatients = patients.filter((patient) =>
    patient.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isDark = theme === "dark";

  return (
    <main className={`container py-5 ${isDark ? "bg-dark text-light" : ""}`}>
      <h1 className="mb-4">Lista de Pacientes</h1>

      {/* Input de busca */}
      <div className="mb-4">
        <input
          type="text"
          className={`form-control ${isDark ? "bg-secondary text-white border-0" : ""}`}
          placeholder="Buscar paciente pelo nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!error && filteredPatients.length === 0 && (
        <p>Nenhum paciente encontrado com esse nome.</p>
      )}

      <div className="accordion-simple">
        {filteredPatients.map((patient) => (
          <div key={patient.patient_id} className={`mb-3 border rounded ${isDark ? "border-secondary" : ""}`}>
            <button
              onClick={() => toggleOpen(patient.patient_id)}
              className={`w-100 text-start p-3 btn ${isDark ? "btn-dark text-white" : "btn-light"}`}
              style={{ cursor: "pointer" }}
              aria-expanded={openId === patient.patient_id}
            >
              {patient.patient_name}
              <span className="float-end">{openId === patient.patient_id ? "▲" : "▼"}</span>
            </button>

            {openId === patient.patient_id && (
              <div className={`p-3 ${isDark ? "bg-secondary text-white" : "bg-light"}`}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h5>Dados do Paciente</h5>
                    <ul className="list-unstyled">
                      <li><strong>ID:</strong> {patient.patient_id}</li>
                      <li><strong>CPF:</strong> {patient.cpf}</li>
                      <li><strong>Email:</strong> {patient.email}</li>
                      <li><strong>Data de Nascimento:</strong> {patient.birth_date}</li>
                      <li><strong>Gênero:</strong> {patient.gender}</li>
                      <li><strong>Telefone:</strong> {patient.phone}</li>
                      <li><strong>Endereço:</strong> {patient.address}</li>
                      <li><strong>Hospital ID:</strong> {patient.hospital_id}</li>
                      <li><strong>Registrado em:</strong> {new Date(patient.register).toLocaleString()}</li>
                    </ul>
                  </div>

                  <div className={`col-md-6 rounded p-3 ${isDark ? "bg-dark" : "bg-body-secondary"}`}>
                    <h5>Contato Familiar</h5>
                    <ul className="list-unstyled">
                      <li><strong>Nome:</strong> {patient.family_contact_name}</li>
                      <li><strong>Telefone:</strong> {patient.family_contact_phone}</li>
                      <li><strong>Parentesco:</strong> {patient.family_contact_relationship}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
