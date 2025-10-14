# To-Do App Full Stack

Uma aplicação full stack para gerenciamento de tarefas (To-Do list) com autenticação de usuários. Desenvolvida como um desafio para demonstrar habilidades em React (com Vite) no front-end e Node.js (com Express e TypeScript) no back-end.
## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar a aplicação.

### 1. Clone o Repositório

```bash
# Clone este repositório
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/SrTesch/teste-tecnico-executiva.git)

cd teste-tecnico-executiva/back

# Instale as dependências do back
npm install

# Crie o arquivo de variáveis de ambiente
# (No Windows, use 'copy' em vez de 'cp')
cp .env.example .env

npx knex migrate:latest

# Inicie o servidor de desenvolvimento
npm run dev


cd ../front
npm install

# Inicie a aplicação React
npm run dev



```
- Pronto! Agora é só abrir o seu navegador no endereço indicado pelo Vite (http://localhost:5173).

## ✨ Features

- **Autenticação de Usuários:** Cadastro e Login seguros utilizando tokens JWT.
- **Gerenciamento de Tarefas:** CRUD (Criar, Ler, Atualizar, Deletar) completo de tarefas.
- **Interface Moderna:** Layout responsivo, com fundo dinâmico que muda a cada visita e efeito "glassmorphism" (vidro fumê).
- **Detalhes da Tarefa:** Modal interativo para visualizar e editar detalhes como status, descrição e datas.
- **Persistência de Login:** O usuário permanece logado mesmo após recarregar a página.

## 🛠️ Tecnologias Utilizadas

- **Front-end:**
  - React (com Vite)
  - TypeScript
  - Axios
  - React Router DOM

- **Back-end:**
  - Node.js
  - Express
  - TypeScript
  - Knex.js (Query Builder)
  - JSON Web Token (JWT)

- **Banco de Dados:**
  - SQLite
  - Particularmente estou mais acostumado a usar docker com mysql, mas para facilitar o acesso ao projeto, utilizei SQLite!

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:
- [Node.js](https://nodejs.org/en/) (v18.x ou superior)
- [Git](https://git-scm.com/)