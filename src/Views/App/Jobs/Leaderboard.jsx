import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    axios.get("https://healthpoint-backend-production.up.railway.app/leaderboard", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((res) => {
      setRanking(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <main style={{ maxWidth: 800, margin: "3rem auto", padding: "0 1rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ 
        textAlign: "center", 
        color: "#007bff", 
        fontWeight: 600, 
        marginBottom: "2rem", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        gap: "10px",
        fontSize: "1.8rem"
      }}>
        <span role="img" aria-label="troféu" style={{ fontSize: "2.2rem", color: "#ffc107" }}>🏆</span>
        Ranking de Voluntários
      </h1>

      <div style={{ 
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", 
        borderRadius: 10, 
        backgroundColor: "#fff", 
        padding: "1rem" 
      }}>
        {ranking.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {ranking.map((user, index) => (
              <li
                key={user.user_id}
                style={{
                  border: "1px solid #007bff",
                  borderRadius: 6,
                  padding: "0.75rem 1rem",
                  marginBottom: "0.75rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: index % 2 === 0 ? "#e9f2ff" : "#f7fbff",
                  fontWeight: 500,
                  color: "#004085",
                }}
              >
                <span>{index + 1}. {user.user_name}</span>
                <span>{user.total_points} pts</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#6c757d", textAlign: "center", margin: 0 }}>
            Nenhum ranking encontrado.
          </p>
        )}
      </div>
    </main>
  );
}
