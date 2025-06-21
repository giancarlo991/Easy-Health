import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Profissional/minhasConsultas.module.css';

const consultasPendentes = [
  {
    id: 1,
    paciente: 'João Silva',
    data: '10/05/2025',
    hora: '08:00',
    status: 'Pendente'
  },
  {
    id: 2,
    paciente: 'Maria Oliveira',
    data: '10/05/2025',
    hora: '10:00',
    status: 'Pendente'
  },
  {
    id: 3,
    paciente: 'Carlos Souza',
    data: '11/05/2025',
    hora: '14:00',
    status: 'Pendente'
  }
];

const MinhasConsultasProfissional = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className="sidebar">
              <div className="logo">
                Logo<br /><span>Easy Health</span>
              </div>
              <nav>
                <ul>
                <nav>
                  <ul className="navList">
                    <Link to="/home2"><li className="navItem">Início</li></Link>
                    <Link to="/minhasConsultas"><li className="navItem" style={{ color: "#00FF88" }}>Consultas</li></Link>
                    <Link to="/perfilProfissional"><li className="navItem">Perfil</li></Link>
                    <Link to="/configuracaoProfissional"><li className="navItem">Configurações</li></Link>
                  </ul>
                </nav>
                </ul>
              </nav>
              <div className="login">
               <Link to="/">Sair</Link>
              </div>
            </div>

      {/* Conteúdo Principal */}
      <div className={styles.mainContent}>
        <h1>Consultas Pendentes</h1>

        <div className={styles.consultasContainer}>
          {consultasPendentes.length > 0 ? (
            consultasPendentes.map((consulta) => (
              <div key={consulta.id} className={styles.consultaCard}>
                <h3>{consulta.paciente}</h3>
                <p><strong>Data:</strong> {consulta.data}</p>
                <p><strong>Hora:</strong> {consulta.hora}</p>
                <p><strong>Status:</strong> {consulta.status}</p>
                <button className={styles.confirmarBtn}>Confirmar Consulta</button>
                <button className={styles.cancelarBtn}>Cancelar Consulta</button>
              </div>
            ))
          ) : (
            <p className={styles.noConsultas}>Você não tem consultas pendentes no momento.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinhasConsultasProfissional;
