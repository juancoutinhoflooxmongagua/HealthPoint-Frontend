import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../Services/Context/authContext";
import { useTheme } from "../../../Services/Context/themeContext";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form, setForm] = useState({
    user_email: "",
    user_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://healthpoint-backend-production.up.railway.app/auth/login", 
        form
      );
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError(err.response?.data?.message || "Email ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className={`w-full max-w-md rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className={`p-8 ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
              Acesse sua conta
            </h2>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Entre com seu email e senha para continuar
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300 dark:border-red-600">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Email
              </label>
              <input
                type="email"
                name="user_email"
                value={form.user_email}
                onChange={handleChange}
                id="email"
                placeholder="seu@email.com"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  isDark 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                required
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Senha
              </label>
              <input
                type="password"
                name="user_password"
                value={form.user_password}
                onChange={handleChange}
                id="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  isDark 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={`h-4 w-4 rounded border focus:ring-blue-500 ${
                    isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  }`}
                />
                <label 
                  htmlFor="remember-me" 
                  className={`ml-2 block text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  to="/forgot-password" 
                  className={`font-medium hover:text-blue-500 transition-colors ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </>
                ) : "Entrar"}
              </button>
            </div>
          </form>

          <div className={`mt-6 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            <p>
              Não tem uma conta?{" "}
              <Link 
                to="/register" 
                className={`font-medium hover:text-blue-500 transition-colors ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}