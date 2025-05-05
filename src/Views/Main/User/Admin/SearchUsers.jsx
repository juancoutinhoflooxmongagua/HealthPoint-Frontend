import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersTradutor from "../../../Components/i18n/usersTradutor";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UsersOfSystem() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("Token não encontrado.");
      setError("Token não encontrado.");
      return;
    }

    axios
      .get("http://localhost:8080/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuários:", err);
        setError("Ocorreu um erro ao buscar os usuários.");
      });
  }, [token]);

  return (
    <main className="bg-light py-5 min-vh-100">
      <div className="container">
        <h1 className="mb-4 text-center text-dark">Usuários do Sistema</h1>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {users.length > 0 ? (
          <div className="row">
            {users.map((user) => (
              <div className="col-md-6 col-lg-4 mb-4" key={user.user_id}>
                <div className="card border-0 shadow-lg h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-person-fill text-primary me-3" style={{ fontSize: "30px" }}></i>
                      <h5 className="card-title mb-0 text-primary">{user.user_name}</h5>
                    </div>
                    <p className="mb-1">
                      <i className="bi bi-envelope me-2"></i> <strong>Email:</strong> {user.user_email}
                    </p>
                    <p className="mb-0">
                      <i className="bi bi-person-badge me-2"></i> <strong>Função:</strong> <UsersTradutor user={user.user_role} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">Não há usuários para exibir.</p>
        )}
      </div>
    </main>
  );
}
