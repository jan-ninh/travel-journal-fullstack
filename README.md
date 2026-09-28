# Travel Journal Full Stack

A full-stack travel journal built with React, TypeScript, Node.js, Express and MongoDB. The application connects a React SPA with a dedicated authentication service and a separate data API, with a strong focus on authentication, authorization and multi-service data flows.

![Travel Journal application preview](docs/travel-journal-preview.png)

## Implementation highlights

- React and TypeScript SPA with protected and guest-only routes
- Dedicated Express authentication service and separate Express data API
- JWT access tokens with database-backed refresh-token rotation
- httpOnly cookies, session recovery and automatic access-token refresh with one-time request retry
- Role-based and ownership-based authorization enforced by the API
- MongoDB/Mongoose, Zod validation and end-to-end debugging across client, APIs and database

## Architecture

![Travel Journal architecture](docs/architecture.png)

The client communicates with two backend services. The auth service handles registration, login, logout, session recovery and token refresh. The data API manages journal entries and verifies access tokens for protected operations.

Detailed flow diagrams: [Auth flow](docs/auth-flow.png) | [Data flow](docs/data-flow.png)

## Tech stack

**Frontend:** React, TypeScript, React Router, Vite, Tailwind CSS, DaisyUI

**Backend:** Node.js, Express, TypeScript, Mongoose, Zod, bcrypt, JWT

**Database:** MongoDB Atlas

**Tooling:** Git, npm, ESLint, Postman

## Repository structure

```text
travel-journal-fullstack/
├── auth-service/   # Authentication, users, tokens and session recovery
├── data-api/       # Journal entries, protected routes and authorization
├── client/         # React SPA and auth-aware UI
└── docs/           # Preview and architecture diagrams
```

<details>
<summary><strong>Run locally</strong></summary>

### 1. Configure environment variables

Use the provided `.env.example` files as templates.

The auth service and data API must use the same `ACCESS_JWT_SECRET` and MongoDB database.

### 2. Start the auth service

```bash
cd auth-service
npm install
npm run dev
```

Default port: `3000`

### 3. Start the data API

```bash
cd data-api
npm install
npm run dev
```

Default port: `8000`

### 4. Start the React client

```bash
cd client
npm install
npm run dev
```

Default port: `5173`

</details>
