<h1 align="center">🚀 DSA Algorithm Learning Platform</h1>

<p align="center">
  <img src="https://img.icons8.com/color/96/algorithm.png" alt="DSA Logo" width="100"/>
</p>

<p align="center">
  <b>A modern, interactive platform to master Data Structures & Algorithms</b><br>
  Built with 💻 Node.js, ⚛ React, 🧩 Prisma & ⚙ Express.js
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" /></a>
  <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js&style=flat-square" />
  <img src="https://img.shields.io/badge/React-18.3.1-blue?logo=react&style=flat-square" />
  <img src="https://img.shields.io/github/contributors/naveenkumar29052006/DsaAlgo?style=flat-square" />
  <img src="https://img.shields.io/github/stars/naveenkumar29052006/DsaAlgo?style=flat-square" />
  <img src="https://img.shields.io/github/issues/naveenkumar29052006/DsaAlgo?style=flat-square" />
</p>

---

## 🌟 *Live Demo* | 📚 *Documentation* | 🐛 [Report Bug](https://github.com/naveenkumar29052006/DsaAlgo/issues) | ✨ [Request Feature](https://github.com/naveenkumar29052006/DsaAlgo/issues)

---

## 📋 *Table of Contents*
- [✨ Overview](#-overview)
- [🎯 Features](#-features)
- [🛠 Tech Stack](#%EF%B8%8F-tech-stack)
- [🏗 Project Structure](#-project-structure)
- [⚡ Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [🚀 Usage](#-usage)
- [📊 API Endpoints](#-api-endpoints)
- [🌐 Environment Variables](#-environment-variables)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Authors](#-authors)
- [🙏 Acknowledgments](#-acknowledgments)

---

## ✨ *Overview*

*DSA Algorithm Learning Platform* is an engaging, full-stack web application that makes learning *Data Structures & Algorithms* interactive, competitive, and fun.  
It enables *real-time coding, **progress analytics, and **leaderboards, wrapped in a modern UI powered by **React + Node.js + Prisma*.

### 🎯 *Key Highlights*
- 🧠 *Interactive Problem Solving* — Real-time execution with test cases  
- 📈 *Progress Tracking* — Analytics & performance insights  
- 🏅 *Gamified Learning* — Earn badges & climb leaderboards  
- 🌐 *Multi-Language Code Editor* (Monaco)  
- 🧩 *3D Visuals & Animations* — Using Three.js  
- 📱 *Fully Responsive* + Dark Mode  

---

## 🎯 *Features*

| Feature | Description |
|----------|-------------|
| 🔐 *User Authentication* | Secure JWT-based login/register |
| 🧩 *Problem Database* | Categorized DSA questions |
| 💻 *Code Editor* | Monaco Editor with syntax highlighting |
| ⚡ *Real-time Execution* | Instant feedback on submissions |
| 📊 *Progress Analytics* | Track accuracy, speed, and growth |
| 🏆 *Leaderboard* | Compete with peers globally |
| 🎖 *Achievements* | Unlock badges & milestones |
| 🌙 *Dark Mode UI* | Beautiful, responsive interface |

### 🎨 *Advanced Add-ons*
- 🧬 Three.js 3D Visuals  
- 📊 Recharts-based Data Visualization  
- 🔥 Zustand for State Management  
- ⚙ TanStack Query for API Caching  
- ✅ React Hook Form for Validation  

---

## 🛠 *Tech Stack*

### *Frontend 🎨*
| Technology | Version | Purpose |
|-------------|----------|----------|
| ⚛ React | 18.3.1 | UI Library |
| ⚡ Vite | 5.4.17 | Fast Build Tool |
| 🎨 Tailwind CSS | 3.4.1 | Styling Framework |
| 🎥 Framer Motion | 10.16.16 | Animations |
| 🧩 Three.js | 0.158.0 | 3D Graphics |
| 💻 Monaco Editor | 0.44.0 | In-browser Code Editor |

### *Backend ⚙*
| Technology | Version | Purpose |
|-------------|----------|----------|
| 🟢 Node.js | 18+ | Runtime |
| ⚙ Express.js | 4.18.2 | Web Framework |
| 🔗 Prisma | 5.6.0 | ORM |
| 🧮 MySQL | Latest | Database |
| 🔐 JWT / bcryptjs | 9.0.2 / 2.4.3 | Auth & Security |

### *Dev Tools 🔧*
- ESLint • Nodemon • Prettier

---

## 🏗 *Project Structure*

DsaAlgo/
├── backend/
│ ├── server.js
│ ├── config/
│ ├── controllers/
│ ├── prisma/
│ ├── routes/
│ └── package.json
│
├── frontend/
│ ├── index.html
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── store/
│ │ ├── services/
│ │ └── utils/
│ ├── vite.config.js
│ └── package.json
│
└── README.md



---

## ⚡ *Quick Start*

### 🧩 Prerequisites
- Node.js 18+  
- MySQL  
- npm or yarn  
- Git  

### 🚀 One Command Setup
bash
git clone https://github.com/naveenkumar29052006/DsaAlgo.git
cd DsaAlgo

# Backend

cd backend
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev

# Frontend

cd ../frontend
npm install
cp .env.example .env
npm run dev

# 🔧 Installation

### **Backend .env**
### **Frontend .env**

# 🚀 Usage

- 🔐 *Register / Login* with JWT Authentication  
- 🧩 *Browse categorized problems*  
- 💻 *Solve problems* with Monaco Editor  
- 📊 *Track progress & achievements*  
- 🏆 *Compete in leaderboards*

---

# 📊 API Endpoints

### 🔐 *Auth*
| Method | Endpoint | Description | Auth |
|--------|-----------|-------------|------|
| POST | /api/auth/register | Register user | ❌ |
| POST | /api/auth/login | Login user | ❌ |
| GET | /api/auth/me | Get user data | ✅ |

### 🧩 *Problems*
| Method | Endpoint | Description | Auth |
|--------|-----------|-------------|------|
| GET | /api/problems | Get all problems | ✅ |
| POST | /api/problems/submit | Submit solution | ✅ |

### 🏆 *Leaderboard*
| Method | Endpoint | Description | Auth |
|--------|-----------|-------------|------|
| GET | /api/leaderboard | Global leaderboard | ✅ |

---

# 🌐 Environment Variables

### *Backend:*
- DATABASE_URL
- JWT_SECRET
- PORT
- FRONTEND_URL

### *Frontend:*
- VITE_API_URL
- VITE_ENABLE_DARK_MODE
- VITE_ENABLE_3D_ANIMATIONS

---

# 🧪 Testing

Backend tests
cd backend && npm test

Frontend tests
cd frontend && npm test

Coverage
npm run test:coverage

yaml
Copy code

---

## ✅ Manual Testing Checklist
☑ User Auth  
☑ Code Editor  
☑ Submission Flow  
☑ Leaderboard  
☑ Mobile UI  

---

# 🤝 Contributing

We ❤ contributions from developers of all levels!

1️⃣ Fork the repo  
2️⃣ Create a new branch  
3️⃣ Make your changes  
4️⃣ Commit with *Conventional Commits*  
5️⃣ Submit a PR  

💡 *Tip:* Run npm run lint before pushing!

---

# 📄 License

Licensed under the *MIT License*.  
See the [LICENSE](./LICENSE) file for details.

---

# 👥 Authors

*🎨 Adarsh Priydarshi*  
Lead Developer & Project Creator  

> “Building the future of interactive learning, one algorithm at a time.”

<p align="left">
  <a href="https://github.com/adarsh"><img src="https://img.icons8.com/ios-glyphs/30/github.png"/></a>
  <a href="#"><img src="https://img.icons8.com/ios-filled/30/linkedin.png"/></a>
  <a href="mailto:adarsh@example.com"><img src="https://img.icons8.com/ios-filled/30/email.png"/></a>
</p>

---

# 🙏 Acknowledgments

- 🧠 *Open Source Community*  
- 💪 *Contributors & Testers*  
- 🧩 *DSA Educators & Mentors*

---

# 🌟 Show Your Support

If you like this project:

⭐ *Star the repo* • 🍴 *Fork it* • 🐛 *Report bugs* • 💡 *Suggest features*

<p align="center">
  Made with ❤ by Developers, for Developers
</p>
