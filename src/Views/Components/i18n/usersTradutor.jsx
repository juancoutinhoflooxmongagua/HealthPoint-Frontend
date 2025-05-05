export default function UsersTradutor({ user }) {
    const roles = {
      admin: "Administrador",
      USER: "Usuário",
    };
  
    return roles[user] || "Função Desconhecida";
  }
  