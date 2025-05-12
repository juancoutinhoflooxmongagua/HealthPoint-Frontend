import axios from "axios";
import React, { useEffect, useState } from "react";

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
        <main className="container mt-5">
            <h1 className="text-center text-primary mb-4" style={{ fontWeight: '600' }}>Cadastrar novo Hospital</h1>
            
            {error && <div className="alert alert-danger text-center">{error}</div>}

            <div className="card shadow-sm rounded-3 border-0">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="hospital_name" className="form-label">Nome do Hospital</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="hospital_name" 
                                name="hospital_name"
                                value={hospitalData.hospital_name}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hospital_address" className="form-label">Endereço do Hospital</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="hospital_address" 
                                name="hospital_address"
                                value={hospitalData.hospital_address}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hospital_phone" className="form-label">Telefone do Hospital</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="hospital_phone" 
                                name="hospital_phone"
                                value={hospitalData.hospital_phone}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Cadastrar Hospital</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
