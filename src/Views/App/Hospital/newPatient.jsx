import React, { useState } from "react";
import { useTheme } from "../../../Services/Context/themeContext";

export default function NewPatient() {
  const { theme } = useTheme();

  const [patientData, setPatientData] = useState({
    patient_name: "",
    patient_address: "",
    cpf: "",
    email: "",
    birth_date: "",
    gender: "",
    phone: "",
    hospital_id: "",
  });

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://healthpoint-backend-production.up.railway.app/patients",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientData),
        }
      );

      if (response.ok) {
        alert("Paciente cadastrado com sucesso!");
        setPatientData({
          patient_name: "",
          patient_address: "",
          cpf: "",
          email: "",
          birth_date: "",
          gender: "",
          phone: "",
          hospital_id: "",
        });
      } else {
        alert("Erro ao cadastrar paciente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      alert("Erro ao cadastrar paciente.");
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center`}
      style={{ minHeight: "80vh", padding: "1rem" }}
    >
      <main
        className={`w-100 mx-auto p-4 rounded shadow-sm ${
          theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"
        }`}
        style={{ maxWidth: "700px", maxHeight: "90vh", overflowY: "auto" }}
      >
        <h2 className="mb-4 border-bottom pb-2 fw-bold">
          Cadastrar novo Paciente
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Linha 1: Nome + CPF */}
          <div className="row mb-3">
            <div className="col-md-7">
              <label htmlFor="patient_name" className="form-label">
                Nome
              </label>
              <input
                type="text"
                id="patient_name"
                name="patient_name"
                value={patientData.patient_name}
                onChange={handleChange}
                className={`form-control ${
                  theme === "dark" ? "bg-secondary text-light border-0" : ""
                }`}
                required
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="cpf" className="form-label">
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={patientData.cpf}
                onChange={handleChange}
                className={`form-control ${
                  theme === "dark" ? "bg-secondary text-light border-0" : ""
                }`}
                required
              />
            </div>
          </div>

          {/* Linha 2: Endereço + Hospital ID */}
          <div className="row mb-3">
            <div className="col-md-8">
              <label htmlFor="patient_address" className="form-label">
                Endereço
              </label>
              <input
                type="text"
                id="patient_address"
                name="patient_address"
                value={patientData.patient_address}
                onChange={handleChange}
                className={`form-control ${
                  theme === "dark" ? "bg-secondary text-light border-0" : ""
                }`}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="hospital_id" className="form-label">
                Hospital ID
              </label>
              <input
                type="text"
                id="hospital_id"
                name="hospital_id"
                value={patientData.hospital_id}
                onChange={handleChange}
                className={`form-control ${
                  theme === "dark" ? "bg-secondary text-light border-0" : ""
                }`}
                required
              />
            </div>
          </div>

          {/* Linha 3: Email + Telefone */}
          <div className="row mb-3">
            <div className="col-md-7">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={patientData.email}
                onChange={handleChange}
                className={`form-control ${
                  theme === "dark" ? "bg-secondary text-light border-0" : ""
                }`}
                required
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="phone" className="form-label">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={patientData.phone}
                onChange={handleChange}
                className={`form-control ${
                  theme === "dark" ? "bg-secondary text-light border-0" : ""
                }`}
                required
              />
            </div>
          </div>

          {/* Linha 4: Data de Nascimento + Gênero */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="birth_date" className="form-label">
                Data de Nascimento
              </label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={patientData.birth_date}
                onChange={handleChange}
                className={`form-control ${
                  theme === "dark" ? "bg-secondary text-light border-0" : ""
                }`}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">
                Gênero
              </label>
              <select
                id="gender"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
                className={`form-select ${
                  theme === "dark" ? "bg-secondary text-light border-0" : ""
                }`}
                required
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-100 ${
              theme === "dark" ? "btn-outline-light" : ""
            }`}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </div>
  );
}
