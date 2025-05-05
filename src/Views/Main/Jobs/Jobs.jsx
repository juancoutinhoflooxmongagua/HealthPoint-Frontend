import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Token não encontrado. Por favor, faça login.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:8080/jobs", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar as vagas.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center text-primary">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Vagas</h1>

      {jobs.length === 0 ? (
        <p className="text-center text-muted">Nenhuma vaga encontrada.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {jobs.map((job) => (
            <div key={job.job_id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{job.job_title}</h5>
                  <p className="card-text">{job.job_description}</p>
                  <p className="text-muted">Hospital: {job.hospital_name}</p>
                  <p className="text-muted">Pontos: {job.job_points}</p>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Você se candidatou para a vaga de ${job.job_title}`);
                    }}
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
