import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { AuthContext } from "../../../Services/Context/authContext";
import { useTheme } from "../../../Services/Context/themeContext";

export default function SidebarLayout() {
  const { logoutHospital, hospital } = useContext(HospitalAuthContext);
  const { logoutUser, user } = useContext(AuthContext);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    if (hospital) logoutHospital();
    if (user) logoutUser();
  };

  const hospitalLinks = [
    { to: "/Notifications", label: "🔔 Notificações" },
    { to: "/HospitalHome", label: "🏥 Início" },
    { to: "/HospitalProfile", label: "🩺 Perfil" },
    { to: "/NewJob", label: "➕ Nova Vaga" },
    { to: "/NewPatients", label: "🧑‍⚕️ Novo Paciente" },
    { to: "/Config", label: "⚙️ Configurações" },
  ];

  const userLinks = [
    { to: "/Notifications", label: "🔔 Notificações" },
    { to: "/UserProfile", label: "👤 Perfil" },
    { to: "/Jobs", label: "💼 Vagas" },
    { to: "/Leaderboard", label: "🏆 Ranking" },
    { to: "/Config", label: "⚙️ Configurações" },
  ];

  const links = hospital ? hospitalLinks : user ? userLinks : [];

  if (!hospital && !user) return null;

  return (
    <>
      {isMobile && (
        <button
          className={`fixed top-4 left-4 z-50 p-2 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 shadow-md md:hidden`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 pt-20
          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
          border-r border-gray-200 dark:border-gray-700
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="h-full overflow-y-auto px-6 pb-4">
          <h2 className="text-2xl font-semibold mb-8">Painel</h2>
          <nav>
            <ul className="space-y-4">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-10 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          >
            🚪 Sair
          </button>
        </div>
      </aside>
    </>
  );
}