import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Home/Home.css';

export default function Home() {
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDadosUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        // Se por acaso não tiver ID ou token, cancela a busca
        if (!token || !userId) {
          console.error("Token ou ID não encontrados. Usuário não está logado corretamente.");
          setCarregando(false);
          return;
        }

        const API_BASE_URL = 'http://localhost:3000';

        // Faz a chamada para a rota de usuários do seu back-end usando o ID
        const resposta = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Salva os dados vindos do banco (name, email, etc) no estado
        setDadosUsuario(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar dados do perfil:", erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarDadosUsuario();
  }, []);

  if (carregando) {
    return <div style={{ padding: '30px' }}>Carregando seu painel...</div>;
  }

  return (
    <div className="conteudo-principal">
      <header className="cabecalho-home">
        {/* Aqui já puxa o nome real do banco de dados (name) */}
        <h1>Olá, {dadosUsuario?.name || 'Usuário'}!</h1>
        <p>Bem-vindo ao seu painel de saúde.</p>
      </header>

      <div className="grid-resumo">
        <div className="card-informativo">
          <h3>Próxima Consulta</h3>
          <p className="dado-destaque" style={{ color: '#999' }}>Nenhuma agendada</p>
          <p>Você não possui consultas futuras.</p>
        </div>

        <div className="card-informativo">
          <h3>Meu Perfil</h3>
          {/* Mostra dados reais do banco */}
          <p className="dado-destaque">{dadosUsuario?.role === 'trainer' ? 'Profissional' : 'Paciente'}</p>
          <p>{dadosUsuario?.email}</p>
        </div>

        <div className="card-informativo">
          <h3>Alertas</h3>
          <p className="dado-destaque">0</p>
          <p>Notificações novas</p>
        </div>
      </div>

      <section className="secao-detalhes">
        <h2>Atividades Recentes</h2>
        <div className="lista-atividades">
          <div className="item-atividade">
            <span>Conta criada e acessada</span>
            <small>Hoje</small>
          </div>
        </div>
      </section>
    </div>
  );
}