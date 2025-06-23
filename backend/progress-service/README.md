# 📈 Progress Service

The **Progress Service** handles user progress tracking for logic exercises. It supports storing, updating, and retrieving progress, as well as calculating leaderboards based on completed exercises.

---

## 🚀 Features

- Track individual progress per exercise
- Update or create progress records
- Get progress by user or exercise
- Delete specific progress entries
- Retrieve a leaderboard of top users

---

## 🧰 Tech Stack

- **Express.js** – HTTP server
- **Prisma** – ORM for database access
- **PostgreSQL** (or other Prisma-supported DB)

---

## 📦 Setup

```bash
cd progress-service
npm install
.env  # If needed
npx prisma generate   # Generate Prisma client
npm run dev

Ensure your .env contains a valid DATABASE_URL.

DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/progress_db
PORT=4003

JWT_SECRET=your_jwt_secret_key
USER_SERVICE_URL=http://localhost:4001

🌐 API Endpoints
Method	Endpoint	Description
GET	/progress/:userId	Get all progress records for a user
GET	/progress/me	Get all progress for the currently logged-in user
GET	/progress/exercise/:exerciseId	Get progress for a specific exercise
POST	/progress	Create or update progress for an exercise
DELETE	/progress/exercise/:exerciseId	Delete progress for an exercise
GET	/progress/leaderboard	Get top 10 users by completed exercises

📥 Example Payloads
POST /progress

{
  "exerciseId": "exercise-123",
  "status": "completed" // or "in-progress"
}

🧪 Testing
To test routes that require authentication, you can mock the authenticated user using middleware or tools like Postman with a JWT token if your app uses auth.

📁 Project Structure

progress-service/
├── controllers/
│   └── progress.controller.ts
├── prisma/
│   ├── schema.prisma
│   └── client.ts
├── index.ts
├── package.json
└── README.md