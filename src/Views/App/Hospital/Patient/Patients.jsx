import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { HospitalAuthContext } from "../../../../Services/Context/hospitalContext";
import { useTheme } from "../../../../Services/Context/themeContext";
import { useMessage } from "../../../../Services/Context/messageContext";

export default function PatientsAccordion() {
  const { token } = useContext(HospitalAuthContext);
  const { theme } = useTheme();
  const { showMessage } = useMessage();
  const isDark = theme === "dark";

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Hospital não autenticado");
      setLoading(false);
      return;
    }

    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "https://healthpoint-backend-production.up.railway.app/patients",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPatients(response.data);
        setError(null);
      } catch (err) {
        setError("Erro ao buscar pacientes");
        showMessage("Erro ao carregar pacientes", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [token, showMessage]);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Lista de Pacientes</h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Gerencie e visualize os dados dos pacientes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Buscar paciente pelo nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className={`absolute right-3 top-3.5 h-5 w-5 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-4">Carregando pacientes...</span>
          </div>
        )}

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg mb-6 ${
              isDark ? "bg-red-900/30 border-l-4 border-red-600" : "bg-red-100 border-l-4 border-red-500"
            }`}
          >
            <p className={isDark ? "text-red-300" : "text-red-700"}>{error}</p>
          </motion.div>
        )}

        {!loading && !error && filteredPatients.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {searchTerm ? "Nenhum paciente encontrado" : "Nenhum paciente cadastrado"}
            </p>
          </motion.div>
        )}

        <div className="space-y-4">
          <AnimatePresence>
            {filteredPatients.map((patient) => (
              <motion.div
                key={patient.patient_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`rounded-xl overflow-hidden shadow-sm transition-all ${
                  isDark ? "bg-gray-800" : "bg-white"
                } ${openId === patient.patient_id ? "ring-2 ring-blue-500" : ""}`}
              >
                <button
                  onClick={() => toggleOpen(patient.patient_id)}
                  className={`w-full flex justify-between items-center p-5 text-left ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } transition-colors`}
                >
                  <h3 className="text-lg font-medium">{patient.patient_name}</h3>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      openId === patient.patient_id ? "rotate-180" : ""
                    } ${isDark ? "text-gray-400" : "text-gray-500"}`}
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
                </button>

                <AnimatePresence>
                  {openId === patient.patient_id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}
                    >
                      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className={`font-semibold mb-3 ${
                            isDark ? "text-blue-400" : "text-blue-600"
                          }`}>
                            Dados do Paciente
                          </h4>
                          <ul className="space-y-2">
                            {[
                              { label: "ID", value: patient.patient_id },
                              { label: "CPF", value: patient.cpf },
                              { label: "Email", value: patient.email },
                              { label: "Data de Nascimento", value: patient.birth_date },
                              { label: "Gênero", value: patient.gender },
                              { label: "Telefone", value: patient.phone },
                              { label: "Endereço", value: patient.address },
                              { label: "Hospital ID", value: patient.hospital_id },
                              { 
                                label: "Registrado em", 
                                value: new Date(patient.register).toLocaleString() 
                              },
                            ].map((item, index) => (
                              <li key={index} className="flex">
                                <span className={`font-medium w-36 flex-shrink-0 ${
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }`}>
                                  {item.label}:
                                </span>
                                <span>{item.value || "-"}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={`p-4 rounded-lg ${
                          isDark ? "bg-gray-700" : "bg-gray-100"
                        }`}>
                          <h4 className={`font-semibold mb-3 ${
                            isDark ? "text-blue-400" : "text-blue-600"
                          }`}>
                            Contato Familiar
                          </h4>
                          <ul className="space-y-2">
                            {[
                              { label: "Nome", value: patient.family_contact_name },
                              { label: "Telefone", value: patient.family_contact_phone },
                              { label: "Parentesco", value: patient.family_contact_relationship },
                            ].map((item, index) => (
                              <li key={index} className="flex">
                                <span className={`font-medium w-24 flex-shrink-0 ${
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }`}>
                                  {item.label}:
                                </span>
                                <span>{item.value || "-"}</span>
                              </li>
                            ))}
                          </ul>
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
    </div>
  );
}