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

        if (!userId || userId === 'convidado') {
          setCarregando(false);
          return;
        }

        const res = await api.get(`/api/users/${userId}`);
        setUsuario(res.data);
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
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
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>

        <div className="skeleton-lista" />
      </div>
    );
  }

  const nomeUsuario = usuario?.name || 'Usuário';
  const tipoPerfil = usuario?.role === 'trainer' ? 'Profissional' : 'Paciente';
  const emailUsuario = usuario?.email || 'Conta convidada';

  return (
    <div className="conteudo-principal">
      <header className="cabecalho-home">
        <div>
          <span className="badge-home">Painel do Paciente</span>
          <h1>Olá, {nomeUsuario}!</h1>
          <p>Bom ver você de volta. Vamos focar nos seus objetivos hoje?</p>
        </div>

        <div className="avatar-home">
          {nomeUsuario.charAt(0).toUpperCase()}
        </div>
      </header>

      <section className="grid-resumo">
        <div className="card-informativo card-destaque">
          <div className="card-topo">
            <h3>Próximo Treino</h3>
            <span className="card-icone">🏋️</span>
          </div>

          <p className="dado-destaque texto-suave">Não agendado</p>
          <p>Encontre um profissional para começar seu acompanhamento.</p>
        </div>

        <div className="card-informativo">
          <div className="card-topo">
            <h3>Meu Perfil</h3>
            <span className="card-icone">👤</span>
          </div>

          <p className="dado-destaque perfil-texto">{tipoPerfil}</p>
          <p>{emailUsuario}</p>
        </div>

        <div className="card-informativo">
          <div className="card-topo">
            <h3>Metas Ativas</h3>
            <span className="card-icone">🎯</span>
          </div>

          <p className="dado-destaque">0</p>
          <p>Nenhum objetivo definido ainda.</p>
        </div>
      </section>

      <section className="acoes-rapidas">
        <h2>Ações Rápidas</h2>

        <div className="grid-acoes">
          <button className="acao-card">
            <span>🔍</span>
            <div>
              <strong>Buscar Profissionais</strong>
              <small>Encontre especialistas disponíveis</small>
            </div>
          </button>

          <button className="acao-card">
            <span>📋</span>
            <div>
              <strong>Ver Meu Perfil</strong>
              <small>Confira seus dados cadastrados</small>
            </div>
          </button>

          <button className="acao-card">
            <span>⭐</span>
            <div>
              <strong>Rankings</strong>
              <small>Veja profissionais bem avaliados</small>
            </div>
          </button>
        </div>
      </section>

      <section className="secao-detalhes">
        <div className="secao-titulo">
          <h2>Atividades Recentes</h2>
          <span>Histórico</span>
        </div>

        <div className="lista-atividades">
          <div className="item-atividade">
            <div>
              <span>Acesso à plataforma</span>
              <p>Você entrou recentemente no EasyHealth.</p>
            </div>
            <small>Hoje</small>
          </div>

          <div className="item-atividade">
            <div>
              <span>Perfil disponível</span>
              <p>Seu perfil já pode ser usado para buscar profissionais.</p>
            </div>
            <small>Recentemente</small>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePaciente;