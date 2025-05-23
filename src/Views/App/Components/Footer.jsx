import React from "react";
import { useTheme } from "../../../Services/Context/themeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`w-full py-8 px-4 ${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">HealthPoint</h3>
            <p className="text-sm mt-1">Sua saúde em primeiro lugar</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className={`hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors`}>
              Termos de Serviço
            </a>
            <a href="#" className={`hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors`}>
              Política de Privacidade
            </a>
            <a href="#" className={`hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors`}>
              Contato
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} text-center text-sm">
          <p>© 2025 HealthPoint. Todos os direitos reservados.</p>
          <p className="mt-2">Desenvolvido com ❤️ para cuidar de você</p>
        </div>
      </div>
    </footer>
  );
}