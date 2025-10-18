import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      const colors = {
        dark: '#dc2626',
        light: '#fca5a5',
        medium: '#ef4444',
      };

      return (
        <div
          style={{
            minHeight: '100vh',
            background: `linear-gradient(135deg, ${colors.dark} 0%, #b91c1c 50%, ${colors.medium} 100%)`,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          {/* Animated background elements */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle at 50% 120%, #fca5a5, #f87171 10%, #dc2626 80%, #991b1b 100%)',
                borderRadius: '9999px',
                opacity: 0.3,
                animation: 'moveError 20s linear infinite',
                boxShadow: '0 0 80px rgba(220, 38, 38, 0.4)',
              }}
            ></div>
          </div>

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
            {/* Error Icon */}
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
              <div style={{ animation: 'pulse 2s ease-in-out infinite' }}>
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
                  <AlertTriangle size={48} color="white" />
                </div>
              </div>
            </div>

            {/* Error Title */}
            <h1
              style={{
                fontSize: 'clamp(2rem, 8vw, 3rem)',
                fontWeight: 900,
                color: 'white',
                textShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                marginBottom: '1rem',
              }}
            >
              Oops! Something Went Wrong
            </h1>

            {/* Error Description */}
            <div style={{ marginBottom: '2rem' }}>
              <p
                style={{
                  fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                  color: '#fecaca',
                  marginBottom: '1rem',
                  lineHeight: 1.5,
                }}
              >
                We encountered an unexpected error. Don't worry, it's not your fault!
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div style={{
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  textAlign: 'left',
                  fontSize: '0.8rem',
                  color: '#fecaca',
                  fontFamily: 'monospace',
                  maxHeight: '200px',
                  overflow: 'auto'
                }}>
                  <strong>Error Details:</strong><br />
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack && (
                    <>
                      <br /><br />
                      <strong>Component Stack:</strong>
                      <pre style={{ fontSize: '0.7rem', whiteSpace: 'pre-wrap' }}>
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
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
                onClick={() => window.location.reload()}
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
                <RefreshCw size={18} />
                <span>Reload Page</span>
              </button>

              <button
                onClick={() => window.location.href = '/'}
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
                <Home size={18} />
                <span>Go Home</span>
              </button>
            </div>

            {/* Report Issue */}
            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={() => {
                  const errorReport = {
                    error: this.state.error?.toString(),
                    stack: this.state.error?.stack,
                    componentStack: this.state.errorInfo?.componentStack,
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                  };
                  
                  const mailtoLink = `mailto:support@dsaalgo.com?subject=Error Report&body=${encodeURIComponent(
                    `Error Report:\n\n${JSON.stringify(errorReport, null, 2)}`
                  )}`;
                  
                  window.open(mailtoLink, '_blank');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#fecaca',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  margin: '0 auto',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = '#fecaca';
                }}
              >
                <Bug size={14} />
                <span>Report This Error</span>
              </button>
            </div>

            {/* Status message */}
            <div
              style={{
                marginTop: '2rem',
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fecaca',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              }}
            >
              Error Code: JS_ERROR • Application Error
            </div>
          </div>

          {/* Animations */}
          <style>{`
            @keyframes moveError {
              0% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(100px, -50px) rotate(90deg); }
              50% { transform: translate(-50px, 100px) rotate(180deg); }
              75% { transform: translate(-100px, -100px) rotate(270deg); }
              100% { transform: translate(0, 0) rotate(360deg); }
            }

            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.05); opacity: 1; }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
