import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        axios.get("https://healthpoint-backend-production.up.railway.app/leaderboard", {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            setRanking(res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <main className="container mt-5">
            <h1 className="text-center text-primary mb-4" style={{ fontWeight: '600' }}>
                <i className="bi bi-trophy text-warning" style={{ fontSize: '2rem', marginRight: '10px' }}></i>
                Ranking de Voluntários
            </h1>
            {ranking.length > 0 ? (
                <div className="card shadow-sm rounded-3 border-0">
                    <div className="card-body">
                        <ul>
                            {ranking.map((user, index) => (
                                <div key={user.user_id} className="border border-primary p-2 d-flex justify-content-between">
                                    <span>{index + 1}. {user.user_name}</span>
                                    <span>{user.total_points} pts</span>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="card shadow-sm rounded-3 border-0">
                    <div className="card-body">
                        <p className="text-muted mb-0">Nenhum ranking encontrado.</p>
                    </div>
                </div>
            )}
        </main>
    );
}
