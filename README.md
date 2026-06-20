# EasyHealth — Frontend 🏋️‍♂️🥗

> *"Evolua quem evolui os outros."*

Este é o repositório do **Frontend** do **EasyHealth**, uma Single Page Application (SPA) moderna e responsiva focada em conectar Personal Trainers e Nutricionistas a seus respectivos clientes/pacientes. A interface permite que profissionais gerenciem seus perfis e planos de treino/dieta, enquanto clientes podem buscar profissionais por localização ou nota (usando média bayesiana), agendar consultas e acompanhar suas atividades.

---

## 👥 Integrantes do Grupo (Colaboradores)
Trabalho desenvolvido para o **Projeto Interdisciplinar IV** do Curso Superior de Tecnologia em **Desenvolvimento de Software Multiplataforma (FATEC Cotia)**:
*   **André L. D. França**
*   **Daniel França**
*   **Gustavo [Sobrenome]**
*   **Giancarlo Sabatini**

---

## 🌐 URLs Públicas da Aplicação
*   **URL do Frontend (Produção - Vercel):** [https://easy-health-one.vercel.app/](https://easy-health-one.vercel.app/)
*   **URL da API de Backend (Produção - Render):** [https://easyhealthapiv2.onrender.com](https://easyhealthapiv2.onrender.com)

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas
*   **React.js (v18):** Biblioteca base para construção dos componentes de interface e SPA.
*   **Vite (v7):** Ferramenta de build de última geração para desenvolvimento ágil e compilação leve.
*   **Axios:** Cliente HTTP para comunicação integrada com a API REST de backend (com suporte a interceptadores JWT).
*   **React Router DOM (v6):** Gerenciamento de rotas e navegação interna da aplicação.
*   **React Datepicker & React Input Mask:** Facilitadores de entrada para formulários e agendamento de consultas.
*   **ESLint:** Padronização estática e qualidade de código.
*   **CSS3 (Vanilla):** Estilização customizada seguindo a identidade visual roxo elétrico (`#9d11d9`) e Barlow/Inter.

---

## ♿ Recursos de Acessibilidade
Conforme os requisitos acadêmicos da disciplina de Experiência do Usuário (UX):
*   **Alto Contraste:** Alternador de cores de interface ativável nas configurações para garantir acessibilidade de leitura.
*   **Acessibilidade em Libras:** Integração direta com o widget VLibras para tradução dinâmica de conteúdo.
*   **Tags Semânticas ARIA:** Uso completo de tags HTML5 semânticas e acessos acessíveis para leitores de tela.

---

## 🚀 Como Executar o Projeto Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/giancarlo991/Easy-Health.git
    cd Easy-Health
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto com a URL da API de desenvolvimento (padrão local):
    ```env
    VITE_API_URL=http://localhost:3000
    ```

4.  **Execute em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

---

## 📁 Estrutura de Pastas
```
Easy-Health/
├── docs/                   # Slides, planilhas e roteiros da apresentação
├── public/                 # Recursos estáticos de imagem e logos
├── src/
│   ├── assets/             # Logos e vetores
│   ├── components/         # Componentes do React por domínio
│   │   ├── Administrador   # Telas de controle do administrador
│   │   ├── EncontrarTrainer # Busca e listagem com Ranking Bayesiano
│   │   ├── Home            # Painéis iniciais (Paciente / Profissional)
│   │   ├── Paciente        # Perfil, agendamento e configurações do cliente
│   │   ├── Profissional    # Perfil, consultas e configurações do parceiro
│   │   └── login           # Telas de Login, Registro e recuperação
│   ├── services/           # Chamadas HTTP centrais (api.js)
│   ├── styles/             # Arquivos CSS de estilização de telas
│   ├── App.jsx             # Definição e roteamento de componentes
│   ├── main.jsx            # Ponto de entrada do React
│   └── mainLayout.jsx      # Layout estrutural com Sidebar
└── package.json
```
