import React from "react";
import styles from "../../styles/Paciente/agendamento.module.css";
import { Link } from "react-router-dom";

const Agendamento = () => {
  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span>Easy</span>Health
        </div>
        <nav>
          <ul className={styles.navList}>
            <Link to="/home1"><li className={styles.navItem}>Início</li></Link>
            <Link to="/agendamento"><li className={styles.navItem} style={{ color: "#00FF88" }}>Consultas</li></Link>
            <Link to="/perfilPaciente"><li className={styles.navItem} >Perfil</li></Link>
            <Link to="/configuracaoPaciente"><li className={styles.navItem}>Configurações</li></Link>
          </ul>
        </nav>
        <div className={styles.login}>
          <Link to="/login">Sair</Link>
        </div>
      </aside>

      <div className={styles.grid}>
        <section className={styles.c1}>
          <h1>AGENDAMENTO DE HORÁRIO</h1>

          <div className={styles.c11}>
            <h3>12/08/2024</h3>
            <img src="../../public/imagens/flechaDireita.png" alt="Seta" />
          </div>

          <div className={styles.c12}>
            <h3>Horários disponíveis</h3>
            <div className={styles.horarios}>
              {Array.from({ length: 21 }).map((_, index) => (
                <div key={index} className={styles.horario}>8:00</div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.c2}>
          <div>
            <img src="../../public/imagens/doutor1.png" alt="Marcos Limão" />
            <p>Marcos Limão - Fisioterapeuta</p>
          </div>
          <div>
            <img src="../../public/imagens/doutor2.png" alt="Rayssa" />
            <p>Rayssa - Nutricionista</p>
          </div>
          <div>
            <img src="../../public/imagens/doutor3.png" alt="Dr. Adolfo" />
            <p>Dr. Adolfo - Dermatologista</p>
          </div>
          <div>
            <img src="../../public/imagens/doutor4.png" alt="Dr. Yamashida" />
            <p>Dr. Yamashida - Cardiologista</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Agendamento;
