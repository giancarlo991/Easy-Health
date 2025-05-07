import React, { useState } from "react";
import styles from "../../styles/Login/Registro.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Registro = () => {
  const [perfil, setPerfil] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    endereco: "",
    especialidade: "",
    crm: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePerfilChange = (e) => {
    setPerfil(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (perfil === "Profissional") {
      console.log({ ...formData, perfil, senha });
    } else {
      console.log({ nome: formData.nome, email: formData.email, cpf: formData.cpf, telefone: formData.telefone, endereco: formData.endereco, perfil, senha });
    }

    localStorage.setItem("cadastroSucesso", "Cadastro realizado com sucesso!");
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <span>Easy</span>Health
        </div>
        <nav className={styles.navSidebar}>
          <ul>
            <li><Link to="/home1"></Link></li>
          </ul>
          <Link to="/login" className={styles.loginSidebarButton}>
            Já tenho uma conta
          </Link>
        </nav>
      </div>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1>Criar Novo Perfil</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome Completo</label>
              <input type="text" id="nome" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cpf">CPF</label>
              <input type="text" id="cpf" value={formData.cpf} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="telefone">Telefone</label>
              <input type="tel" id="telefone" value={formData.telefone} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="endereco">Endereço</label>
              <input type="text" id="endereco" value={formData.endereco} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input type="password" id="confirmarSenha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label>Tipo de Perfil</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioContainer} htmlFor="Paciente">
                  <input
                    type="radio"
                    name="perfil"
                    value="Paciente"
                    id="Paciente"
                    className={styles.formCheckInput}
                    onChange={handlePerfilChange}
                    required
                  />
                  <span className={styles.checkmark}></span>
                  Paciente
                </label>
                <label className={styles.radioContainer} htmlFor="Profissional">
                  <input
                    type="radio"
                    name="perfil"
                    value="Profissional"
                    id="Profissional"
                    className={styles.formCheckInput}
                    onChange={handlePerfilChange}
                  />
                  <span className={styles.checkmark}></span>
                  Profissional da Saúde
                </label>
              </div>
            </div>

            {perfil === "Profissional" && (
              <>
                <div className={styles.formGroup}>
                  <label htmlFor="especialidade">Especialidade</label>
                  <input type="text" id="especialidade" value={formData.especialidade} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="crm">CRM (se aplicável)</label>
                  <input type="text" id="crm" value={formData.crm} onChange={handleChange} />
                </div>
              </>
            )}

            <button type="submit" className={styles.submitButton}>Cadastrar</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Registro;
