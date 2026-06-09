import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EnoTimeLogo from '../../../assets/images/EnoTime_light.png';
import {
    HiOutlineSquares2X2, HiOutlineUser, HiOutlineDocumentText,
    HiOutlineClock, HiOutlineCalendarDays, HiOutlineUsers,
    HiOutlineChartBar, HiOutlineCog8Tooth, HiOutlineInboxStack,
    HiOutlineUserGroup, HiOutlineQuestionMarkCircle, HiOutlineArrowRightOnRectangle,
    HiOutlineChevronRight, HiOutlineChevronDown
} from 'react-icons/hi2';

interface SidebarProps {
    isAdminView: boolean;
    isCollapsed: boolean;
    isHovered: boolean;
    isMobileOpen: boolean;
    onHoverChange: (hovered: boolean) => void;
    onToggle: (collapsed: boolean) => void;
    onCloseMobile: () => void;
}
interface SubMenuItem { path: string; label: string; }
interface MenuItem { path?: string; label: string; icon?: React.ReactNode; isDivider?: boolean; children?: SubMenuItem[]; }

export const Sidebar: React.FC<SidebarProps> = ({
    isAdminView,
    isCollapsed,
    isHovered,
    onHoverChange,
    onToggle,
    isMobileOpen,
    onCloseMobile
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({ 'My Requests': true, 'Team Inbox': true });

    const isEffectivelyCollapsed = isCollapsed && !isHovered;
    const modifier = isMobileOpen
        ? '--mobile-open'
        : isEffectivelyCollapsed
            ? '--collapsed'
            : '--expanded';

    const toggleMenu = (label: string) => {
        if (isEffectivelyCollapsed) return;
        setExpandedMenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const employeeMenu: MenuItem[] = [
        { path: '/dashboard', label: 'Dashboard', icon: <HiOutlineSquares2X2 className="eno-sidebar__svg-icon" /> },
        { path: '/profile', label: 'My Profile', icon: <HiOutlineUser className="eno-sidebar__svg-icon" /> },
        { isDivider: true, label: 'div1' },
        { label: 'My Requests', icon: <HiOutlineDocumentText className="eno-sidebar__svg-icon" />, children: [{ path: '/request/all', label: 'All Requests' }, { path: '/request/vacation', label: 'Vacation Requests' }, { path: '/request/overtime', label: 'Overtime Requests' }, { path: '/request/compensatory', label: 'Compensatory Days' }, { path: '/request/extra-time', label: 'Extra Time Records' }] },
        { label: 'My Balance', icon: <HiOutlineClock className="eno-sidebar__svg-icon" />, children: [{ path: '/balance/vacation', label: 'Vacation Days' }, { path: '/balance/compensatory', label: 'Compensatory Days' }, { path: '/balance/extra-time', label: 'Extra Time Balance' }] },
        { isDivider: true, label: 'div2' },
        { path: '/calendar', label: 'Calendar', icon: <HiOutlineCalendarDays className="eno-sidebar__svg-icon" /> },
        { path: '/directory', label: 'Team Directory', icon: <HiOutlineUsers className="eno-sidebar__svg-icon" /> },
        { path: '/reports', label: 'Reports', icon: <HiOutlineChartBar className="eno-sidebar__svg-icon" /> },
        { path: '/settings', label: 'Settings', icon: <HiOutlineCog8Tooth className="eno-sidebar__svg-icon" /> },
        { isDivider: true, label: 'div3' },
        { path: '/support', label: 'Help & Support', icon: <HiOutlineQuestionMarkCircle className="eno-sidebar__svg-icon" /> }
    ];

    const adminMenu: MenuItem[] = [
        { path: '/dashboard', label: 'Dashboard', icon: <HiOutlineSquares2X2 className="eno-sidebar__svg-icon" /> },
        { path: '/profile', label: 'My Profile', icon: <HiOutlineUser className="eno-sidebar__svg-icon" /> },
        { isDivider: true, label: 'div1' },
        { label: 'My Requests', icon: <HiOutlineDocumentText className="eno-sidebar__svg-icon" />, children: [{ path: '/request/all', label: 'All Requests' }, { path: '/request/vacation', label: 'Vacation Requests' }, { path: '/request/overtime', label: 'Overtime Requests' }, { path: '/request/compensatory', label: 'Compensatory Days' }, { path: '/request/extra-time', label: 'Extra Time Records' }] },
        { label: 'Team Inbox', icon: <HiOutlineInboxStack className="eno-sidebar__svg-icon" />, children: [{ path: '/inbox/pending', label: 'Pending Approvals' }, { path: '/inbox/overtime', label: 'Overtime Review' }, { path: '/inbox/approved', label: 'Approved Requests' }, { path: '/inbox/rejected', label: 'Rejected Requests' }] },
        { isDivider: true, label: 'div2' },
        { path: '/team-overview', label: 'Team Overview', icon: <HiOutlineUserGroup className="eno-sidebar__svg-icon" /> },
        { path: '/reports', label: 'Reports', icon: <HiOutlineChartBar className="eno-sidebar__svg-icon" /> },
        { path: '/register', label: 'Register Employee', icon: <HiOutlineUserGroup className="eno-sidebar__svg-icon" /> }, // NUEVA LÍNEA
        { path: '/settings', label: 'Settings', icon: <HiOutlineCog8Tooth className="eno-sidebar__svg-icon" /> },
        { isDivider: true, label: 'div3' },
        { path: '/support', label: 'Help & Support', icon: <HiOutlineQuestionMarkCircle className="eno-sidebar__svg-icon" /> }
    ];

    const activeMenu = isAdminView ? adminMenu : employeeMenu;

    return (
        <nav
            className={`eno-sidebar eno-sidebar${modifier}`}
            onMouseEnter={() => {
                if (window.innerWidth >= 1280) {
                    onHoverChange(true);
                }
            }}

            onMouseLeave={() => {
                if (window.innerWidth >= 1280) {
                    onHoverChange(false);
                }
            }}
        >
            <div className="eno-sidebar__brand">
                {isEffectivelyCollapsed && !isMobileOpen ? (
                    <div className="eno-sidebar__toggle-slim" onClick={() => onToggle(!isCollapsed)}>
                        <HiOutlineChevronRight className="eno-sidebar__svg-icon eno-sidebar__slim-icon" />
                    </div>
                ) : (
                    <img
                        src={EnoTimeLogo}
                        alt="EnoTime"
                        className="eno-sidebar__logo-img"
                        onClick={() => navigate('/dashboard')}
                    />
                )}
            </div>

            <ul className="eno-sidebar__menu">
                {activeMenu.map((item, index) => {
                    if (item.isDivider) return <li key={`div-${index}`} className="eno-sidebar__divider"></li>;

                    if (item.children) {
                        const isOpen = expandedMenus[item.label] && !isEffectivelyCollapsed;
                        return (
                            <React.Fragment key={item.label}>
                                <li className="eno-sidebar__item" onClick={() => toggleMenu(item.label)}>
                                    <span className="eno-sidebar__icon">{item.icon}</span>
                                    <span className="eno-sidebar__label">{item.label}</span>
                                    <span className="eno-sidebar__chevron-container">
                                        {isOpen ? <HiOutlineChevronDown className="eno-sidebar__chevron" /> : <HiOutlineChevronRight className="eno-sidebar__chevron" />}
                                    </span>
                                </li>
                                {isOpen && (
                                    <ul className="eno-sidebar__submenu">
                                        {item.children.map(child => (
                                            <li key={child.path} className={`eno-sidebar__submenu-item ${location.pathname === child.path ? 'eno-sidebar__submenu-item--active' : ''}`} onClick={() => navigate(child.path)}>
                                                {child.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </React.Fragment>
                        );
                    }

                    return (
                        <li key={item.label} className={`eno-sidebar__item ${location.pathname === item.path ? 'eno-sidebar__item--active' : ''}`} onClick={() => item.path && navigate(item.path)} title={isEffectivelyCollapsed ? item.label : undefined}>
                            <span className="eno-sidebar__icon">{item.icon}</span>
                            <span className="eno-sidebar__label">{item.label}</span>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};