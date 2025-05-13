import React from "react";
import DashboardAdmin from "../Admin/DashboardAdmin"
export default function AdminDashboard({ user }) {
  return (
    <>
      <div className="alert alert-primary text-center" role="alert">
        <strong>Olá, {user.user_name}!</strong> Estamos felizes por tê-lo conosco na missão de salvar vidas.
      </div>
      <DashboardAdmin />
    </>
  );
}
