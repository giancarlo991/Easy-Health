import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Paciente/agendamento.css';

export default function Consultas() {
  const [modoAgendamento, setModoAgendamento] = useState(false);
  const [buscaEspecialidade, setBuscaEspecialidade] = useState('');
  const [consultas, setConsultas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarConsultas = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || userId === 'convidado') {
          setCarregando(false);
          return;
        }

        const API_BASE_URL = 'http://localhost:3000';
        
        const resposta = await axios.get(`${API_BASE_URL}/api/consultas/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setConsultas(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar consultas:", erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarConsultas();
  }, []);

  const especialidadesMock = [
    'Cardiologia', 'Dermatologia', 'Endocrinologia', 'Fisioterapia', 'Nutrição', 'Ortopedia', 'Pediatria', 'Psicologia'
  ];

  const especialidadesFiltradas = especialidadesMock.filter(esp =>
    esp.toLowerCase().includes(buscaEspecialidade.toLowerCase())
  );

  if (modoAgendamento) {
    return (
      <div className="consultas-container">
        <div className="cabecalho-consultas">
          <div>
            <h1>Agendar Nova Consulta</h1>
            <p>Encontre o profissional ideal para sua necessidade.</p>
          </div>
          <button className="botao-voltar" onClick={() => setModoAgendamento(false)}>
            Voltar
          </button>
        </div>

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
                <button className="botao-selecionar">Ver Profissionais</button>
              </div>
            ))
          ) : (
            <p className="mensagem-vazia">Nenhuma especialidade encontrada.</p>
          )}
        </div>
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

      <div className="lista-consultas">
        {carregando ? (
          <div className="estado-vazio">
            <p>Buscando suas consultas...</p>
          </div>
        ) : consultas.length > 0 ? (
          consultas.map((consulta) => (
            <div key={consulta._id || consulta.id} className="card-consulta">
              <div className="info-consulta">
                <h3>{consulta.especialidade}</h3>
                <p className="medico-nome">{consulta.medico}</p>
                <span className="status-badge">{consulta.status}</span>
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