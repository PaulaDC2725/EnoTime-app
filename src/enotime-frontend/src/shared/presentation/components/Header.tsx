import React from 'react';
import { HiOutlineCalendar } from 'react-icons/hi2';
import '../styles/_header.scss'; 

interface HeaderProps {
    title: string;
    subtitle: string;
    showDate?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
    title, 
    subtitle, 
    showDate = true 
}) => {
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className="eno-header">
            <div className="eno-header__content">
                <h1 className="eno-header__title">{title}</h1>
                <p className="eno-header__subtitle">{subtitle}</p>
            </div>

            {showDate && (
                <div className="eno-header__date-group">
                    <HiOutlineCalendar className="eno-header__icon" />
                    <span className="eno-header__date-text">{date}</span>
                </div>
            )}
        </header>
    );
};