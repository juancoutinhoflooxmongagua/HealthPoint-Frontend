import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
      .post("http://localhost:8080/auth/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/"); 
      })
      .catch((err) => {
        console.error("Erro ao fazer login:", err);
        alert("Email ou senha inválidos.");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="text-center text-primary mb-4 fw-bold">Entrar</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="user_email"
                value={form.user_email}
                onChange={handleChange}
                id="email"
                placeholder="Email"
              />
              <label htmlFor="email" className="text-muted">Email</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                name="user_password"
                value={form.user_password}
                onChange={handleChange}
                id="password"
                placeholder="Senha"
              />
              <label htmlFor="password" className="text-muted">Senha</label>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
