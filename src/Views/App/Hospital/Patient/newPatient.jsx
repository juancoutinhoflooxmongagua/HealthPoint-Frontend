import React, { useState, useContext } from "react";
import { useTheme } from "../../../../Services/Context/themeContext";
import { HospitalAuthContext } from "../../../../Services/Context/hospitalContext";
import { useMessage } from "../../../../Services/Context/messageContext";
import NewPatientForm from "./newPatientForm";

export default function NewPatient() {
  const { theme } = useTheme();
  const { hospital } = useContext(HospitalAuthContext);
  const { showMessage } = useMessage();

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
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
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
    <NewPatientForm
      patientData={patientData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      theme={theme}
    />
  );
}
