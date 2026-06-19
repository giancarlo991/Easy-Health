import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import logo from '../assets/logo.png';

/* ── SVG icon helpers ── */
const IconHome = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);
const IconSearch = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);
const IconCalendar = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);
const IconUser = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconSettings = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);
const IconTrophy = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 000-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47 1-1.06 1.06L7 18a2 2 0 000 4h10a2 2 0 000-4l-1.94-.94A1.1 1.1 0 0114 17v-2.34"/>
    <path d="M18 2H6v7a6 6 0 0012 0V2z"/>
  </svg>
);
const IconLogOut = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

function Sidebar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId') || 'convidado';
  const role = localStorage.getItem('role');

  const handleSair = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="EasyHealth Logo" className="logo-img" />
        <span className="logo-tagline">Performance &amp; Health</span>
      </div>

      <nav>
        {role === 'trainer' ? (
          <ul className="navList">
            <li>
              <NavLink to="/home2" className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}>
                <IconHome /> Início
              </NavLink>
            </li>
            <li>
              <NavLink to="/rankings" className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}>
                <IconTrophy /> Rankings
              </NavLink>
            </li>
            <li>
              <NavLink to="/minhasConsultas" className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}>
                <IconCalendar /> Consultas
              </NavLink>
            </li>
            <li>
              <NavLink to="/perfilProfissional" className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}>
                <IconUser /> Perfil
              </NavLink>
            </li>
            <li>
              <NavLink to="/configuracaoProfissional" className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}>
                <IconSettings /> Configurações
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="navList">
            <li>
              <NavLink to="/home1" className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}>
                <IconHome /> Início
              </NavLink>
            </li>
            <li>
              <NavLink to="/encontrar-trainer" className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}>
                <IconSearch /> Encontrar Trainer
              </NavLink>
            </li>
            <li>
              <NavLink to="/agendamento" className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}>
                <IconCalendar /> Consultas
              </NavLink>
            </li>
            <li>
              <NavLink to="/perfilPaciente" className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}>
                <IconUser /> Perfil
              </NavLink>
            </li>
            <li>
              <NavLink to="/configuracaoPaciente" className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}>
                <IconSettings /> Configurações
              </NavLink>
            </li>
          </ul>
        )}
      </nav>

      <div className="logout-container">
        <button onClick={handleSair} className="logout-btn">
          <IconLogOut />
          {userId === 'convidado' ? 'Fazer Login' : 'Sair da Conta'}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
