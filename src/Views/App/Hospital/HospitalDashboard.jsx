import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { HospitalAuthContext } from "../../../../../Context/hospitalContext";

export default function HospitalDashboard() {
  const { hospital } = useContext(HospitalAuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchJobs = async () => {
    const token = localStorage.getItem("hospitalToken");
    if (!token || !hospital) return;

    try {
      const response = await axios.get(
        "https://healthpoint-backend-production.up.railway.app/hospital/jobs-with-applications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(response.data);
    } catch {
      setErro("Erro ao buscar vagas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hospital) fetchJobs();
  }, [hospital]);

  const handleUpdateStatus = async (applicationId, newStatus) => {
    const token = localStorage.getItem("hospitalToken");
    const mappedStatus =
      newStatus === "aceita"
        ? "approved"
        : newStatus === "rejeitada"
        ? "rejected"
        : newStatus;

    try {
      setUpdatingId(applicationId);
      await axios.put(
        `https://healthpoint-backend-production.up.railway.app/hospital/${applicationId}/status`,
        { status: mappedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs((prevJobs) =>
        prevJobs.map((job) => ({
          ...job,
          applications: job.applications.map((app) =>
            app.application_id === applicationId
              ? { ...app, application_status: mappedStatus }
              : app
          ),
        }))
      );
    } catch {
      alert("Erro ao atualizar status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span>[Pendente]</span>;
      case "approved":
        return <span>[Aprovada]</span>;
      case "rejected":
        return <span>[Rejeitada]</span>;
      default:
        return <span>[{status}]</span>;
    }
  };

  if (!hospital) {
    return (
      <p>Você precisa estar logado para visualizar as vagas.</p>
    );
  }

  return (
    <div>
      <strong>Olá, {hospital?.hospital_name ?? "Hospital"}! Gerencie suas vagas e receba voluntários.</strong>

      {loading && (
        <div>
          <p>Carregando vagas...</p>
        </div>
      )}

      {erro && (
        <div>
          <p>{erro}</p>
        </div>
      )}

      {!loading && !erro && jobs.length === 0 && (
        <p>Nenhuma vaga encontrada.</p>
      )}

      <div>
        {jobs.map((job) => (
          <div key={job.job_id}>
            <h3>{job.job_title}</h3>
            <p><strong>Tipo:</strong> {job.job_type}</p>
            <p>{job.job_description}</p>
            <p><strong>Pontos:</strong> {job.job_points}</p>

            <h4>Candidatos:</h4>
            {job.applications.length === 0 ? (
              <p>Nenhum candidato ainda.</p>
            ) : (
              <ul>
                {job.applications.map((app) => (
                  <li key={app.application_id}>
                    <div>
                      <strong>{app.user_name}</strong> ({app.user_email}) {statusBadge(app.application_status)}
                    </div>
                    {app.application_status === "pending" && (
                      <div>
                        <button
                          onClick={() => handleUpdateStatus(app.application_id, "aceita")}
                          disabled={updatingId === app.application_id}
                          title="Aceitar"
                        >
                          Aceitar
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.application_id, "rejeitada")}
                          disabled={updatingId === app.application_id}
                          title="Rejeitar"
                        >
                          Rejeitar
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
