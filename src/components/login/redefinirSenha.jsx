import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Login/Login.css'; 
import axios from 'axios';

export default function RedefinirSenha() {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [carregando, setCarregando] = useState(false);
  
  const navigate = useNavigate();
  const tipoPerfil = localStorage.getItem('role');

  const handleRedefinir = async (e) => {
    e.preventDefault();
    setMensagem({ texto: '', tipo: '' });

    if (novaSenha !== confirmarSenha) {
      setMensagem({ texto: 'As novas senhas não coincidem.', tipo: 'erro' });
      return;
    }

    if (novaSenha.length < 6) {
      setMensagem({ texto: 'A nova senha deve ter pelo menos 6 caracteres.', tipo: 'erro' });
      return;
    }

    setCarregando(true);

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const API_BASE_URL = 'http://localhost:3000';

      // Envia a nova senha para a rota de atualização do usuário
      await axios.put(`${API_BASE_URL}/api/users/${userId}`, {
        password: novaSenha
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCarregando(false);
      setMensagem({ texto: 'Senha alterada com sucesso no banco de dados!', tipo: 'sucesso' });
      
      setTimeout(() => {
        if (tipoPerfil === 'trainer') {
          navigate('/configuracaoProfissional');
        } else {
          navigate('/configuracaoPaciente');
        }
      }, 2000);

    } catch (erro) {
      setCarregando(false);
      setMensagem({ texto: 'Erro ao conectar com o back-end para alterar a senha.', tipo: 'erro' });
    }
  };

  const handleVoltar = (e) => {
    e.preventDefault();
    if (tipoPerfil === 'trainer') {
      navigate('/configuracaoProfissional');
    } else {
      navigate('/configuracaoPaciente');
    }
  };

  return (
    <div className="login-page">
      <div className="c1" style={{ maxWidth: '800px', minHeight: '500px' }}>
        <div className="c11">
          <h1>Segurança</h1>
          <hr />
          <p>Mantenha sua conta protegida atualizando sua senha periodicamente.</p>
          <div className="registro-btn">
            <button onClick={handleVoltar}>Voltar para Configurações</button>
          </div>
        </div>

        <form className="login" onSubmit={handleRedefinir}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Alterar Senha</h1>
          
          {mensagem.texto && (
            <div className={`mensagem-alerta ${mensagem.tipo === 'erro' ? 'mensagem-erro' : 'mensagem-sucesso'}`}>
              {mensagem.texto}
            </div>
          )}

          <label htmlFor="senhaAtual">Senha Atual</label>
          <input
            type="password"
            id="senhaAtual"
            placeholder="Digite sua senha atual"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            required
          />

          <label htmlFor="novaSenha">Nova Senha</label>
          <input
            type="password"
            id="novaSenha"
            placeholder="Crie uma nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />

          <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            placeholder="Repita a nova senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />

          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? 'SALVANDO...' : 'ALTERAR SENHA'}
          </button>
        </form>
      </div>
    </div>
  );
}