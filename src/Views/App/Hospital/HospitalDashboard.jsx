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
      setErro(
        error.response?.data?.error ||
          "Erro ao buscar vagas, tente novamente."
      );
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
          headers: { Authorization: `Bearer ${token}` },
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

  const handleFinishApplication = async (applicationId) => {
    const token = localStorage.getItem("hospitalToken");
    if (!token) return;

    if (!window.confirm("Deseja finalizar o trabalho desse voluntário?"))
      return;

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

      alert("Trabalho finalizado com sucesso.");
    } catch {
      alert("Erro ao finalizar trabalho.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      finished: "bg-gray-300 text-gray-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          styles[status] || "bg-gray-200 text-gray-800"
        }`}
      >
        {status === "pending"
          ? "Pendente"
          : status === "approved"
          ? "Aprovada"
          : status === "rejected"
          ? "Rejeitada"
          : status === "finished"
          ? "Finalizado"
          : status}
      </span>
    );
  };

  if (!hospital) {
    return (
      <p className="text-center mt-20 text-lg text-gray-500">
        Você precisa estar logado para visualizar as vagas.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">
          Olá, {hospital?.hospital_name ?? "Hospital"}!
        </h1>
        <p className="text-gray-500">
          Gerencie suas vagas e acompanhe suas candidaturas.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-gray-500">Carregando vagas...</span>
        </div>
      )}

      {erro && (
        <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg text-center mb-4">
          {erro}
        </div>
      )}

      {!loading && jobs.length === 0 && (
        <p className="text-center text-gray-500">Nenhuma vaga encontrada.</p>
      )}

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.job_id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-lg"
          >
            <div
              className="flex justify-between items-center p-6 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
              onClick={() =>
                setOpenJobId(openJobId === job.job_id ? null : job.job_id)
              }
            >
              <div>
                <h2 className="text-xl font-semibold">{job.job_title}</h2>
                <p className="text-sm text-gray-500">{job.job_type}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Pontos:{" "}
                  <span className="font-medium text-black dark:text-white">
                    {job.job_points}
                  </span>
                </p>
              </div>
            </div>

            {openJobId === job.job_id && (
              <div className="border-t border-zinc-200 dark:border-zinc-700 p-6 space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  {job.job_description}
                </p>
                <h3 className="font-medium">Candidatos:</h3>

                {job.applications.length === 0 ? (
                  <p className="text-gray-500">Nenhum candidato ainda.</p>
                ) : (
                  <div className="space-y-4">
                    {job.applications.map((app) => (
                      <div
                        key={app.application_id}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">
                            {app.user_name}{" "}
                            <span className="text-gray-500">
                              ({app.user_email})
                            </span>
                          </p>
                          <div className="flex gap-2 items-center">
                            {statusBadge(app.application_status)}
                            {app.points_awarded && (
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                Pontos atribuídos
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4 md:mt-0">
                          {app.application_status === "pending" && (
                            <>
                              <button
                                className="px-4 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm"
                                onClick={() =>
                                  handleUpdateStatus(
                                    app.application_id,
                                    "aceita"
                                  )
                                }
                                disabled={updatingId === app.application_id}
                              >
                                Aceitar
                              </button>
                              <button
                                className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
                                onClick={() =>
                                  handleUpdateStatus(
                                    app.application_id,
                                    "rejeitada"
                                  )
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
                                className="px-4 py-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-800 text-white text-sm"
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
