import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../../Services/Context/themeContext";

export default function Leaderboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://healthpoint-backend-production.up.railway.app/leaderboard",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setRanking(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar o ranking.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center text-primary fw-bold py-5">Carregando...</div>
    );

  if (error)
    return (
      <div className="text-center text-danger fw-bold py-5">{error}</div>
    );

  return (
    <main
      className={`container my-5 ${isDark ? "text-light" : "text-dark"}`}
      style={{ maxWidth: 800 }}
    >
      <h1 className="text-center mb-4 fw-bold d-flex justify-content-center align-items-center gap-2">
        <span style={{ fontSize: "2rem" }}>🏆</span> Ranking de Voluntários
      </h1>

      <div
        className={`rounded-3 p-4 shadow-sm ${
          isDark ? "bg-dark border border-secondary" : "bg-white border border-light"
        }`}
      >
        {ranking.length > 0 ? (
          <ul className="list-unstyled m-0 p-0">
            {ranking.map((user, index) => (
              <li
                key={user.user_id}
                className={`d-flex justify-content-between align-items-center rounded-3 mb-3 px-3 py-2 fw-semibold ${
                  isDark
                    ? index % 2 === 0
                      ? "bg-secondary"
                      : "bg-dark"
                    : index % 2 === 0
                    ? "bg-light"
                    : "bg-white"
                }`}
                style={{
                  border: "1px solid",
                  borderColor: isDark ? "#6c757d" : "#007bff",
                }}
              >
                <span>
                  {index + 1}. {user.user_name}
                </span>
                <span>{user.total_points} pts</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted mb-0">
            Nenhum ranking encontrado.
          </p>
        )}
      </div>
    </main>
  );
}
