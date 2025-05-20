import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";

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
        return <span className="badge bg-warning text-dark">Pendente</span>;
      case "approved":
        return <span className="badge bg-success">Aprovada</span>;
      case "rejected":
        return <span className="badge bg-danger">Rejeitada</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (!hospital) {
    return (
      <p className="text-center mt-5">Você precisa estar logado para visualizar as vagas.</p>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Olá, {hospital?.hospital_name ?? "Hospital"}!</h1>
      <p className="text-center mb-5">Gerencie suas vagas e receba voluntários.</p>

      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status" aria-hidden="true"></div>
          <span className="ms-2">Carregando vagas...</span>
        </div>
      )}

      {erro && (
        <div className="alert alert-danger text-center">{erro}</div>
      )}

      {!loading && !erro && jobs.length === 0 && (
        <p className="text-center">Nenhuma vaga encontrada.</p>
      )}

      <div className="row">
        {jobs.map((job) => (
          <div key={job.job_id} className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">{job.job_title}</h4>
                <p className="card-subtitle mb-2 text-muted">{job.job_type}</p>
                <p className="card-text flex-grow-1">{job.job_description}</p>
                <p><strong>Pontos:</strong> {job.job_points}</p>

                <h5>Candidatos:</h5>
                {job.applications.length === 0 ? (
                  <p>Nenhum candidato ainda.</p>
                ) : (
                  <ul className="list-group list-group-flush">
                    {job.applications.map((app) => (
                      <li
                        key={app.application_id}
                        className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                      >
                        <div>
                          <strong>{app.user_name}</strong> ({app.user_email}){" "}
                          {statusBadge(app.application_status)}
                        </div>
                        {app.application_status === "pending" && (
                          <div className="btn-group btn-group-sm" role="group" aria-label="Status actions">
                            <button
                              className="btn btn-success"
                              onClick={() => handleUpdateStatus(app.application_id, "aceita")}
                              disabled={updatingId === app.application_id}
                              title="Aceitar"
                            >
                              Aceitar
                            </button>
                            <button
                              className="btn btn-danger"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
