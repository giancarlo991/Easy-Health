import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const tipoPerfil = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'navItem active' : 'navItem';
  };

  const handleSairOuLogin = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        Logo<br /><span>EasyHealth</span>
      </div>

      <nav>
        {tipoPerfil === 'trainer' ? (
          <ul className="navList">
            <li><NavLink to="/home2" className={getNavLinkClass}>Início</NavLink></li>
            <li><NavLink to="/minhasConsultas" className={getNavLinkClass}>Consultas</NavLink></li>
            <li><NavLink to="/perfilProfissional" className={getNavLinkClass}>Perfil</NavLink></li>
            <li><NavLink to="/configuracaoProfissional" className={getNavLinkClass}>Configurações</NavLink></li>
          </ul>
        ) : (
          <ul className="navList">
            <li><NavLink to="/home1" className={getNavLinkClass}>Início</NavLink></li>
            <li><NavLink to="/agendamento" className={getNavLinkClass}>Consultas</NavLink></li>
            <li><NavLink to="/perfilPaciente" className={getNavLinkClass}>Perfil</NavLink></li>
            <li><NavLink to="/configuracaoPaciente" className={getNavLinkClass}>Configurações</NavLink></li>
          </ul>
        )}
      </nav>

      <div className="login">
        <a href="/" onClick={handleSairOuLogin}>
          {userId === 'convidado' ? 'Login' : 'Sair'}
        </a>
      </div>
    </div>
  );
}