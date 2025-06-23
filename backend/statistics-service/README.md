# 📊 Statistics Service

This microservice aggregates data from other services (User Service and LogicLab Service) to provide platform-wide statistics.

## 🚀 Features

- Total number of users
- Total number of exercises
- Total submissions and correct submissions
- Built-in Circuit Breaker protection

## 🛠️ Tech Stack

- Node.js + Express
- Axios for HTTP requests
- [Opossum](https://github.com/nodeshift/opossum) for Circuit Breaker
- Jest for unit testing (optional)

## 📦 Installation

```bash
npm install


⚙️ Environment Variables

Create a .env file with the following configuration:

DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/statistic_db
PORT=4005
JWT_SECRET=your_jwt_secret_key

USER_SERVICE_URL=http://localhost:4001
LOGICLAB_SERVICE_URL=http://localhost:4002
SUBMISSION_SERVICE_URL=http://localhost:4003

📡 API Endpoint

GET /statistics
Returns an object with the following structure:

{
  "totalUsers": 10,
  "totalExercises": 5,
  "totalSubmissions": 100,
  "correctSubmissions": 65
}

Uses Circuit Breaker and Axios Retry for fault tolerance.

Protected by rate limiting (max: 10 requests/min).

Requires authentication (Bearer token).

GET /statistics/health
Returns service health status:

{
  "status": "ok",
  "uptime": 1837.3942113
}

Used by load balancers or monitoring tools.


ℹ️ This route uses Circuit Breakers to prevent overload or dependency failure.

♻️ Circuit Breaker Configuration
Option	Value	Description
timeout	3000 ms	Request timeout per call
errorThresholdPercentage	50%	Percentage of failed requests before opening the breaker
resetTimeout	10000 ms	Time to wait before retrying a request

🔁 Retry Logic (axios-retry)
Axios will retry failed HTTP requests up to 2 times automatically.

Option	Value
retries	2
retryDelay	Linear (500ms × attempt)
condition	Network or 5xx errors

This reduces the risk of transient network failures.


🧪 Running Tests

npm test

📁 Folder Structure

Directory of C:\Users\ADMIN\picture\backend\statistics-service

06/21/2025  05:19 AM    <DIR>          .
06/20/2025  12:43 PM    <DIR>          ..
06/20/2025  05:55 AM               245 .env
06/20/2025  05:20 AM                89 .gitignore
06/21/2025  05:16 AM                74 jest.config.js
06/21/2025  05:16 AM    <DIR>          node_modules
06/21/2025  05:16 AM           231,998 package-lock.json
06/21/2025  05:18 AM               784 package.json
06/20/2025  05:29 AM    <DIR>          prisma
06/21/2025  05:23 AM             1,466 README.md
06/21/2025  05:16 AM    <DIR>          src
06/21/2025  05:17 AM               205 tsconfig.json
               7 File(s)        234,861 bytes
               5 Dir(s)  70,057,922,560 bytes free

🧩 Related Services
User Service → /users/all

LogicLab Service → /logic/all-exercises, /logic/all-submissions