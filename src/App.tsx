import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Contact from './pages/Contact';
import Leaderboard from './pages/Leaderboard';
import Creator from './pages/Creator';
import Login from './pages/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import DSASDESheet from './pages/DSASDESheet';

function App() {
  const [isDashboard, setIsDashboard] = useState(false);

  const handleEnterDashboard = () => {
    setIsDashboard(true);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route
            path="/"
            element={<LandingPage onEnter={handleEnterDashboard} />}
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
              </>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <>
                <Navbar />
                <Leaderboard />
              </>
            }
          />
          <Route
            path="/creator"
            element={
              <>
                <Navbar />
                <Creator />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />
          <Route
            path="/sdesheet"
            element={
              <>
                <Navbar />
                <DSASDESheet />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;