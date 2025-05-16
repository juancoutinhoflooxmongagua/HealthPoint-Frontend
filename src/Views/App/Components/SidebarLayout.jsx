import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function SidebarLayout() {
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100 bg-light">
      <aside className="d-none d-md-block bg-white border-end p-3 shadow-sm" style={{ width: "250px" }}>
        <h4 className="mb-4 text-primary">Painel</h4>
        <nav className="nav flex-column">
          <Link className="nav-link" to="/Notifications">🔔 Notificações</Link>
          <Link className="nav-link" to="/HospitalHome">🏠 Início</Link>
          <Link className="nav-link" to="/HospitalProfile">🏥 Perfil</Link>
          <Link className="nav-link" to="/NewJob">➕ Nova Vaga</Link>
          <Link className="nav-link" to="/New">Novo Paciente</Link>
        </nav>
      </aside>

      <main className="flex-fill p-4">
        <Outlet />
      </main>
    </div>
  );
}
