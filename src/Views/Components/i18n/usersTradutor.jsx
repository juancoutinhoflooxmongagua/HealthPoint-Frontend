export default function UsersTradutor({ user }) {
    const roles = {
      admin: "Administrador",
      USER: "Usuário",
      volunteer: "Voluntário"
    };
  
    return roles[user] || "Função Desconhecida";
  }
  