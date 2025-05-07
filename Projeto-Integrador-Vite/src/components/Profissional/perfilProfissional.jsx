import React from 'react';
import styles from '../../styles/Profissional/perfilProfissional.module.css';
import { Link } from 'react-router-dom';

const PerfilProfissional = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <span>Easy</span>Health
        </div>
        <nav>
          <ul>
            <Link to="/home2"><li className={styles.navItem}>Início</li></Link>
            <Link to="/minhasConsultas"><li className={styles.navItem}>Consultas</li></Link>
            <Link to="/perfilProfissional"><li className={styles.navItem} style={{ color: '#00FF88' }}>Perfil</li></Link>
            <Link to="/configuracaoProfissional"><li className={styles.navItem}>Configurações</li></Link>
          </ul>
        </nav>
        <div className={styles.login}>
          <Link to="/login">Sair</Link>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.profileHeader}>
          <h1>Olá, Dra. Maria de Amador!</h1>
          <p>
            Bem-vindo ao seu perfil profissional. Aqui você pode gerenciar suas consultas, visualizar
            informações do paciente e agendar atendimentos.
          </p>
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.profileCard}>
            <h3>Informações Profissionais</h3>
            <p><strong>Especialidade:</strong> Fisioterapeuta</p>
            <p><strong>CREFITO:</strong> 12345-SP</p>
            <p><strong>Contato:</strong> maridaAmador@saude.com</p>
            <p><strong>Telefone:</strong> (11) 99999-9999</p>
          </div>
          <div className={styles.profileCard}>
            <h3>Horário de Atendimento</h3>
            <p><strong>Segunda a Sexta:</strong> 8:00 - 18:00</p>
            <p><strong>Sábado:</strong> 9:00 - 12:00</p>
          </div>
        </div>

        <div className={styles.appointmentList}>
          <h3>Consultas Agendadas</h3>
          <div className={styles.appointmentItem}>
            <p>Paciente - João Silva</p>
            <p>15/12/2024 - 10:00</p>
            <p className={styles.status}>Confirmada</p>
          </div>
          <div className={styles.appointmentItem}>
            <p>Paciente - Maria Costa</p>
            <p>17/12/2024 - 14:00</p>
            <p className={styles.status}>Pendente</p>
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.action}>Agendar Novo Atendimento</div>
          <div className={styles.action}>Editar Perfil</div>
        </div>
      </main>
    </div>
  );
};

export default PerfilProfissional;