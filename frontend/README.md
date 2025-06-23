# 🧠 Logic Platform

A modern web application to help students, teachers, and professionals practice logical thinking through interactive exercises.

## 🚀 Features

- 🔐 User authentication (login, register, forgot password)
- 🧩 Practice logic questions with difficulty levels and tags
- 📋 Admin: Create and manage exercises
- ✅ Auto grading system (expandable)
- 🌐 Responsive and futuristic UI
- 📦 RESTful API integration

---

## 🛠️ Technologies Used

- ⚛️ React + TypeScript
- 📦 Vite or Create React App (choose your setup)
- 🔀 React Router DOM v6
- 📡 Axios for API calls
- 💅 Custom CSS or Tailwind/Futuristic UI
- 🛂 JWT-based authentication
- 📁 REST API backend (not included here)

---

## 🧰 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/logic-platform.git
cd logic-platform

# Install dependencies
npm install

# Start development server
npm run dev

📁 Project Structure

 Directory: C:\Users\ADMIN\picture\frontend\src


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         6/22/2025   1:00 PM                components
d-----         6/21/2025  11:00 AM                context
d-----         6/22/2025   7:00 AM                pages
d-----         6/22/2025   7:06 AM                routes
d-----         6/22/2025   7:13 PM                styles
-a----         6/22/2025  12:20 PM           1028 api.ts
-a----         6/21/2025  10:50 AM            564 App.css
-a----         6/21/2025  10:50 AM            273 App.test.tsx
-a----         6/22/2025   6:49 AM            384 App.tsx
-a----         6/21/2025  10:50 AM            366 index.css
-a----         6/22/2025   7:13 PM            679 index.tsx
-a----         6/21/2025  10:50 AM           2632 logo.svg
-a----         6/21/2025  10:51 AM             41 react-app-env.d.ts
-a----         6/21/2025  10:50 AM            425 reportWebVitals.ts
-a----         6/21/2025  10:50 AM            241 setupTests.ts

🌐 Environment Variables
Create a .env file and configure your API URL:


VITE_API_BASE_URL=http://localhost:3000/api

🔐 Authentication
JWT tokens are stored in localStorage

AuthContext manages user state

Protected routes redirect unauthenticated users

✅ To Do / Improvements

Add Google/Facebook OAuth

Exercise tagging system with autocomplete

Timer + scoring breakdown per user

Admin dashboard for analytics