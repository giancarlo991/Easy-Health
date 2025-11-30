import React, { useState } from 'react';
import '../../styles/Login/Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');


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

        <form className="login">
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