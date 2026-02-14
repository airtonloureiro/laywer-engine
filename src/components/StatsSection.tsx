import React from 'react';
import { useCountUp } from '../hooks/useCountUp';
import type { StatItem } from '../types/schema';

interface StatsSectionProps {
    items: StatItem[];
    theme: {
        primary_color: string;
        background_color?: string;
    };
    fontFamily: string;
}

const StatCounter: React.FC<{ item: StatItem; theme: any; fontFamily: string }> = ({ item, theme, fontFamily }) => {
    const { count, elementRef } = useCountUp(item.value, 2000);

    return (
        <div
            ref={elementRef}
            className="text-center p-6 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
        >
            <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{
                    color: theme.primary_color,
                    fontFamily: fontFamily
                }}
            >
                {count}{item.suffix}
            </div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {item.label}
            </div>
        </div>
    );
};

export const StatsSection: React.FC<StatsSectionProps> = ({ items, theme, fontFamily }) => {
    return (
        <section className="py-12 md:py-16 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <StatCounter
                            key={index}
                            item={item}
                            theme={theme}
                            fontFamily={fontFamily}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
