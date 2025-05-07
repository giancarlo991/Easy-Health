import React from 'react';
import '../../styles/Home/home.css'; // Ajuste o caminho conforme a estrutura do seu projeto
import propaganda1 from './img/propaganda1.png';
import propaganda2 from './img/propaganda2.png';
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="sidebar">
        <div className="logo">
          Logo<br /><span>Easy Health</span>
        </div>
        <nav>
          <ul>
          <nav>
            <ul className="navList">
              <Link to="/home1"><li className="navItem" style={{ color: "#00FF88" }}>Início</li></Link>
              <Link to="/agendamento"><li className="navItem">Consultas</li></Link>
              <Link to="/perfilPaciente"><li className="navItem">Perfil</li></Link>
              <Link to="/configuracaoPaciente"><li className="navItem">Configurações</li></Link>
            </ul>
          </nav>
          </ul>
        </nav>
        <div className="login">
         <Link to="/login">Sair</Link>
        </div>
      </div>

      <main>
        <section className="ads">
          <div className="ad">
            <img src={propaganda1} alt="Propaganda 1" />
          </div>
          <div className="ad">
            <img src={propaganda2} alt="Propaganda 2" />
          </div>
        </section>

        <section className="actions">
          <div className="action">Vacinas</div>
          <div className="action">Exames</div>
          <div className="action">Medicamentos</div>
          <div className="action">Rede de Saúde</div>
          <div className="action">Agendamentos</div>
          <div className="action">Atendimentos</div>
          <div className="action">Contatos</div>
          <div className="action">Alergias</div>
          <div className="action">Diário de Saúde</div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
