import { useState, useEffect } from 'react';
import type { ImageConfig } from '../types';

interface CarouselProps {
    images: string | ImageConfig | null;
    alt: string;
    className?: string;
    height?: string;
}

export function Carousel({ images, alt, className = "", height = "h-full" }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Parse input to standardized config
    const config: ImageConfig = typeof images === 'string'
        ? { urls: [images], animation: 'fade' }
        : images || { urls: [], animation: 'fade' };

    const { urls, animation } = config;

    useEffect(() => {
        if (urls.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % urls.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [urls.length]);

    if (urls.length === 0) {
        return <div className={`bg-gray-200 ${height} ${className} flex items-center justify-center text-gray-400`}>No Image</div>;
    }

    return (
        <div className={`relative overflow-hidden ${height} ${className}`}>
            {urls.map((url, index) => {
                const isActive = index === currentIndex;

                // Animation Styles
                let animationClass = "";

                switch (animation) {
                    case 'fade':
                        animationClass = `transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`;
                        break;
                    case 'slide':
                        animationClass = `transition-transform duration-700 ease-in-out absolute inset-0 transform ${isActive ? 'translate-x-0' : index < currentIndex ? '-translate-x-full' : 'translate-x-full'
                            }`;
                        break;
                    case 'zoom':
                        animationClass = `transition-all duration-3000 ease-linear absolute inset-0 ${isActive ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`;
                        break;
                }

                // Override for single image (no animation needed really, but keep logic consistent)
                if (urls.length === 1) animationClass = "opacity-100";

                // Slide needs absolute positioning for all slides
                const positionClass = animation === 'slide' || animation === 'zoom' ? 'absolute inset-0' : isActive ? 'relative' : 'absolute inset-0';

                return (
                    <img
                        key={index}
                        src={url}
                        alt={`${alt} ${index + 1}`}
                        className={`w-full h-full object-cover ${positionClass} ${animationClass}`}
                    />
                );
            })}

            {/* Indicators */}
            {urls.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {urls.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
