import React, { useState } from "react";
import styles from "../../styles/Login/EsqueceuASenha.module.css"; // CSS Modules


const EsqueceuSenha = () => {
  const [email, setEmail] = useState("");

  const handleEnviar = () => {
    // Aqui você pode adicionar lógica para envio de email
    // Exemplo: validação, requisição à API, etc.
    window.location.href = "../redefinirSenha";
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1>Esqueceu sua senha?</h1>
        <p>Enviaremos um e-mail com instruções de como redefinir sua senha.</p>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleEnviar}>ENVIAR</button>
      </div>
    </div>
  );
};

export default EsqueceuSenha;
