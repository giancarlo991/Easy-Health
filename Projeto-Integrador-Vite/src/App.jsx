import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Registro from './components/login/Registro';
import RedefinirSenha from './components/login/redefinirSenha';
import EsqueceuASenha from './components/login/esqueceu-a-senha';
import Home1 from './components/Home/homePaciente'
import PerfilPaciente from './components/Paciente/PerfilPaciente'
import Agendamento from './components/Paciente/agendamento'
import Dashboard from './components/Administrador/dashboard'
import MinhasConsultas from './components/Profissional/minhasConsultas'
import ConfiguracaoPaciente from './components/Paciente/configuracaoPaciente'
import PerfilProfissional from './components/Profissional/perfilProfissional'
import ConfiguracaoProfissional from './components/Profissional/configuracaoProfissional'
import Home2 from './components/Home/homeProfissional'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/redefinirSenha" element={<RedefinirSenha />} />
        <Route path="/esqueceu-a-senha" element={<EsqueceuASenha />} />
        <Route path="/home1" element={<Home1 />} />
        <Route path="/perfilPaciente" element={<PerfilPaciente />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/minhasConsultas" element={<MinhasConsultas />} />
        <Route path="/configuracaoPaciente" element={<ConfiguracaoPaciente />} />
        <Route path="/configuracaoProfissional" element={<ConfiguracaoProfissional />} />
        <Route path="/perfilProfissional" element={<PerfilProfissional />} />
        <Route path="/home2" element={<Home2 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
