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

        const response = await axios.get("https://healthpoint-backend-production.up.railway.app/jobs", {
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

  const handleApply = async (job_id, job_title) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `https://healthpoint-backend-production.up.railway.app/apply/${job_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`✅ Você se candidatou para a vaga de ${job_title}`);
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(`❌ ${error.response.data.message}`);
      } else {
        alert("❌ Erro ao aplicar para a vaga.");
      }
    }
  };

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
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{job.job_title}</h5>
                  <p className="card-text">{job.job_description}</p>
                  <p className="text-muted">
                    <i className="fas fa-hospital-alt me-2"></i>{job.hospital_name}
                  </p>
                  <p className="text-muted">
                    <i className="fas fa-star me-2"></i>{job.job_points} Pontos
                  </p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary w-100 p-2"
                      onClick={() => handleApply(job.job_id, job.job_title)}
                    >
                      <i className="fas fa-paper-plane me-2"></i> Aplicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
