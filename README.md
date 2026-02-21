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
- **Zod Validation** — request body validation middleware + common schemas
- **Rate Limiting** — express-rate-limit preconfigured
- **Error Handling** — custom AppError class, async wrapper, global error middleware
- **Docker** — Dockerfile, docker-compose with MongoDB service

Every feature is optional. Pick what you need during setup.

## Built-in utilities

These are always included in every generated project:

| Utility | Description |
|---------|-------------|
| **Regex patterns** | Email, URL, slug, phone, credit card, IP, JWT and more |
| **Validators** | isEmail, isURL, isStrongPassword, isSlug, isMongoId, isTCKimlik... |
| **String transformers** | camelCase, snake_case, kebab-case, PascalCase, toSlug, maskEmail, stripHTML |
| **API response helpers** | sendSuccess, sendError, sendPaginated, sendCreated, sendNoContent |
| **Crypto helpers** | generateRandomString, hashString, generateOTP, generateResetToken |
| **Date helpers** | formatDate, formatDateTime, timeAgo, isExpired, addDays, diffInDays |
| **File helpers** | formatFileSize, getFileExtension, isImage, isDocument, isVideo |

When **database** is enabled, these are also included:

| Utility | Description |
|---------|-------------|
| **Query builder** | Chainable MongoDB query builder — filtering, sorting, field selection, pagination |
| **Slug utility** | generateSlug with Turkish character support, generateUniqueSlug with DB check |

When **validation** is enabled:

| Utility | Description |
|---------|-------------|
| **Zod schemas** | objectId, email, password, pagination, auth schemas |

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
│   ├── schemas/
│   │   ├── common.schema.ts
│   │   └── auth.schema.ts
│   └── utils/
│       ├── appError.ts
│       ├── catchAsync.ts
│       ├── token.util.ts
│       ├── regex.util.ts
│       ├── validate.util.ts
│       ├── transform.util.ts
│       ├── response.util.ts
│       ├── crypto.util.ts
│       ├── date.util.ts
│       ├── file.util.ts
│       ├── queryBuilder.util.ts
│       └── slug.util.ts
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
