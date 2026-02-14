import React from 'react';
import { MessageCircle } from 'lucide-react';
import type { CTAPosition, CTAAnimation, AnimationSpeed } from '../types/schema';

interface FloatingWhatsAppButtonProps {
    position: CTAPosition;
    animation: CTAAnimation;
    speed: AnimationSpeed;
    fontFamily?: string;
    strategy?: 'fixed' | 'absolute';
    offsetY?: number;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
    position,
    animation,
    speed,
    fontFamily,
    strategy = 'fixed',
    offsetY = 0
}) => {
    // Position classes
    const positionClasses = {
        'bottom-right': 'bottom-4 right-4 md:bottom-8 md:right-8',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 md:bottom-8',
        'bottom-left': 'bottom-4 left-4 md:bottom-8 md:right-auto md:left-8'
    };

    // Animation classes
    // const animationClasses ... removed as unused

    // Note: Tailwind v3 standard animations: spin, ping, pulse, bounce. 
    // 'shake' isn't standard. I'll use a custom style or map shake to something else or rely on inline styles/global css if needed.
    // For now, let's map 'shake' to 'bounce' or omit if strict. 
    // Actually, let's inject a style tag for shake and speed control.

    const getAnimationDuration = () => {
        switch (speed) {
            case 'slow': return '3s';
            case 'fast': return '1s';
            case 'normal': default: return '2s';
        }
    };

    return (
        <>
            <style>
                {`
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-4px) rotate(-4deg); }
                        75% { transform: translateX(4px) rotate(4deg); }
                    }
                    .animate-shake {
                        animation: shake ${getAnimationDuration()} ease-in-out infinite;
                    }
                    .custom-anim {
                        animation-duration: ${getAnimationDuration()};
                    }
                `}
            </style>
            <div
                className={`${strategy} z-50 transition-all duration-500 ease-in-out ${offsetY === 0 ? positionClasses[position] : 'right-4 left-auto'}`}
                style={offsetY > 0 ? { bottom: `${offsetY + 32}px`, right: position === 'bottom-left' ? 'auto' : '1rem', left: position === 'bottom-left' ? '1rem' : position === 'bottom-center' ? '50%' : 'auto', transform: position === 'bottom-center' ? 'translateX(-50%)' : 'none' } : {}}
            >
                <button
                    className={`shadow-xl flex items-center gap-2 pl-4 pr-5 py-3 rounded-full text-white transition-transform hover:scale-105 hover:shadow-2xl ${animation === 'shake' ? 'animate-shake' : animation !== 'none' ? `animate-${animation} custom-anim` : ''}`}
                    style={{
                        backgroundColor: '#25D366', // WhatsApp Green
                        fontFamily: fontFamily || 'inherit',
                        fontWeight: 600
                    }}
                >
                    <MessageCircle size={20} className="fill-current" />
                    <span className="font-bold text-sm">Falar no WhatsApp</span>
                </button>
            </div>
        </>
    );
};
