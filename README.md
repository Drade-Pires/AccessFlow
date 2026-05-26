# AccessFlow

Sistema moderno de Controle de Acesso e Gerenciamento de Usuários.

## Tecnologias

### Backend
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT Authentication

### Frontend
- React
- Vite
- TailwindCSS

---

# Funcionalidades

## Autenticação
- Login
- Cadastro de usuários
- JWT Authentication
- Proteção de rotas

## Controle de Acesso
- Roles:
  - Admin
  - Supervisor
  - Funcionário
- Sistema RBAC
- Permissões por usuário

## Usuários
- CRUD de usuários
- Ativar/desativar usuários

## Access Logs
- Registro de entrada
- Registro de saída
- Histórico de acessos
- Status:
  - PERMITIDO
  - NEGADO

---

# Estrutura do Projeto

```bash
backend/
├── prisma/
├── src/
│   ├── lib/
│   ├── middleware/
│   ├── routes/
│   └── server.js
```

---

# Rotas da API

## Auth
- POST `/auth/login`
- POST `/auth/register`

## Users
- GET `/users`

## Access Logs
- GET `/access-logs`
- POST `/access-logs`

---

# Banco de Dados

## Models
- User
- Role
- Permission
- AccessLog

---

# Como Rodar o Projeto

## Backend

```bash
cd backend

npm install

npx prisma migrate dev

npm run dev
```

---

# Variáveis de Ambiente

Crie um arquivo `.env`

```env
DATABASE_URL="SUA_DATABASE_URL"
JWT_SECRET="SEU_SEGREDO"
```

---

# Status do Projeto

🚧 Em desenvolvimento

---

# Autor

Jhonatan de Andrade Pires