import React, { useContext } from "react";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { AuthContext } from "../../../Services/Context/authContext";

import UserDashboard from "../Users/UserDashboard";
import HospitalDashboard from "../Hospital/HospitalDashboard";

import AdminDashboard from "../Admin/AdminDashboard";

import hospitalImage from "../../Assets/Images/Hospital room-bro.png";
import VolunteerImage from "../../Assets/Images/Volunteering-bro.png";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { hospital } = useContext(HospitalAuthContext);

  const loggedAs = hospital ? "hospital" : user ? "user" : null;

  return (
    <div className="container py-5">
      {!loggedAs && (
        <header className="text-center mb-5">
          <h2
            className="fw-bold"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            Bem-vindo ao HealthPoint
          </h2>
          <p className="text-secondary fs-5">
            Conectando voluntários e hospitais em uma só missão: salvar vidas.
          </p>
        </header>
      )}

      {/* ✅ Dashboards */}
      {loggedAs === "user" &&
        (user.user_role === "admin" ? (
          <AdminDashboard user={user} />
        ) : (
          <UserDashboard user={user} />
        ))}

      {loggedAs === "hospital" && <HospitalDashboard hospital={hospital} />}

      {/* ✅ Se não está logado, mostra cards */}
      {!loggedAs && (
        <section className="d-flex flex-wrap justify-content-center gap-4">
          {[
            {
              img: VolunteerImage,
              alt: "Voluntário",
              title: "Você quer ser voluntário?",
              description:
                "Cadastre-se como voluntário e ajude hospitais a salvar vidas.",
              link: "/register",
              buttonText: "Quero ser voluntário",
              btnVariant: "primary",
            },
            {
              img: hospitalImage,
              alt: "Hospital",
              title: "Cadastrar meu hospital",
              description:
                "Registre seu hospital e receba voluntários rapidamente.",
              link: "/HospitalLogin",
              buttonText: "Cadastrar hospital",
              btnVariant: "outline-primary",
            },
          ].map(
            ({
              img,
              alt,
              title,
              description,
              link,
              buttonText,
              btnVariant,
            }) => (
              <div
                key={title}
                className="d-flex flex-column align-items-center text-center"
                style={{
                  width: "280px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: "24px",
                  backgroundColor: "#fafafa",
                  transition: "background-color 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f8ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fafafa")
                }
              >
                <img
                  src={img}
                  alt={alt}
                  style={{
                    width: "160px",
                    marginBottom: "20px",
                    borderRadius: "8px",
                  }}
                />
                <h3
                  className="fw-semibold mb-3"
                  style={{ color: "#0d6efd" }}
                >
                  {title}
                </h3>
                <p
                  className="text-muted mb-4"
                  style={{ fontSize: "1rem", lineHeight: "1.4" }}
                >
                  {description}
                </p>
                <a
                  href={link}
                  className={`btn btn-${btnVariant} px-4 py-2 fw-semibold`}
                  style={{
                    borderRadius: "6px",
                    fontSize: "1rem",
                  }}
                >
                  {buttonText}
                </a>
              </div>
            )
          )}
        </section>
      )}

      {/* ✅ Footer só para visitantes */}
      {!loggedAs && (
        <footer
          className="mt-5 text-center text-muted"
          style={{ fontSize: "0.95rem" }}
        >
          <p>
            Faça parte desta missão! Juntos, podemos fazer a diferença em
            milhares de vidas.
          </p>
        </footer>
      )}
    </div>
  );
}
