# Planilha de Apresentações da P2

Esta é a tabela preenchida com as informações extraídas dos projetos **Easy-Health** (Frontend) e **EasyHealthApiV2** (Backend).

## Links Gerais do Projeto
- **GitHub Frontend:** [giancarlo991/Easy-Health](https://github.com/giancarlo991/Easy-Health)
- **GitHub Backend:** [Andrefranca1328/EasyHealthApiV2](https://github.com/Andrefranca1328/EasyHealthApiV2)
- **Deploy:** Vercel (Front-end)

---

## Tabela de Apresentação

| Grupo | Alunos(as) | Projeto | Tecnologias (stack de back;front) | Plataforma de CI | Build | Testes - Unitário (qual função) | Testes - Integração (de - para) | Testes - Infraestrutura | Testes - Build | Testes - Performance (cpu, ram.., nping) | Testes - Segurança | Testes - Monitoramento | DEPLOY |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | André | Easy Health | **Frontend:** React, JavaScript (Vite)<br>**Backend:** Node.js, Express, MongoDB (Mongoose) | GitHub Workflows | NPM | **AuthService:** login(), register() (com Jest & Mocks em `auth.unit.test.js`) | **Newman/Postman:** Endpoints de Auth e rotas gerais<br>**Integração real:** React → API Node.js → MongoDB | **Banco de dados:** MongoDB Atlas<br>**CI/CD:** MongoDB local rodando via Docker (`mongo:latest`) | **GitHub Actions:** Pipeline executando Lint (`eslint`), Build (`vite build`) e Testes unitários (`npm test`) | Nenhuma ferramenta configurada (apenas tracking local de views de perfil) | Autenticação JWT (`authMiddleware`), Criptografia de senhas (`bcrypt` salt: 10), Validação de entrada no Mongoose (CPF e Email únicos) e CORS ativo | Log de visualizações de perfil (`ProfileViewLog` + `profile_views_7`); Sem ferramentas externas de APM | Vercel (Frontend) |
| | Daniel | | | | | | | | | | | | |
| | Gustavo | | | | | | | | | | | | |
| | Giancarlo | | | | | | | | | | | | |

---

## Detalhes Técnicos Identificados

### 1. Testes Unitários
- **Tecnologia:** Jest (`jest`)
- **Arquivo:** `EasyHealthApiV2/tests/auth.unit.test.js`
- **Cobertura:** Validação das regras de negócio do `AuthService` para login e cadastro, utilizando mocks do banco de dados Mongoose, `bcrypt` e `jsonwebtoken`.

### 2. Testes de Integração
- **Tecnologia:** Newman (Postman CLI)
- **Arquivo:** `EasyHealthApiV2/tests/newman/easyhealth.postman_collection.json`
- **Fluxo:** Executado no GitHub Actions. O workflow do GitHub Actions inicia um container Docker com MongoDB local, inicializa a API Express e roda a coleção do Postman para testar ponta a ponta as rotas de Auth, Profissionais, Treinamentos e Avaliações.
- **Teste de Endpoints:** Existe também um script utilitário em `EasyHealthApiV2/tests/test_endpoints.js` para realizar requisições HTTP locais sequenciais simulando o fluxo de uso da API.

### 3. CI/CD (GitHub Workflows)
- **Frontend (`ci-frontend.yml`):** Executa lint com ESLint (`npm run lint`) e build de produção com Vite (`npm run build`).
- **Backend (`ci-backend.yml`):**
  - **Job 1 (unit-tests):** Executa `npm test` para rodar os testes unitários Jest e gera o relatório de cobertura.
  - **Job 2 (integration-tests):** Cria um serviço MongoDB temporário via Docker, inicia o servidor Express, e roda os testes Newman de rotas.

### 4. Segurança
- Armazenamento seguro de senhas com `bcrypt` (10 rounds de salt).
- Controle de acesso com middleware de JWT (`authMiddleware.js`).
- Controle de acessos de origens no Express com a biblioteca `cors`.
- Índices compostos únicos do MongoDB para impedir duplicações indesejadas (ex: usuário avaliar profissional mais de uma vez).
