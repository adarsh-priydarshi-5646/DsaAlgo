# 🚀 DSA Algo Platform - Setup Guide

## 📁 Project Structure

```
DSA Algo Platform/
├── 📁 frontend/          # React + Vite + JavaScript
│   ├── src/
│   │   ├── components/   # UI Components with 3D elements
│   │   ├── pages/        # Page components
│   │   ├── store/        # Zustand state management
│   │   ├── services/     # API integration
│   │   └── main.jsx      # Entry point
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
│
├── 📁 backend/           # Node.js + Express + Prisma
│   ├── routes/           # API endpoints
│   ├── middleware/       # Authentication & validation
│   ├── prisma/           # Database schema & seed
│   ├── package.json      # Backend dependencies
│   ├── server.js         # Server entry point
│   └── .env              # Environment variables
│
├── package.json          # Root package.json for scripts
├── README.md             # Main documentation
└── SETUP.md              # This setup guide
```

## 🛠 Prerequisites

- **Node.js** v18 or higher
- **MySQL** v8.0 or higher
- **Git**
- **npm** or **yarn**

## 🚀 Quick Setup (Recommended)

### 1. Clone Repository
```bash
git clone https://github.com/adarsh-priydarshi-5646/DsaAlgo.git
cd DsaAlgo
```

### 2. Install All Dependencies
```bash
npm run install:all
```

### 3. Setup Environment Variables

#### Backend Environment
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```bash
# Database
DATABASE_URL="mysql://root:password@localhost:3306/dsaalgo_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV="development"

# CORS
FRONTEND_URL="http://localhost:3000"
```

#### Frontend Environment
```bash
cd ../frontend
cp .env.example .env
```

Edit `frontend/.env`:
```bash
VITE_API_URL=http://localhost:5000/api
```

### 4. Setup Database
```bash
cd ../  # Go back to root
npm run setup:db
```

### 5. Start Development Servers
```bash
npm run dev
```

This will start both frontend (port 3000) and backend (port 5000) simultaneously.

## 🔧 Manual Setup (Alternative)

### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env file with your database credentials

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed database with sample data
npm run db:seed

# Start backend server
npm run dev
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env file with API URL

# Start frontend development server
npm run dev
```

## 📊 Database Setup

### MySQL Installation

#### macOS (using Homebrew)
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

#### Windows
Download and install from [MySQL Official Website](https://dev.mysql.com/downloads/mysql/)

### Create Database
```bash
mysql -u root -p
CREATE DATABASE dsaalgo_db;
EXIT;
```

## 🎯 Available Scripts

### Root Level Scripts
- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build` - Build frontend for production
- `npm run install:all` - Install all dependencies
- `npm run setup` - Complete setup (install + database)
- `npm run setup:db` - Setup database only
- `npm run clean` - Clean all node_modules and build files

### Frontend Scripts (in frontend/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts (in backend/)
- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🌐 Access Points

After successful setup:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health
- **Database Studio**: `cd backend && npm run db:studio`

## 🔐 Default Admin Account

After seeding the database, you can login with:
- **Email**: admin@dsaalgo.com
- **Password**: admin123

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error
```bash
# Check if MySQL is running
sudo systemctl status mysql  # Linux
brew services list | grep mysql  # macOS

# Restart MySQL
sudo systemctl restart mysql  # Linux
brew services restart mysql  # macOS

# Check database exists
mysql -u root -p -e "SHOW DATABASES;"
```

#### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

#### Node Modules Issues
```bash
# Clean and reinstall
npm run clean
npm run install:all
```

#### Prisma Issues
```bash
cd backend
npx prisma generate
npx prisma db push --force-reset
npm run db:seed
```

#### 3D Graphics Not Loading
- Check if WebGL is supported in your browser
- Update graphics drivers
- Try a different browser (Chrome/Firefox recommended)

### Environment Variables Not Loading
- Ensure `.env` files are in correct directories
- Restart development servers after changing `.env`
- Check for typos in variable names

## 📱 Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Vite provides instant HMR
- Backend: Nodemon restarts on file changes

### Database Changes
After modifying `prisma/schema.prisma`:
```bash
cd backend
npm run db:generate
npm run db:push
```

### Adding New Dependencies

#### Frontend
```bash
cd frontend
npm install package-name
```

#### Backend
```bash
cd backend
npm install package-name
```

## 🚀 Production Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Heroku)
```bash
# Set production environment variables
# Deploy from 'backend' directory
```

### Environment Variables for Production
Update the following for production:
- `JWT_SECRET` - Use a strong, random secret
- `DATABASE_URL` - Production database URL
- `NODE_ENV` - Set to "production"
- `FRONTEND_URL` - Production frontend URL

## 📞 Support

If you encounter any issues:

1. Check this troubleshooting guide
2. Search existing [GitHub Issues](https://github.com/adarsh-priydarshi-5646/DsaAlgo/issues)
3. Create a new issue with:
   - Error message
   - Steps to reproduce
   - System information (OS, Node version, etc.)

## 🎉 Success!

If everything is set up correctly, you should see:
- Frontend running at http://localhost:3000 with 3D animations
- Backend API responding at http://localhost:5000/health
- Database connected and seeded with sample data
- Ability to register/login and solve problems

Happy coding! 🚀
