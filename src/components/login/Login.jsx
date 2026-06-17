import React, { useState } from 'react';
import '../../styles/Login/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await api.post('/api/auth/login', {
        email: email,
        password: senha
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('role', response.data.user.role);

        if (response.data.user.role === 'trainer') {
          navigate('/home2');
        } else {
          navigate('/home1');
        }
      }
    } catch (error) {
      console.error('Erro no login:', error);

      const mensagemErro =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Erro ao conectar com o servidor.';

      setErro(mensagemErro);
    }
  };

  const handleConvidado = () => {
    localStorage.setItem('token', 'convidado');
    localStorage.setItem('userId', 'convidado');
    localStorage.setItem('role', 'user');
    navigate('/home1');
  };

  return (
    <div className="login-page">
      <div className="c1">
        <div className="c11">
          <h1>Bem-vindo de volta!</h1>
          <hr />
          <p>Caso não tenha uma conta</p>
          <div className="registro-btn">
            <Link to="/registro">
              <button>Crie uma conta</button>
            </Link>
          </div>
        </div>

        <form className="login" onSubmit={handleLogin}>
          <h1>Entrar</h1>

          {erro && (
            <div className="mensagem-erro">
              {erro}
            </div>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className="btn-entrar">ENTRAR</button>

          <button type="button" className="btn-convidado" onClick={handleConvidado}>
            Entrar como Convidado
          </button>

          <div className="esqueceu-a-senha">
            <Link to="/Esqueceu-a-senha">
              Esqueceu a senha?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}