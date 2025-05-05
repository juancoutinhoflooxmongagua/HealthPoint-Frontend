import React, { useContext } from "react";
import { AuthContext } from "../../../Context/authContext";
import UsersTradutor from "../../Components/i18n/usersTradutor.jsx"; // Corrigido o nome

export default function UserProfile() {
  const { user } = useContext(AuthContext);

  return (
    <main>
      <h1>Perfil</h1>

      <div className="col-lg-8 center">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nome: </p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.user_name}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email: </p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.user_email}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Telefone: </p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.user_phone}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nível de Usuário:</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  <UsersTradutor user={user.user_role} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
