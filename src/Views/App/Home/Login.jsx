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
    <div>
      <h2>Entrar</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="user_email"
            value={form.user_email}
            onChange={handleChange}
            id="email"
            placeholder="Digite seu email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            name="user_password"
            value={form.user_password}
            onChange={handleChange}
            id="password"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
