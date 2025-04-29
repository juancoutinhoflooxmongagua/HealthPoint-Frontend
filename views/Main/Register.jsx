import React from "react";

export default function Register() {
    return (
        <form>
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />
            <input type="text" placeholder="Telefone" />
            <button type="submit">Registrar</button>
        </form>
    );
}
