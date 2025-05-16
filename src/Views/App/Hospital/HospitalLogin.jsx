import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HospitalAuthContext } from "../../../../../Context/hospitalContext";

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
    <main>
      <h1>Login do Hospital</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="hospital_id">ID do Hospital</label>
          <input
            type="number"
            id="hospital_id"
            name="hospital_id"
            value={formData.hospital_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="hospital_password">Senha</label>
          <input
            type="password"
            id="hospital_password"
            name="hospital_password"
            value={formData.hospital_password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </main>
  );
}
