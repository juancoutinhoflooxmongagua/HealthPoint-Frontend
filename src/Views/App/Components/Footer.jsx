import React from "react";
import { useTheme } from "../../../Services/Context/themeContext";

export default function Footer() {
  const { theme } = useTheme();

  const footerStyle = {
    padding: "1.5rem 0",
    marginTop: "2rem",
    borderTop: "1px solid",
    borderColor: theme === "dark" ? "#444" : "#ddd",
    backgroundColor: theme === "dark" ? "#121212" : "#f8f9fa",
    color: theme === "dark" ? "#eee" : "#333",
  };

  return (
    <footer style={footerStyle} className="text-center">
      <p className="mb-0" style={{ fontWeight: 500 }}>
        © 2025 HealthPoint. Todos os direitos reservados.
      </p>
    </footer>
  );
}
