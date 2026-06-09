import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../application/useAuth';
import { UserRoles, type User } from '../../domain/authTypes';
import '../styles/auth.scss';

interface LoginProps {
  setIsAdminView: (isAdmin: boolean) => void;
  setCurrentUser: (user: User | null) => void;
}

export const Login: React.FC<LoginProps> = ({ setIsAdminView, setCurrentUser }) => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLocalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, (user) => {
      setIsAdminView(user.role === UserRoles.ADMIN);
      setCurrentUser(user);
      navigate('/dashboard');
    });
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h1 className="auth-card__title">EnoTime</h1>
        <p className="auth-card__subtitle">Vacation & Compensatory Management</p>
        <form className="auth-form" onSubmit={handleLocalLogin}>
          <div className="auth-form__group">
            <input 
              type="email" 
              className="auth-form__input" 
              placeholder="Email address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="auth-form__group">
            <input 
              type="password" 
              className="auth-form__input" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-1 auth-form__button" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};