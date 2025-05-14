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
    } catch (err) {
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

    // Mapear status para o padrão do backend
    const mappedStatus = newStatus === "aceita" ? "approved" : newStatus === "rejeitada" ? "rejected" : newStatus;

    try {
      setUpdatingId(applicationId);
      await axios.put(
        `https://healthpoint-backend-production.up.railway.app/hospital/${applicationId}/status`,
        { status: mappedStatus },  // Envia o status mapeado
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
    } catch (err) {
      alert("Erro ao atualizar status.");
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="badge bg-warning text-dark">Pendente</span>;
      case "approved":  // Mudando para "approved" conforme o backend
        return <span className="badge bg-success">Aprovada</span>;
      case "rejected":  // Mudando para "rejected" conforme o backend
        return <span className="badge bg-danger">Rejeitada</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (!hospital) {
    return (
      <p className="text-danger text-center mt-4">
        Você precisa estar logado para visualizar as vagas.
      </p>
    );
  }

  return (
    <div className="container mt-4">
      <div className="alert alert-success text-center shadow-sm" role="alert">
        <strong>Olá, {hospital?.hospital_name ?? "Hospital"}!</strong> Gerencie suas vagas e receba voluntários.
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status" />
          <p>Carregando vagas...</p>
        </div>
      )}

      {erro && (
        <div className="alert alert-danger text-center" role="alert">
          {erro}
        </div>
      )}

      {!loading && !erro && jobs.length === 0 && (
        <p className="text-muted text-center">Nenhuma vaga encontrada.</p>
      )}

      <div className="row">
        {jobs.map((job) => (
          <div key={job.job_id} className="col-md-6 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title">{job.job_title}</h5>
                <p className="card-text"><strong>Tipo:</strong> {job.job_type}</p>
                <p className="card-text">{job.job_description}</p>
                <p><strong>Pontos:</strong> <span className="badge bg-info">{job.job_points}</span></p>

                <h6 className="mt-3 mb-2">Candidatos:</h6>
                {job.applications.length === 0 ? (
                  <p className="text-muted">Nenhum candidato ainda.</p>
                ) : (
                  <ul className="list-group list-group-flush">
                    {job.applications.map((app) => (
                      <li
                        key={app.application_id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                          app.application_status === "approved"
                            ? "bg-light-success"
                            : app.application_status === "rejected"
                            ? "bg-light-danger"
                            : ""
                        }`}
                      >
                        <div>
                          <strong>{app.user_name}</strong> ({app.user_email})<br />
                          {statusBadge(app.application_status)}
                        </div>
                        {app.application_status === "pending" && (
                          <div className="btn-group" role="group">
                            <button
                              title="Aceitar candidato"
                              onClick={() => handleUpdateStatus(app.application_id, "aceita")} // Envia "aceita"
                              className="btn btn-sm btn-outline-success"
                              disabled={updatingId === app.application_id}
                            >
                              <i className="bi bi-check-lg"></i>
                            </button>
                            <button
                              title="Rejeitar candidato"
                              onClick={() => handleUpdateStatus(app.application_id, "rejeitada")} // Envia "rejeitada"
                              className="btn btn-sm btn-outline-danger"
                              disabled={updatingId === app.application_id}
                            >
                              <i className="bi bi-x-lg"></i>
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
