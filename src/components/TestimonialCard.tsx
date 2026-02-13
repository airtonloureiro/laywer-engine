import { Star, Quote, CheckCircle2, User } from 'lucide-react';
import type { Testimonial, TestimonialSettings } from '../types';

interface TestimonialCardProps {
    data: Testimonial;
    settings?: TestimonialSettings;
    className?: string;
}

export function TestimonialCard({ data, settings, className = "" }: TestimonialCardProps) {
    // Default settings if undefined
    const { icon = 'star', layout = 'image_top' } = settings || {};

    const renderIcon = () => {
        switch (icon) {
            case 'star':
                return (
                    <div className="flex gap-1 text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                );
            case 'quote':
                return (
                    <div className="mb-3 text-blue-100">
                        <Quote size={32} fill="currentColor" />
                    </div>
                );
            case 'check':
                return (
                    <div className="mb-3 text-green-500">
                        <CheckCircle2 size={24} />
                    </div>
                );
            default:
                return null;
        }
    };

    const renderImage = (sizeClass: string = "w-14 h-14") => (
        <div className={`relative shrink-0 ${sizeClass} mx-auto mb-3`}>
            {data.photo ? (
                <img
                    src={data.photo}
                    alt={data.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white shadow-md"
                />
            ) : (
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-white shadow-md">
                    <User size={20} />
                </div>
            )}
        </div>
    );

    if (layout === 'image_side' || layout === 'image_right') {
        const isRight = layout === 'image_right';
        return (
            <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col md:flex-row items-center md:items-start gap-6 ${isRight ? 'md:flex-row-reverse text-center md:text-right' : 'text-center md:text-left'} ${className}`}>
                <div className={`shrink-0 relative ${isRight ? 'md:ml-2' : 'md:mr-2'}`}>
                    {/* Reuse logic but with bigger size for side layout */}
                    <div className="w-20 h-20 relative shrink-0">
                        {data.photo ? (
                            <img
                                src={data.photo}
                                alt={data.name}
                                className="w-full h-full rounded-full object-cover border-2 border-white shadow-md"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-white shadow-md">
                                <User size={32} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center w-full">
                    <div className={`flex ${isRight ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
                        {renderIcon()}
                    </div>

                    <p className="text-sm text-gray-600 italic mb-4 leading-relaxed break-words">"{data.text}"</p>

                    <div>
                        <p className="text-base font-bold text-gray-900">{data.name}</p>
                        {data.role && <p className="text-xs text-gray-400 font-medium">{data.role}</p>}
                    </div>
                </div>
            </div>
        );
    }

    // Default: image_top or minimal
    return (
        <div className={`bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col items-center text-center ${className}`}>
            {layout === 'image_top' && renderImage('w-20 h-20')}

            {renderIcon()}

            <p className="text-sm text-gray-600 italic mb-6 leading-relaxed flex-1 w-full">"{data.text}"</p>

            <div className="mt-auto w-full border-t border-gray-50 pt-4">
                <p className="font-bold text-gray-900">{data.name}</p>
                {data.role && <p className="text-xs text-gray-400 font-medium mt-1">{data.role}</p>}
            </div>
        </div>
    );
}
