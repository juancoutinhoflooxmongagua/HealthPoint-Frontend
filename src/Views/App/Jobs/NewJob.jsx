import React, { useState } from "react";
import axios from "axios";

export default function NewJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobPoint, setJobPoint] = useState("");
  const [jobType, setJobType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://healthpoint-backend-production.up.railway.app/jobs",
        {
          job_title: jobTitle,
          job_description: jobDescription,
          job_points: jobPoint,
          job_type: jobType,
        }
      );
      alert("Trabalho cadastrado com sucesso!");
      // Resetar campos após sucesso
      setJobTitle("");
      setJobDescription("");
      setJobPoint("");
      setJobType("");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar trabalho.");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Cadastrar Novo Trabalho</h2>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="job_title" style={{ marginBottom: 4, fontWeight: "600" }}>Título do Trabalho</label>
          <input
            type="text"
            id="job_title"
            name="job_title"
            placeholder="Título do Trabalho"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            style={{
              padding: "8px 12px",
              borderRadius: 5,
              border: "1px solid #ccc",
              fontSize: 16,
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => (e.target.style.borderColor = "#007bff")}
            onBlur={e => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="job_description" style={{ marginBottom: 4, fontWeight: "600" }}>Descrição do Trabalho</label>
          <input
            type="text"
            id="job_description"
            name="job_description"
            placeholder="Descrição do Trabalho"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            style={{
              padding: "8px 12px",
              borderRadius: 5,
              border: "1px solid #ccc",
              fontSize: 16,
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => (e.target.style.borderColor = "#007bff")}
            onBlur={e => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="job_points" style={{ marginBottom: 4, fontWeight: "600" }}>Pontos</label>
          <input
            type="number"
            id="job_points"
            name="job_points"
            placeholder="Pontos"
            value={jobPoint}
            onChange={(e) => setJobPoint(e.target.value)}
            required
            min="0"
            style={{
              padding: "8px 12px",
              borderRadius: 5,
              border: "1px solid #ccc",
              fontSize: 16,
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => (e.target.style.borderColor = "#007bff")}
            onBlur={e => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="job_type" style={{ marginBottom: 4, fontWeight: "600" }}>Tipo de trabalho</label>
          <input
            type="text"
            id="job_type"
            name="job_type"
            placeholder="Tipo de trabalho"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
            style={{
              padding: "8px 12px",
              borderRadius: 5,
              border: "1px solid #ccc",
              fontSize: 16,
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => (e.target.style.borderColor = "#007bff")}
            onBlur={e => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "700",
            fontSize: 16,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={e => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={e => (e.target.style.backgroundColor = "#007bff")}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
