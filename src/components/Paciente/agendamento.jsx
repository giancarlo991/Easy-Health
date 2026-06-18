import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/Paciente/agendamento.css';

export default function Consultas() {
  const [modoAgendamento, setModoAgendamento] = useState(false);
  const [passo, setPasso] = useState(1); // 1: especialidades, 2: profissionais, 3: data/hora
  const [buscaEspecialidade, setBuscaEspecialidade] = useState('');
  const [consultas, setConsultas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estados do formulário de agendamento
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('');
  const [profissionais, setProfissionais] = useState([]);
  const [carregandoProfissionais, setCarregandoProfissionais] = useState(false);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [dataConsulta, setDataConsulta] = useState('');
  const [horaConsulta, setHoraConsulta] = useState('');
  const [enviandoAgendamento, setEnviandoAgendamento] = useState(false);

  // Estados do reagendamento
  const [consultaParaReagendar, setConsultaParaReagendar] = useState(null);
  const [novaData, setNovaData] = useState('');
  const [novoHorario, setNovoHorario] = useState('');
  const [enviandoReagendamento, setEnviandoReagendamento] = useState(false);

  // Estados do cancelamento
  const [consultaParaCancelar, setConsultaParaCancelar] = useState(null);
  const [confirmarCancelamentoMsg, setConfirmarCancelamentoMsg] = useState('');
  const [enviandoCancelamento, setEnviandoCancelamento] = useState(false);

  const buscarConsultas = async () => {
    try {
      setCarregando(true);
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || userId === 'convidado') {
        setCarregando(false);
        return;
      }

      const resposta = await api.get(`/api/consultas/usuario/${userId}`);
      setConsultas(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar consultas:", erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarConsultas();
  }, []);

  const especialidadesMock = [
    'Personal Trainer', 'Nutrição Esportiva', 'Fisioterapia Esportiva', 'Endocrinologia Esportiva', 'Dermatologia Estética'
  ];

  const especialidadesFiltradas = especialidadesMock.filter(esp =>
    esp.toLowerCase().includes(buscaEspecialidade.toLowerCase())
  );

  const selecionarEspecialidade = async (esp) => {
    setEspecialidadeSelecionada(esp);
    setCarregandoProfissionais(true);
    setPasso(2);

    try {
      // Mapeia especialidades do frontend para o enum do backend
      let tipoBackend = 'Personal Trainer';
      if (esp === 'Nutrição Esportiva') tipoBackend = 'Nutricionista';
      else if (esp === 'Fisioterapia Esportiva') tipoBackend = 'Fisioterapeuta';
      else if (esp === 'Endocrinologia Esportiva') tipoBackend = 'Endocrinologista';
      else if (esp === 'Dermatologia Estética') tipoBackend = 'Dermatologista';

      const resposta = await api.get(`/api/professionals/type/${tipoBackend}`);
      setProfissionais(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar profissionais:", erro);
      alert("Erro ao carregar profissionais para esta especialidade.");
      setPasso(1);
    } finally {
      setCarregandoProfissionais(false);
    }
  };

  const selecionarProfissional = (prof) => {
    setProfissionalSelecionado(prof);
    setPasso(3);
  };

  const realizarAgendamento = async (e) => {
    e.preventDefault();
    if (!profissionalSelecionado || !dataConsulta || !horaConsulta) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setEnviandoAgendamento(true);
    try {
      await api.post('/api/consultas', {
        professionalId: profissionalSelecionado._id,
        especialidade: especialidadeSelecionada,
        data: dataConsulta,
        horario: horaConsulta
      });

      alert("Consulta agendada com sucesso!");
      
      // Reseta estados e volta para a listagem
      setModoAgendamento(false);
      setPasso(1);
      setEspecialidadeSelecionada('');
      setProfissionalSelecionado(null);
      setDataConsulta('');
      setHoraConsulta('');
      
      buscarConsultas();
    } catch (erro) {
      console.error("Erro ao realizar agendamento:", erro);
      const msg = erro.response?.data?.error || "Erro ao agendar consulta.";
      alert(msg);
    } finally {
      setEnviandoAgendamento(false);
    }
  };

  const iniciarCancelamento = (consulta) => {
    // Calcula antecedência da consulta
    const [dia, mes, ano] = consulta.data.split('/');
    const dataHoraConsulta = new Date(`${ano}-${mes}-${dia}T${consulta.horario}:00`);
    const diffMs = dataHoraConsulta.getTime() - Date.now();
    const diffHours = diffMs / (1000 * 60 * 60);

    let confirmarMsg = `Tem certeza que deseja cancelar sua consulta de ${consulta.especialidade} com ${consulta.medico}?`;
    if (diffHours < 24) {
      confirmarMsg = `ATENÇÃO: Faltam menos de 24 horas para esta consulta. O cancelamento gerará uma multa de 30% sobre o valor da sessão. Deseja prosseguir com o cancelamento?`;
    }

    setConfirmarCancelamentoMsg(confirmarMsg);
    setConsultaParaCancelar(consulta);
  };

  const realizarCancelamento = async () => {
    if (!consultaParaCancelar) return;
    setEnviandoCancelamento(true);
    try {
      const resposta = await api.patch(`/api/consultas/${consultaParaCancelar._id}/cancelar`);
      alert(resposta.data.message);
      setConsultaParaCancelar(null);
      buscarConsultas();
    } catch (erro) {
      console.error("Erro ao cancelar consulta:", erro);
      const msg = erro.response?.data?.error || "Erro ao cancelar consulta.";
      alert(msg);
    } finally {
      setEnviandoCancelamento(false);
    }
  };

  const abrirReagendamento = (consulta) => {
    // Converte a data da tela DD/MM/YYYY para YYYY-MM-DD para o input date
    const [dia, mes, ano] = consulta.data.split('/');
    const dataFormatada = ano && mes && dia ? `${ano}-${mes}-${dia}` : '';

    setConsultaParaReagendar(consulta);
    setNovaData(dataFormatada);
    setNovoHorario(consulta.horario);
  };

  const realizarReagendamento = async (e) => {
    e.preventDefault();
    if (!novaData || !novoHorario) {
      alert("Por favor, selecione data e horário.");
      return;
    }

    setEnviandoReagendamento(true);
    try {
      await api.put(`/api/consultas/${consultaParaReagendar._id}/reagendar`, {
        data: novaData,
        horario: novoHorario
      });

      alert("Consulta reagendada com sucesso!");
      setConsultaParaReagendar(null);
      buscarConsultas();
    } catch (erro) {
      console.error("Erro ao reagendar consulta:", erro);
      const msg = erro.response?.data?.error || "Erro ao reagendar consulta.";
      alert(msg);
    } finally {
      setEnviandoReagendamento(false);
    }
  };

  const voltarPasso = () => {
    if (passo === 3) {
      setPasso(2);
      setProfissionalSelecionado(null);
    } else if (passo === 2) {
      setPasso(1);
      setEspecialidadeSelecionada('');
      setProfissionais([]);
    } else {
      setModoAgendamento(false);
    }
  };

  if (modoAgendamento) {
    return (
      <div className="consultas-container">
        <div className="cabecalho-consultas">
          <div>
            <h1>Agendar Nova Consulta</h1>
            <p>
              {passo === 1 && "Passo 1: Selecione a Especialidade"}
              {passo === 2 && `Passo 2: Selecione o Profissional (${especialidadeSelecionada})`}
              {passo === 3 && `Passo 3: Escolha Data e Horário com ${profissionalSelecionado?.userId?.name}`}
            </p>
          </div>
          <button className="botao-voltar" onClick={voltarPasso}>
            Voltar
          </button>
        </div>

        {passo === 1 && (
          <>
            <div className="area-busca">
              <input
                type="text"
                className="input-busca"
                placeholder="Buscar por especialidade (ex: Nutrição)..."
                value={buscaEspecialidade}
                onChange={(e) => setBuscaEspecialidade(e.target.value)}
              />
            </div>

            <div className="grid-especialidades">
              {especialidadesFiltradas.length > 0 ? (
                especialidadesFiltradas.map((esp, index) => (
                  <div key={index} className="card-especialidade">
                    <h3>{esp}</h3>
                    <button 
                      className="botao-selecionar" 
                      onClick={() => selecionarEspecialidade(esp)}
                    >
                      Ver Profissionais
                    </button>
                  </div>
                ))
              ) : (
                <p className="mensagem-vazia">Nenhuma especialidade encontrada.</p>
              )}
            </div>
          </>
        )}

        {passo === 2 && (
          <div className="area-profissionais">
            {carregandoProfissionais ? (
              <p className="mensagem-vazia">Buscando profissionais disponíveis...</p>
            ) : profissionais.length > 0 ? (
              <div className="grid-especialidades" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {profissionais.map((prof) => (
                  <div key={prof._id} className="card-especialidade" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', alignItems: 'flex-start' }}>
                    <h3 style={{ margin: 0 }}>{prof.userId?.name || 'Profissional'}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                      <strong>{prof.type}</strong> - {prof.city} ({prof.state})
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                      {prof.bio || 'Sem biografia disponível.'}
                    </p>
                    <p style={{ fontWeight: 'bold', color: 'var(--primary)', margin: '4px 0 12px 0' }}>
                      R$ {prof.pricePerHour}/hora
                    </p>
                    <button 
                      className="botao-selecionar" 
                      onClick={() => selecionarProfissional(prof)}
                      style={{ width: '100%' }}
                    >
                      Selecionar
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mensagem-vazia">Nenhum profissional aprovado cadastrado para esta especialidade.</p>
            )}
          </div>
        )}

        {passo === 3 && (
          <div className="formulario-agendamento-container" style={{ maxWidth: '500px', margin: '0 auto', background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <form onSubmit={realizarAgendamento} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Profissional</label>
                <input 
                  type="text" 
                  value={profissionalSelecionado?.userId?.name || ''} 
                  disabled 
                  style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-color)' }}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="dataConsulta" style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Data da Consulta</label>
                <input 
                  type="date" 
                  id="dataConsulta" 
                  value={dataConsulta} 
                  onChange={(e) => setDataConsulta(e.target.value)}
                  required 
                  min={new Date().toISOString().split('T')[0]}
                  style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-color)' }}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="horaConsulta" style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Horário</label>
                <input 
                  type="time" 
                  id="horaConsulta" 
                  value={horaConsulta} 
                  onChange={(e) => setHoraConsulta(e.target.value)}
                  required 
                  style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-color)' }}
                />
              </div>

              <button 
                type="submit" 
                className="botao-agendar" 
                disabled={enviandoAgendamento}
                style={{ width: '100%', padding: '12px', marginTop: '12px', cursor: 'pointer' }}
              >
                {enviandoAgendamento ? "Processando..." : "Confirmar Agendamento"}
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="consultas-container">
      <div className="cabecalho-consultas">
        <div>
          <h1>Minhas Consultas</h1>
          <p>Acompanhe seu histórico e próximos agendamentos.</p>
        </div>
        <button className="botao-agendar" onClick={() => setModoAgendamento(true)}>
          + Nova Consulta
        </button>
      </div>

      {/* Modal / Overlay de Confirmação de Cancelamento */}
      {consultaParaCancelar && (
        <div className="overlay-reagendamento overlay-cancelamento" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '16px' }}>
          <div className="formulario-agendamento-container" style={{ width: '100%', maxWidth: '450px', background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h2 style={{ marginTop: 0, marginBottom: '12px', color: '#e74c3c' }}>Confirmar Cancelamento</h2>
            <p style={{ color: 'var(--text-color)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.5' }}>
              {confirmarCancelamentoMsg}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                type="button" 
                onClick={() => setConsultaParaCancelar(null)}
                style={{ flex: 1, padding: '10px', borderRadius: '6px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', cursor: 'pointer' }}
              >
                Voltar
              </button>
              <button 
                type="button" 
                onClick={realizarCancelamento}
                disabled={enviandoCancelamento}
                className="botao-confirmar-cancelamento"
                style={{ flex: 2, padding: '10px', borderRadius: '6px', background: '#e74c3c', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {enviandoCancelamento ? "Processando..." : "Confirmar Cancelamento"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal / Overlay de Reagendamento */}
      {consultaParaReagendar && (
        <div className="overlay-reagendamento" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '16px' }}>
          <div className="formulario-agendamento-container" style={{ width: '100%', maxWidth: '450px', background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h2 style={{ marginTop: 0, marginBottom: '8px', color: 'var(--text-color)' }}>Reagendar Consulta</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Alterar a consulta de <strong>{consultaParaReagendar.especialidade}</strong> com <strong>{consultaParaReagendar.medico}</strong>.
            </p>
            <form onSubmit={realizarReagendamento} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="novaData" style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Nova Data</label>
                <input 
                  type="date" 
                  id="novaData" 
                  value={novaData} 
                  onChange={(e) => setNovaData(e.target.value)}
                  required 
                  min={new Date().toISOString().split('T')[0]}
                  style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-color)' }}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="novoHorario" style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Novo Horário</label>
                <input 
                  type="time" 
                  id="novoHorario" 
                  value={novoHorario} 
                  onChange={(e) => setNovoHorario(e.target.value)}
                  required 
                  style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-color)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button 
                  type="button" 
                  onClick={() => setConsultaParaReagendar(null)}
                  style={{ flex: 1, padding: '10px', borderRadius: '6px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="botao-agendar" 
                  disabled={enviandoReagendamento}
                  style={{ flex: 2, padding: '10px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  {enviandoReagendamento ? "Salvando..." : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="lista-consultas">
        {carregando ? (
          <div className="estado-vazio">
            <p>Buscando suas consultas...</p>
          </div>
        ) : consultas.length > 0 ? (
          consultas.map((consulta) => (
            <div key={consulta._id} className="card-consulta">
              <div className="info-consulta">
                <h3>{consulta.especialidade}</h3>
                <p className="medico-nome">{consulta.medico}</p>
                <span className="status-badge" style={{ 
                  background: consulta.status === 'Pendente' ? '#f39c1233' : '#2ecc7133', 
                  color: consulta.status === 'Pendente' ? '#f39c12' : '#2ecc71',
                  border: consulta.status === 'Pendente' ? '1px solid #f39c12' : '1px solid #2ecc71'
                }}>
                  {consulta.status}
                </span>

                {/* Ações de Cancelamento e Reagendamento para Consultas Pendentes */}
                {consulta.status === 'Pendente' && (
                  <div className="acoes-consulta" style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button 
                      className="botao-reagendar" 
                      onClick={() => abrirReagendamento(consulta)}
                      style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                      Reagendar
                    </button>
                    <button 
                      className="botao-cancelar-consulta" 
                      onClick={() => iniciarCancelamento(consulta)}
                      style={{ background: 'transparent', border: '1px solid #e74c3c', color: '#e74c3c', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
              <div className="data-consulta">
                <p className="data-destaque">{consulta.data}</p>
                <p className="horario-destaque">{consulta.horario}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="estado-vazio">
            <p>Não há nenhuma consulta marcada.</p>
          </div>
        )}
      </div>
    </div>
  );
}