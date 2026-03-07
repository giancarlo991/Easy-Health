import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'navItem active' : 'navItem';
  };

  return (
    <div className="sidebar">
      <div className="logo">
        Logo<br /><span>EasyHealth</span>
      </div>

      <nav>
        <ul className="navList">
          <li><NavLink to="/home1" className={getNavLinkClass}>Início</NavLink></li>
          <li><NavLink to="/minhasConsultas" className={getNavLinkClass}>Consultas</NavLink></li>
          <li><NavLink to="/perfilProfissional" className={getNavLinkClass}>Perfil</NavLink></li>
          <li><NavLink to="/configuracaoProfissional" className={getNavLinkClass}>Configurações</NavLink></li>
        </ul>
      </nav>

      <div className="login">
        <NavLink to="/">Sair</NavLink>
      </div>
    </div>
  );
}

export default Sidebar;