import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyingJobId, setApplyingJobId] = useState(null);

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
            Authorization: `Bearer ${token}`,
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
    setApplyingJobId(job_id);

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
    } finally {
      setApplyingJobId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", color: "#007bff", fontWeight: "bold", padding: "2rem" }}>
        Carregando...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red", padding: "2rem" }}>
        {error}
      </div>
    );
  }

  return (
    <main style={{ maxWidth: 1200, margin: "2rem auto", padding: "0 1rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Vagas</h1>

      {jobs.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>Nenhuma vaga encontrada.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.job_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 10,
                padding: "1rem",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#fafafa",
              }}
            >
              <div>
                <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem", color: "#222" }}>
                  {job.job_title}
                </h2>
                <p style={{ color: "#555", flexGrow: 1 }}>{job.job_description}</p>
                <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "1rem" }}>
                  🏥 {job.hospital_name}
                </p>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>
                  ⭐ {job.job_points} Pontos
                </p>
              </div>

              <button
                onClick={() => handleApply(job.job_id, job.job_title)}
                disabled={applyingJobId === job.job_id}
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem",
                  backgroundColor: applyingJobId === job.job_id ? "#999" : "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  cursor: applyingJobId === job.job_id ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                }}
              >
                {applyingJobId === job.job_id ? "Aplicando..." : "Aplicar"}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
