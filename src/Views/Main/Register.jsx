import React from "react";

export default function Register() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="text-center text-success mb-4 fw-bold">Criar Conta</h2>

          <form>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="name" placeholder="Nome" />
              <label htmlFor="name" className="text-muted">Nome</label>
            </div>

            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email" placeholder="Email" />
              <label htmlFor="email" className="text-muted">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="password" placeholder="Senha" />
              <label htmlFor="password" className="text-muted">Senha</label>
            </div>

            <div className="form-floating mb-4">
              <input type="text" className="form-control" id="phone" placeholder="Telefone" />
              <label htmlFor="phone" className="text-muted">Telefone</label>
            </div>

            <button type="submit" className="btn btn-success w-100 py-2 fw-semibold">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
