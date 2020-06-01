import React, { useState } from "react";

import "./Login.css";
import logo from "../assets/logo.svg";

import api from "../services/api";

function Login({ history }) {
  const [username, setUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api
      .post("/devs", {
        username,
      })
      .catch((error) => error);

    if (!response.data) {
      alert("Usuário do GitHub não encontrado, tente novamente!");
    } else {
      const { _id } = response.data;
      history.push(`/dev/${_id}`);
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="TinDev" />
        <input
          placeholder="Digite seu usuário no GitHub!"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
