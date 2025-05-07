import React, { useState } from 'react';
import styles from '../../Styles/Login/RedefinirSenha.module.css';
import { Link } from 'react-router-dom';
import olhoAberto from './img/olhoAberto.png';
import olhoFechado from './img/olhoFechado.png';

export default function RedefinirSenha() {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha1, setMostrarSenha1] = useState(false);
  const [mostrarSenha2, setMostrarSenha2] = useState(false);

  const verificarForcaSenha = () => {
    if (senha.length < 5) return 'fraca';
    else if (senha.length < 8) return 'media';
    else if (senha.length >= 10) return 'forte';
    else return 'media';
  };

  const senhasIguais = senha === confirmarSenha;

  const toggleSenha = (campo) => {
    if (campo === 1) setMostrarSenha1(!mostrarSenha1);
    else if (campo === 2) setMostrarSenha2(!mostrarSenha2);
  };

  return (
    <div className={styles.body}>
    <div className={styles.container}>
      <h1>Redefinir sua senha</h1>
      <p>Preencha os campos abaixo</p>

      <div className={styles['password-field']}>
        <input
          type={mostrarSenha1 ? 'text' : 'password'}
          id="senha"
          className={styles['input-field']}
          placeholder="Digite sua nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <img
          src={mostrarSenha1 ? olhoAberto : olhoFechado}
          alt="Mostrar senha"
          id="toggleSenha1"
          className={styles['password-toggle']}
          onClick={() => toggleSenha(1)}
        />
      </div>

      <div
        id="forca-senha"
        className={`${styles['password-strength']} ${styles[verificarForcaSenha()]}`}
      >
        {verificarForcaSenha() === 'fraca'
          ? 'Senha Fraca'
          : verificarForcaSenha() === 'media'
          ? 'Senha Média'
          : 'Senha Forte'}
      </div>

      <div className={styles['password-field']}>
        <input
          type={mostrarSenha2 ? 'text' : 'password'}
          id="confirmar-senha"
          className={styles['input-field']}
          placeholder="Digite sua nova senha novamente"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <img
          src={mostrarSenha2 ? olhoAberto : olhoFechado}
          alt="Mostrar senha"
          id="toggleSenha2"
          className={styles['password-toggle']}
          onClick={() => toggleSenha(2)}
        />
      </div>

      <div
        id="mensagem-erro"
        className={styles['error-message']}
        style={{ display: senhasIguais ? 'none' : 'block' }}
      >
        As senhas não são iguais!
      </div>
      <Link to="/login">
        <button>
          <a>REDEFINIR</a>
        </button>
      </Link>
    </div></div>
  );
}
