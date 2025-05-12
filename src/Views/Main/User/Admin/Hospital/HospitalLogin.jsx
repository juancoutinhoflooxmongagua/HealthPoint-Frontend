import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HospitalAuthContext } from "../../../../../Context/hospitalContext";

export default function HospitalLogin() {
  const { setHospital } = useContext(HospitalAuthContext);  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hospital_id: "",
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
      const payload = {
        hospital_id: Number(formData.hospital_id),
        hospital_password: formData.hospital_password
      };

      const response = await axios.post(
        "https://healthpoint-backend-production.up.railway.app/hospital/login",
        payload
      );

      const { hospital_id, token } = response.data;

      // Armazena o hospital e o token no contexto
      setHospital({ hospital_id, token });

      // Armazena o token no localStorage
      localStorage.setItem("hospitalToken", token);

      // Redireciona para a página de perfil do hospital
      navigate("/HospitalProfile");
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
              <label htmlFor="hospital_id" className="form-label">ID do Hospital</label>
              <input
                type="number"
                className="form-control"
                id="hospital_id"
                name="hospital_id"
                value={formData.hospital_id}
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
