# 🚀 DSA Algo - Interactive 3D Learning Platform

A modern, full-stack Data Structures and Algorithms learning platform with immersive 3D UI, real-time progress tracking, and comprehensive problem-solving environment.

![DSA Algo Platform](https://img.shields.io/badge/Platform-Full%20Stack-blue)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Node.js%20%7C%20MySQL-green)
![3D UI](https://img.shields.io/badge/UI-3D%20Interactive-purple)

---

## ✨ Features

### 🎯 **Core Features**
- **Interactive 3D UI** - Immersive learning experience with Three.js
- **Real-time Code Editor** - Monaco Editor with multi-language support
- **Progress Analytics** - Comprehensive tracking with beautiful charts
- **Smart Hints System** - AI-powered guidance for problem solving
- **Community Leaderboard** - Compete with other learners
- **Achievement System** - Unlock badges and track milestones

### 🛠 **Technical Features**
- **Full-Stack Architecture** - React frontend + Node.js backend
- **Secure Authentication** - JWT-based auth with bcrypt encryption
- **Database Management** - Prisma ORM with MySQL
- **Real-time Updates** - Live progress and submission tracking
- **Responsive Design** - Works seamlessly on all devices
- **Performance Optimized** - Lazy loading and efficient state management

---

## 🏗 Architecture

```
DSA Algo Platform/
├── 📁 frontend/ (React + Vite + JavaScript)
│   ├── src/
│   │   ├── components/ (3D UI, Dashboard, Problems)
│   │   ├── pages/ (Login, Register, Leaderboard)
│   │   ├── store/ (Zustand State Management)
│   │   └── services/ (API Integration)
│   ├── public/ (Static Assets)
│   └── package.json (Frontend Dependencies)
│
├── 📁 backend/ (Node.js + Express)
│   ├── routes/ (API Endpoints)
│   ├── middleware/ (Authentication, Validation)
│   ├── prisma/ (Database Schema & Seed)
│   └── package.json (Backend Dependencies)
│
└── 🗄 Database (MySQL)
    ├── Users & Authentication
    ├── Problems & Categories
    ├── Progress Tracking
    └── Submissions & Analytics
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/adarsh-priydarshi-5646/DsaAlgo.git
cd DsaAlgo
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up database
npm run db:generate
npm run db:push
npm run db:seed

# Start the backend server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Start the frontend
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database Studio**: `npm run db:studio` (in server directory)

---

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Three.js + React Three Fiber** - 3D graphics and animations
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **Monaco Editor** - VS Code-like code editor
- **Recharts** - Beautiful data visualization

### Backend
- **Node.js + Express** - Server runtime and framework
- **Prisma** - Type-safe database ORM
- **MySQL** - Relational database
- **JWT** - Secure authentication
- **bcrypt** - Password hashing
- **CORS + Helmet** - Security middleware

### Development Tools
- **Vite** - Fast build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server

---

## 📊 Database Schema

### Core Tables
- **Users** - User accounts and profiles
- **Categories** - Problem categories (Arrays, Trees, etc.)
- **Problems** - DSA problems with metadata
- **Solutions** - Reference solutions and explanations
- **Submissions** - User code submissions
- **Progress** - User progress tracking
- **Achievements** - Badge and milestone system

---

## 🎮 Usage Guide

### For Students
1. **Register/Login** - Create your account
2. **Explore Dashboard** - View your progress and stats
3. **Browse Problems** - Filter by category and difficulty
4. **Solve Problems** - Use the integrated code editor
5. **Track Progress** - Monitor your improvement
6. **Compete** - Check the leaderboard

### For Administrators
1. **Problem Management** - Add/edit problems via API
2. **User Analytics** - Monitor platform usage
3. **Content Moderation** - Manage submissions and solutions

---

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000/api
```

#### Backend (backend/.env)
```bash
# Database
DATABASE_URL="mysql://username:password@localhost:3306/dsaalgo_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV="development"

# CORS
FRONTEND_URL="http://localhost:3000"
```

---

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Heroku)
```bash
# Set environment variables
# Deploy from 'backend' directory
```

### Database (PlanetScale/Railway)
```bash
# Update DATABASE_URL in production
npm run db:push
npm run db:seed
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

---

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core platform functionality
- ✅ 3D UI implementation
- ✅ Authentication system
- ✅ Problem solving environment

### Phase 2 (Next)
- 🔄 AI-powered hints and explanations
- 🔄 Video tutorials integration
- 🔄 Mobile app development
- 🔄 Advanced analytics dashboard

### Phase 3 (Future)
- 📋 Live coding sessions
- 📋 Peer code review system
- 📋 Company-specific problem sets
- 📋 Interview preparation mode

---

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check MySQL is running
sudo service mysql start

# Verify credentials in .env
# Run database setup again
npm run db:push
```

**Frontend Build Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3D Graphics Not Loading**
```bash
# Check WebGL support in browser
# Update graphics drivers
# Try different browser
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Adarsh Priydarshi** - Full Stack Developer
  - GitHub: [@adarsh-priydarshi-5646](https://github.com/adarsh-priydarshi-5646)
  - LinkedIn: [Connect with me](https://linkedin.com/in/adarsh-priydarshi)

---

## 🙏 Acknowledgments

- **Three.js Community** - For amazing 3D graphics library
- **React Team** - For the incredible UI framework
- **Prisma Team** - For the excellent ORM
- **Open Source Community** - For inspiration and resources

---

## 📞 Support

Need help? Reach out to us:

- 📧 **Email**: support@dsaalgo.com
- 💬 **Discord**: [Join our community](https://discord.gg/dsaalgo)
- 🐛 **Issues**: [GitHub Issues](https://github.com/adarsh-priydarshi-5646/DsaAlgo/issues)
- 📖 **Documentation**: [Wiki](https://github.com/adarsh-priydarshi-5646/DsaAlgo/wiki)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by the DSA Algo Team

</div>
