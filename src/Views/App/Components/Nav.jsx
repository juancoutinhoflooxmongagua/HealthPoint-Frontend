import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";
import { AuthContext } from "../../../Services/Context/authContext";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const { hospital, logoutHospital } = useContext(HospitalAuthContext);

  const handleLogout = () => {
    if (user) logoutUser();
    if (hospital) logoutHospital();
    setIsOpen(false);
  };

  const loggedAs = hospital ? "hospital" : user ? "user" : null;

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 fixed w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            HealthPoint
          </span>
        </NavLink>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? "" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
            <li>
              <NavLink to="/" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                Home
              </NavLink>
            </li>

            {loggedAs === "hospital" && (
              <>
                <li>
                  <NavLink to="/HospitalProfile" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                    Perfil Hospital
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="block py-2 px-3 rounded bg-red-500 text-white hover:bg-red-600">
                    Sair
                  </button>
                </li>
              </>
            )}

            {loggedAs === "user" && (
              <>
                <li>
                  <NavLink to="/UserProfile" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                    Perfil
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Notifications" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                    Notificações
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="block py-2 px-3 rounded bg-red-500 text-white hover:bg-red-600">
                    Sair
                  </button>
                </li>
              </>
            )}

            {!loggedAs && (
              <>
                <li>
                  <NavLink to="/login" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                    Login Usuário
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/HospitalLogin" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                    Login Hospital
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
