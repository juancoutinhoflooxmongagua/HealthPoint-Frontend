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
    <div className="container py-5" style={{ maxWidth: "480px" }}>
      <h2 className="mb-4 text-center fw-bold">Criar Conta</h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-white">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-semibold">Nome</label>
          <input
            type="text"
            name="user_name"
            value={form.user_name}
            onChange={handleChange}
            id="name"
            placeholder="Digite seu nome"
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email</label>
          <input
            type="email"
            name="user_email"
            value={form.user_email}
            onChange={handleChange}
            id="email"
            placeholder="Digite seu email"
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-semibold">Senha</label>
          <input
            type="password"
            name="user_password"
            value={form.user_password}
            onChange={handleChange}
            id="password"
            placeholder="Digite sua senha"
            required
            className="form-control"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="form-label fw-semibold">Telefone</label>
          <input
            type="text"
            name="user_phone"
            value={form.user_phone}
            onChange={handleChange}
            id="phone"
            placeholder="Digite seu telefone"
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 fw-semibold py-2">
          Registrar
        </button>
      </form>
    </div>
  );
}
