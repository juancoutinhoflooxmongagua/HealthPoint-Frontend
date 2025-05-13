import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Statistics() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axios.get("https://healthpoint-backend-production.up.railway.app/stats", {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            setStats(res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    const cardStyle = "col-md-3 mb-4";
    const cardBody = "card shadow-sm border-0 rounded-3 text-center p-4";
    const iconSize = { fontSize: '3rem' };
    const bgColor = "bg-light"; // Fundo claro para os cards

    return (
        <main className="container mt-5">
            <h1 className="text-center text-primary mb-4 fw-semibold">Painel de Estatísticas</h1>
            {stats ? (
                <div className="row">
                    {/* Card de Total de Usuários */}
                    <div className={cardStyle}>
                        <div className={`${cardBody} ${bgColor}`}>
                            <i className="bi bi-person-fill text-primary mb-2" style={iconSize}></i>
                            <h5>Total de Usuários</h5>
                            <h2 className="fw-bold">{stats.total_users}</h2>
                        </div>
                    </div>

                    {/* Card de Total de Hospitais */}
                    <div className={cardStyle}>
                        <div className={`${cardBody} ${bgColor}`}>
                            <i className="bi bi-hospital-fill text-success mb-2" style={iconSize}></i>
                            <h5>Total de Hospitais</h5>
                            <h2 className="fw-bold">{stats.total_hospitals}</h2>
                        </div>
                    </div>

                    {/* Card de Total de Vagas */}
                    <div className={cardStyle}>
                        <div className={`${cardBody} ${bgColor}`}>
                            <i className="bi bi-briefcase text-warning mb-2" style={iconSize}></i>
                            <h5>Total de Vagas</h5>
                            <h2 className="fw-bold">{stats.total_jobs}</h2>
                        </div>
                    </div>

                    {/* Card de Total de Aplicações */}
                    <div className={cardStyle}>
                        <div className={`${cardBody} ${bgColor}`}>
                            <i className="bi bi-file-earmark-text-fill text-danger mb-2" style={iconSize}></i>
                            <h5>Total de Aplicações</h5>
                            <h2 className="fw-bold">{stats.total_applications}</h2>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card shadow-sm rounded-3 border-0">
                    <div className="card-body text-center">
                        <p className="text-muted mb-0">Nenhuma estatística encontrada.</p>
                    </div>
                </div>
            )}
        </main>
    );
}
