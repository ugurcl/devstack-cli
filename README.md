# devstack

CLI tool that scaffolds production-ready Express + TypeScript projects in seconds.

## Install

```bash
npx devstack-cli init
```

## What it does

Run `devstack init` and answer a few questions. It generates a complete project with:

- **Express + TypeScript** — strict mode, ESM imports, ready to build
- **MongoDB + Mongoose** — connection config, environment variables
- **JWT Authentication** — register, login, refresh token rotation, logout
- **Zod Validation** — request body validation middleware
- **Rate Limiting** — express-rate-limit preconfigured
- **Error Handling** — custom AppError class, async wrapper, global error middleware
- **Docker** — Dockerfile, docker-compose with MongoDB service

Every feature is optional. Pick what you need during setup.

## Generated project structure

```
my-app/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   ├── env.ts
│   │   └── db.ts
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── models/
│   │   └── user.model.ts
│   ├── routes/
│   │   ├── index.ts
│   │   └── auth.route.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── rateLimiter.middleware.ts
│   └── utils/
│       ├── appError.ts
│       ├── catchAsync.ts
│       └── token.util.ts
├── .env
├── .env.example
├── .gitignore
├── tsconfig.json
├── package.json
├── Dockerfile
└── docker-compose.yml
```

## Usage

```bash
cd my-app
npm run dev     # start dev server with hot reload
npm run build   # compile TypeScript
npm start       # run production build
```

## Auth endpoints

When JWT authentication is enabled:

```
POST /api/auth/register  — create account
POST /api/auth/login     — get access token
POST /api/auth/refresh   — rotate tokens
POST /api/auth/logout    — clear refresh cookie
```

Access token is returned in the response body. Refresh token is set as an HTTP-only cookie.

## Tech stack

The CLI itself is built with:

- Commander.js — command parsing
- Inquirer — interactive prompts
- chalk + ora — terminal styling
- esbuild — bundling
