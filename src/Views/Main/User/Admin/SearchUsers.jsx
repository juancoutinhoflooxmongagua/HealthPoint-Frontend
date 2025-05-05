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
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-2 text-primary">{user.user_name}</h5>
                    <p className="mb-1"><strong>Email:</strong> {user.user_email}</p>
                    <p className="mb-0"><strong>Função:</strong> <UsersTradutor user={user.user_role} /></p>
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
