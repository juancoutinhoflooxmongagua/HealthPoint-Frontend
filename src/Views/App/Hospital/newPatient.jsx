import React, { useState } from "react";

export default function NewPatient() {
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
      const response = await fetch("https://healthpoint-backend-production.up.railway.app/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

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
    }
  };

  return (
    <main>
      <h2>Cadastrar novo Paciente</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="patient_name"
            value={patientData.patient_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Endereço:
          <input
            type="text"
            name="patient_address"
            value={patientData.patient_address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            name="cpf"
            value={patientData.cpf}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={patientData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Data de Nascimento:
          <input
            type="date"
            name="birth_date"
            value={patientData.birth_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gênero:
          <select name="gender" value={patientData.gender} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </label>
        <label>
          Telefone:
          <input
            type="tel"
            name="phone"
            value={patientData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Hospital ID:
          <input
            type="text"
            name="hospital_id"
            value={patientData.hospital_id}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );
}
