import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Home/home.css';

function HomePaciente() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || userId === 'convidado' || !token) {
          setCarregando(false);
          return;
        }

        // Busca dados do usuário
        const resUser = await api.get(`/api/users/${userId}`);
        setUsuario(resUser.data);

        // Busca consultas do usuário
        try {
          const resConsultas = await api.get(`/api/consultas/usuario/${userId}`);
          setConsultas(resConsultas.data);
        } catch (e) {
          console.error('Erro ao buscar consultas:', e);
        }

        // Busca planos ativos do usuário
        try {
          const resPlanos = await api.get('/api/plans/my');
          setPlanos(resPlanos.data);
        } catch (e) {
          console.error('Erro ao buscar planos:', e);
        }

      } catch (err) {
        console.error('Erro ao buscar dados do painel:', err);
      } finally {
        setCarregando(false);
      }
    };

    fetchData();
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

  // Encontra a próxima consulta ativa (não cancelada)
  const proximaConsulta = consultas.find(c => c.status !== 'Cancelada');

  // Constrói lista de atividades de forma dinâmica
  const atividades = [];
  
  if (consultas.length > 0) {
    const ultima = consultas[0];
    atividades.push({
      id: 'cons-' + ultima._id,
      titulo: `Consulta com ${ultima.medico}`,
      descricao: `Sessão de ${ultima.especialidade} marcada para ${ultima.data} às ${ultima.horario} (Status: ${ultima.status}).`,
      tempo: 'Recente'
    });
  }

  if (planos.length > 0) {
    const ultimoPlano = planos[0];
    atividades.push({
      id: 'plano-' + ultimoPlano._id,
      titulo: `Plano: ${ultimoPlano.name || 'Treino/Dieta'}`,
      descricao: `${ultimoPlano.description || 'Um novo plano de acompanhamento foi disponibilizado para você.'}`,
      tempo: 'Recente'
    });
  }

  // Fallbacks se não houver registros suficientes
  if (atividades.length === 0) {
    atividades.push({
      id: 'fb1',
      titulo: "Acesso à plataforma",
      descricao: "Você entrou recentemente no EasyHealth.",
      tempo: "Hoje"
    });
    atividades.push({
      id: 'fb2',
      titulo: "Perfil disponível",
      descricao: "Seu perfil já está ativo e pronto para buscar profissionais.",
      tempo: "Recentemente"
    });
  } else if (atividades.length === 1) {
    atividades.push({
      id: 'fb1',
      titulo: "Acesso à plataforma",
      descricao: "Você entrou recentemente no EasyHealth.",
      tempo: "Hoje"
    });
  }

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
            <h3>Próxima Consulta</h3>
            <span className="card-icone">📅</span>
          </div>

          {proximaConsulta ? (
            <>
              <p className="dado-destaque texto-suave">{proximaConsulta.especialidade}</p>
              <p>Com {proximaConsulta.medico} no dia {proximaConsulta.data} às {proximaConsulta.horario}.</p>
            </>
          ) : (
            <>
              <p className="dado-destaque texto-suave">Não agendado</p>
              <p>Encontre um profissional para começar seu acompanhamento.</p>
            </>
          )}
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

          <p className="dado-destaque">{planos.length}</p>
          <p>{planos.length > 0 ? `Você possui ${planos.length} plano(s) ativo(s) em sua conta.` : 'Nenhum objetivo definido ainda.'}</p>
        </div>
      </section>

      <section className="acoes-rapidas">
        <h2>Ações Rápidas</h2>

        <div className="grid-acoes">
          <button className="acao-card" onClick={() => navigate('/encontrar-trainer')}>
            <span>🔍</span>
            <div>
              <strong>Buscar Profissionais</strong>
              <small>Encontre especialistas disponíveis</small>
            </div>
          </button>

          <button className="acao-card" onClick={() => navigate('/perfilPaciente')}>
            <span>📋</span>
            <div>
              <strong>Ver Meu Perfil</strong>
              <small>Confira seus dados cadastrados</small>
            </div>
          </button>

          <button className="acao-card" onClick={() => navigate('/rankings')}>
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
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/agendamento')}>Histórico</span>
        </div>

        <div className="lista-atividades">
          {atividades.map((atv) => (
            <div key={atv.id} className="item-atividade">
              <div>
                <span>{atv.titulo}</span>
                <p>{atv.descricao}</p>
              </div>
              <small>{atv.tempo}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePaciente;