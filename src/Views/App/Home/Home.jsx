import React, { useContext } from "react";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { AuthContext } from "../../../Services/Context/authContext";

import UserDashboard from "../Users/UserDashboard";
import HospitalDashboard from "../hospital/HospitalDashboard";
import AdminDashboard from "../Admin/AdminDashboard";

import hospitalImage from "../../Assets/Images/Hospital room-bro.png";
import VolunteerImage from "../../Assets/Images/Volunteering-bro.png";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { hospital } = useContext(HospitalAuthContext);

  const loggedAs = hospital ? 'hospital' : user ? 'user' : null;

  return (
    <div>
      <header>
        <h2>Bem-vindo ao HealthPoint</h2>
        <p>Conectando voluntários e hospitais em uma só missão: salvar vidas.</p>
      </header>

      {loggedAs === 'user' && (
        user.user_role === "admin" ? (
          <AdminDashboard user={user} />
        ) : (
          <UserDashboard user={user} />
        )
      )}

      {loggedAs === 'hospital' && <HospitalDashboard hospital={hospital} />}

      {!loggedAs && (
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "40px",
              flexWrap: "wrap",
              marginTop: "40px"
            }}
          >
            <article style={{ textAlign: "center", maxWidth: "300px" }}>
              <img
                src={VolunteerImage}
                alt="Voluntário"
                style={{ width: "250px" }}
              />
              <h3>Você quer ser voluntário?</h3>
              <p>Cadastre-se como voluntário e ajude hospitais a salvar vidas.</p>
              <a href="/register">Quero ser voluntário</a>
            </article>

            <article style={{ textAlign: "center", maxWidth: "300px" }}>
              <img
                src={hospitalImage}
                alt="Hospital"
                style={{ width: "250px" }}
              />
              <h3>Cadastrar meu hospital</h3>
              <p>Registre seu hospital e receba voluntários rapidamente.</p>
              <a href="/HospitalLogin">Cadastrar hospital</a>
            </article>
          </div>

          <footer style={{ marginTop: "40px", textAlign: "center" }}>
            <h4>Faça parte desta missão!</h4>
            <p>Juntos, podemos fazer a diferença em milhares de vidas.</p>
          </footer>
        </section>
      )}
    </div>
  );
}
