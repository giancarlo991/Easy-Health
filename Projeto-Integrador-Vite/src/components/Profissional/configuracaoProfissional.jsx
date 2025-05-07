import React, { useState } from "react";
import styles from "../../styles/Paciente/configuracaoPaciente.module.css";
import { Link } from "react-router-dom";

const ConfiguracaoPaciente = () => {
  const [email, setEmail] = useState("maridaAmador@saude.com");
  const [telefone, setTelefone] = useState("(11) 99999-9999");
  const [endereco, setEndereco] = useState("Rua das Caneleiras, 123");
  const [notificacoes, setNotificacoes] = useState(true);

  const handleSave = () => {
    // Aqui, você pode adicionar a lógica para salvar as configurações
    console.log("Configurações salvas");
  };

  return (
    <div>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span>Easy</span>Health
        </div>
        <nav>
          <ul className={styles.navList}>
            <Link to="/home2"><li className={styles.navItem}>Início</li></Link>
            <Link to="/minhasConsultas"><li className={styles.navItem}>Consultas</li></Link>
            <Link to="/perfilProfissional"><li className={styles.navItem}>Perfil</li></Link>
            <li className={styles.navItem} style={{ color: "#00FF88" }}>Configurações</li>
          </ul>
        </nav>
        <div className={styles.login}>
          <Link to="/login">Sair</Link>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.configHeader}>
          <h1>Configurações</h1>
          <p>Altere suas configurações pessoais e preferências.</p>
        </div>

        <div className={styles.configSection}>
          <h3>Informações Pessoais</h3>
          <div className={styles.configItem}>
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className={styles.configItem}>
            <label>Telefone</label>
            <input 
              type="text" 
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)} 
            />
          </div>
          <div className={styles.configItem}>
            <label>Endereço</label>
            <input 
              type="text" 
              value={endereco} 
              onChange={(e) => setEndereco(e.target.value)} 
            />
          </div>
        </div>

        <div className={styles.configSection}>
          <h3>Preferências</h3>
          <div className={styles.configItem}>
            <label>
              <input 
                type="checkbox" 
                checked={notificacoes} 
                onChange={() => setNotificacoes(!notificacoes)} 
              />
              Receber Notificações por Email
            </label>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.action} onClick={handleSave}>Salvar Configurações</button>
        </div>
      </main>
    </div>
  );
};

export default ConfiguracaoPaciente;
