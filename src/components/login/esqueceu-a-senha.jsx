import React from 'react';
import { Link } from 'react-router-dom'; 
import '../../styles/Login/EsqueceuASenha.css';

function EsqueceuSenha() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Link de recuperação de senha enviado para o seu e-mail!'); 
  };

  return (
    <div className="esqueceu-senha-page">
      <div className="esqueceu-senha-container">
        <div className="reset-password-box">
          <h2>Esqueceu sua senha?</h2>
          <p>
            Enviaremos um e-mail com instruções para você redefinir sua senha.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Digite seu e-mail" 
                required 
              />
            </div>
            
            <Link to='/redefinirSenha' type="submit" className="submit-btn">
              ENVIAR
            </Link>
          </form>

          <Link to="/" className="back-to-login-link">
            Lembrou da senha? Voltar ao Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EsqueceuSenha;