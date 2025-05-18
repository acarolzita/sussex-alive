# Sussex-Alive 🎓

**Sussex-Alive** is a social media platform built for University of Sussex students to connect, post, chat, and manage their profiles in a safe, university-verified environment.

---

## 🌐 Live Project

* **Frontend:** [https://sussex-alive.vercel.app](https://sussex-alive.vercel.app)
* **Backend:** [https://sussex-alive-backend.onrender.com](https://sussex-alive-backend.onrender.com)

---

## 🚀 Features

* 🔐 Secure authentication via Firebase (only @sussex.ac.uk emails allowed)
* 📝 Create and browse public posts
* 💬 Real-time chat using Socket.IO
* 👤 User profile view and update
* 🔒 Protected routes with Firebase Admin middleware
* 🛀 Persistent storage using Firestore

---

## 📊 Tech Stack

### Frontend

* [Next.js 15 (App Router)](https://nextjs.org/)
* [Firebase Web SDK (Auth)](https://firebase.google.com/docs/web/setup)
* [Framer Motion](https://www.framer.com/motion/)
* [Socket.IO Client](https://socket.io/)
* Tailwind CSS (custom utility styles)

### Backend

* [Express.js](https://expressjs.com/)
* [Firebase Admin SDK (Auth & Firestore)](https://firebase.google.com/docs/admin/setup)
* [Socket.IO Server](https://socket.io/docs/v4/server-initialization/)
* Hosted on [Render](https://render.com)

---

## 🛠️ Setup Instructions

### 1. Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local # Update with Firebase project config
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env # Add Firebase Admin credentials & config
npm run dev
```

API will run at: [http://localhost:10000](http://localhost:10000)

---

## 🔢 Example Account

You must use an email ending with `@sussex.ac.uk` to register and access the platform.

---

## 📁 Project Structure

* `frontend/app/` – Next.js app pages
* `frontend/components/` – UI components (Navbar, PostCard, etc.)
* `frontend/context/` – Global Auth Context
* `backend/routes/` – Express API endpoints
* `backend/controllers/` – Request logic handlers
* `backend/middlewares/` – Token auth middleware

---

## 📄 License

MIT License

---

> Created with ❤️ for University of Sussex
