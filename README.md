# Travel Journal Full Stack

A three-part full-stack web application built with React, TypeScript, Node.js, Express and MongoDB. The project focuses on authentication, authorization and data flows across a React client, a dedicated auth service and a separate data API.

## What this project demonstrates

- React and TypeScript SPA with protected and guest-only routes
- Separate Express and TypeScript authentication service
- Separate Express and TypeScript data API
- MongoDB and Mongoose for users, refresh tokens and journal posts
- JWT access tokens and opaque refresh tokens
- Refresh token rotation with database-backed refresh tokens
- httpOnly cookies and credentialed CORS requests
- Automatic access-token refresh and one-time request retry
- Role-based authorization and owner-only update and delete operations
- Zod request validation
- Full-stack debugging across client, API, authentication and database boundaries

## Architecture

![Travel Journal architecture](docs/architecture.png)

The client communicates with two backend services. The auth service owns registration, login, logout, session recovery and token refresh. The data API owns journal posts and verifies the access token on protected write operations. Both services use the same MongoDB database and share the access-token signing secret so the data API can verify tokens issued by the auth service.

More detailed flow diagrams are available in [`docs/auth-flow.png`](docs/auth-flow.png) and [`docs/data-flow.png`](docs/data-flow.png).

## Authentication and authorization flow

1. A user registers or logs in through the React client.
2. The auth service verifies the request and stores the password as a bcrypt hash.
3. The service issues a short-lived JWT access token and a longer-lived opaque refresh token in httpOnly cookies.
4. Protected requests to the data API verify the access token and expose the authenticated user to the request pipeline.
5. When the access token expires, the API signals expiration through `WWW-Authenticate`.
6. The client requests a token refresh, the auth service rotates the refresh token and the client retries the original request once.
7. Update and delete operations verify post ownership in the API, not only in the user interface.

## Repository structure

```text
travel-journal-fullstack/
├── auth-service/   # Authentication, tokens, users and session recovery
├── data-api/       # Journal posts, protected routes and authorization
├── client/         # React SPA and auth-aware UI
└── docs/           # Architecture and request-flow diagrams
```

## Tech stack

**Frontend:** React 19, TypeScript, React Router, Vite, Tailwind CSS, DaisyUI

**Backend:** Node.js, Express 5, TypeScript, Mongoose, Zod, bcrypt, jsonwebtoken

**Database:** MongoDB Atlas

**Tooling:** Git, npm, ESLint, Postman

## My work on the project

This project was developed during my Full Stack Web and App Development training at WBS Coding School. My practical work covered the integration and debugging of the complete authentication and authorization flow across the three applications, including login and registration, AuthContext, protected routing, refresh and retry behavior, role checks, ownership rules and the connection between frontend, APIs and MongoDB. I also rebuilt the core authentication flow in a separate learning pass with minimal guidance to verify my understanding of the underlying concepts.

A key focus was understanding system boundaries rather than treating authentication as isolated code. That included the relationship between token lifetime, cookies, CORS credentials, API middleware, user identity, authorization rules and client-side session recovery.

## Run locally

The project consists of three applications that run separately.

### 1. Auth service

```bash
cd auth-service
npm install
cp .env.example .env.development.local
npm run dev
```

Default port: `3000`

### 2. Data API

```bash
cd data-api
npm install
cp .env.example .env.development.local
npm run dev
```

Default port: `8000`

### 3. React client

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Default port: `5173`

The auth service and data API must use the same `ACCESS_JWT_SECRET`. The auth service and data API also need access to the same MongoDB database.

## Selected implementation details

### Refresh-token rotation

Refresh tokens are stored in MongoDB and removed when they are used. A successful refresh creates a new access token and a new refresh token. The refresh-token model uses a TTL index so expired records can be removed automatically.

### Ownership authorization

The client only displays edit and delete controls for posts owned by the authenticated user. The API independently enforces the same rule before an update or delete is accepted.

### Request retry

The client wraps `fetch` so an expired access token can trigger a refresh request. After a successful refresh, the original request is repeated once. This keeps token-expiration handling in one place instead of duplicating it across every API call.

## Notes

This is a learning and portfolio project, not a production security framework. Its purpose is to demonstrate practical junior full-stack work with authentication, authorization, API integration, MongoDB and debugging across service boundaries.
