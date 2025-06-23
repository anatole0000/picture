# 📢 Notification Service

The **Notification Service** handles the creation, storage, and consumption of user notifications. It can receive notifications via a REST API or asynchronously through Kafka messages.

---

## 🚀 Features

- Accept notifications via Kafka topic `notifications`.
- Create notifications manually via REST API.
- Retrieve notifications by `userId`.

---

## 📦 Tech Stack

- **Express.js** — Web framework
- **Prisma** — Database ORM
- **Kafka + kafkajs** — Asynchronous messaging
- **PostgreSQL** (or any database supported by Prisma)

---

## 🛠️ Setup

```bash
cd notification-service
npm install
 .env     # If applicable

 DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/notification_db
PORT=4006


npm run dev              # or npm start for production


🌐 API Endpoints
Method	Endpoint	Description
POST	/notifications	Create a new notification
GET	/notifications/:userId	Get all notifications by userId

Example

curl -X POST http://localhost:3003/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "content": "You have a new assignment!"
  }'

  
🔄 Kafka Integration
This service automatically consumes messages from the Kafka topic notifications and processes the content.

Topic: notifications

Consumer Group: notif-group

Client ID: notification-service