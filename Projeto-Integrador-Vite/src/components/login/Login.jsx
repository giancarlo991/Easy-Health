import React, { useState } from 'react';
import styles from '../../styles/Login/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setErro(''); // Limpa erros anteriores ao tentar novamente

  try {
    const response = await axios.post('http://localhost:8080/auth/signin', {
      email,             
      senha
    });

    const { token } = response.data;
    localStorage.setItem('token', token);
    navigate('/home1'); 
  } catch (err) {
    console.error('Erro detalhado ao logar:', err.response || err); // Log mais detalhado
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      setErro('Email ou senha inválidos.');
    } else {
      setErro('Ocorreu um erro. Tente novamente mais tarde.');
    }
  }
};

  return (
    <div className={styles.body}>
      <div className={styles.c1}>
        <div className={styles.c11}>
          <h1>Bem-vindo de volta!</h1>
          <hr />
          <p>Caso não tenha uma conta</p>
          <div className={styles["registro-btn"]}>
            <Link to="/registro">
              <button>Crie uma conta</button>
            </Link>
          </div>
        </div>

        <form className={styles.login} onSubmit={handleLogin}>
          <h1>Entrar</h1>
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

          {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}

          <div className={styles["esqueceu-a-senha"]}>
            <Link to="/Esqueceu-a-senha">
              Esqueceu a senha?
            </Link>
          </div>
        </form>

        <div id={styles.mensagemCadastro}>
          Cadastro realizado com sucesso!
        </div>
      </div>
    </div>
  );
}
