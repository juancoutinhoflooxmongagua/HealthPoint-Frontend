import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersTradutor from "../Components/i18n/usersTradutor";

export default function UsersOfSystem() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("todos");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Token não encontrado.");
      return;
    }

    axios
      .get("https://healthpoint-backend-production.up.railway.app/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setFiltered(res.data);
        setError(null);
      })
      .catch((err) => {
        setError("Erro ao buscar usuários.");
      });
  }, [token]);

  useEffect(() => {
    let data = [...users];

    if (search.trim()) {
      data = data.filter((u) =>
        u.user_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (role !== "todos") {
      data = data.filter((u) => u.user_role === role);
    }

    setFiltered(data);
  }, [search, role, users]);

  return (
    <main className="container mt-5">
      <h1 className="text-center text-primary mb-4" style={{ fontWeight: '600' }}>
        Usuários do Sistema
      </h1>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="todos">Todas as Funções</option>
            <option value="admin">Admin</option>
            <option value="volunteer">Voluntário</option>
          </select>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="row">
          {filtered.map((user) => (
            <div className="col-md-6 col-lg-4 mb-4" key={user.user_id}>
              <div className="card shadow-sm border-0 rounded-3 h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-4">
                    <i
                      className="bi bi-person-fill text-primary me-3"
                      style={{ fontSize: "30px" }}
                    ></i>
                    <h5 className="card-title mb-0 text-primary">
                      {user.user_name}
                    </h5>
                  </div>
                  <p className="mb-1">
                    <i className="bi bi-envelope me-2"></i>{" "}
                    <strong>Email:</strong> {user.user_email}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-person-badge me-2"></i>{" "}
                    <strong>Função:</strong>{" "}
                    <UsersTradutor user={user.user_role} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">Nenhum usuário encontrado.</p>
      )}
    </main>
  );
}
