import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://healthpoint-backend-production.up.railway.app/auth/register", form)
      .then((res) => {
        const token = res.data.token;
        alert("Registrado com sucesso!");
        localStorage.setItem("token", token);
        navigate("/login");
      })
      .catch((err) => {
        console.error("Erro ao registrar:", err);
        alert("Erro ao registrar. Tente novamente.");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="text-center text-primary mb-4 fw-bold">Criar Conta</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="user_name"
                value={form.user_name}
                onChange={handleChange}
                id="name"
                placeholder="Nome"
              />
              <label htmlFor="name" className="text-muted">Nome</label>
            </div>

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

            <div className="form-floating mb-3">
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

            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control"
                name="user_phone"
                value={form.user_phone}
                onChange={handleChange}
                id="phone"
                placeholder="Telefone"
              />
              <label htmlFor="phone" className="text-muted">Telefone</label>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
