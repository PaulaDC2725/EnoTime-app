import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import type { User } from '../../../modules/auth/domain/authTypes';

interface MainLayoutProps {
    children: React.ReactNode;
    isAdminView: boolean;
    currentUser: User | null;
    onLogout: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    isAdminView,
    currentUser,
    onLogout
}) => {

    // DESKTOP
    const [isPinnedCollapsed, setIsPinnedCollapsed] =
        useState<boolean>(true);

    const [isHovered, setIsHovered] =
        useState<boolean>(false);

    // MOBILE
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
        useState<boolean>(false);

    const isEffectivelyCollapsed =
        isPinnedCollapsed && !isHovered;

    const layoutModifier =
        isEffectivelyCollapsed
            ? '--collapsed'
            : '--expanded';

    return (
        <div className="eno-layout">

            {/* MOBILE OVERLAY */}
            {isMobileSidebarOpen && (
                <div
                    className="eno-layout__overlay"
                    onClick={() =>
                        setIsMobileSidebarOpen(false)
                    }
                />
            )}

            <Sidebar
                isAdminView={isAdminView}
                isCollapsed={isPinnedCollapsed}
                isHovered={isHovered}
                isMobileOpen={isMobileSidebarOpen}
                onHoverChange={setIsHovered}
                onToggle={() =>
                    setIsPinnedCollapsed(!isPinnedCollapsed)
                }
                onCloseMobile={() =>
                    setIsMobileSidebarOpen(false)
                }
            />

            <div
                className={`
                    eno-layout__content-wrapper
                    eno-layout__content-wrapper${layoutModifier}
                `}
            >
                {!isMobileSidebarOpen && (
                    <Navbar
                        isAdminView={isAdminView}
                        currentUser={currentUser}
                        onLogout={onLogout}
                        onOpenMobileSidebar={() =>
                            setIsMobileSidebarOpen(true)
                        }
                    />
                )}

                <main className="eno-layout__main-view">
                    {children}
                </main>
            </div>
        </div>
    );
};