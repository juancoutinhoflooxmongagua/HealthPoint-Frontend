import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Services/Context/authContext";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    user_email: "",
    user_password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://healthpoint-backend-production.up.railway.app/auth/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        console.error("Erro ao fazer login:", err);
        alert("Email ou senha inválidos.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh", padding: "1rem" }}>
      <main className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4 text-center">Entrar</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="user_email"
              value={form.user_email}
              onChange={handleChange}
              id="email"
              placeholder="Digite seu email"
              className="form-control"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Senha:
            </label>
            <input
              type="password"
              name="user_password"
              value={form.user_password}
              onChange={handleChange}
              id="password"
              placeholder="Digite sua senha"
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
