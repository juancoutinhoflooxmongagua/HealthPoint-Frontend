import React from "react";

export default function Hospital() {
    return (
        <main className="container mt-5">
            <h1 className="text-center text-primary mb-4" style={{ fontWeight: '600' }}>Hospitais</h1>
            <div className="card shadow-sm rounded-3 border-0">
                <div className="card-body">
                    <p className="text-muted mb-0">Nenhum hospital encontrado.</p>
                </div>
            </div>
        </main>
    );
}