## Token Pay Now API

Modular Node.js + Express backend for the Token Pay Now frontend. Provides secure endpoints for contact submissions, donations, newsletter subscriptions, and admin-managed content (news and programs). Built with MongoDB (Mongoose), fully typed with TypeScript, and ships with Swagger docs, automated tests, and Docker configuration.

### Features
- **Contact** – Validates, stores, and emails form submissions.
- **Donations** – Initiates and verifies Paystack or Stripe payments with persistent donor logs.
- **Newsletter** – Idempotent subscriptions with duplicate protection.
- **Content Management** – Admin-only CRUD for news articles and programs via JWT auth.
- **Security** – Helmet, CORS, rate limiting, sanitisation, HTTPS enforcement in production.
- **Documentation & Testing** – Swagger UI at `/docs` plus Jest/Supertest coverage.

### Requirements
- Node.js 20 LTS
- MongoDB 6+
- npm 10+

### Getting Started
```bash
cd server
npm install
cp .env.example .env      # update values
npm run dev
```

The API listens on `http://localhost:5000` by default. Update `CLIENT_ORIGIN` to match your frontend (e.g. `http://localhost:5173`).

### Environment Variables
All configuration lives in `.env`. Important keys:

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | Mongo connection string |
| `CLIENT_ORIGIN` | Comma-separated list of allowed origins |
| `JWT_SECRET` | Secret used to sign admin tokens |
| `EMAIL_SERVICE`, `EMAIL_USER`, `EMAIL_PASS` | Nodemailer transport |
| `PAYSTACK_KEY`, `STRIPE_SECRET` | Payment gateway credentials |
| `APP_URL` | Public API base URL for Swagger docs |

See `.env.example` for a complete list.

### Available Scripts
```bash
npm run dev     # nodemon-style watcher with ts-node-dev
npm run build   # tsc -> dist/
npm start       # run compiled build
npm test        # Jest + Supertest suite
```

### API Surface

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/health` | Service health status |
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/donations/initiate` | Begin Paystack/Stripe transaction |
| `POST` | `/api/donations/verify` | Confirm donation status |
| `POST` | `/api/newsletter` | Subscribe email address |
| `GET` | `/api/news` | List news items (default `published`) |
| `POST/PUT/DELETE` | `/api/news` | Admin CRUD (JWT protected) |
| `GET` | `/api/programs` | List programs |
| `POST/PUT/DELETE` | `/api/programs` | Admin CRUD (JWT protected) |
| `POST` | `/api/auth/login` | Admin login (returns JWT) |
| `GET` | `/api/auth/me` | Current admin profile |

Swagger documentation is served at `/docs`.

### Admin Authentication
1. Insert an admin document manually (seeding script optional):
   ```js
   db.admins.insertOne({ email: "admin@example.com", password: "<plaintext>" })
   ```
   The password hashes automatically on first save via the API. If inserting directly, hash with bcrypt (`bcrypt.hash(plain, 12)`).
2. Obtain JWT via `POST /api/auth/login`.
3. Send `Authorization: Bearer <token>` on admin routes.

### Payments
- **Paystack** – Requires `PAYSTACK_KEY`. The initiate route generates a reference and requests an authorization URL. Verification hits Paystack’s `/transaction/verify`.
- **Stripe** – Requires `STRIPE_SECRET`. Produces a Payment Intent and returns a `clientSecret`. Verification fetches the Payment Intent by ID.

For local development without real keys, you can mock gateway responses in tests (see `tests/donationRoutes.test.ts`).

### Testing
```bash
npm test
```
The suite spins up an in-memory MongoDB and covers public, admin, and donation flows.

### Docker
Use the top-level `docker-compose.yml` to run the API with MongoDB:
```bash
docker compose up --build
```
The API is available on `http://localhost:5000`, MongoDB on `mongodb://localhost:27017`.

### Deployment Notes
- Set `NODE_ENV=production` to enable HTTPS redirects and production logging.
- Provide production-ready secrets via environment variables (Render, Vercel, AWS, etc.).
- When behind a reverse proxy, ensure `X-Forwarded-Proto` headers are forwarded for HTTPS enforcement.

### Project Structure
```
server/
├── src/
│   ├── config/        # env, database, logger, swagger
│   ├── controllers/   # route handlers
│   ├── middleware/    # auth, rate limiting, error handling
│   ├── models/        # Mongoose schemas
│   ├── routes/        # Express routers
│   ├── services/      # email, donations, token helpers
│   ├── utils/         # helpers, reusable logic
│   └── validators/    # validator.js-powered input guards
├── tests/             # Jest integration tests
├── Dockerfile
├── jest.config.ts
└── tsconfig.json
```

### Frontend Integration
All endpoints align with the existing React forms:
- Contact page → `POST /api/contact`
- News newsletter form → `POST /api/newsletter`
- Donation flows → `/api/donations/*`
- Admin dashboard (future) → `/api/auth/*`, `/api/news`, `/api/programs`

Adjust frontend API calls to match these routes when wiring the UI.

---
Maintained as part of the Token Pay Now platform. Contributions and issues welcome.

