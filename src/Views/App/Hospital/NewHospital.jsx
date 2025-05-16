import axios from "axios";
import { useEffect, useState } from "react";

export default function NewHospital() {
  const [hospitalData, setHospitalData] = useState({
    hospital_name: "",
    hospital_address: "",
    hospital_phone: ""
  });

  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Token não encontrado.");
      return;
    }

    axios.get("https://healthpoint-backend-production.up.railway.app/hospital", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setHospitals(res.data);
      setError(null);
    })
    .catch(() => {
      setError("Erro ao buscar hospitais.");
    });
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalData({
      ...hospitalData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      setError("Token não encontrado.");
      return;
    }

    axios.post("https://healthpoint-backend-production.up.railway.app/hospital", hospitalData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      alert("Hospital cadastrado com sucesso!");
      setHospitalData({
        hospital_name: "",
        hospital_address: "",
        hospital_phone: ""
      });
    })
    .catch(() => {
      alert("Erro ao cadastrar hospital.");
    });
  };

  return (
    <main>
      <h1>Cadastrar novo Hospital</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="hospital_name">Nome do Hospital</label><br />
          <input
            type="text"
            id="hospital_name"
            name="hospital_name"
            value={hospitalData.hospital_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="hospital_address">Endereço do Hospital</label><br />
          <input
            type="text"
            id="hospital_address"
            name="hospital_address"
            value={hospitalData.hospital_address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="hospital_phone">Telefone do Hospital</label><br />
          <input
            type="text"
            id="hospital_phone"
            name="hospital_phone"
            value={hospitalData.hospital_phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">Cadastrar Hospital</button>
        </div>
      </form>
    </main>
  );
}
