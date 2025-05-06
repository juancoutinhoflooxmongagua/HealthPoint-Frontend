import React, { useContext } from "react";
import { AuthContext } from "../../../Context/authContext";
import UsersTradutor from "../../Components/i18n/usersTradutor.jsx";

export default function UserProfile() {
  const { user } = useContext(AuthContext);

  return (
    <main className="container mt-5">
      <h1 className="text-center text-primary mb-4" style={{ fontWeight: '600' }}>Perfil de Usuário</h1>

      <div className="card shadow-sm rounded-3 border-0">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-sm-4">
              <p className="mb-0"><strong>Nome:</strong></p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0">{user.user_name}</p>
            </div>
          </div>
          <hr />

          <div className="row mb-4">
            <div className="col-sm-4">
              <p className="mb-0"><strong>Email:</strong></p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0">{user.user_email}</p>
            </div>
          </div>
          <hr />

          <div className="row mb-4">
            <div className="col-sm-4">
              <p className="mb-0"><strong>Telefone:</strong></p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0">{user.user_phone}</p>
            </div>
          </div>
          <hr />

          <div className="row mb-4">
            <div className="col-sm-4">
              <p className="mb-0"><strong>Nível de Usuário:</strong></p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0">
                <UsersTradutor user={user.user_role} />
              </p>
            </div>
          </div>

          <div className="text-center mt-5">
            <button
              className="btn btn-primary btn-lg"
              style={{
                borderRadius: '25px',
                padding: '12px 30px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
