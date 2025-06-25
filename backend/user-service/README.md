# 👤 User Service

This is a microservice responsible for **user authentication**, **profile management**, **password reset**, and **basic user retrieval**. It is part of the Logiclab platform and built using Node.js, Express, PostgreSQL, and Redis.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
# or
npm install

2. Run in Development

npm dev

⚙️ Environment Variables
Create a .env file in the project root:

PORT=4001
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/your_database

MAIL_USER=your@gmail.com
MAIL_PASS=your app password

🧱 Tech Stack

Express: HTTP server framework

Prisma: ORM for PostgreSQL

PostgreSQL: Relational database

Redis: Used for caching and rate-limiting

JWT: Token-based authentication

BullMQ: Job queue (used for email reset flow)

Winston + Morgan: Logging

Zod: Request validation

📘 Main API Endpoints

Method	Endpoint	Description	Middleware
POST	/auth/register	Register a new user	rate-limit, zod
POST	/auth/login	Login existing user	rate-limit, zod
GET	/auth/me	Get current user info	auth, cache
PUT	/auth/update-profile	Update user's name	auth, zod
POST	/auth/forgot-password	Send password reset email	rate-limit, zod
POST	/auth/reset-password	Reset password	rate-limit, zod
GET	/users/:id	Get user by ID	auth, cache

🧠 Middleware Used

authenticate: Verifies JWT tokens

rateLimiter: Prevents abuse of sensitive endpoints

validate: Zod-based request body validation

cache: Caches responses via Redis (e.g., /me, /users/:id)

src/
├── controllers/
├── middlewares/
├── routes/
├── validators/
├── utils/
├── queues/
├── prisma/
└── app.ts

🔐 Security & Performance
✅ Passwords are hashed using bcrypt

✅ Rate limiting applied on login, register, reset-password endpoints

✅ Redis caching for frequently accessed routes

✅ Decoupled email delivery via BullMQ

🪵 Logging
Logging is handled via Winston:

HTTP requests: logged by morgan, piped to Winston at the http level

Errors: saved in logs/error.log

All logs: stored in logs/combined.log



📜 OpenAPI / Swagger

swagger-jsdoc with Swagger UI

To use ssl

npm run dev:ssl 

