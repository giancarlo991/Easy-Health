import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || userId === 'convidado') {
          setCarregando(false);
          return;
        }

        const API_BASE_URL = 'http://localhost:3000';
        const resposta = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const usuario = resposta.data;
        setDadosIniciais(usuario);
        setTelefone(usuario.phone || '');
        setEndereco(usuario.address || '');
      } catch (erro) {
        setMensagem({ texto: 'Erro ao carregar os dados do perfil.', tipo: 'erro' });
      } finally {
        setCarregando(false);
      }
    };

    buscarPerfil();
  }, []);

  const handleSalvar = async () => {
    setMensagem({ texto: '', tipo: '' });
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const API_BASE_URL = 'http://localhost:3000';

      await axios.put(`${API_BASE_URL}/api/users/${userId}`, {
        phone: telefone,
        address: endereco
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setDadosIniciais({ ...dadosIniciais, phone: telefone, address: endereco });
      setEditando(false);
      setMensagem({ texto: 'Perfil atualizado com sucesso!', tipo: 'sucesso' });
      
      setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);
    } catch (erro) {
      setMensagem({ texto: 'Erro ao atualizar o perfil. Tente novamente.', tipo: 'erro' });
    }
  };

  const handleCancelar = () => {
    setTelefone(dadosIniciais.phone || '');
    setEndereco(dadosIniciais.address || '');
    setEditando(false);
    setMensagem({ texto: '', tipo: '' });
  };

  const formatarData = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  if (carregando) {
    return <div className="perfil-container"><p>Carregando perfil...</p></div>;
  }

  if (!dadosIniciais) {
    return (
      <div className="perfil-container">
        <div className="cabecalho-perfil">
          <h1>Meu Perfil</h1>
          <p>Visualize suas informações pessoais.</p>
        </div>
        <div className="card-perfil visitante-card">
          <p className="mensagem-convidado">Como convidado, você não possui um perfil ativo para edição. Faça o cadastro ou login para gerenciar seus dados.</p>
          <button className="botao-salvar" onClick={() => navigate('/')}>
            Fazer Login
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
            <span className="info-valor">{dadosIniciais.name}</span>
          </div>
          
          <div className="grupo-info">
            <span className="info-label">E-mail</span>
            <span className="info-valor">{dadosIniciais.email}</span>
          </div>

          <div className="grupo-info">
            <span className="info-label">CPF</span>
            <span className="info-valor">{dadosIniciais.cpf}</span>
          </div>

          <div className="grupo-info">
            <span className="info-label">Data de Nascimento</span>
            <span className="info-valor">{formatarData(dadosIniciais.birthdate)}</span>
          </div>
        </div>

        <div className="card-perfil">
          <div className="cabecalho-editavel">
            <h2>Informações de Contato</h2>
            {!editando && (
              <button className="botao-editar" onClick={() => setEditando(true)}>
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
              />
            ) : (
              <span className="info-valor">{telefone}</span>
            )}
          </div>

          <div className="grupo-info">
            <span className="info-label">Endereço Completo</span>
            {editando ? (
              <input 
                type="text" 
                className="input-perfil" 
                value={endereco} 
                onChange={(e) => setEndereco(e.target.value)} 
              />
            ) : (
              <span className="info-valor">{endereco}</span>
            )}
          </div>

          {editando && (
            <div className="acoes-edicao">
              <button className="botao-cancelar" onClick={handleCancelar}>Cancelar</button>
              <button className="botao-salvar" onClick={handleSalvar}>Salvar Alterações</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}