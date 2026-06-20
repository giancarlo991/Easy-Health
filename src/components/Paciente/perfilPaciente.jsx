import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Paciente/perfilPaciente.css';

export default function PerfilPaciente() {
  const [dadosIniciais, setDadosIniciais] = useState(null);
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const buscarPerfil = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId || userId === 'convidado') {
          setCarregando(false);
          return;
        }

        const resposta = await api.get(`/api/users/${userId}`);

        const usuario = resposta.data;

        setDadosIniciais(usuario);
        setTelefone(usuario.phone || '');
        setEndereco(usuario.address || '');
      } catch (erro) {
        console.error('Erro ao carregar perfil:', erro);

        setMensagem({
          texto: 'Erro ao carregar os dados do perfil.',
          tipo: 'erro'
        });
      } finally {
        setCarregando(false);
      }
    };

    buscarPerfil();
  }, []);

  const handleSalvar = async () => {
    setMensagem({ texto: '', tipo: '' });

    try {
      const userId = localStorage.getItem('userId');

      if (!userId || userId === 'convidado') {
        setMensagem({
          texto: 'Você precisa estar logado para atualizar o perfil.',
          tipo: 'erro'
        });
        return;
      }

      await api.put(`/api/users/${userId}`, {
        phone: telefone,
        address: endereco
      });

      setDadosIniciais({
        ...dadosIniciais,
        phone: telefone,
        address: endereco
      });

      setEditando(false);

      setMensagem({
        texto: 'Perfil atualizado com sucesso!',
        tipo: 'sucesso'
      });

      setTimeout(() => {
        setMensagem({ texto: '', tipo: '' });
      }, 3000);
    } catch (erro) {
      console.error('Erro ao atualizar perfil:', erro);

      const mensagemErro =
        erro.response?.data?.error ||
        erro.response?.data?.message ||
        'Erro ao atualizar o perfil. Tente novamente.';

      setMensagem({
        texto: mensagemErro,
        tipo: 'erro'
      });
    }
  };

  const handleCancelar = () => {
    setTelefone(dadosIniciais?.phone || '');
    setEndereco(dadosIniciais?.address || '');
    setEditando(false);
    setMensagem({ texto: '', tipo: '' });
  };

  const formatarData = (dataString) => {
    if (!dataString) return 'Não informado';

    const data = new Date(dataString);

    if (Number.isNaN(data.getTime())) {
      return 'Não informado';
    }

    return data.toLocaleDateString('pt-BR', {
      timeZone: 'UTC'
    });
  };

  if (carregando) {
    return (
      <div className="perfil-container">
        <div className="cabecalho-perfil">
          <h1>Meu Perfil</h1>
          <p>Carregando suas informações...</p>
        </div>

        <div className="card-perfil">
          <p className="mensagem-convidado">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const isConvidado = !token || userId === 'convidado';

  if (isConvidado) {
    return (
      <div className="perfil-container">
        <div className="cabecalho-perfil">
          <h1>Meu Perfil</h1>
          <p>Visualize suas informações pessoais.</p>
        </div>

        <div className="card-perfil visitante-card">
          <p className="mensagem-convidado">
            Como convidado, você não possui um perfil ativo para edição.
            Faça o cadastro ou login para gerenciar seus dados.
          </p>

          <button className="botao-salvar" onClick={() => navigate('/')}>
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  if (!dadosIniciais) {
    return (
      <div className="perfil-container">
        <div className="cabecalho-perfil">
          <h1>Meu Perfil</h1>
          <p>Visualize suas informações pessoais.</p>
        </div>

        <div className="card-perfil visitante-card">
          <p className="mensagem-convidado" style={{ color: '#ef4444' }}>
            Não foi possível carregar as informações do seu perfil. Verifique se o servidor está ativo.
          </p>

          <button className="botao-salvar" onClick={() => window.location.reload()}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="cabecalho-perfil">
        <h1>Meu Perfil</h1>
        <p>Visualize e gerencie suas informações pessoais.</p>
      </div>

      {mensagem.texto && (
        <div className={`alerta-perfil ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}

      <div className="grid-perfil">
        <div className="card-perfil">
          <h2>Informações Fixas</h2>
          <hr className="linha-divisoria" />

          <div className="grupo-info">
            <span className="info-label">Nome Completo</span>
            <span className="info-valor">
              {dadosIniciais.name || 'Não informado'}
            </span>
          </div>

          <div className="grupo-info">
            <span className="info-label">E-mail</span>
            <span className="info-valor">
              {dadosIniciais.email || 'Não informado'}
            </span>
          </div>

          <div className="grupo-info">
            <span className="info-label">CPF</span>
            <span className="info-valor">
              {dadosIniciais.cpf || 'Não informado'}
            </span>
          </div>

          <div className="grupo-info">
            <span className="info-label">Data de Nascimento</span>
            <span className="info-valor">
              {formatarData(dadosIniciais.birthdate)}
            </span>
          </div>
        </div>

        <div className="card-perfil">
          <div className="cabecalho-editavel">
            <h2>Informações de Contato</h2>

            {!editando && (
              <button
                className="botao-editar"
                onClick={() => setEditando(true)}
              >
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
                placeholder="Digite seu telefone"
                onChange={(e) => setTelefone(e.target.value)}
              />
            ) : (
              <span className="info-valor">
                {telefone || 'Não informado'}
              </span>
            )}
          </div>

          <div className="grupo-info">
            <span className="info-label">Endereço Completo</span>

            {editando ? (
              <input
                type="text"
                className="input-perfil"
                value={endereco}
                placeholder="Digite seu endereço"
                onChange={(e) => setEndereco(e.target.value)}
              />
            ) : (
              <span className="info-valor">
                {endereco || 'Não informado'}
              </span>
            )}
          </div>

          {editando && (
            <div className="acoes-edicao">
              <button className="botao-cancelar" onClick={handleCancelar}>
                Cancelar
              </button>

              <button className="botao-salvar" onClick={handleSalvar}>
                Salvar Alterações
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}