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
    <div>
      <h2>Criar Conta</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            name="user_name"
            value={form.user_name}
            onChange={handleChange}
            id="name"
            placeholder="Digite seu nome"
            required
          />
        </div>

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

        <div>
          <label htmlFor="phone">Telefone:</label>
          <input
            type="text"
            name="user_phone"
            value={form.user_phone}
            onChange={handleChange}
            id="phone"
            placeholder="Digite seu telefone"
            required
          />
        </div>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
