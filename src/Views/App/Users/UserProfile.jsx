import React, { useContext } from "react";
import { AuthContext } from "../../../Services/Context/authContext.js";
import UsersTradutor from "../../App/Components/i18n/usersTradutor.jsx";
import { useTheme } from "../../../Services/Context/themeContext.js";

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main
      className={`container my-5 ${isDark ? "text-light" : "text-dark"}`}
      style={{ maxWidth: 700 }}
    >
      <h1 className="text-center fw-bold mb-4 text-primary">
        Perfil de Usuário
      </h1>

      <div
        className={`rounded-4 p-4 shadow-sm ${
          isDark ? "bg-dark border border-secondary" : "bg-white border border-light"
        }`}
      >
        {[
          { label: "Nome:", value: user.user_name },
          { label: "Email:", value: user.user_email },
          { label: "Telefone:", value: user.user_phone },
          {
            label: "Nível de Usuário:",
            value: <UsersTradutor user={user.user_role} />,
          },
        ].map(({ label, value }, i) => (
          <div
            key={i}
            className={`d-flex flex-wrap border-bottom pb-3 mb-3 ${
              i === 3 ? "border-0 mb-0 pb-0" : ""
            }`}
          >
            <div className="fw-bold" style={{ flex: "0 0 35%", minWidth: 110 }}>
              {label}
            </div>
            <div className="flex-grow-1 text-muted" style={{ wordBreak: "break-word" }}>
              {value}
            </div>
          </div>
        ))}

        <div className="text-center mt-4">
          <button
            className="btn btn-primary px-4 py-2 fw-semibold rounded-pill"
            style={{ transition: "transform 0.2s ease" }}
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
