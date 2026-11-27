import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Menu() {
  return (
    <aside className="barra-lateral">
      <div className="marca">
        <img className="marca-logo" src="/logo-garage.svg" alt="Logo Garagê" />
        <div className="marca-texto">
          <h1>Garagê</h1>
          <span>Gestão de estacionamento condominial</span>
        </div>
      </div>

      <nav className="menu-lateral" aria-label="Menu principal">
        <NavLink to="/" end>
          <span className="menu-icone">⌂</span>
          <span>Início</span>
        </NavLink>
        <NavLink to="/cadastro">
          <span className="menu-icone">＋</span>
          <span>Reservar</span>
        </NavLink>
        <NavLink to="/disponiveis">
          <span className="menu-icone">P</span>
          <span>Vagas Livres</span>
        </NavLink>
        <NavLink to="/cadastradas">
          <span className="menu-icone">▣</span>
          <span>Vagas Ocupadas</span>
        </NavLink>
      </nav>
    </aside>
  );
}
