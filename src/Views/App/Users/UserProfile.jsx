import React, { useContext } from "react";
import { AuthContext } from "../../../Services/Context/authContext.js";
import UsersTradutor from "../../App/Components/i18n/usersTradutor.js";

export default function UserProfile() {
  const { user } = useContext(AuthContext);

  return (
    <main
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        padding: "1rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0d6efd",
          fontWeight: 600,
          marginBottom: "2rem",
        }}
      >
        Perfil de Usuário
      </h1>

      <div
        style={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 12,
          padding: "2rem",
          backgroundColor: "#fff",
        }}
      >
        {[
          { label: "Nome:", value: user.user_name },
          { label: "Email:", value: user.user_email },
          { label: "Telefone:", value: user.user_phone },
          { label: "Nível de Usuário:", value: <UsersTradutor user={user.user_role} /> },
        ].map(({ label, value }, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
              borderBottom: i < 3 ? "1px solid #e0e0e0" : "none",
              paddingBottom: i < 3 ? "1rem" : 0,
            }}
          >
            <div
              style={{
                flex: "0 0 35%",
                fontWeight: "700",
                color: "#333",
                minWidth: 110,
              }}
            >
              {label}
            </div>
            <div
              style={{
                flex: "1",
                color: "#6c757d",
                wordBreak: "break-word",
              }}
            >
              {value}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
              border: "none",
              borderRadius: 25,
              padding: "12px 30px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              userSelect: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </main>
  );
}
