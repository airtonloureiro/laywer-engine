import { useEffect, useRef, useState } from 'react';
import { TestimonialCard } from './TestimonialCard';
import type { Testimonial, TestimonialSettings } from '../types';

interface TestimonialSliderProps {
    testimonials: Testimonial[];
    settings?: TestimonialSettings;
}

export function TestimonialSlider({ testimonials, settings }: TestimonialSliderProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-scroll logic if we have many items
    // Condition: > 1 items.
    // If <= 3 items, maybe grid is better on desktop? 
    // Let's use Grid for <= 3, Slider for > 3 on Desktop.
    // Always Slider on Mobile?
    // For simplicity/robustness, let's use a flexible CSS Grid/Snap implementation.

    useEffect(() => {
        if (testimonials.length <= 1) return;

        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

                // If we reached the end, scroll back to start
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    setActiveIndex(0);
                } else {
                    // Scroll one item width (approx)
                    // We assume item width is roughly 280px + gap
                    const itemWidth = 284;
                    const nextScroll = scrollLeft + itemWidth;
                    scrollRef.current.scrollTo({ left: nextScroll, behavior: 'smooth' });
                    setActiveIndex(prev => (prev + 1) % testimonials.length);
                }
            }
        }, 4000); // 4 seconds per slide

        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Grid layout for few items (Desktop)
    if (testimonials.length <= 3) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                    <TestimonialCard key={i} data={t} settings={settings} />
                ))}
            </div>
        );
    }

    // Slider for many items
    return (
        <div className="relative group">
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory px-2 no-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {testimonials.map((t, i) => (
                    <div key={i} className="min-w-[260px] md:min-w-[320px] snap-center">
                        <TestimonialCard data={t} settings={settings} />
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 absolute bottom-0 left-0 right-0">
                {testimonials.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === activeIndex || (i > activeIndex && i < activeIndex + 3 /* Approx visible */) ? 'bg-blue-600' : 'bg-gray-200'}`}
                    />
                ))}
            </div>
        </div>
    );
}
