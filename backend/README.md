# 🧠 LogicLab Backend Monorepo

This is the **backend monorepo** for the LogicLab platform — a system designed for practicing and tracking logic exercises. It includes various microservices such as authentication, progress tracking, comment handling, and notifications.

---

## 🏗️ Tech Stack

- **Node.js + Express**
- **Prisma ORM**
- **PostgreSQL** (or compatible)
- **Kafka** (for pub/sub between services)
- **Docker Compose** (multi-service orchestration)
- **K6** 
- **Redis**
- **Grafana**
- **Loki**
- **Morgan**
- **Logger**
- **Swagger** openapi
- **Rate-limit** 
- **Opossum** CircuitBreaker
- **Zod** 

---

## 📁 Repository Structure

backend/
├── api-gateway/ # Entry point for frontend → backend
├── comment-service/ # Handles comments for exercises
├── logiclab-service/ # Main logic exercise logic
├── notification-service/ # Kafka consumer + notifications DB
├── progress-service/ # Tracks user progress per exercise
├── statistics-service/ # Analytics & performance stats
├── submission-service/ # Stores exercise submissions
├── user-service/ # Authentication & user data
├── docker-compose.yml # Spins up full stack
└── README.md # This file


## 🚀 Running Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-org/logiclab-backend.git
cd backend

docker-compose up --build

version: '3.8'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.6.0
    container_name: zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    restart: always
    container_name: kafka
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
  
  loki:
    image: grafana/loki:2.9.2
    container_name: loki
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml

  grafana:
    image: grafana/grafana:10.2.3
    container_name: grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana-storage:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
volumes:
  grafana-storage:


🧪 Testing
Each service can be tested independently. Some use k6 or Jest.

cd comment-service
k6 run k6-comment-test.js

- **dev.js**
npm run dev to run all service

🔐 Forgot Password Flow – How It Works
1. User submits email
From the frontend, user visits the "Forgot Password" page and submits their email.

2. API generates a token
Backend receives a POST /auth/forgot-password request.

If the user exists:

A random reset token is generated.

The token and expiry time (e.g. 30 minutes) are saved in the database.

A job is added to a Redis-backed queue (BullMQ) for sending the email.

3. Worker sends the email
A background worker (running separately from the main server) picks up the job.

It sends an email to the user with a reset link like:

bash

http://localhost:3000/reset-password?token=abc123...
4. User clicks the link
This opens a page where the user can enter their new password.

Frontend calls POST /auth/reset-password with { token, newPassword }.

5. Password is updated
Backend verifies the token:

If valid and not expired, the password is hashed and saved.

The token is removed from the DB (one-time use).

npm 


- **** -
cd user-service

npm run worker

docker start redis 

- **** -