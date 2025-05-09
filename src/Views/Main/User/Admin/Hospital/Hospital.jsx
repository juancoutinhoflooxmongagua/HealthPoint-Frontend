import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Hospital() {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        axios.get("https://healthpoint-backend-production.up.railway.app/hospital", {

        })
        .then((res) => {
            setHospitals(res.data); 
        })
        .catch((err) => {
            console.error(err); 
        });
    }, ); 

    return (
        <main className="container mt-5">
            <h1 className="text-center text-primary mb-4" style={{ fontWeight: '600' }}>Hospitais Cadastrados</h1>
            {hospitals.length > 0 ? ( 
                <div className="card shadow-sm rounded-3 border-0">
                    <div className="card-body">
                        <ul>
                            {hospitals.map((hospital) => (
                                <div className="border border-primary p-2" key={hospital.hospital_id}>
                                     <h2>{hospital.hospital_name}</h2>
                                    <h6><strong>Endereço:</strong> {hospital.hospital_address}</h6>
                                    <h6><strong>Telefone:</strong> {hospital.hospital_phone}</h6>
                                    <h6> <strong>Criado no Sistema em:</strong> {hospital.created_at}</h6>
                                </div> 
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="card shadow-sm rounded-3 border-0">
                    <div className="card-body">
                        <p className="text-muted mb-0">Nenhum hospital encontrado.</p>
                    </div>
                </div>
            )}
        </main>
    );
}
