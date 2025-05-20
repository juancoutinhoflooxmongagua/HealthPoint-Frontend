import { useContext } from "react";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { useTheme } from "../../../Services/Context/themeContext";

export default function HospitalProfile() {
  const { hospital } = useContext(HospitalAuthContext);
  const { theme } = useTheme();

  if (!hospital) {
    return (
      <div className={`text-center py-5 text-${theme === "dark" ? "light" : "dark"}`}>
        Carregando...
      </div>
    );
  }

  return (
    <div
      className={`card mx-auto my-5 shadow-sm`}
      style={{
        maxWidth: "400px",
        backgroundColor: theme === "dark" ? "#121214" : "#fff",
        color: theme === "dark" ? "#f5f5f5" : "#212529",
        border: theme === "dark" ? "1px solid #333" : "1px solid #dee2e6",
        borderRadius: "8px",
      }}
    >
      <div className="card-body">
        <h3 className="card-title mb-4 fw-bold border-bottom pb-2" style={{ borderColor: theme === "dark" ? "#555" : "#dee2e6" }}>
          {hospital.hospital_name}
        </h3>

        <div className="mb-3 d-flex justify-content-between">
          <span className="text-muted fw-semibold">ID</span>
          <span>{hospital.hospital_id}</span>
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <span className="text-muted fw-semibold">Endereço</span>
          <span className="text-break" style={{ maxWidth: "60%" }}>
            {hospital.hospital_address}
          </span>
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <span className="text-muted fw-semibold">Telefone</span>
          <span>{hospital.hospital_phone}</span>
        </div>
      </div>
    </div>
  );
}
