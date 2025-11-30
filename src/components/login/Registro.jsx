import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../../styles/Login/Registro.css';

function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    endereco: '',
    senha: '',
    confirmarSenha: '',
    birthdate: '',
    tipoPerfil: 'paciente', 
    especialidade: '',
    crm: ''
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };


  const handleRadioChange = (e) => {
    setFormData({
        ...formData,
        tipoPerfil: e.target.value
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
        alert("As senhas não conferem!");
        return;
    }

    // --- MUDANÇA AQUI ---
    // Define a URL baseada no tipo de perfil
    let urlDestino = '';
    let dadosParaEnvio = {};

    if (formData.tipoPerfil === 'profissional') {
        // Se for médico, manda para a rota de médicos
        urlDestino = 'http://localhost:3001/api/medicos'; // <-- Confirme se essa rota existe no seu backend
        
        dadosParaEnvio = {
            nome: formData.nome,
            crm: formData.crm,
            especialidade: formData.especialidade,
            telefone: formData.telefone,
            // ... outros campos que a tabela de médicos pede
        };
    } else {
        // Se for paciente, manda para a rota de usuários normal
        urlDestino = 'http://localhost:3001/api/auth/register';

        
        dadosParaEnvio = {
            name: formData.nome,   
            email: formData.email,
            password: formData.senha,   
            cpf: formData.cpf,
            phone: formData.telefone,
            birthdate: formData.birthdate,
            address: formData.endereco,   
            role: 'user'
        };
    }

    try {
        const response = await axios.post(urlDestino, dadosParaEnvio);
        if (response.status === 201 || response.status === 200) {
            alert("Conta criada com sucesso!");
            navigate('/');
        }
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        const mensagemErro = error.response?.data?.message || error.response?.data?.error || "Erro ao conectar com o servidor.";
        alert(mensagemErro);
    }
  };
  return (
    <div className="registro-page">
      <div className="registro-container">
        
        <div className="registro-sidebar">
          <h2>Já tem uma conta?</h2>
          <p>Faça o login para acessar sua plataforma e cuidar da sua saúde.</p>
          <Link to="/" className="sidebar-btn">Entrar</Link>
        </div>


        <div className="registro-form-section">
          <form onSubmit={handleSubmit}>
            <h2>Criar Conta</h2>

            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input type="text" id="nome" placeholder="Digite seu nome completo" 
                     value={formData.nome} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Digite seu email" 
                     value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input type="text" id="cpf" placeholder="000.000.000-00" 
                       value={formData.cpf} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input type="tel" id="telefone" placeholder="(11) 99999-9999" 
                       value={formData.telefone} onChange={handleChange} />
              </div>
            </div>

            {/* AQUI ESTAVA O ERRO: Corrigido o value para formData.birthdate */}
            <div className="form-group">
              <label htmlFor="birthdate">Data de Nascimento</label>
              <input 
                type="date" 
                id="birthdate" 
                value={formData.birthdate} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endereco">Endereço</label>
              <input type="text" id="endereco" placeholder="Ex: Rua, Número, Bairro" 
                     value={formData.endereco} onChange={handleChange} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" placeholder="Crie sua senha" 
                       value={formData.senha} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="confirmarSenha">Confirmar Senha</label>
                <input type="password" id="confirmarSenha" placeholder="Confirme sua senha" 
                       value={formData.confirmarSenha} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group profile-type">
              <label>Tipo de Perfil</label>
              <div className="radio-options">
                <input type="radio" id="paciente" name="tipoPerfil" value="paciente" 
                       checked={formData.tipoPerfil === 'paciente'} onChange={handleRadioChange} />
                <label htmlFor="paciente">Paciente</label>
                
                <input type="radio" id="profissional" name="tipoPerfil" value="profissional" 
                       checked={formData.tipoPerfil === 'profissional'} onChange={handleRadioChange} />
                <label htmlFor="profissional">Profissional da Saúde</label>
              </div>
            </div>
            
            {/* Campos Condicionais */}
            {formData.tipoPerfil === 'profissional' && (
              <div className="form-row conditional-fields">
                <div className="form-group">
                  <label htmlFor="especialidade">Especialidade</label>
                  <input type="text" id="especialidade" placeholder="Ex: Nutricionista" 
                         value={formData.especialidade} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="crm">CRM</label>
                  <input type="text" id="crm" placeholder="Seu registro" 
                         value={formData.crm} onChange={handleChange} />
                </div>
              </div>
            )}
            
            <button type="submit" className="submit-btn">CADASTRAR</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registro;