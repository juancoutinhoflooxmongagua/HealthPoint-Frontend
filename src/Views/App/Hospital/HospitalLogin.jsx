import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { useTheme } from "../../../Services/Context/themeContext";

export default function HospitalLogin() {
  const { loginHospital } = useContext(HospitalAuthContext);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    hospital_id: "", 
    hospital_password: "" 
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const payload = { 
        hospital_id: Number(formData.hospital_id), 
        hospital_password: formData.hospital_password 
      };
      const { data } = await axios.post(
        "https://healthpoint-backend-production.up.railway.app/hospital/login", 
        payload
      );
      loginHospital({ hospital_id: data.hospital_id, token: data.token });
      navigate("/HospitalHome");
    } catch (err) {
      setError(err.response?.data?.error || "Erro no login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>Acesso </span>
            <span className="text-white">Hospitalar</span>
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Utilize suas credenciais para acessar o painel
          </p>
        </div>

        {error && (
          <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-red-900/30 border border-red-700 text-red-300' : 'bg-red-100 border border-red-300 text-red-700'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="hospital_id" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              ID do Hospital
            </label>
            <input
              type="number"
              id="hospital_id"
              name="hospital_id"
              value={formData.hospital_id}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500'} transition-colors`}
              placeholder="Digite seu ID"
              required
            />
          </div>

          <div>
            <label htmlFor="hospital_password" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Senha
            </label>
            <input
              type="password"
              id="hospital_password"
              name="hospital_password"
              value={formData.hospital_password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500'} transition-colors`}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 rounded ${isDark ? 'bg-gray-700 border-gray-600 text-blue-600' : 'border-gray-300 text-blue-600'} focus:ring-blue-500`}
              />
              <label htmlFor="remember-me" className={`ml-2 block text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Lembrar de mim
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className={`font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}>
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isDark ? 'focus:ring-offset-gray-800' : ''} transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Carregando...
              </span>
            ) : (
              'Acessar Painel'
            )}
          </button>
        </form>

        <div className={`mt-6 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>
            Não tem uma conta?{' '}
            <a href="/NewHospital" className={`font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}>
              Cadastre seu hospital
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}