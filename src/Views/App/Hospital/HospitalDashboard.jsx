import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../Services/Context/themeContext";

export default function HospitalDashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { hospital } = useContext(HospitalAuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [openJobId, setOpenJobId] = useState(null);

  const fetchJobs = async () => {
    const token = localStorage.getItem("hospitalToken");
    if (!token || !hospital) return;

    setLoading(true);
    setError(null);

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
      setError(
        error.response?.data?.error ||
          "Erro ao buscar vagas. Por favor, tente novamente."
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

    const mappedStatus = {
      "aceita": "approved",
      "rejeitada": "rejected"
    }[newStatus] || newStatus;

    try {
      setUpdatingId(applicationId);
      await axios.put(
        `https://healthpoint-backend-production.up.railway.app/hospital/${applicationId}/status`,
        { status: mappedStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setJobs(prevJobs =>
        prevJobs.map(job => ({
          ...job,
          applications: job.applications.map(app =>
            app.application_id === applicationId
              ? { ...app, application_status: mappedStatus }
              : app
          ),
        }))
      );
    } catch {
      setError("Erro ao atualizar status. Tente novamente.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleFinishApplication = async (applicationId) => {
    const token = localStorage.getItem("hospitalToken");
    if (!token) return;

    if (!window.confirm("Deseja finalizar o trabalho deste voluntário?")) return;

    try {
      setUpdatingId(applicationId);
      await axios.put(
        `https://healthpoint-backend-production.up.railway.app/hospital/jobs/application/${applicationId}/finish`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setJobs(prevJobs =>
        prevJobs.map(job => ({
          ...job,
          applications: job.applications.map(app =>
            app.application_id === applicationId
              ? { ...app, application_status: "finished", points_awarded: true }
              : app
          ),
        }))
      );
    } catch {
      setError("Erro ao finalizar trabalho. Tente novamente.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      approved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      finished: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    };

    const statusText = {
      pending: "Pendente",
      approved: "Aprovada",
      rejected: "Rejeitada",
      finished: "Finalizado",
    }[status] || status;

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || "bg-gray-200 text-gray-800"}`}>
        {statusText}
      </span>
    );
  };

  if (!hospital) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Você precisa estar logado para visualizar as vagas.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Olá, {hospital?.hospital_name || "Hospital"}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Gerencie suas vagas e candidaturas
        </p>
      </motion.div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Carregando vagas...</p>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-600 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6"
        >
          <p>{error}</p>
        </motion.div>
      )}

      {!loading && jobs.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">Nenhuma vaga encontrada.</p>
        </div>
      )}

      <div className="space-y-6">
        <AnimatePresence>
          {jobs.map((job) => (
            <motion.div
              key={job.job_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl shadow-sm overflow-hidden transition-all duration-200 ${
                isDark ? "bg-gray-800" : "bg-white"
              } ${openJobId === job.job_id ? "ring-2 ring-blue-500" : ""}`}
            >
              <div
                className={`flex justify-between items-center p-6 cursor-pointer transition-colors ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
                onClick={() =>
                  setOpenJobId(openJobId === job.job_id ? null : job.job_id)
                }
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {job.job_title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {job.job_type}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Pontos:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {job.job_points}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                      openJobId === job.job_id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <AnimatePresence>
                {openJobId === job.job_id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}
                  >
                    <div className="p-6 space-y-6">
                      <p className="text-gray-600 dark:text-gray-300">
                        {job.job_description}
                      </p>

                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                          Candidatos ({job.applications.length})
                        </h3>

                        {job.applications.length === 0 ? (
                          <p className="text-gray-500 dark:text-gray-400 py-4 text-center">
                            Nenhum candidato ainda.
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {job.applications.map((app) => (
                              <motion.div
                                key={app.application_id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className={`p-4 rounded-lg ${
                                  isDark ? "bg-gray-700" : "bg-gray-50"
                                }`}
                              >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                      {app.user_name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {app.user_email}
                                    </p>
                                    <div className="flex gap-2 mt-2">
                                      {statusBadge(app.application_status)}
                                      {app.points_awarded && (
                                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                                          Pontos atribuídos
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex gap-2 flex-wrap">
                                    {app.application_status === "pending" && (
                                      <>
                                        <button
                                          onClick={() =>
                                            handleUpdateStatus(
                                              app.application_id,
                                              "aceita"
                                            )
                                          }
                                          disabled={updatingId === app.application_id}
                                          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                          {updatingId === app.application_id ? (
                                            <span className="flex items-center">
                                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                              </svg>
                                              Aceitando...
                                            </span>
                                          ) : (
                                            "Aceitar"
                                          )}
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleUpdateStatus(
                                              app.application_id,
                                              "rejeitada"
                                            )
                                          }
                                          disabled={updatingId === app.application_id}
                                          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                          Rejeitar
                                        </button>
                                      </>
                                    )}

                                    {app.application_status === "approved" &&
                                      !app.points_awarded && (
                                        <button
                                          onClick={() =>
                                            handleFinishApplication(app.application_id)
                                          }
                                          disabled={updatingId === app.application_id}
                                          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                          {updatingId === app.application_id ? (
                                            <span className="flex items-center">
                                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                              </svg>
                                              Finalizando...
                                            </span>
                                          ) : (
                                            "Finalizar trabalho"
                                          )}
                                        </button>
                                      )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}