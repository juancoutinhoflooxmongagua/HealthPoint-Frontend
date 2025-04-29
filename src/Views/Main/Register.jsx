import React from "react";
export default function Register() {
  return (
    <div>
    <form className="mt-5 p-4 bg-white shadow-lg rounded" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2 className="text-center mb-4">Registro</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nome</label>
        <input type="text" id="name" className="form-control" placeholder="Nome" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" id="email" className="form-control" placeholder="Email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Senha</label>
        <input type="password" id="password" className="form-control" placeholder="Senha" />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Telefone</label>
        <input type="text" id="phone" className="form-control" placeholder="Telefone" />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-3">Registrar</button>
    </form>

    </div>
  );
}
