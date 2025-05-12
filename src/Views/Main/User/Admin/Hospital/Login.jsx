import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../Context/authContext";

export default function HospitalLogin() {
  const { setHospital } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hospital_email: "",
    hospital_password: ""
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://healthpoint-backend-production.up.railway.app/hospitals/login", formData);
      const { hospital_id, token } = response.data;

      setHospital({ hospital_id, token });
      localStorage.setItem("hospitalToken", token);

      navigate("/hospital/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Erro no login");
    }
  };

  return (
    <main className="container mt-5">
      <h1 className="text-center text-primary mb-4" style={{ fontWeight: '600' }}>Login do Hospital</h1>
      <div className="card shadow-sm rounded-3 border-0">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="hospital_email" className="form-label">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="hospital_email"
                name="hospital_email"
                value={formData.hospital_email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hospital_password" className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="hospital_password"
                name="hospital_password"
                value={formData.hospital_password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
