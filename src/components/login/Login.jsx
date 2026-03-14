import React, { useState } from 'react';
import '../../styles/Login/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Não esqueça de garantir que o axios está instalado (npm install axios)

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(''); // Estado para exibir mensagens de erro do back-end
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro(''); // Limpa qualquer erro anterior da tela

    const API_BASE_URL = 'http://localhost:3000'; 

    try {
      // Faz o POST para a rota de login enviando email e senha
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: email,
        password: senha // O back-end espera 'password', então traduzimos aqui
      });

      // Se a requisição for um sucesso (status 200)
      if (response.status === 200) {
        // Salva o token JWT no navegador para manter o usuário logado
        localStorage.setItem('token', response.data.token);
        
        console.log('Login efetuado com sucesso!');
        
        // Redireciona o usuário para a tela principal (altere '/dashboard' para a sua rota real)
        navigate('/dashboard'); 
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Pega a mensagem de erro exata que o seu AuthController mandou (ex: "Email e senha são obrigatórios.")
      const mensagemErro = error.response?.data?.error || "Erro ao conectar com o servidor. O back-end está rodando?";
      setErro(mensagemErro);
    }
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

        {/* O formulário agora dispara a nossa função handleLogin quando enviado */}
        <form className="login" onSubmit={handleLogin}>
          <h1>Entrar</h1>
          
          {/* Exibe a mensagem de erro em vermelho caso o login falhe */}
          {erro && (
            <div style={{ color: '#ff4d4f', marginBottom: '15px', fontWeight: 'bold', textAlign: 'center' }}>
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

          <button type="submit">ENTRAR</button>

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