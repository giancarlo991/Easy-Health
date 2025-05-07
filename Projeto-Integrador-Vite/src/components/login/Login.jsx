import React from 'react';
import styles from '../../styles/Login/Login.module.css';
import { Link } from 'react-router-dom';
export default function Login() {
  return (
    <>
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

      <div className={styles.login}>
        <h1>Entrar</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu email"
        />

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          placeholder="Digite sua senha"
        />

        <button type="submit">ENTRAR</button>

        <div className={styles["esqueceu-a-senha"]}>
          <Link to="/Esqueceu-a-senha">
            <a>Esqueceu a senha?</a>
          </Link>
        </div>
      </div>

      <div id={styles.mensagemCadastro}>
        Cadastro realizado com sucesso!
      </div>
    </div>
    </div>
    </>
    
  );
}
