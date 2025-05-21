import React, { useState, useContext } from "react";
import { useTheme } from "../../../Services/Context/themeContext";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { useMessage } from "../../../Services/Context/messageContext"; // usa o hook useMessage

export default function NewPatient() {
  const { theme } = useTheme();
  const { hospital } = useContext(HospitalAuthContext);
  const { showMessage } = useMessage(); // pega showMessage

  const [patientData, setPatientData] = useState({
    patient_name: "",
    patient_address: "",
    cpf: "",
    email: "",
    birth_date: "",
    gender: "",
    phone: "",
    hospital_id: hospital ? hospital.id : "", 
  });

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...patientData,
      hospital_id: hospital ? hospital.id : patientData.hospital_id,
    };

    try {
      const response = await fetch(
        "https://healthpoint-backend-production.up.railway.app/patients",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        showMessage("✅ Paciente cadastrado com sucesso!", "success");
        setPatientData({
          patient_name: "",
          patient_address: "",
          cpf: "",
          email: "",
          birth_date: "",
          gender: "",
          phone: "",
          hospital_id: hospital ? hospital.id : "",
        });
      } else {
        const errorData = await response.json();
        showMessage(
          errorData.message || "❌ Erro ao cadastrar paciente. Verifique os dados.",
          "error"
        );
      }
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      showMessage("❌ Erro inesperado ao cadastrar paciente.", "error");
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
          {/* Linha 1 */}
          <div className="row mb-3">
            <div className="col-md-7">
              <label className="form-label">Nome</label>
              <input
                type="text"
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
              <label className="form-label">CPF</label>
              <input
                type="text"
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

          {/* Linha 2 */}
          <div className="row mb-3">
            <div className="col-md-8">
              <label className="form-label">Endereço</label>
              <input
                type="text"
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
              <label className="form-label">Hospital ID</label>
              <input
                type="text"
                name="hospital_id"
                value={patientData.hospital_id}
                onChange={handleChange}
                className={`form-control ${
                  theme === "dark" ? "bg-secondary text-light border-0" : ""
                }`}
                disabled
              />
            </div>
          </div>

          {/* Linha 3 */}
          <div className="row mb-3">
            <div className="col-md-7">
              <label className="form-label">Email</label>
              <input
                type="email"
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
              <label className="form-label">Telefone</label>
              <input
                type="tel"
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

          {/* Linha 4 */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">Data de Nascimento</label>
              <input
                type="date"
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
              <label className="form-label">Gênero</label>
              <select
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
