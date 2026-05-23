import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/Home/home.css';

function HomeProfissional() {
  const [perfil, setPerfil] = useState(null);
  const [stats, setStats] = useState({ totalViews: 0 });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');

        if (!userId || role !== 'trainer') return;

        // 1. Buscar dados do profissional
        const resProf = await api.get(`/api/professionals/${userId}`);
        setPerfil(resProf.data);

        // 2. Buscar estatísticas de visualização
        const resStats = await api.get(`/api/professionals/${userId}/profile-views`);
        setStats(resStats.data);

      } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
      } finally {
        setCarregando(false);
      }
    };

    fetchData();
  }, []);

  if (carregando) {
    return (
      <div className="conteudo-principal">
        <div className="cabecalho-home">
          <h1>Carregando Dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="conteudo-principal">
      <header className="cabecalho-home">
        <h1>Bem-vindo, {perfil?.name || 'Profissional'}!</h1>
        <p>Acompanhe seu desempenho e gestão de alunos na plataforma EasyHealth.</p>
      </header>

      <div className="grid-resumo">
        <div className="card-informativo">
          <h3>Visualizações de Perfil</h3>
          <p className="dado-destaque">{stats.totalViews}</p>
          <p>Nos últimos 7 dias</p>
        </div>

        <div className="card-informativo">
          <h3>Avaliação Média</h3>
          <p className="dado-destaque">{perfil?.rating?.toFixed(1) || '0.0'}</p>
          <p>{perfil?.ratingCount || 0} avaliações recebidas</p>
        </div>

        <div className="card-informativo">
          <h3>Especialidade</h3>
          <p className="dado-destaque" style={{ fontSize: '1.5rem', marginTop: '10px' }}>
            {perfil?.type === 'personal' ? 'Personal Trainer' : 'Nutricionista'}
          </p>
          <p>Segmento de atuação</p>
        </div>
      </div>

      <section className="secao-detalhes">
        <h2>Próximos Passos</h2>
        <div className="lista-atividades">
          <div className="item-atividade">
            <span>Atualizar currículo e fotos</span>
            <small>Pendente</small>
          </div>
          <div className="item-atividade">
            <span>Verificar novas mensagens de alunos</span>
            <small>Disponível em breve</small>
          </div>
          <div className="item-atividade">
            <span>Revisar planos de treino ativos</span>
            <small>Em dia</small>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeProfissional;