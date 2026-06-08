import React from 'react';
import { useNavigate } from 'react-router-dom';
import EnoTimeLogo from '../../../assets/images/EnoTime_light.png';
import { HiOutlineBell, HiOutlineUserCircle } from 'react-icons/hi2';

interface NavbarProps {
  isAdminView: boolean;
  onOpenMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> =
  ({
    isAdminView,
    onOpenMobileSidebar
  }) => {
    const navigate = useNavigate();

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
          <div className="eno-navbar__user-profile">
            <HiOutlineUserCircle className="eno-navbar__avatar" />
            <div className="eno-navbar__user-meta">
              <span className="eno-navbar__user-name">Paula Delgado</span>
              <span className="eno-navbar__chevron">▼</span>
            </div>
          </div>
        </div>
      </header>
    );
  };