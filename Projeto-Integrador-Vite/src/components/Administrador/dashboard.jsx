import React from "react";
import styles from "../../styles/Administrador/dashboard.module.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardAdmin() {
  const userStatsData = {
    labels: ["Ativos", "Novos", "Inativos"],
    datasets: [
      {
        label: "Quantidade",
        data: [120, 15, 30],
        backgroundColor: ["#4BC0C0", "#08F984", "#FF6384"],
      },
    ],
  };

  const consultationsData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Consultas",
        data: [20, 25, 30, 40, 35, 50],
        backgroundColor: "transparent",
        borderColor: "#08F984",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#08F984",
      },
    ],
  };

  const examsData = {
    labels: ["Pendentes", "Concluídos"],
    datasets: [
      {
        data: [15, 85],
        backgroundColor: ["#FF6384", "#08F984"],
      },
    ],
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.logo}>
            <span>Easy</span>Health
          </div>
          <nav>
            <ul className={styles.navList}>
              <li className={styles.navItem} style={{ color: "#08F984" }}>
                Visão Geral
              </li>
              <li className={styles.navItem}>Usuários</li>
              <li className={styles.navItem}>Consultas</li>
              <li className={styles.navItem}>Exames</li>
              <li className={styles.navItem}>Notificações</li>
            </ul>
          </nav>
          <div className={styles.login}>
            <a href="#">Sair</a>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <h2 className={styles.title}>Dashboard Administrativo</h2>

          <div className={styles.graphSection}>
            <h3 className={styles.graphTitle}>Usuários</h3>
            <div className={styles.graphCard}>
              <Bar data={userStatsData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <div className={styles.graphSection}>
            <h3 className={styles.graphTitle}>Consultas</h3>
            <div className={styles.graphCard}>
              <Line data={consultationsData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <div className={styles.graphSection}>
            <h3 className={styles.graphTitle}>Exames</h3>
            <div className={styles.graphCard}>
              <Pie data={examsData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
