import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/Home/home.css';

function HomePaciente() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        const res = await api.get(`/api/users/${userId}`);
        setUsuario(res.data);
      } catch (err) {
        console.error('Erro ao buscar dados do usuario:', err);
      } finally {
        setCarregando(false);
      }
    };
    fetchUser();
  }, []);

  if (carregando) {
    return (
      <div className="conteudo-principal">
        <div className="skeleton-header" />
        <div className="grid-resumo">
          {[1, 2, 3].map(i => <div key={i} className="skeleton-card" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="conteudo-principal">
      <header className="cabecalho-home">
        <h1>Ola, {usuario?.name || 'Usuario'}!</h1>
        <p>Bom ver voce de volta. Vamos focar nos seus objetivos hoje?</p>
      </header>

      <div className="grid-resumo">
        <div className="card-informativo">
          <h3>Proximo Treino</h3>
          <p className="dado-destaque" style={{ color: 'var(--text-muted)', fontSize: '1.4rem' }}>
            Nao agendado
          </p>
          <p>Encontre um trainer para comecar.</p>
        </div>

        <div className="card-informativo">
          <h3>Meu Perfil</h3>
          <p className="dado-destaque" style={{ fontSize: '1.8rem' }}>
            {usuario?.role === 'trainer' ? 'Profissional' : 'Paciente'}
          </p>
          <p>{usuario?.email}</p>
        </div>

        <div className="card-informativo">
          <h3>Metas Ativas</h3>
          <p className="dado-destaque">0</p>
          <p>Nenhum objetivo definido ainda.</p>
        </div>
      </div>

      <section className="secao-detalhes">
        <h2>Atividades Recentes</h2>
        <div className="lista-atividades">
          <div className="item-atividade">
            <span>Acesso a plataforma</span>
            <small>Hoje</small>
          </div>
          <div className="item-atividade">
            <span>Perfil atualizado</span>
            <small>Recentemente</small>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePaciente;