# 🗣️ Roteiro e Guia de Apresentação — Easy Health
**Disciplina:** Integração e Entrega Contínua
**Professor:** Silvio Barbieri

Este roteiro foi estruturado slide a slide para guiar a sua fala na apresentação da P2, destacando os pontos técnicos reais da base de código do **Easy-Health** e do **EasyHealthApiV2**.

---

## 📌 Slide 0: Capa / Introdução
* **Título do Slide:** Easy Health — Plataforma Integrada para Personal Trainers e Nutricionistas
* **Tempo estimado:** 1 minuto

### 🎙️ O que falar (Roteiro sugerido):
> *"Boa noite a todos, professores e colegas. Nós somos o Grupo 1, composto por mim (André), pelo Daniel, Gustavo e Giancarlo. Hoje vamos apresentar o Easy Health, um ecossistema completo projetado especificamente para que Personal Trainers e Nutricionistas gerenciem seus clientes, treinos, avaliações e métricas de desempenho. O foco da nossa apresentação é demonstrar como o projeto evoluiu ao longo das últimas 5 semanas, culminando em um ambiente de produção robusto e validado por esteira automatizada de CI/CD."*

### 🛠️ Destaques Técnicos:
* O projeto é modular (Frontend e Backend desacoplados).
* Identidade visual própria e documentada (roxo elétrico `#9d11d9` e tipografia Barlow/Inter).

---

## 📌 Slide 1: Cronograma & Legenda CI/CD
* **Título do Slide:** Cronograma do Projeto & Legenda CI/CD
* **Tempo estimado:** 1.5 minutos

### 🎙️ O que falar (Roteiro sugerido):
> *"Para organizar a entrega, seguimos o cronograma de 5 semanas proposto para a P2. Iniciamos com o planejamento de escopo, passamos pela automação do ambiente com Docker e CI/CD, codificamos as rotas e telas, implementamos testes automatizados em duas camadas (unitários e integração) e finalizamos com a implementação de logs e monitoramento no deploy final. Mapeamos cada coluna da esteira de CI/CD: desde o Build automático a cada push, passando pelos testes unitários e de integração, segurança com auditorias de código e criptografia, até a observabilidade no deploy de produção."*

### 🛠️ Destaques Técnicos:
* **Fluxo da Linha do Tempo:** 23/04 (Escopo) ➔ 30/04 (CI/CD) ➔ 07/05 (Código) ➔ 21/05 (Testes/Segurança) ➔ 28/05 (Logs/Entrega).

### ❓ Pergunta da Banca:
* **"Por que a evolução das colunas de testes e deploy só começa a ficar ativa a partir da Aula 2/3?"**
  * **Resposta:** *"Porque na Aula 1 focamos no planejamento e setup. A partir da Aula 2, o pipeline de Build e o Deploy inicial na Vercel foram integrados. Na Aula 3, com o backend funcional, ativamos testes unitários e de integração locais e na esteira."*

---

## 📌 Slide 2: Aula 1 — Planejamento e Definição
* **Título do Slide:** Planejamento, Definição e Setup de Repositórios
* **Tempo estimado:** 1.5 minutos

### 🎙️ O que falar (Roteiro sugerido):
> *"Na Aula 1, definimos que o Easy Health seria uma SPA (Single Page Application) em React utilizando o Vite, por conta de sua velocidade de desenvolvimento e build de produção leve. No Backend, optamos pelo Express.js na versão 5 rodando com Node.js e MongoDB (usando o ORM Mongoose). Escolhemos o MongoDB por ser um banco NoSQL documental que facilita muito a gravação de documentos dinâmicos como treinos e logs de acesso. Inicializamos dois repositórios independentes no GitHub para organizar a arquitetura de forma limpa."*

