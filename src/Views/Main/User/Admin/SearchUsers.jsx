import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <main>
      <h1>Usuários do Sistema</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} 
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              {user.user_name} — {user.user_email} — {user.user_role}
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há usuários para exibir.</p>
      )}
    </main>
  );
}
