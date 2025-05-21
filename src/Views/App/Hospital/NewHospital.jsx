import axios from "axios";
import { useEffect, useState } from "react";
import { useMessage } from "../../../Services/Context/messageContext";

export default function NewHospital() {
  const { showMessage } = useMessage();

  const [hospitalData, setHospitalData] = useState({
    hospital_name: "",
    hospital_address: "",
    hospital_phone: ""
  });

  const [hospitals, setHospitals] = useState([]);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!token) {
      showMessage("Token não encontrado.", "error");
      return;
    }

    axios.get("https://healthpoint-backend-production.up.railway.app/hospital", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setHospitals(res.data);
    })
    .catch(() => {
      showMessage("Erro ao buscar hospitais.", "error");
    });
  }, [token, showMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      showMessage("Token não encontrado.", "error");
      return;
    }

    axios.post("https://healthpoint-backend-production.up.railway.app/hospital", hospitalData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      showMessage("Hospital cadastrado com sucesso!", "success");
      setHospitalData({
        hospital_name: "",
        hospital_address: "",
        hospital_phone: ""
      });
    })
    .catch(() => {
      showMessage("Erro ao cadastrar hospital.", "error");
    });
  };

  return (
    <main className="container my-5" style={{ maxWidth: "600px" }}>
      <div className="p-4 bg-white rounded shadow-sm">
        <h1 className="mb-4 text-primary text-center">Cadastrar novo Hospital</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="hospital_name" className="form-label fw-semibold">Nome do Hospital</label>
            <input
              type="text"
              id="hospital_name"
              name="hospital_name"
              className="form-control"
              value={hospitalData.hospital_name}
              onChange={handleChange}
              required
              placeholder="Digite o nome do hospital"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="hospital_address" className="form-label fw-semibold">Endereço do Hospital</label>
            <input
              type="text"
              id="hospital_address"
              name="hospital_address"
              className="form-control"
              value={hospitalData.hospital_address}
              onChange={handleChange}
              required
              placeholder="Digite o endereço do hospital"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="hospital_phone" className="form-label fw-semibold">Telefone do Hospital</label>
            <input
              type="text"
              id="hospital_phone"
              name="hospital_phone"
              className="form-control"
              value={hospitalData.hospital_phone}
              onChange={handleChange}
              required
              placeholder="Digite o telefone do hospital"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">Cadastrar Hospital</button>
          </div>
        </form>
      </div>
    </main>
  );
}
