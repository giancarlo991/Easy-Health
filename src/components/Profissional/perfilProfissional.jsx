import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Profissional/perfilProfissional.css';

const API_BASE_URL = 'http://localhost:3000';

const STATUS_MAP = {
  pending:  { label: 'Pendente',  classe: 'status-pendente'  },
  approved: { label: 'Aprovado',  classe: 'status-aprovado'  },
  rejected: { label: 'Reprovado', classe: 'status-reprovado' },
};

export default function PerfilProfissional() {
  const navigate = useNavigate();

  // Dados carregados
  const [usuario, setUsuario]           = useState(null);
  const [profissional, setProfissional] = useState(null);

  // Campos editáveis
  const [telefone, setTelefone]     = useState('');
  const [endereco, setEndereco]     = useState('');
  const [tipo, setTipo]             = useState('');

  // Estado da tela
  const [editando, setEditando]     = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem]     = useState({ texto: '', tipo: '' });

  // ──────────────────────────────────────────
  // Carrega dados do backend ao montar o componente
  // ──────────────────────────────────────────
  useEffect(() => {
    const buscarPerfil = async () => {
      try {
        const token  = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || userId === 'convidado') {
          setCarregando(false);
          return;
        }

        // 1️⃣  Busca dados do usuário
        const respostaUser = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dadosUser = respostaUser.data;
        setUsuario(dadosUser);
        setTelefone(dadosUser.phone   || '');
        setEndereco(dadosUser.address || '');

        // 2️⃣  Busca dados do profissional (usa a lista e filtra pelo userId)
        const respostaProf = await axios.get(`${API_BASE_URL}/api/professionals`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const lista = respostaProf.data;
        const meu   = lista.find(
          (p) => p.userId && (p.userId._id === userId || p.userId === userId)
        );

        if (meu) {
          setProfissional(meu);
          setTipo(meu.type || 'Personal Trainer');
        }
      } catch (erro) {
        setMensagem({ texto: 'Erro ao carregar os dados do perfil.', tipo: 'erro' });
      } finally {
        setCarregando(false);
      }
    };

    buscarPerfil();
  }, []);

  // ──────────────────────────────────────────
  // Salvar alterações
  // ──────────────────────────────────────────
  const handleSalvar = async () => {
    setMensagem({ texto: '', tipo: '' });
    try {
      const token  = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      // Atualiza dados do usuário (telefone + endereço)
      await axios.put(`${API_BASE_URL}/api/users/${userId}`, {
        phone:   telefone,
        address: endereco,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Atualiza tipo do profissional (se existir registro)
      if (profissional) {
        await axios.put(`${API_BASE_URL}/api/professionals/${profissional._id}`, {
          type: tipo,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfissional({ ...profissional, type: tipo });
      }

      setUsuario({ ...usuario, phone: telefone, address: endereco });
      setEditando(false);
      setMensagem({ texto: 'Perfil atualizado com sucesso!', tipo: 'sucesso' });
      setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3500);
    } catch (erro) {
      setMensagem({ texto: 'Erro ao atualizar o perfil. Tente novamente.', tipo: 'erro' });
    }
  };

  const handleCancelar = () => {
    setTelefone(usuario?.phone   || '');
    setEndereco(usuario?.address || '');
    setTipo(profissional?.type   || 'Personal Trainer');
    setEditando(false);
    setMensagem({ texto: '', tipo: '' });
  };

  const formatarData = (dataString) => {
    if (!dataString) return '—';
    return new Date(dataString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  // ──────────────────────────────────────────
  // Renders de estado
  // ──────────────────────────────────────────
  if (carregando) {
    return (
      <div className="perfil-prof-container">
        <div className="perfil-prof-loading">
          <div className="spinner"></div>
          <p>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="perfil-prof-container">
        <div className="perfil-prof-cabecalho">
          <h1>Meu Perfil Profissional</h1>
          <p>Gerencie suas informações e métricas.</p>
        </div>
        <div className="perfil-prof-card visitante-card">
          <p className="mensagem-convidado">
            Como convidado, você não possui um perfil profissional ativo.
            Faça login para visualizar suas informações.
          </p>
          <button className="btn-salvar" onClick={() => navigate('/')}>
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = STATUS_MAP[profissional?.status] || { label: '—', classe: '' };

  return (
    <div className="perfil-prof-container">
      {/* Cabeçalho */}
      <div className="perfil-prof-cabecalho">
        <h1>Meu Perfil Profissional</h1>
        <p>Visualize e gerencie suas informações e métricas.</p>
      </div>

      {/* Alerta */}
      {mensagem.texto && (
        <div className={`alerta-prof ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

      {/* Métricas (só exibe se tiver registro de profissional) */}
      {profissional && (
        <div className="metricas-grid">
          <div className="metrica-card">
            <span className="metrica-valor">
              {profissional.weighted_rating?.toFixed(1) ?? '0.0'}
            </span>
            <span className="metrica-label">Nota Média</span>
            <div className="metrica-icone">⭐</div>
          </div>

          <div className="metrica-card">
            <span className="metrica-valor">{profissional.total_ratings ?? 0}</span>
            <span className="metrica-label">Avaliações Recebidas</span>
            <div className="metrica-icone">💬</div>
          </div>

          <div className="metrica-card">
            <span className="metrica-valor">{profissional.profile_views_7 ?? 0}</span>
            <span className="metrica-label">Visualizações (7 dias)</span>
            <div className="metrica-icone">👁️</div>
          </div>

          <div className="metrica-card">
            <span className={`status-badge ${statusInfo.classe}`}>
              {statusInfo.label}
            </span>
            <span className="metrica-label">Status da Conta</span>
            <div className="metrica-icone">🏅</div>
          </div>
        </div>
      )}

      {/* Cards de dados */}
      <div className="perfil-prof-grid">

        {/* Informações fixas */}
        <div className="perfil-prof-card">
          <h2>Informações Pessoais</h2>
          <hr className="linha-divisoria" />

          <div className="grupo-info">
            <span className="info-label">Nome Completo</span>
            <span className="info-valor">{usuario.name}</span>
          </div>

          <div className="grupo-info">
            <span className="info-label">E-mail</span>
            <span className="info-valor">{usuario.email}</span>
          </div>

          <div className="grupo-info">
            <span className="info-label">CPF</span>
            <span className="info-valor">{usuario.cpf}</span>
          </div>

          <div className="grupo-info">
            <span className="info-label">Data de Nascimento</span>
            <span className="info-valor">{formatarData(usuario.birthdate)}</span>
          </div>
        </div>

        {/* Informações editáveis */}
        <div className="perfil-prof-card">
          <div className="cabecalho-editavel">
            <h2>Contato &amp; Especialidade</h2>
            {!editando && (
              <button className="btn-editar" onClick={() => setEditando(true)}>
                Editar
              </button>
            )}
          </div>
          <hr className="linha-divisoria" />

          <div className="grupo-info">
            <span className="info-label">Telefone</span>
            {editando ? (
              <input
                type="tel"
                className="input-perfil"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(11) 99999-9999"
              />
            ) : (
              <span className="info-valor">{telefone || '—'}</span>
            )}
          </div>

          <div className="grupo-info">
            <span className="info-label">Endereço</span>
            {editando ? (
              <input
                type="text"
                className="input-perfil"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Rua, número, cidade"
              />
            ) : (
              <span className="info-valor">{endereco || '—'}</span>
            )}
          </div>

          {profissional && (
            <div className="grupo-info">
              <span className="info-label">Especialidade / Tipo</span>
              {editando ? (
                <input
                  type="text"
                  className="input-perfil"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  placeholder="Ex.: Personal Trainer, Nutricionista"
                />
              ) : (
                <span className="info-valor">{tipo || '—'}</span>
              )}
            </div>
          )}

          {editando && (
            <div className="acoes-edicao">
              <button className="btn-cancelar" onClick={handleCancelar}>
                Cancelar
              </button>
              <button className="btn-salvar" onClick={handleSalvar}>
                Salvar Alterações
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}