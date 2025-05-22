import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";

export default function HospitalDashboard() {
  const { hospital } = useContext(HospitalAuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [openJobId, setOpenJobId] = useState(null);

  const fetchJobs = async () => {
    const token = localStorage.getItem("hospitalToken");
    if (!token || !hospital) return;

    setLoading(true);
    setErro(null);

    try {
      const response = await axios.get(
        "https://healthpoint-backend-production.up.railway.app/hospital/jobs-with-applications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(response.data);
      if (response.data.length > 0) setOpenJobId(response.data[0].job_id); 
    } catch (error) {
      setErro(error.response?.data?.error || "Erro ao buscar vagas, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hospital) fetchJobs();
  }, [hospital]);

  const handleUpdateStatus = async (applicationId, newStatus) => {
    const token = localStorage.getItem("hospitalToken");
    if (!token) return;

    const mappedStatus =
      newStatus === "aceita" ? "approved" : newStatus === "rejeitada" ? "rejected" : newStatus;

    try {
      setUpdatingId(applicationId);
      await axios.put(
        `https://healthpoint-backend-production.up.railway.app/hospital/${applicationId}/status`,
        { status: mappedStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setJobs((prevJobs) =>
        prevJobs.map((job) => ({
          ...job,
          applications: job.applications.map((app) =>
            app.application_id === applicationId ? { ...app, application_status: mappedStatus } : app
          ),
        }))
      );
    } catch {
      alert("Erro ao atualizar status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleFinishApplication = async (applicationId) => {
    const token = localStorage.getItem("hospitalToken");
    if (!token) return;

    if (!window.confirm("Deseja finalizar o trabalho desse voluntário?")) return;

    try {
      setUpdatingId(applicationId);
      await axios.put(
        `https://healthpoint-backend-production.up.railway.app/hospital/jobs/application/${applicationId}/finish`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setJobs((prevJobs) =>
        prevJobs.map((job) => ({
          ...job,
          applications: job.applications.map((app) =>
            app.application_id === applicationId
              ? { ...app, application_status: "finished", points_awarded: true }
              : app
          ),
        }))
      );

      alert("Trabalho finalizado com sucesso para este voluntário.");
    } catch {
      alert("Erro ao finalizar trabalho.");
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
      case "finished":
        return <span className="badge bg-secondary">Finalizado</span>;
      default:
        return <span className="badge bg-dark">{status}</span>;
    }
  };

  if (!hospital) {
    return <p className="text-center mt-5">Você precisa estar logado para visualizar as vagas.</p>;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Olá, {hospital?.hospital_name ?? "Hospital"}!</h1>
      <p className="text-center mb-5">Gerencie suas vagas e acompanhe suas candidaturas.</p>

      <br />

      <h3>Vagas em Aberto</h3>
      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status" aria-hidden="true"></div>
          <span className="ms-2">Carregando vagas...</span>
        </div>
      )}

      {erro && <div className="alert alert-danger text-center">{erro}</div>}

      {!loading && !erro && jobs.length === 0 && <p className="text-center">Nenhuma vaga encontrada.</p>}

      <div className="row gy-4">
        {jobs.map((job) => (
          <div key={job.job_id} className="col-12">
            <div className="card shadow-sm">
              <div
                className="card-header d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setOpenJobId(openJobId === job.job_id ? null : job.job_id)
                }
              >
                <div>
                  <h5 className="mb-0">{job.job_title}</h5>
                  <small className="text-muted">{job.job_type}</small>
                </div>
                <div>
                  <strong>Pontos:</strong> {job.job_points}
                </div>
              </div>

              {openJobId === job.job_id && (
                <div className="card-body border-top">
                  <p>{job.job_description}</p>
                  <h6>Candidatos:</h6>
                  {job.applications.length === 0 ? (
                    <p>Nenhum candidato ainda.</p>
                  ) : (
                    <ul className="list-group">
                      {job.applications.map((app) => (
                        <li
                          key={app.application_id}
                          className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                        >
                          <div>
                            <strong>{app.user_name}</strong> ({app.user_email}){" "}
                            {statusBadge(app.application_status)}{" "}
                            {app.points_awarded && (
                              <span className="badge bg-info ms-2">
                                Pontos atribuídos
                              </span>
                            )}
                          </div>
                          <div className="d-flex gap-2 flex-wrap mt-2 mt-md-0">
                            {app.application_status === "pending" && (
                              <>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() =>
                                    handleUpdateStatus(app.application_id, "aceita")
                                  }
                                  disabled={updatingId === app.application_id}
                                >
                                  Aceitar
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    handleUpdateStatus(app.application_id, "rejeitada")
                                  }
                                  disabled={updatingId === app.application_id}
                                >
                                  Rejeitar
                                </button>
                              </>
                            )}

                            {app.application_status === "approved" &&
                              !app.points_awarded && (
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() =>
                                    handleFinishApplication(app.application_id)
                                  }
                                  disabled={updatingId === app.application_id}
                                >
                                  {updatingId === app.application_id
                                    ? "Finalizando..."
                                    : "Finalizar trabalho"}
                                </button>
                              )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
