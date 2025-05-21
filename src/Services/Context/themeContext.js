// Services/Context/themeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    document.body.className = theme; // Aplica a classe no <body> para o CSS customizado funcionar
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "frutiger" : "light"
    );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
