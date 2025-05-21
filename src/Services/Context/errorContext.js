import React, { createContext, useState, useContext } from "react";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000); 
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {error && (
        <div className="alert alert-danger fixed-top m-3 shadow fade show" role="alert">
          {error}
        </div>
      )}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
