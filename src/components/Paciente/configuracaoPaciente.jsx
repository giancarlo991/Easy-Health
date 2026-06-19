import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Paciente/configuracaoPaciente.css';

export default function ConfiguracaoPaciente() {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  const [notificacaoEmail, setNotificacaoEmail] = useState(true);
  const [notificacaoSms, setNotificacaoSms] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  const handleMudarSenha = () => {
    navigate('/redefinirSenha');
  };

  const handleSair = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleExcluirConta = async () => {
    const confirmacao = window.confirm(
      'Tem certeza que deseja excluir sua conta permanentemente? Esta ação não pode ser desfeita.'
    );

    if (!confirmacao) return;

    try {
      if (!userId || userId === 'convidado') {
        setMensagem({
          texto: 'Você precisa estar logado para excluir a conta.',
          tipo: 'erro'
        });
        return;
      }

      await api.delete(`/api/users/${userId}`);

      localStorage.clear();
      alert('Sua conta foi excluída com sucesso.');
      navigate('/');
    } catch (erro) {
      console.error('Erro ao excluir conta:', erro);

      const mensagemErro =
        erro.response?.data?.error ||
        erro.response?.data?.message ||
        'Erro ao tentar excluir a conta. Tente novamente.';

      setMensagem({
        texto: mensagemErro,
        tipo: 'erro'
      });
    }
  };

  if (!userId || userId === 'convidado') {
    return (
      <div className="config-container">
        <div className="cabecalho-config">
          <h1>Configurações</h1>
          <p>Preferências e segurança da conta.</p>
        </div>

        <div className="card-config centralizado">
          <p className="texto-convidado">
            Visitantes não possuem configurações avançadas. Faça login para
            personalizar sua experiência.
          </p>

          <button className="botao-primario" onClick={() => navigate('/')}>
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="config-container">
      <div className="cabecalho-config">
        <h1>Configurações</h1>
        <p>Gerencie suas preferências e a segurança da sua conta.</p>
      </div>

      {mensagem.texto && (
        <div className={`alerta-config ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}

      <div className="grid-config">
        <div className="card-config">
          <div className="sessao-titulo">
            <h2>Notificações</h2>
            <p>Escolha como deseja receber seus lembretes de consultas.</p>
          </div>

          <hr className="linha-config" />

          <div className="item-config">
            <div className="item-info">
              <h3>Lembretes por E-mail</h3>
              <p>Receba avisos com 24h de antecedência.</p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={notificacaoEmail}
                onChange={() => setNotificacaoEmail(!notificacaoEmail)}
              />
              <span className="slider redondo"></span>
            </label>
          </div>

          <div className="item-config">
            <div className="item-info">
              <h3>Avisos por WhatsApp / SMS</h3>
              <p>Receba mensagens de texto sobre o status dos agendamentos.</p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={notificacaoSms}
                onChange={() => setNotificacaoSms(!notificacaoSms)}
              />
              <span className="slider redondo"></span>
            </label>
          </div>
        </div>

        <div className="card-config">
          <div className="sessao-titulo">
            <h2>Segurança e Acesso</h2>
            <p>Mantenha sua conta protegida.</p>
          </div>

          <hr className="linha-config" />

          <div className="item-config">
            <div className="item-info">
              <h3>Senha de Acesso</h3>
              <p>Atualize sua senha periodicamente.</p>
            </div>

            <button className="botao-secundario" onClick={handleMudarSenha}>
              Alterar Senha
            </button>
          </div>

          <div className="item-config">
            <div className="item-info">
              <h3>Desconectar</h3>
              <p>Encerre sua sessão de forma segura neste dispositivo.</p>
            </div>

            <button className="botao-secundario" onClick={handleSair}>
              Sair da Conta
            </button>
          </div>
        </div>

        <div className="card-config perigo">
          <div className="sessao-titulo">
            <h2 className="texto-perigo">Zona de Perigo</h2>
            <p>Ações irreversíveis para a sua conta.</p>
          </div>

          <hr className="linha-config" />

          <div className="item-config">
            <div className="item-info">
              <h3 className="texto-perigo">Excluir Conta</h3>
              <p>Isso apagará todos os seus dados e histórico de consultas.</p>
            </div>

            <button className="botao-perigo" onClick={handleExcluirConta}>
              Excluir Definitivamente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}