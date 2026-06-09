import React, { useState } from 'react';
import type { Employee } from '../../domain/employeeTypes';
import { useEmployees } from '../../application/useEmployees';
import { UserRoles, type UserRole } from '../../../auth/domain/authTypes';

interface EditEmployeeProps {
  employee: Employee;
  availableManagers: Employee[];
  onCancel: () => void;
}

export const EditEmployee: React.FC<EditEmployeeProps> = ({ employee, availableManagers, onCancel }) => {
  const { updateEmployeeData, isLoading } = useEmployees();
  
  const [fullName, setFullName] = useState(employee.full_name);
  const [positionTitle, setPositionTitle] = useState(employee.position_title);
  const [hireDate, setHireDate] = useState(employee.hire_date ? new Date(employee.hire_date).toISOString().split('T')[0] : '');
  const [role, setRole] = useState<UserRole>(employee.role_name as UserRole);
  const [managerId, setManagerId] = useState<string>(employee.manager_id ? String(employee.manager_id) : '');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateEmployeeData(employee.employee_id, {
      full_name: fullName,
      position_title: positionTitle,
      hire_date: hireDate,
      role: role,
      manager_id: managerId ? Number(managerId) : null,
    }, onCancel);
  };

  return (
    <div className="auth-card auth-card--wide" style={{ margin: '0 auto', width: '100%' }}>
      <h2 className="auth-card__title">Edit Employee: {employee.full_name}</h2>
      <p className="auth-card__subtitle">Update roles, position, or hierarchy. Email cannot be changed.</p>
      
      <form className="auth-form" onSubmit={handleUpdate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <input type="text" className="auth-form__input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input type="email" className="auth-form__input" value={employee.email} disabled style={{ backgroundColor: '#f3f4f6' }} />
        <input type="text" className="auth-form__input" value={positionTitle} onChange={(e) => setPositionTitle(e.target.value)} required />
        <input type="date" className="auth-form__input" value={hireDate} onChange={(e) => setHireDate(e.target.value)} required />
        
        <select className="auth-form__input" value={managerId} onChange={(e) => setManagerId(e.target.value)}>
          <option value="">-- No Manager (Top Level) --</option>
          {availableManagers.filter(m => m.employee_id !== employee.employee_id).map(mgr => (
            <option key={mgr.employee_id} value={String(mgr.employee_id)}>{mgr.full_name}</option>
          ))}
        </select>

        <select className="auth-form__input" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
          <option value={UserRoles.EMPLOYEE}>Employee (Normal Access)</option>
          <option value={UserRoles.ADMIN}>Administrator (Full Access)</option>
        </select>
        
        <div style={{ gridColumn: '1 / -1', marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <button type="button" className="btn-1 auth-form__button" onClick={onCancel} style={{ backgroundColor: '#ccc', color: '#333' }}>Cancel</button>
          <button type="submit" className="btn-1 auth-form__button" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </form>
    </div>
  );
};