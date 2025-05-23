import React, { useContext } from "react";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { AuthContext } from "../../../Services/Context/authContext";
import { useTheme } from "../../../Services/Context/themeContext";
import { Link } from "react-router-dom";

import UserDashboard from "../Users/UserDashboard";
import HospitalDashboard from "../Hospital/HospitalDashboard";
import AdminDashboard from "../Admin/AdminDashboard";

import hospitalImage from "../../Assets/Images/Hospital room-bro.png";
import VolunteerImage from "../../Assets/Images/Volunteering-bro.png";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { hospital } = useContext(HospitalAuthContext);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const loggedAs = hospital ? "hospital" : user ? "user" : null;

  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const textColor = isDark ? "text-gray-100" : "text-gray-800";
  const cardBg = isDark ? "bg-gray-800" : "bg-gray-50";
  const secondaryText = isDark ? "text-gray-300" : "text-gray-600";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      {!loggedAs && (
        <div className={`py-16 px-4 ${isDark ? "bg-gray-800" : "bg-blue-50"}`}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Conectando <span className="text-blue-500">voluntários</span> e <span className="text-blue-500">hospitais</span>
              </h1>
              <p className={`text-xl ${secondaryText}`}>
                Uma plataforma dedicada a unir quem pode ajudar com quem precisa de ajuda.
              </p>
              <div className="flex gap-4">
                <Link 
                  to="/register" 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Quero ser voluntário
                </Link>
                <Link 
                  to="/HospitalLogin" 
                  className={`px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors ${isDark ? "hover:bg-gray-700" : ""}`}
                >
                  Sou hospital
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto py-10 px-4">
        {loggedAs === "user" && (user.user_role === "admin" ? (
          <AdminDashboard user={user} />
        ) : (
          <UserDashboard user={user} />
        ))}

        {loggedAs === "hospital" && <HospitalDashboard hospital={hospital} />}

        {!loggedAs && (
          <>
            <section className="my-20">
              <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: "👥", title: "Cadastro Simples", description: "Registre-se em poucos minutos como voluntário ou instituição de saúde." },
                  { icon: "🔍", title: "Conexão Direta", description: "Encontre oportunidades de voluntariado ou profissionais qualificados." },
                  { icon: "❤️", title: "Impacto Real", description: "Faça parte de uma rede que realmente faz diferença na saúde pública." }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className={`p-6 rounded-xl ${cardBg} transition-colors duration-300`}
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className={secondaryText}>{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="my-20 text-center">
              <h2 className="text-3xl font-bold mb-6">Pronto para fazer parte?</h2>
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                {[
                  {
                    img: VolunteerImage,
                    alt: "Voluntário",
                    title: "Você quer ser voluntário?",
                    description: "Cadastre-se como voluntário e ajude hospitais a salvar vidas.",
                    link: "/register",
                    buttonText: "Quero ser voluntário",
                    btnVariant: "bg-blue-600 hover:bg-blue-700 text-white",
                  },
                  {
                    img: hospitalImage,
                    alt: "Hospital",
                    title: "Cadastrar meu hospital",
                    description: "Registre seu hospital e receba voluntários rapidamente.",
                    link: "/HospitalLogin",
                    buttonText: "Cadastrar hospital",
                    btnVariant: "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700",
                  },
                ].map((card, index) => (
                  <div
                    key={index}
                    className={`w-full sm:w-80 flex flex-col items-center text-center p-6 rounded-xl border ${borderColor} ${isDark ? "hover:bg-gray-700" : "hover:bg-blue-50"} transition-all duration-300 shadow-sm`}
                  >
                    <img src={card.img} alt={card.alt} className="w-40 mb-5" />
                    <h3 className="text-xl font-semibold text-blue-500 mb-3">{card.title}</h3>
                    <p className={`mb-4 ${secondaryText}`}>{card.description}</p>
                    <Link
                      to={card.link}
                      className={`px-5 py-2 rounded-md font-medium ${card.btnVariant} transition-colors`}
                    >
                      {card.buttonText}
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}