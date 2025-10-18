import { useEffect, useState } from 'react';
import { Home, ArrowLeft, RefreshCw, Search, BookOpen, Code, Trophy, User, HelpCircle, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Error404() {
  const [floatingElements, setFloatingElements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Create random floating elements
    const elements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setFloatingElements(elements);
  }, []);

  const colors = {
    dark: '#581c87',
    light: '#c084fc',
    medium: '#a855f7',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.dark} 0%, #7c3aed 50%, ${colors.medium} 100%)`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      {/* Animated background blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* Large moving ball with gradient - moves through all corners */}
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            // background: 'radial-gradient(circle at 30% 30%, #036103ff 0%, #1a472a 50%, #0f3428 100%)',
             background: 'radial-gradient(circle at 50% 120%, #81e8f6, #76deef 10%, #055194 80%, #062745 100%)',
            borderRadius: '9999px',
            opacity: 0.25,
            animation: 'moveCorners 88s linear infinite',
            boxShadow: '0 0 80px rgba(26, 71, 42, 0.6), inset -30px -30px 60px rgba(0, 0, 0, 0.4)',
            // filter: 'blur(40px)',
          }}
        ></div>
         <div
          style={{
            position: 'absolute',
            top:'300px',
            left:'100px',
            width: '400px',
            height: '400px',
            // background: 'radial-gradient(circle at 30% 30%, #036103ff 0%, #1a472a 50%, #0f3428 100%)',
             background: 'radial-gradient(circle at 50% 120%, #c781f6ff, #b976efff 10%, #5b0594ff 80%, #310645ff  100%)',
            borderRadius: '9999px',
            opacity: 0.95,
            animation: 'moveCorners2 48s linear infinite alternate',
            // animationDelay:'5s',
            boxShadow: '0 0 80px rgba(26, 71, 42, 0.6), inset -30px -30px 60px rgba(0, 0, 0, 0.4)',
            // filter: 'blur(40px)',
          }}
        ></div>

        {/* Medium pulsing blob - top right */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '40px',
            width: '288px',
            height: '288px',
            backgroundColor: colors.light,
            borderRadius: '9999px',
            mixBlendMode: 'multiply',
            filter: 'blur(96px)',
            opacity: 0.2,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        ></div>

        {/* Small jumping ball - top right */}
        <div
          style={{
            position: 'absolute',
            top: '120px',
            right: '100px',
            width: '150px',
            height: '150px',
            backgroundColor: '#6366f1',
            borderRadius: '9999px',
            opacity: 0.2,
            animation: 'jumpBall 2s ease-in-out infinite',
            filter: 'blur(40px)',
          }}
        ></div>

        {/* Large pulsing blob - bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '40px',
            width: '288px',
            height: '288px',
            backgroundColor: colors.medium,
            borderRadius: '9999px',
            mixBlendMode: 'multiply',
            filter: 'blur(96px)',
            opacity: 0.2,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s',
          }}
        ></div>
      </div>

      {/* Floating elements */}
      {floatingElements.map((el) => (
        <div
          key={el.id}
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            backgroundColor: colors.light,
            borderRadius: '9999px',
            opacity: 0.6,
            left: `${el.left}%`,
            top: '0',
            animation: `float ${el.duration}s infinite ease-in-out`,
            animationDelay: `${el.delay}s`,
          }}
        ></div>
      ))}

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '32rem',
          margin: '0 auto',
        }}
      >
        {/* Animated 404 */}
        <div style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              fontSize: 'clamp(4rem, 15vw, 10rem)',
              fontWeight: 900,
              color: 'white',
              textShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              animation: 'bounce 2s infinite',
            }}
          >
            404
          </h1>
        </div>

        {/* Character illustration */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ animation: 'float 3s ease-in-out infinite' }}>
            <div
              style={{
                width: 'clamp(96px, 20vw, 128px)',
                height: 'clamp(96px, 20vw, 128px)',
                background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.medium} 100%)`,
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span style={{ fontSize: 'clamp(3rem, 10vw, 4rem)' }}>💀</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: 'clamp(1.875rem, 8vw, 3rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        >
          Page Not Found
        </h2>

        {/* Description */}
        <div style={{ marginBottom: '2rem' }}>
          <p
            style={{
              fontSize: 'clamp(1rem, 4vw, 1.25rem)',
              color: '#e9d5ff',
              marginBottom: '1rem',
              lineHeight: 1.5,
            }}
          >
            Oops! Looks like you've ventured into the digital wilderness.
          </p>
          <p
            style={{
              fontSize: 'clamp(0.875rem, 3vw, 1rem)',
              color: '#c4b5fd',
              marginBottom: '1.5rem',
              lineHeight: 1.4,
            }}
          >
            The page <code style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              padding: '2px 6px', 
              borderRadius: '4px',
              fontSize: '0.9em'
            }}>{location.pathname}</code> doesn't exist or has been moved.
          </p>
        </div>

        {/* Quick Search */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '4px',
            border: '1px solid rgba(255,255,255,0.2)',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            <Search size={20} style={{ color: '#c4b5fd', margin: '0 12px' }} />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  // Simple search logic
                  if (searchQuery.toLowerCase().includes('dashboard')) navigate('/dashboard');
                  else if (searchQuery.toLowerCase().includes('problem')) navigate('/problems');
                  else if (searchQuery.toLowerCase().includes('learn')) navigate('/learn');
                  else if (searchQuery.toLowerCase().includes('leaderboard')) navigate('/leaderboard');
                  else if (searchQuery.toLowerCase().includes('profile')) navigate('/profile');
                  else navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                }
              }}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'white',
                fontSize: '1rem',
                padding: '12px 8px',
                '::placeholder': { color: '#c4b5fd' }
              }}
            />
          </div>
        </div>

        {/* Primary Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              backgroundColor: 'white',
              color: colors.dark,
              fontWeight: 700,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1rem',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
            }}
          >
            <Home size={18} />
            <span>Go Home</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: 'white',
              fontWeight: 700,
              border: `2px solid white`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1rem',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = colors.dark;
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'white';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>

          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontWeight: 600,
              border: `1px solid rgba(255,255,255,0.3)`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Quick Navigation Links */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ 
            color: '#c4b5fd', 
            fontSize: '0.9rem', 
            marginBottom: '1rem',
            fontWeight: 500
          }}>
            Or try these popular pages:
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {[
              { path: '/dashboard', icon: Home, label: 'Dashboard' },
              { path: '/problems', icon: Code, label: 'Problems' },
              { path: '/learn', icon: BookOpen, label: 'Learn' },
              { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
              { path: '/profile', icon: User, label: 'Profile' },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#e9d5ff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    backdropFilter: 'blur(5px)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.color = '#e9d5ff';
                  }}
                >
                  <Icon size={14} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#e9d5ff',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                animation: 'slideUp 1s ease-out',
              }}
            >
              Error Code: 404 • Resource Not Found
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1rem'
            }}>
              <button
                onClick={() => window.open('mailto:support@dsaalgo.com', '_blank')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: '#c4b5fd',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(5px)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.target.style.color = '#c4b5fd';
                }}
              >
                <Mail size={12} />
                <span>Report Issue</span>
              </button>
              
              <button
                onClick={() => navigate('/help')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: '#c4b5fd',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(5px)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.target.style.color = '#c4b5fd';
                }}
              >
                <HelpCircle size={12} />
                <span>Get Help</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }


        
@keyframes moveCorners {
  0% {
    transform: translate(0, 0);
    opacity: 0.25;
  }

  25% {
    transform: translate(1800px, 100px);
    opacity: 0.3;
  }

  50% {
    transform: translate(0px, 400px);
    opacity: 0.25;
  }

  75% {
    transform: translate(1500px, 700px);
    opacity: 0.3;
  }

  100% {
    transform: translate(-300px, 0);
    opacity: 0.25;
  }
}
       
@keyframes moveCorners2 {
  0% {
    transform: translate(0, 0);
    opacity: 0.25;
  }

  25% {
    transform: translate(1800px, 200px);
    opacity: 0.3;
  }

  50% {
    transform: translate(1100px, 700px);
    opacity: 0.25;
  }

  75% {
    transform: translate(0px, 500px);
    opacity: 0.3;
  }

  100% {
    transform: translate(-300px, 0);
    opacity: 0.25;
  }
}
        // @keyframes moveCorners {
        //   0% {
        //     bottom: -250px;
        //     left: -250px;
        //     opacity: 0.25;
        //   }
        //   25% {
        //     bottom: auto;
        //     top: -250px;
        //     right: -250px;
        //     left: auto;
        //     opacity: 0.3;
        //   }
        //   50% {
        //     bottom: auto;
        //     top: -250px;
        //     left: -250px;
        //     right: auto;
        //     opacity: 0.25;
        //   }
        //   75% {
        //     bottom: -250px;
        //     right: -250px;
        //     left: auto;
        //     top: auto;
        //     opacity: 0.3;
        //   }
        //   100% {
        //     bottom: -250px;
        //     left: -250px;
        //     opacity: 0.25;
        //   }
        // }

        @keyframes jumpBall {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-40px) scale(1.1);
            opacity: 0.3;
          }
        }

        @media (max-width: 768px) {
          @keyframes rotateSlow {
            0% {
              transform: rotate(0deg) scale(0.7);
            }
            100% {
              transform: rotate(360deg) scale(0.7);
            }
          }

          @keyframes jumpBall {
            0%, 100% {
              transform: translateY(0) scale(0.8);
              opacity: 0.15;
            }
            50% {
              transform: translateY(-30px) scale(0.9);
              opacity: 0.25;
            }
          }
        }
      `}</style>
    </div>
  );
}