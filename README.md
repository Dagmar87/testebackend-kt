# testebackend-kt
Desafio Técnico da Kambô Tecnologia - API de Gerenciamento de Usuários

Este projeto é uma API REST para gerenciamento de usuários, desenvolvida com Node.js, Express e MongoDB.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/) (Documentação)
- [JWT](https://jwt.io/) (Autenticação)

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/) (opcional, para rodar o banco de dados)
- [Git](https://git-scm.com/)

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Dagmar87/testebackend-kt.git
   cd testebackend-kt
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para um novo arquivo chamado `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edite o arquivo `.env` e preencha com a sua string de conexão do MongoDB (ex: `MONGODB_URI=mongodb://localhost:27017/testebackend`).

## 🗄️ Banco de Dados

Você pode rodar o MongoDB localmente ou usar o Docker:

### Usando Docker (Recomendado)
```bash
docker-compose up -d
```
O Docker irá subir um container com MongoDB pronto para uso na porta 27017.

## 🏃 Executando o Projeto

### Modo de Desenvolvimento
```bash
npm run dev
```

### Modo de Produção
```bash
npm start
```
A API estará disponível em `http://localhost:3000` (ou na porta definida no seu `.env`).

## 📖 Documentação (Swagger)

A documentação interativa da API (Swagger UI) pode ser acessada em:
`http://localhost:3000/api-docs`

## 🛠️ Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Listagem, atualização e exclusão de usuários (Rotas protegidas)
- Validação de dados de entrada
- Tratamento global de erros
