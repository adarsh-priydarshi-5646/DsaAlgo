import { useEffect, useState } from 'react';
import { Home, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Error404() {
  const [floatingElements, setFloatingElements] = useState([]);
  const navigate = useNavigate();

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
        {/* Large rotating ball - bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-150px',
            width: '400px',
            height: '400px',
            backgroundColor: '#1a472a',
            borderRadius: '9999px',
            opacity: 0.15,
            animation: 'rotateSlow 15s linear infinite',
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
        <p
          style={{
            fontSize: 'clamp(1rem, 4vw, 1.25rem)',
            color: '#e9d5ff',
            marginBottom: '3rem',
            lineHeight: 1.5,
          }}
        >
          Oops! Looks like you've ventured into the digital wilderness. The page you're looking for has taken a wrong turn.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 40px',
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
            <Home size={20} />
            <span> Go Home</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '12px 40px',
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
            <span>Go Back</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Status message */}
        <div
          style={{
            marginTop: '4rem',
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

        @keyframes rotateSlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

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