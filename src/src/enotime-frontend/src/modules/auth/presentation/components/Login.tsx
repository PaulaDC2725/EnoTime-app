import React from 'react';
import { useNavigate } from 'react-router-dom';

/* =========================================
   Component: Provisional Login
   ========================================= */
export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate UNIFI redirection and authentication
    navigate('/dashboard');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: 'var(--color-bg-table)' 
    }}>
      <div style={{
        backgroundColor: 'var(--color-white)',
        padding: '3rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>EnoTime</h1>
        <p style={{ color: 'var(--color-neutral-dark)', marginBottom: '32px' }}>
          Vacation & Compensatory Management
        </p>

        <button 
          className="btn-1" 
          onClick={handleLogin}
          style={{ width: '100%' }}
        >
          Login via UNIFI
        </button>
      </div>
    </div>
  );
};