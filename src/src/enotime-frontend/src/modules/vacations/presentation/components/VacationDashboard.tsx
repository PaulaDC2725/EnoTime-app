import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, Table } from 'antd';

/* =========================================
   Interfaces & Types
   ========================================= */
interface VacationDashboardProps {
  isAdminView: boolean;
  setIsAdminView: (value: boolean) => void;
}

/* =========================================
   Component: VacationDashboard
   ========================================= */
export const VacationDashboard: React.FC<VacationDashboardProps> = ({ 
  isAdminView, 
  setIsAdminView 
}) => {
  const navigate = useNavigate();

  /* Mock table columns for request lists */
  const columns = [
    { title: 'Employee', dataIndex: 'employee', key: 'employee' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Days', dataIndex: 'days', key: 'days' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  /* Mock table data for request lists */
  const mockData = [
    { key: '1', employee: 'Paula Delgado', type: 'Vacation', days: 5, status: 'Pending' },
    { key: '2', employee: 'Daniel Camacho', type: 'Compensatory', days: 2, status: 'Approved' },
  ];

  return (
    <div className="vacation-dashboard">
      
      {/* =========================================
          DASHBOARD TOP CONTROL BAR
          ========================================= */}
      <div className="vacation-dashboard__header">
        <div className="vacation-dashboard__title-group">
          <h2 className="vacation-dashboard__title">
            {isAdminView ? 'Direct Manager Console' : 'My Vacation Portal'}
          </h2>
          <p className="vacation-dashboard__subtitle">
            {isAdminView 
              ? 'Review, validate and authorize team requests and operational metrics' 
              : 'Keep track of your active balances, time logs and personal history'}
          </p>
        </div>

        <div className="vacation-dashboard__controls">
          {/* Integrated sandbox role conmutator using hoisted state */}
          <div className="vacation-dashboard__role-selector">
            <span className="vacation-dashboard__selector-label">Admin View</span>
            <Switch 
              checked={isAdminView} 
              onChange={(checked) => setIsAdminView(checked)}
              style={{ backgroundColor: isAdminView ? '#7209b6' : '#d9d9d9' }}
            />
          </div>

          {/* Action button visible to employees to open creation form */}
          {!isAdminView && (
            <button 
              className="btn-1" 
              onClick={() => navigate('/request')}
              style={{ width: 'auto', padding: '0 var(--space-lg)' }}
            >
              + New Request
            </button>
          )}
        </div>
      </div>

      {/* =========================================
          PERSPECTIVE CONDITIONAL METRIC RENDERING
          ========================================= */}
      {isAdminView ? (
        /* --- ADMIN / DIRECT MANAGER METRICS --- */
        <div className="vacation-dashboard__stats-container">
          <div className="vacation-dashboard__stat-card vacation-dashboard__stat-card--alert">
            <span className="vacation-dashboard__stat-card-value">4</span>
            <span className="vacation-dashboard__stat-card-label">Pending Approvals</span>
          </div>
          <div className="vacation-dashboard__stat-card">
            <span className="vacation-dashboard__stat-card-value">18</span>
            <span className="vacation-dashboard__stat-card-label">Total Team Members</span>
          </div>
          <div className="vacation-dashboard__stat-card vacation-dashboard__stat-card--info">
            <span className="vacation-dashboard__stat-card-value">3</span>
            <span className="vacation-dashboard__stat-card-label">Active on Leave Today</span>
          </div>
          <div className="vacation-dashboard__stat-card">
            <span className="vacation-dashboard__stat-card-value">92%</span>
            <span className="vacation-dashboard__stat-card-label">Coverage Rate</span>
          </div>
        </div>
      ) : (
        /* --- EMPLOYEE BALANCES METRICS --- */
        <div className="vacation-dashboard__stats-container">
          <div className="vacation-dashboard__stat-card">
            <span className="vacation-dashboard__stat-card-value">12</span>
            <span className="vacation-dashboard__stat-card-label">Available Vacation Days</span>
          </div>
          <div className="vacation-dashboard__stat-card">
            <span className="vacation-dashboard__stat-card-value">3</span>
            <span className="vacation-dashboard__stat-card-label">Compensatory Days</span>
          </div>
          <div className="vacation-dashboard__stat-card vacation-dashboard__stat-card--alert">
            <span className="vacation-dashboard__stat-card-value">1</span>
            <span className="vacation-dashboard__stat-card-label">Pending Requests</span>
          </div>
          <div className="vacation-dashboard__stat-card">
            <span className="vacation-dashboard__stat-card-value">15</span>
            <span className="vacation-dashboard__stat-card-label">Total Earned YTD</span>
          </div>
        </div>
      )}

      {/* =========================================
          LOWER CONTENT BLOCK SECTION
          ========================================= */}
      <div className="vacation-dashboard__content-grid">
        <div className="vacation-dashboard__section-block">
          <h3 className="vacation-dashboard__section-title">
            {isAdminView ? 'Team Application Log' : 'My Recent Timeline'}
          </h3>
          <div className="custom-table">
            <Table 
              columns={columns} 
              dataSource={mockData} 
              pagination={false} 
              scrollbarWidth={0}
            />
          </div>
        </div>

        <div className="vacation-dashboard__section-block">
          <h3 className="vacation-dashboard__section-title">Operational Notice</h3>
          <p style={{ color: 'var(--color-grey-dark-text)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            {isAdminView
              ? 'As a manager, holiday validations require checking cross-coverage limits to guarantee service availability SLA metrics.'
              : 'Please ensure all compensatory applications are submitted at least 48 hours prior to the requested day.'}
          </p>
        </div>
      </div>

    </div>
  );
};