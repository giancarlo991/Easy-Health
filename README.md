# EasyHealth — Frontend 🏋️‍♂️🥗

> *"Evolua quem evolui os outros."*

**EasyHealth** é uma Single Page Application (SPA) moderna e responsiva que conecta **Personal Trainers** e **Nutricionistas** a seus clientes/pacientes. A interface permite que profissionais gerenciem seus perfis e planos de treino/dieta, enquanto clientes buscam profissionais por localização ou nota (Ranking Bayesiano), agendam consultas e acompanham suas atividades.

Desenvolvido para o **Projeto Interdisciplinar IV** do Curso Superior de Tecnologia em **Desenvolvimento de Software Multiplataforma — FATEC Cotia**.

---

## 👥 Integrantes do Grupo (Colaboradores)

| Nome Completo | E-mail Institucional |
|---------------|----------------------|
| André Luiz de França Junior | andre.franca3@aluno.cps.sp.gov.br |
| Daniel França Almeida | daniel.almeida3@aluno.cps.sp.gov.br |
| Giancarlo Sabatini | giancarlo.sabatini@aluno.cps.sp.gov.br |
| Gustavo Pereira Queiroz | gustavo.queiroz01@aluno.cps.sp.gov.br |

---

## 🌐 URLs Públicas da Aplicação

| Ambiente | URL |
|----------|-----|
| **Frontend — Produção (Vercel)** | [https://easy-health-one.vercel.app/](https://easy-health-one.vercel.app/) |
| **Backend — API (Render)** | [https://easyhealthapiv2.onrender.com](https://easyhealthapiv2.onrender.com) |
| **Documentação Swagger** | [https://easyhealthapiv2.onrender.com/api/docs](https://easyhealthapiv2.onrender.com/api/docs) |

---

## 📚 Documentação do Projeto

### Sobre o Sistema

O **EasyHealth** é uma plataforma digital que permite:

- **Pacientes/Clientes:** encontrar profissionais de saúde e fitness por cidade e especialidade, agendar consultas com regras de cancelamento automático (multa de 30% para cancelamentos com menos de 24h), avaliar profissionais com 1 a 5 estrelas e acompanhar histórico de consultas.
- **Profissionais de Saúde:** gerenciar perfil profissional, confirmar ou recusar agendamentos, acompanhar métricas de visualização de perfil e criar planos de treino para seus alunos.
- **Administradores:** aprovar ou reprovar cadastros de profissionais e gerenciar papéis (roles) de usuários.

### Arquitetura

```
React SPA (Vite)  ──► Express REST API (Node.js)  ──► MongoDB Atlas
     |                        |
  Vercel (CD)            Render (CD)
     └──────── GitHub Actions CI ──────────────────────┘
```

### Funcionalidades Principais

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 1 | Autenticação JWT | Registro e login com proteção de rotas por token |
| 2 | Cadastro de Perfis | Dois perfis: Paciente e Profissional da Saúde (com cidade/estado) |
| 3 | Busca de Profissionais | Filtros por cidade, especialidade, preço e nota mínima |
| 4 | Ranking Bayesiano | Ordenação ponderada de profissionais por relevância estatística |
| 5 | Agendamento de Consultas | Calendário integrado com reagendamento e cancelamento |
| 6 | Multa por Cancelamento | 30% do valor da hora para cancelamentos com < 24h de antecedência |
| 7 | Minhas Consultas (Profissional) | Dashboard para confirmar/cancelar agendamentos pendentes |
| 8 | Planos de Treino | Criação e visualização de planos de exercícios |
| 9 | Avaliações | Clientes avaliam profissionais (1–5 estrelas, 1 por profissional) |
| 10 | Métricas de Perfil | Contador de visualizações dos últimos 7 dias |
| 11 | Configurações de Conta | Redefinição de senha, notificações e exclusão de conta |
| 12 | Painel Administrativo | Aprovação/reprovação de profissionais e gestão de roles |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|-----------|--------|-----------|
| React.js | 18.x | Biblioteca base de componentes e SPA |
| Vite | 7.x | Ferramenta de build e dev server de alta performance |
| React Router DOM | 6.x | Roteamento e navegação interna da SPA |
| Axios | 1.x | Cliente HTTP com interceptadores JWT |
| React Datepicker | — | Calendário de agendamento |
| React Input Mask | — | Máscara de campos de formulário (CPF, telefone) |
| CSS3 Vanilla | — | Estilização customizada (dark mode, glassmorphism, roxo #9d11d9) |
| ESLint | — | Padronização e qualidade de código |
| GitHub Actions | — | Pipeline de CI/CD automatizado |

---

## ♿ Acessibilidade

Conforme requisitos da disciplina de Experiência do Usuário (UX):

- **Alto Contraste** — alternador de cores ativável nas configurações para garantir legibilidade
- **VLibras** — widget integrado para tradução simultânea em Linguagem Brasileira de Sinais
- **HTML5 Semântico + WAI-ARIA** — tags semânticas e atributos ARIA para leitores de tela

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+
- npm 9+
- Backend rodando em `http://localhost:3000` (ver [EasyHealthApiV2](https://github.com/Andrefranca1328/EasyHealthApiV2))

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/giancarlo991/Easy-Health.git
cd Easy-Health

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
# Crie um arquivo .env na raiz:
VITE_API_URL=http://localhost:3000

# 4. Execute em modo de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## 📁 Estrutura de Pastas

```
Easy-Health/
├── .github/workflows/       # Pipelines de CI/CD (GitHub Actions)
├── docs/                    # Slides, planilhas e roteiros da apresentação
├── public/                  # Recursos estáticos
├── src/
│   ├── assets/              # Logos e vetores
│   ├── components/          # Componentes React por domínio
│   │   ├── Administrador/   # Telas de controle do administrador
│   │   ├── EncontrarTrainer/ # Busca com Ranking Bayesiano
│   │   ├── Home/            # Painéis iniciais (Paciente / Profissional)
│   │   ├── Paciente/        # Perfil, agendamento e configurações do cliente
│   │   ├── Profissional/    # Perfil, consultas e configurações do parceiro
│   │   ├── shared/          # Componentes reutilizáveis (FilterPanel, StarsRating…)
│   │   └── login/           # Telas de Login, Registro e recuperação de senha
│   ├── services/            # Chamadas HTTP centrais (api.js com Axios)
│   ├── styles/              # Arquivos CSS por tela
│   ├── App.jsx              # Roteamento principal
│   ├── main.jsx             # Ponto de entrada do React
│   └── mainLayout.jsx       # Layout com Sidebar condicional por role
└── package.json
```

---

## 🔄 Controle de Versão (Semantic Release)

O repositório segue a convenção de commits semânticos:

| Prefixo | Tipo |
|---------|------|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `chore:` | Manutenção geral |
| `docs:` | Atualização de documentação |
| `refactor:` | Refatoração sem mudança de comportamento |

---

## 📄 Licença

MIT © EasyHealth Team — FATEC Cotia 2025
