# 🧠 LogicLab Platform – Fullstack Monorepo

LogicLab is a fullstack web platform to help users practice logical thinking via interactive exercises.

---

## 📁 Folder Structure

logiclab/
├── frontend/ # React + TypeScript app
├── backend/ # Node.js monorepo with microservices
└── README.md # This file

## 🚀 Getting Started (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/your-org/logiclab.git
cd logiclab

2. Start Backend

cd backend
docker-compose up --build
🧪 You can also run individual services:


cd backend/user-service
npm run dev
✅ Make sure Redis, Kafka, PostgreSQL are up via Docker.

3. Start Frontend

cd frontend
npm install
npm run dev

🧪 Testing
Backend microservices use Jest or k6

Frontend uses Vitest or React Testing Library

🌐 Deployment
Certs for local HTTPS via mkcert (stored in each microservice)

Future plan: Production via Nginx + Let's Encrypt

🛡️ Authentication Flow
JWT-based auth

Forgot/reset password flow (with Redis job queue)

Protected routes on frontend


## 📚 Documentation

- See [`frontend/README.md`](./frontend/README.md) for setup and usage instructions of the React frontend.
- See [`backend/README.md`](./backend/README.md) for details about the backend services and how to run them.

Protected routes on frontend
