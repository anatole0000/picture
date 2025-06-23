# 🗨️ Comment Service

A microservice responsible for managing comments on exercises in a learning platform.

## 🚀 Technologies Used

- **Node.js**, **Express** – REST API server
- **Prisma** – ORM for PostgreSQL
- **Zod** – Schema validation
- **Axios** – HTTP client for inter-service communication
- **K6** – Load and stress testing

## 📁 Project Structure

```bash


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         6/21/2025   6:10 AM                node_modules
d-----         6/20/2025   8:14 AM                prisma
d-----         6/20/2025  11:47 AM                src
-a----         6/20/2025   8:14 AM            115 .env
-a----         6/20/2025   8:12 AM             89 .gitignore
-a----         6/21/2025   6:17 AM           1043 k6-comment-test.js
-a----         6/21/2025   6:10 AM          65272 package-lock.json
-a----         6/21/2025   6:10 AM            669 package.json
-a----         6/21/2025   6:23 AM              0 README.md
-a----         6/15/2025  12:23 PM            183 tsconfig.json


⚙️ Setup Instructions

1. Install dependencies

npm install

2. Configure .env

PORT=4007
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/comment_db

3. Run database migration & start the service

npx prisma migrate dev --name init
npx prisma generate

npm run dev

📡 API Endpoints
POST /comments
Create a new comment.

{
  "exerciseId": "uuid",
  "content": "Comment text",
  "parentId": "uuid or null"
}

Requires an Authorization header (Bearer token).

GET /comments/:exerciseId
Fetch all comments for a specific exercise, including replies and user data.

Query parameters supported (pagination):

page

limit

🧪 Load Testing with K6

1. Install K6

choco install k6 -y   # Windows
brew install k6       # macOS

2. Run the load test

k6 run k6-comment-test.js
Simulates 50 concurrent virtual users for 20 seconds creating comments.

📄 License
MIT – Open source and free to use for learning and development purposes.


---


