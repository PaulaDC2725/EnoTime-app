import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnoTimeLogo from '../../../assets/images/EnoTime_light.png';
import { HiOutlineBell, HiOutlineUserCircle, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import type { User } from '../../../modules/auth/domain/authTypes';

interface NavbarProps {
  isAdminView: boolean;
  onOpenMobileSidebar: () => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> =
  ({
    onOpenMobileSidebar,
    currentUser,
    onLogout
  }) => {
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const displayName = currentUser?.fullName || currentUser?.email?.split('@')[0] || 'User';
    const displayEmail = currentUser?.email || 'Signed in';

    const handleLogout = () => {
      setIsProfileMenuOpen(false);
      onLogout();
      navigate('/');
    };

    return (
      <header className="eno-navbar">
        <div className="eno-navbar__left">
          <div
            className="eno-navbar__toggle-menu"
            onClick={onOpenMobileSidebar}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </div>
        </div>
        <div className="eno-navbar__center">
          <div className="eno-navbar__brand-mobile" onClick={() => navigate('/dashboard')}>
            <img src={EnoTimeLogo} alt="EnoTime" className="eno-navbar__logo-img" />
          </div>
        </div>
        <div className="eno-navbar__right">
          <div className="eno-navbar__notification-box">
            <HiOutlineBell className='eno-navbar__notification-bell' /> <span className="eno-navbar__badge">3</span>
          </div>
          <div className="eno-navbar__user-profile" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsProfileMenuOpen(prev => !prev)}>
            <HiOutlineUserCircle className="eno-navbar__avatar" />
            <div className="eno-navbar__user-meta">
              <span className="eno-navbar__user-name">{displayName}</span>
              <span className="eno-navbar__chevron">▼</span>
            </div>
            {isProfileMenuOpen && (
              <div
                className="eno-navbar__profile-menu"
                style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, minWidth: '220px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.75rem', boxShadow: '0 12px 35px rgba(15, 23, 42, 0.12)', padding: '0.75rem', zIndex: 20 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{displayName}</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{displayEmail}</div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.6rem 0.75rem', border: 'none', borderRadius: '0.6rem', backgroundColor: '#f8fafc', color: '#0f172a', cursor: 'pointer' }}
                >
                  <HiOutlineArrowRightOnRectangle />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  };