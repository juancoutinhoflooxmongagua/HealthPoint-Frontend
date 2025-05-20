import React, { useContext } from "react";
import { ThemeContext } from "../../../Services/Context/themeContext";

export default function ConfigPage() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div>
        <h1>Configurações do Sistema</h1>
             <button onClick={toggleTheme}>
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
        </div>
    );
}