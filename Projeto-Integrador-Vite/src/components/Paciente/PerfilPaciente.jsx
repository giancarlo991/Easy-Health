import React from 'react';
import styles from '../../styles/Paciente/perfilPaciente.module.css';
import { Link } from 'react-router-dom'

const PerfilPaciente = () => {
  return (
    <div>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span>Easy</span>Health
        </div>
        <nav>
          <ul className={styles.navList}>
            <Link to="/home1"><li className={styles.navItem}>Início</li></Link>
            <Link to="/agendamento"><li className={styles.navItem}>Consultas</li></Link>
            <li className={styles.navItem} style={{color:"#00FF88"}}>Perfil</li>
            <Link to="/configuracaoPaciente"><li className={styles.navItem}>Configurações</li></Link>
          </ul>
        </nav>
        <div className={styles.login}>
          <Link to="/">Sair</Link>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.profileHeader}>
          <h1>Olá, João Silva!</h1>
          <p>Bem-vindo ao seu perfil. Aqui você pode visualizar seus dados e agendar consultas.</p>
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.profileCard}>
            <h3>Informações Pessoais</h3>
            <p><strong>Email:</strong> joao.silva@mail.com</p>
            <p><strong>Telefone:</strong> (11) 98765-4321</p>
            <p><strong>Endereço:</strong> Rua das Flores, 123</p>
          </div>
          <div className={styles.profileCard}>
            <h3>Plano de Saúde</h3>
            <p><strong>Operadora:</strong> Saúde Total</p>
            <p><strong>Plano:</strong> Premium</p>
            <p><strong>Validade:</strong> Até 12/2025</p>
          </div>
        </div>

        <div className={styles.appointmentList}>
          <h3>Minhas Consultas Agendadas</h3>
          <div className={styles.appointmentItem}>
            <p className={styles.esquerda}>Fisioterapia - Dr. Ana Pereira</p>
            <p className={styles.centro}>15/12/2024 - 10:00</p>
            <p className={`${styles.status} ${styles.direita}`}>Confirmada</p>
          </div>
          <div className={styles.appointmentItem}>
            <p className={styles.esquerda}>Consulta Nutricional - Dra. Beatriz Costa</p>
            <p className={styles.centro}>17/12/2024 - 14:00</p>
            <p className={`${styles.status} ${styles.direita}`}>Pendente</p>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/agendamento"><div className={styles.action}>Agendar Nova Consulta</div></Link>
          <Link to="/configuracaoPaciente"><div className={styles.action}>Editar Perfil</div></Link>
        </div>
      </main>
    </div>
  );
};

export default PerfilPaciente;
