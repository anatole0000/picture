# 🧠 LogicLab Service

**LogicLab** is a microservice for managing logic-based exercises and user submissions. It allows users to solve logic questions, submit answers, track their progress, and receive real-time notifications via Kafka. Admins can create, update, and delete exercises.

---

## 🚀 Key Features

- ✏️ Solve logic exercises
- ✅ Validate answers and store submissions
- 📦 Send notifications via Kafka upon submission
- 🛠️ Admin CRUD operations for exercises
- 🔍 Filter exercises by `tag` and `difficulty`

---

## 🧩 Tech Stack

- **Node.js**, **Express**
- **Prisma ORM** (PostgreSQL/MySQL)
- **Apache Kafka** (via `kafkajs`)
- **TypeScript**
- **express-validator** for request validation

---

## 📁 Project Structure

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         6/21/2025   7:48 AM                node_modules
d-----         6/18/2025   2:24 PM                prisma
d-----         6/20/2025   7:42 AM                src
-a----         6/20/2025   7:33 AM            195 .env
-a----         6/18/2025   2:21 PM             89 .gitignore
-a----         6/19/2025   4:47 AM            494 NOTES.md
-a----         6/21/2025   7:48 AM          62841 package-lock.json
-a----         6/21/2025   7:48 AM            622 package.json
-a----         6/21/2025   7:56 AM            790 README.md
-a----         6/18/2025   4:23 PM            183 tsconfig.json


---

## 🛣️ API Routes

### 📘 Public Routes

| Method | Endpoint                  | Description                                   |
|--------|---------------------------|-----------------------------------------------|
| GET    | `/logic/exercises`        | Get list of exercises (optional filters: `tag`, `difficulty`) |
| GET    | `/logic/exercises/:id`    | Get exercise details by ID                    |
| POST   | `/logic/submit`           | Submit an answer and receive Kafka notification |
| GET    | `/logic/history`          | Get user's submission history                 |

> The `POST /logic/submit` route sends a message to Kafka topic **`notifications`**.

**Kafka Message Example:**
```json
{
  "userId": "user123",
  "content": "🎉 You answered the question 'Logic Puzzle' correctly!"
}


🔐 Admin Routes
Method	Endpoint	Description
POST	/logic/admin/exercises	Create a new exercise
PUT	/logic/admin/exercises/:id	Update an exercise
DELETE	/logic/admin/exercises/:id	Delete an exercise

🧪 Load Testing with K6
A k6/ directory includes a load testing script for the submission endpoint.

k6 run k6/k6-comment-test.js

Install K6 via Chocolatey:
choco install k6 -y

⚙️ Setup & Run

# 1. Install dependencies
npm install

# 2. Configure environment variables
.env

PORT=4002
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/logic_db


⚠️ Make sure Kafka is running and the notifications topic exists.

USER_SERVICE_URL=http://localhost:4001

NOTIF_SERVICE_URL=http://localhost:4006

# 3. Initialize database
npx prisma generate
npx prisma migrate dev

# 4. Start development server
npm run dev

🔐 Security Notes
Routes like submitAnswer and getHistory require an authenticated user (req.user). Ensure authentication middleware is integrated.

Admin routes should be protected via authorization checks.