### 🛠️ Destaques no Código:
* Arquivos de configuração inicial: [package.json (Frontend)](file:///c:/Users/Aluno/Pictures/d/Easy-Health/package.json) e [package.json (Backend)](file:///c:/Users/Aluno/Pictures/d/EasyHealthApiV2/package.json).
* Separação de pastas base: `src/` no frontend e `src/` no backend estruturado em MVC (Models, Controllers, Routes, Services, Middlewares).

---

## 📌 Slide 3: Aula 2 — CI/CD e Infraestrutura
* **Título do Slide:** Configuração de Ambiente, CI/CD e Infraestrutura
* **Tempo estimado:** 2 minutos

### 🎙️ O que falar (Roteiro sugerido):
> *"Na Aula 2, nos concentramos na infraestrutura. Criamos uma configuração com Docker Compose para subir uma instância do MongoDB localmente, eliminando a dependência de instalações locais de banco por parte dos desenvolvedores. Além disso, criamos as ações do GitHub Workflows. Para o Frontend, configuramos o pipeline para instalar pacotes, rodar o ESLint para garantir a qualidade estática do código, e efetuar o build de produção com o Vite. Também realizamos o deploy contínuo integrado diretamente com a Vercel, o que garante que qualquer alteração na branch 'main' seja publicada de forma automática."*

### 🛠️ Destaques no Código:
* Arquivo de workflow do Frontend: [ci-frontend.yml](file:///c:/Users/Aluno/Pictures/d/Easy-Health/.github/workflows/ci-frontend.yml).
* Arquivo Docker Compose para banco local em desenvolvimento: [docker-compose.yml](file:///c:/Users/Aluno/Pictures/d/EasyHealthApiV2/docs/docker-compose.yml).

### ❓ Pergunta da Banca:
* **"Como o pipeline garante que um código com erros não vá para a produção na Vercel?"**
  * **Resposta:** *"O pipeline do GitHub Actions roda o linter (`eslint .`) e o comando de compilação (`npm run build`). Caso qualquer um desses passos falhe (por exemplo, erro de sintaxe ou variável inexistente), o workflow é interrompido com erro e a Vercel bloqueia a atualização da produção."*

---

## 📌 Slide 4: Aula 3 — Desenvolvimento & Integração
* **Título do Slide:** Desenvolvimento Back-end, Front-end e Integração
* **Tempo estimado:** 2.5 minutos

### 🎙️ O que falar (Roteiro sugerido):
> *"A Aula 3 foi o coração do desenvolvimento. No Backend, implementamos o modelo MVC clássico com Mongoose para gerenciar usuários, profissionais, treinos e avaliações. No Frontend, desenvolvemos as interfaces, como a barra lateral de navegação e as telas de cadastro e painéis. O ponto chave aqui foi a integração. Criamos um módulo de API centralizado com o Axios que lê o token JWT do localStorage a cada requisição e o anexa ao cabeçalho Authorization como Bearer Token. Se o servidor responder com status 401 (não autorizado/token expirado), o interceptor limpa a sessão e redireciona o usuário para a tela de login automaticamente, garantindo uma navegação segura."*

### 🛠️ Destaques no Código:
* Interceptador do Axios no React: [api.js](file:///c:/Users/Aluno/Pictures/d/Easy-Health/src/services/api.js).
* Estrutura de rotas da API Express: [app.js](file:///c:/Users/Aluno/Pictures/d/EasyHealthApiV2/src/app.js) acionando rotas como `AuthRoutes.js`, `UserRoutes.js` e `ProfessionalRoutes.js`.

---

## 📌 Slide 5: Aula 4 — Testes, Cobertura, Performance e Segurança
* **Título do Slide:** Testes, Cobertura, Performance e Segurança
* **Tempo estimado:** 3 minutos

### 🎙️ O que falar (Roteiro sugerido):
> *"Na Aula 4, elevamos o nível de maturidade do projeto focando em testes e segurança.
> 1. **Testes Unitários:** Utilizamos o Jest para validar as regras do `AuthService` (registro e login) mockando o banco MongoDB, o jwt e o bcrypt. Isso garante que a lógica de negócio esteja blindada e sem chamadas reais de rede.
> 2. **Testes de Integração:** Configuramos o GitHub Actions para subir um container Docker temporário do MongoDB no runner, iniciar a API Express em background e rodar o Newman (CLI do Postman) contra a API ativa, testando o fluxo ponta a ponta.
> 3. **Segurança:** Senhas são salvas com hashes Bcrypt usando 10 rounds de salt. Protegemos todas as rotas privadas com JWT e ativamos CORS para restringir acessos indevidos.
> 4. **Performance:** No MongoDB, criamos índices compostos para impedir que um aluno avalie o mesmo profissional mais de uma vez, otimizando a velocidade de consulta e a escrita no banco."*

### 🛠️ Destaques no Código:
* Testes unitários com mocks: [auth.unit.test.js](file:///c:/Users/Aluno/Pictures/d/EasyHealthApiV2/tests/auth.unit.test.js).
* Configuração do Newman no pipeline: [ci-backend.yml](file:///c:/Users/Aluno/Pictures/d/EasyHealthApiV2/.github/workflows/ci-backend.yml#L43-L91).
* Middleware de validação do token JWT: `authMiddleware.js`.

### ❓ Pergunta da Banca:
* **"Por que mockar o banco de dados no teste unitário?"**
  * **Resposta:** *"Porque o teste unitário serve para validar apenas a lógica de decisão do nosso código (por exemplo, se o email está duplicado ou se o hash da senha bate). Ele precisa rodar rápido (em milissegundos) e não pode depender de um banco de dados externo estar online ou offline. Para testar o banco de dados e as chamadas de rede, usamos o teste de integração com o Newman."*

---

## 📌 Slide 6: Aula 5 — Métricas de Uso, Monitoramento e Deploy Final
* **Título do Slide:** Métricas de Uso, Monitoramento e Deploy Final
* **Tempo estimado:** 2 minutos

### 🎙️ O que falar (Roteiro sugerido):
> *"Na última aula, implementamos um sistema interno de monitoramento e análise (Analytics). Criamos a entidade `ProfileViewLog` e o endpoint `/profile-views` no backend. Toda vez que o perfil de um personal ou nutricionista é visualizado, registramos o log. O backend calcula automaticamente o total de acessos acumulados nos últimos 7 dias. Além disso, fizemos ajustes finais de conectividade do MongoDB substituindo as URIs de conexão por variáveis de ambiente configuráveis no arquivo `.env` para evitar credenciais hardcoded. O deploy final foi homologado na Vercel e o pipeline de CI/CD foi validado com sucesso."*

### 🛠️ Destaques no Código:
* Lógica de incremento e consulta de visualizações: [ProfessionalController.js](file:///c:/Users/Aluno/Pictures/d/EasyHealthApiV2/src/controllers/ProfessionalController.js) (função `getProfileViews`).
* Modelo de log do MongoDB: `ProfileViewLog.js`.

---

## 📌 Slide 7: Planilha P2 Final
* **Título do Slide:** Planilha de Apresentações da P2 Preenchida
* **Tempo estimado:** 1.5 minutos

### 🎙️ O que falar (Roteiro sugerido):
> *"Como resultado de todo esse processo, preenchemos a nossa Planilha de Apresentações da P2 com todas as especificações reais de engenharia implementadas. O grupo 1 entregou o Easy Health utilizando React e Node.js. A plataforma de CI/CD foi o GitHub Workflows com gerenciador NPM. Os testes unitários focaram no AuthService, a integração mapeou a comunicação React -> API -> MongoDB utilizando Newman, a infraestrutura rodou com Atlas e Docker, o build foi validado no Actions, a segurança cobriu JWT, Bcrypt e CORS, e o monitoramento foi feito localmente no banco de dados via logs de visualização."*

### 🛠️ Destaques Técnicos:
* Arquivos criados na pasta de entrega: `Planilha_Apresentacoes_P2.xlsx` e `Planilha_Apresentacoes_P2.md`.

---

## 📌 Slide 8: Conclusão
* **Título do Slide:** Conclusão
* **Tempo estimado:** 1 minuto

### 🎙️ O que falar (Roteiro sugerido):
> *"Para concluir, o desenvolvimento do Easy Health nos permitiu aplicar práticas reais de engenharia de software e DevOps. Conseguimos criar uma esteira automatizada completa que garante que todo código commitado passe por auditoria de estilo, testes de lógica de negócios e testes de integração de rede antes de ser implantado de forma contínua. A plataforma está operacional, com banco de dados em nuvem e frontend escalável. Agradecemos a atenção de todos os professores e colegas, e ficamos abertos a perguntas!"*

---

## 💡 Dicas de Ouro para a Apresentação:
1. **Fale pausadamente e com segurança:** O roteiro foi planejado para durar entre 12 a 15 minutos (tempo padrão de bancas).
2. **Divida as falas de forma justa:**
   * **André:** Slide 0 e 1 (Apresentação, cronograma e overview).
   * **Daniel:** Slide 2 e 3 (Aula 1 e Aula 2 — Tecnologias, Docker e CI/CD).
   * **Gustavo:** Slide 4 e 5 (Aula 3 e Aula 4 — Backend, Integração Axios e Testes).
   * **Giancarlo:** Slide 6, 7 e 8 (Aula 5, Monitoramento, Planilha e Conclusão).
3. **Mantenha os repositórios abertos no navegador:** Se a banca pedir para ver o código de testes ou do interceptor Axios, as abas já estarão prontas.
