
Sussex-Alive is a social media platform built for University of Sussex students.


Live Demo

Frontend: [https://sussex-alive-frontend.onrender.com](https://sussex-alive-frontend.onrender.com)
Backend: [https://sussex-alive-backend.onrender.com](https://sussex-alive-backend.onrender.com)


Features

Secure authentication using Firebase (Sussex emails only)
Create and browse public posts
Real-time chat (Socket.IO)
User profiles
Protected routes with Firebase authentication
Persistent data storage with Firestore


In Progress

Like & comment system
Notifications
User search
Mobile UI improvements
Real-time feed updates


Tech Stack

Frontend

Next.js 15 (App Router)
Firebase Web SDK (Authentication)
Socket.IO Client
Custom CSS (no Tailwind dependency)
Framer Motion (planned animations)

Backend

Express.js
Firebase Admin SDK (Auth & Firestore)
Socket.IO Server
Hosted on Render

Apply full-stack development skillsLearn real-world authentication & APIs
Build a production-ready social platform
Create a strong portfolio project for internships


Frontend

bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev

Open: [http://localhost:3000](http://localhost:3000)


Backend

bash
cd backend
npm install
cp .env.example .env
npm run dev

Runs at: [http://localhost:10000](http://localhost:10000)


Authentication Rules

Only emails ending in **@sussex.ac.uk** are allowed
Firebase handles authentication securely
Backend verifies tokens using Firebase Admin


Project Structure

frontend/
  app/            Pages (Next.js App Router)
  components/     UI components
  context/        Auth state management

backend/
  routes/         API routes
  controllers/    Business logic
  middlewares/    Auth middleware


Deployment

Frontend deployed on Render
Backend deployed on Render
Automatic deployment via GitHub integration


Future Improvements

Full Firestore integration for posts
Real-time feed updates
Messaging system improvements
Profile customization
UI/UX polish


License

MIT License


Author

Built by Anna
University of Sussex – Computer Science





