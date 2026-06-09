import React, { useState } from 'react';
import { useAuth } from '../../application/useAuth';
import { UserRoles, type UserRole } from '../../domain/authTypes';
import '../styles/auth.scss';

interface RegisterProps {
  onSuccessComplete?: () => void;
  availableManagers: { employee_id: string | number; full_name: string }[];
}

export const Register: React.FC<RegisterProps> = ({ onSuccessComplete, availableManagers }) => {
  const { registerUser, isLoading } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRoles.EMPLOYEE);
  const [managerId, setManagerId] = useState<string>('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser({
      full_name: fullName,
      position_title: positionTitle,
      hire_date: hireDate,
      email,
      password,
      role,
      manager_id: managerId ? Number(managerId) : null,
    }, () => {
      setFullName(''); setPositionTitle(''); setHireDate(''); setEmail(''); setPassword(''); setManagerId('');
      if (onSuccessComplete) onSuccessComplete();
    });
  };

  return (
    <div className="auth-card auth-card--wide" style={{ margin: '0 auto', width: '100%' }}>
      <h2 className="auth-card__title">User Registration</h2>
      <p className="auth-card__subtitle">Add a new employee to the directory.</p>
      <form className="auth-form" onSubmit={handleRegister} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <input type="text" className="auth-form__input" placeholder="Full Name (e.g. John Doe)" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input type="email" className="auth-form__input" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" className="auth-form__input" placeholder="Position Title" value={positionTitle} onChange={(e) => setPositionTitle(e.target.value)} required />
        <input type="date" className="auth-form__input" value={hireDate} onChange={(e) => setHireDate(e.target.value)} required title="Contract Start Date" />
        <select className="auth-form__input" value={managerId} onChange={(e) => setManagerId(e.target.value)}>
          <option value="">-- No Manager (Top Level) --</option>
          {availableManagers.map(mgr => <option key={mgr.employee_id} value={String(mgr.employee_id)}>{mgr.full_name}</option>)}
        </select>
        <select className="auth-form__input" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
          <option value={UserRoles.EMPLOYEE}>Employee (Normal Access)</option>
          <option value={UserRoles.ADMIN}>Administrator (Full Access)</option>
        </select>
        <div style={{ gridColumn: '1 / -1' }}>
          <input type="password" className="auth-form__input" placeholder="Temporary Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
          <button type="submit" className="btn-1 auth-form__button" disabled={isLoading}>{isLoading ? 'Registering...' : 'Create Account'}</button>
        </div>
      </form>
    </div>
  );
};