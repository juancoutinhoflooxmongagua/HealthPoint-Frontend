import React from "react";

export default function Register() {
  return (
    <form>
      <div>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" placeholder="Nome" />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" placeholder="Senha" />
      </div>
      <div>
        <label htmlFor="phone">Telefone:</label>
        <input type="text" id="phone" placeholder="Telefone" />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}
