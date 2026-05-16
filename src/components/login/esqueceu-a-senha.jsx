import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../../styles/Login/EsqueceuASenha.css';

function EsqueceuSenha() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui no futuro você colocará a chamada para a API (axios.post)
    alert('Link de recuperação de senha enviado para o seu e-mail!'); 
    navigate('/redefinirSenha'); // Redireciona de forma segura após o submit
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            {/* O botão agora é um button de verdade para submeter o form corretamente */}
            <button type="submit" className="submit-btn">
              ENVIAR
            </button>
          </form>

          <div className="back-to-login">
            <Link to="/" className="back-to-login-link">
              Lembrou da senha? Voltar ao Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EsqueceuSenha;