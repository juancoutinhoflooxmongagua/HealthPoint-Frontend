import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../../Services/Context/themeContext";

export default function Jobs() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

        const response = await axios.get(
          "https://healthpoint-backend-production.up.railway.app/jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
        { headers: { Authorization: `Bearer ${token}` } }
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

  if (loading)
    return (
      <div className="text-center text-primary fw-bold py-5">Carregando...</div>
    );

  if (error)
    return (
      <div className="text-center text-danger fw-bold py-5">{error}</div>
    );

  return (
    <main className={`container my-5 ${isDark ? "text-light" : "text-dark"}`}>
      <h1 className="text-center mb-4 fw-bold">Vagas Disponíveis</h1>

      {jobs.length === 0 ? (
        <p className="text-center text-muted">Nenhuma vaga encontrada.</p>
      ) : (
        <div
          className="d-grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.job_id}
              className={`p-4 rounded-3 border ${
                isDark ? "bg-dark border-secondary" : "bg-white border-light"
              } shadow-sm d-flex flex-column justify-content-between`}
              style={{ height: "100%" }}
            >
              <div>
                <h5 className="fw-bold mb-2">{job.job_title}</h5>
                <p style={{ whiteSpace: "pre-wrap" }}>{job.job_description}</p>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <div className="small text-muted">
                    🏥 {job.hospital_name}
                  </div>
                  <div className="small text-muted">
                    ⭐ {job.job_points} Pontos
                  </div>
                </div>

                <button
                  onClick={() => handleApply(job.job_id, job.job_title)}
                  disabled={applyingJobId === job.job_id}
                  className={`btn fw-semibold ${
                    applyingJobId === job.job_id
                      ? "btn-secondary"
                      : isDark
                      ? "btn-outline-light"
                      : "btn-primary"
                  }`}
                >
                  {applyingJobId === job.job_id ? "Aplicando..." : "Aplicar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
