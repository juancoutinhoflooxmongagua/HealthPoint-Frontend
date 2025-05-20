import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";

export default function HospitalLogin() {
  const { loginHospital } = useContext(HospitalAuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ hospital_id: "", hospital_password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { hospital_id: Number(formData.hospital_id), hospital_password: formData.hospital_password };
      const { data } = await axios.post("https://healthpoint-backend-production.up.railway.app/hospital/login", payload);
      loginHospital({ hospital_id: data.hospital_id, token: data.token });
      navigate("/HospitalHome");
    } catch (err) {
      setError(err.response?.data?.error || "Erro no login");
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="mb-4 text-center">Login do Hospital</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="hospital_id" className="form-label">
              ID do Hospital
            </label>
            <input
              type="number"
              id="hospital_id"
              name="hospital_id"
              value={formData.hospital_id}
              onChange={handleChange}
              className="form-control"
              placeholder="Digite seu ID"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="hospital_password" className="form-label">
              Senha
            </label>
            <input
              type="password"
              id="hospital_password"
              name="hospital_password"
              value={formData.hospital_password}
              onChange={handleChange}
              className="form-control"
              placeholder="Digite sua senha"
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
