import React, { useContext } from "react";
import { AuthContext } from "../../Context/authContext";
import { HospitalAuthContext } from "../../Context/hospitalContext";

import UserDashboard from "./User/UserDashboard";
import HospitalDashboard from "./User/Admin/Hospital/HospitalDashboard";
import AdminDashboard from "../Main/User/Admin/AdminDashboard";

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
          <div>
            <article>
              <img src={VolunteerImage} alt="Voluntário" />
              <h3>Você quer ser voluntário?</h3>
              <p>Cadastre-se como voluntário e ajude hospitais a salvar vidas.</p>
              <a href="/register">Quero ser voluntário</a>
            </article>

            <article>
              <img src={hospitalImage} alt="Hospital" />
              <h3>Cadastrar meu hospital</h3>
              <p>Registre seu hospital e receba voluntários rapidamente.</p>
              <a href="/HospitalLogin">Cadastrar hospital</a>
            </article>
          </div>

          <footer>
            <h4>Faça parte desta missão!</h4>
            <p>Juntos, podemos fazer a diferença em milhares de vidas.</p>
          </footer>
        </section>
      )}
    </div>
  );
}
