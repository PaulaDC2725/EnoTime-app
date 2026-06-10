import React, { useRef, useState } from 'react';
import Vacations from "../../../../../assets/icons/Vacations.svg?react"
import {
    HiOutlineCalendarDays, 
    HiOutlineDocumentText,
    HiOutlinePercentBadge,
} from 'react-icons/hi2';

const balanceCards = [
    {
        id: 1,
        title: 'Available Vacation Days',
        value: '12',
        subtitle: 'business days',
        icon: <Vacations className="dashboard__card-icon-svg" />,
    },
    {
        id: 2,
        title: 'Available Compensatory Days',
        value: '4',
        subtitle: 'business days',
        icon: <HiOutlineCalendarDays />,
    },
    {
        id: 3,
        title: 'Pending Request',
        value: '10',
        subtitle: 'request',
        icon: <HiOutlineDocumentText />,
    },
    {
        id: 4,
        title: 'Annual Usage',
        value: '35%',
        subtitle: 'of annual total',
        icon: <HiOutlinePercentBadge />,
    },
];

export const BalanceCarousel: React.FC = () => {

    const [activeCard, setActiveCard] =
        useState<number>(0);

    const carouselRef =
        useRef<HTMLDivElement | null>(null);

    const handleScroll = () => {
        if (!carouselRef.current) return;

        const scrollLeft =
            carouselRef.current.scrollLeft;

        const cardWidth =
            carouselRef.current.clientWidth * 0.88;

        const currentIndex = Math.round(
            scrollLeft / cardWidth
        );

        setActiveCard(currentIndex);
    };

    return (
        <section className="dashboard__balances">

            <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="dashboard__carousel"
            >
                {balanceCards.map((card) => (
                    <article
                        key={card.id}
                        className="dashboard__balance-card"
                    >

                        <div className="dashboard__card-icon">
                            {card.icon}
                        </div>

                        <div className="dashboard__card-content">

                            <span className="dashboard__card-title">
                                {card.title}
                            </span>

                            <h2 className="dashboard__card-value">
                                {card.value}
                            </h2>

                            <p className="dashboard__card-subtitle">
                                {card.subtitle}
                            </p>

                        </div>

                    </article>
                ))}
            </div>

            <div className="dashboard__indicators">

                {balanceCards.map((_, index) => (
                    <span
                        key={index}
                        className={`
                            dashboard__indicator
                            ${activeCard === index
                                ? 'dashboard__indicator--active'
                                : ''
                            }
                        `}
                    />
                ))}

            </div>
        </section>
    );
};