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
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar trabalho.");
    }
  };

  return (
    <div>
      <h2>Cadastrar Novo Trabalho</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="job_title"
            id="job_title"
            placeholder="Título do Trabalho"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <label htmlFor="job_title">Título do Trabalho</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="job_description"
            id="job_description"
            placeholder="Descrição do Trabalho"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <label htmlFor="job_description">Descrição do Trabalho</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            name="job_points"
            id="job_points"
            placeholder="Pontos"
            value={jobPoint}
            onChange={(e) => setJobPoint(e.target.value)}
          />
          <label htmlFor="job_points">Pontos</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="job_type"
            id="job_type"
            placeholder="Tipo de trabalho"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          />
          <label htmlFor="job_type">Tipo de trabalho</label>
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
}
