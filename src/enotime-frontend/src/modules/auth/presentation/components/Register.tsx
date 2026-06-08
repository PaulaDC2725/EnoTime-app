import React, { useState } from 'react';

import './styles/auth.scss';

export const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Empleado');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar el usuario');
      }

      setMessage({ text: '¡Usuario registrado exitosamente!', type: 'success' });
      setEmail('');
      setPassword('');
      setRole('Empleado');
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      {/* Aplicamos el modificador --wide para que esta tarjeta sea más ancha */}
      <div className="auth-card auth-card--wide">
        <h2 className="auth-card__title">Registro de Usuarios</h2>
        <p className="auth-card__subtitle">Panel de administración para crear nuevas cuentas.</p>

        {message && (
          <div className={`auth-alert auth-alert--${message.type}`}>
            {message.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="auth-form__group">
            <label className="auth-form__label">Correo Electrónico</label>
            <input 
              type="email" 
              className="auth-form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-form__group">
            <label className="auth-form__label">Contraseña Temporal</label>
            <input 
              type="password" 
              className="auth-form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-form__group">
            <label className="auth-form__label">Rol del Usuario</label>
            <select 
              className="auth-form__input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Empleado">Empleado</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="btn-1 auth-form__button" 
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Crear Usuario'}
          </button>
        </form>
      </div>
    </div>
  );
};