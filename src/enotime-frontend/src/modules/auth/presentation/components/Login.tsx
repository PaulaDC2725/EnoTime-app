import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* =========================================
   Component: Real Login (Local + SSO)
   ========================================= */
export const Login: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados para manejar los datos del formulario y errores
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para el Login Propio (Correo y Contraseña)
  const handleLocalLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    setError(null);
    setIsLoading(true);

    try {
      // Petición al backend local que acabamos de crear
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Credenciales inválidas');
      }

      // ¡Éxito! Guardamos el token en el almacenamiento del navegador
      localStorage.setItem('enotime_token', data.token);
      
      // Redirigimos al Dashboard
      navigate('/dashboard');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSOLogin = () => {
    // Aquí integraremos más adelante la ventana de Google/Microsoft
    alert('Autenticación por SSO en construcción...');
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
          Gestión de Vacaciones y Compensatorios
        </p>

        {/* Mostrar mensaje de error si las credenciales fallan */}
        {error && (
          <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {/* Formulario de Login Propio */}
        <form onSubmit={handleLocalLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' }}
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' }}
          />
          
          <button 
            type="submit" 
            className="btn-1" 
            disabled={isLoading}
            style={{ width: '100%', marginTop: '8px', cursor: isLoading ? 'not-allowed' : 'pointer' }}
          >
            {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '24px' }} />

        {/* Botón para Login por SSO */}
        <button 
          type="button"
          onClick={handleSSOLogin}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#f5f5f5', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Continuar con Microsoft / Google
        </button>

      </div>
    </div>
  );
};