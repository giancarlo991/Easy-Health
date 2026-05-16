import React, { useState, forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';
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
    birthdate: '', // Voltamos para string vazia, pois o input nativo usa formato 'YYYY-MM-DD'
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

  /* * CRIAMOS UM COMPONENTE SÓ PARA O ÍCONE:
   * O React DatePicker vai ser ancorado neste ícone em vez do input de texto.
   */
  const CalendarIconTrigger = forwardRef(({ onClick }, ref) => (
    <svg 
      className="calendar-icon" 
      viewBox="0 0 24 24"
      onClick={onClick}
      ref={ref}
    >
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
    </svg>
  ));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não conferem!");
      return;
    }

    const API_BASE_URL = 'http://localhost:3000';

    try {
      const dadosParaEnvio = {
        name: formData.nome,
        email: formData.email,
        password: formData.senha,
        phone: formData.telefone,
        cpf: formData.cpf,
        birthdate: formData.birthdate, // Já está no formato correto 'YYYY-MM-DD'
        address: formData.endereco,
        role: formData.tipoPerfil === 'profissional' ? 'trainer' : 'user'
      };

      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, dadosParaEnvio);

      if (response.status === 201 || response.status === 200) {
        if (formData.tipoPerfil === 'profissional') {
          const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, {
            email: formData.email,
            password: formData.senha
          });

          const token = loginResponse.data.token;
          const userId = loginResponse.data.user._id;

          await axios.post(`${API_BASE_URL}/api/professionals`, {
            userId: userId,
            type: formData.especialidade,
            document: formData.crm
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        alert("Conta criada com sucesso!");
        navigate('/');
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      const mensagemErro = error.response?.data?.error || "Erro ao conectar com o servidor.";
      alert(mensagemErro);
    }
  };

  return (
    <div className="registro-page">
      <div className="registro-container">
        
        {/* Painel Esquerdo */}
        <div className="registro-sidebar">
          <div className="sidebar-fixa">
            <h2>Já tem uma conta?</h2>
            <p>Faça o login para acessar sua plataforma e cuidar da sua saúde.</p>
            <Link to="/" className="sidebar-btn">Entrar</Link>
          </div>
        </div>

        {/* Painel Direito (Formulário) */}
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

            {/* A NOVA ESTRUTURA SEPARADA DA DATA */}
            <div className="form-group">
              <label htmlFor="birthdate">Data de Nascimento</label>
              <div className="date-input-container">
                
                {/* 1. O INPUT VISÍVEL: 100% nativo, lida com a digitação, sem bugar */}
                <input
                  type="date"
                  id="birthdate"
                  className="custom-datepicker-input no-native-icon"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split('T')[0]} 
                />
                
                {/* 2. O CALENDÁRIO: Ancorado no ícone. Se o usuário escolhe a data aqui, ele atualiza o estado */}
                <div className="icon-datepicker-wrapper">
                  <DatePicker
                    selected={formData.birthdate ? new Date(formData.birthdate + 'T12:00:00') : null}
                    onChange={(date) => {
                      if (date) {
                        const y = date.getFullYear();
                        const m = String(date.getMonth() + 1).padStart(2, '0');
                        const d = String(date.getDate()).padStart(2, '0');
                        setFormData({ ...formData, birthdate: `${y}-${m}-${d}` });
                      } else {
                        setFormData({ ...formData, birthdate: '' });
                      }
                    }}
                    customInput={<CalendarIconTrigger />}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    fixedHeight
                    maxDate={new Date()}
                    openToDate={new Date(2005, 6, 1)}
                    popperPlacement="bottom-end"
                  />
                </div>

              </div>
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