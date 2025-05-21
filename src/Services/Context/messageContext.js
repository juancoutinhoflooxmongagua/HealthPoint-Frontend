import React, { createContext, useState, useContext, useCallback } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("success"); // 'success' | 'error' | 'info' | 'warning'

  const showMessage = useCallback((msg, msgType = "success") => {
    setMessage(msg);
    setType(msgType);
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const bgColor = {
    success: "rgba(25, 135, 84, 0.95)",    // Verde Bootstrap
    error: "rgba(220, 53, 69, 0.95)",      // Vermelho Bootstrap
    info: "rgba(13, 110, 253, 0.95)",      // Azul Bootstrap
    warning: "rgba(255, 193, 7, 0.95)",    // Amarelo Bootstrap
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}

      {message && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x p-3"
          style={{
            zIndex: 9999,
            marginTop: "20px",
          }}
        >
          <div
            className="d-flex align-items-center shadow-lg px-4 py-3 rounded-3"
            style={{
              backgroundColor: bgColor[type] || bgColor.info,
              color: "#fff",
              minWidth: "300px",
              maxWidth: "600px",
              fontSize: "1rem",
            }}
          >
            <div className="flex-grow-1">{message}</div>
            <button
              type="button"
              className="btn-close btn-close-white ms-3"
              aria-label="Close"
              onClick={() => setMessage(null)}
            />
          </div>
        </div>
      )}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
