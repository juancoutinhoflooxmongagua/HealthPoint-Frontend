import { useTheme } from "../../../Services/Context/themeContext";

export default function Footer() {
  const { theme } = useTheme();
  const darkClass = theme === "dark";
  
  return (
    <footer className={`py-6 px-4 ${darkClass ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border-t`}>
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">HealthPoint</h3>
            <p className="text-sm">Sua saúde em primeiro lugar</p>
          </div>
          
          <div className="flex space-x-6">
            {['Termos', 'Privacidade', 'Contato'].map((item) => (
              <a 
                href="#" 
                key={item}
                className={`text-sm ${darkClass ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className={`mt-6 pt-6 text-sm ${darkClass ? 'text-gray-500 border-gray-700' : 'text-gray-400 border-gray-200'} border-t`}>
          <p>© {new Date().getFullYear()} HealthPoint. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}