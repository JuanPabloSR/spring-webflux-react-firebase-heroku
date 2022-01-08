import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export const PublicNavbar = () => (
  <nav>
    <section>
      <Link to="/">Inicio</Link>
      <Link to="/questions">Preguntas</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">SignUp</Link>
    </section>
  </nav>
);

export const PrivateNavbar = () => (
  <nav className="barra">
    <img  className="logo" src={logo} alt="logo" />{" "}
    <section>
      <Link to="/">Inicio</Link>
      <Link to="/questions">Preguntas</Link>
      <Link to="/new">Nueva</Link>
      <Link to="/list">Lista</Link>
      <Link to="/profile">Perfil</Link>
    </section>
  </nav>
);
