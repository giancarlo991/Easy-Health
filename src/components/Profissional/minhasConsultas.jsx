import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/Profissional/minhasConsultas.css';

function MinhasConsultas() {
  const [consultas, setConsultas] = useState([]);
  const [filtro, setFiltro] = useState('Todas');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [processandoId, setProcessandoId] = useState(null);

  const fetchConsultas = async () => {
    try {
      setCarregando(true);
      setErro('');
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setErro('Usuário não autenticado.');
        return;
      }

      // 1. Obter os dados do perfil do profissional para ter seu ID de profissional
      const resProf = await api.get(`/api/professionals/${userId}`);
      const professionalId = resProf.data._id;

      if (!professionalId) {
        setErro('Perfil de profissional não localizado.');
        return;
      }

      // 2. Buscar as consultas deste profissional
      const resConsultas = await api.get(`/api/consultas/profissional/${professionalId}`);
      setConsultas(resConsultas.data);
    } catch (err) {
      console.error('Erro ao carregar consultas:', err);
      // Se for falha de conexão ou 500, exibe erro amigável
      setErro(err.response?.data?.error || err.response?.data?.message || 'Erro ao conectar com o servidor. Verifique se o backend está online.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  const handleConfirmar = async (consultaId) => {
    if (!window.confirm('Deseja realmente confirmar esta consulta?')) return;
    try {
      setProcessandoId(consultaId);
      await api.patch(`/api/consultas/${consultaId}/confirmar`);
      alert('Consulta confirmada com sucesso!');
      await fetchConsultas();
    } catch (err) {
      console.error('Erro ao confirmar consulta:', err);
      alert(err.response?.data?.error || 'Erro ao confirmar consulta.');
    } finally {
      setProcessandoId(null);
    }
  };

  const handleCancelar = async (consultaId) => {
    if (!window.confirm('Deseja realmente cancelar esta consulta? Ação irreversível.')) return;
    try {
      setProcessandoId(consultaId);
      const res = await api.patch(`/api/consultas/${consultaId}/cancelar`);
      alert(res.data.message || 'Consulta cancelada com sucesso!');
      await fetchConsultas();
    } catch (err) {
      console.error('Erro ao cancelar consulta:', err);
      alert(err.response?.data?.error || 'Erro ao cancelar consulta.');
    } finally {
      setProcessandoId(null);
    }
  };

  const consultasFiltradas = consultas.filter((c) => {
    if (filtro === 'Todas') return true;
    return c.status === filtro;
  });

  if (carregando && consultas.length === 0) {
    return (
      <div className="conteudo-principal">
        <div className="consultas-container-loading">
          <div className="spinner"></div>
          <p>Carregando sua agenda de consultas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="conteudo-principal">
      <header className="cabecalho-consultas">
        <h1>Minhas Consultas</h1>
        <p>Gerencie seus horários de atendimento, confirme agendamentos pendentes ou realize cancelamentos.</p>
      </header>

      {erro && (
        <div className="alert alert-danger">
          <div className="alert-content">
            <svg viewBox="0 0 24 24" className="alert-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <div>
              <strong>Ops! Algo deu errado:</strong>
              <p>{erro}</p>
            </div>
          </div>
          <button className="btn-retry" onClick={fetchConsultas}>Tentar Novamente</button>
        </div>
      )}

      {!erro && (
        <>
          <div className="consultas-filtros">
            {['Todas', 'Pendente', 'Confirmada', 'Cancelada'].map((status) => (
              <button
                key={status}
                className={`filtro-btn ${filtro === status ? 'active' : ''} status-${status.toLowerCase()}`}
                onClick={() => setFiltro(status)}
              >
                {status === 'Todas' ? 'Todas' : status === 'Pendente' ? 'Pendentes' : status === 'Confirmada' ? 'Confirmadas' : 'Canceladas'}
                <span className="filtro-badge">
                  {status === 'Todas'
                    ? consultas.length
                    : consultas.filter((c) => c.status === status).length}
                </span>
              </button>
            ))}
          </div>

          {consultasFiltradas.length === 0 ? (
            <div className="consultas-vazio">
              <svg viewBox="0 0 24 24" className="vazio-icon">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 17H5V10h14v10zm-2-7h-2v-2h2v2zm-4 0h-2v-2h2v2zm-4 0H7v-2h2v2zm8 4h-2v-2h2v2zm-4 0h-2v-2h2v2zm-4 0H7v-2h2v2z" />
              </svg>
              <h3>Nenhuma consulta encontrada</h3>
              <p>Não há consultas com o status "{filtro}" registradas na sua agenda.</p>
            </div>
          ) : (
            <div className="consultas-grid">
              {consultasFiltradas.map((consulta) => (
                <div key={consulta._id} className={`consulta-card card-status-${consulta.status.toLowerCase()}`}>
                  <div className="consulta-card-header">
                    <div className="consulta-data-badge">
                      <span className="data-dia">{consulta.data.split('/')[0]}</span>
                      <span className="data-mes-ano">{consulta.data.split('/')[1]}/{consulta.data.split('/')[2]}</span>
                    </div>
                    <div className="consulta-info-meta">
                      <span className="consulta-horario">
                        <svg viewBox="0 0 24 24" className="icon-small">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                        </svg>
                        {consulta.horario}hs
                      </span>
                      <span className={`status-tag status-${consulta.status.toLowerCase()}`}>
                        {consulta.status}
                      </span>
                    </div>
                  </div>

                  <div className="consulta-card-body">
                    <div className="info-paciente">
                      <h4>Paciente</h4>
                      <p className="paciente-nome">{consulta.paciente}</p>
                      <div className="paciente-contatos">
                        {consulta.pacienteEmail && (
                          <span className="contato-item">
                            <svg viewBox="0 0 24 24" className="icon-micro">
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            {consulta.pacienteEmail}
                          </span>
                        )}
                        {consulta.pacienteTelefone && (
                          <span className="contato-item">
                            <svg viewBox="0 0 24 24" className="icon-micro">
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            {consulta.pacienteTelefone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="info-especialidade">
                      <span className="especialidade-tag">{consulta.especialidade}</span>
                    </div>
                  </div>

                  {consulta.status !== 'Cancelada' && (
                    <div className="consulta-card-actions">
                      {consulta.status === 'Pendente' && (
                        <button
                          className="btn-confirmar"
                          onClick={() => handleConfirmar(consulta._id)}
                          disabled={processandoId === consulta._id}
                        >
                          {processandoId === consulta._id ? 'Processando...' : 'Confirmar Consulta'}
                        </button>
                      )}
                      <button
                        className="btn-cancelar"
                        onClick={() => handleCancelar(consulta._id)}
                        disabled={processandoId === consulta._id}
                      >
                        {processandoId === consulta._id && consulta.status !== 'Pendente' ? 'Processando...' : 'Cancelar Consulta'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MinhasConsultas;