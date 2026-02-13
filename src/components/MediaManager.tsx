import { useState } from 'react';
import { Plus, Trash2, Film } from 'lucide-react';
import type { ImageConfig, AnimationType } from '../types';

interface MediaManagerProps {
    label: string;
    value: string | ImageConfig | null;
    onChange: (val: string | ImageConfig | null) => void;
    placeholder?: string;
}

export function MediaManager({ label, value, onChange, placeholder = "./assets/image.jpg" }: MediaManagerProps) {
    const [inputValue, setInputValue] = useState('');

    // Normalize value to Config format for internal handling
    const config: ImageConfig = typeof value === 'string'
        ? { urls: [value], animation: 'fade' }
        : value || { urls: [], animation: 'fade' };

    const addImage = () => {
        if (!inputValue.trim()) return;
        const newUrls = [...config.urls, inputValue.trim()];
        updateValue(newUrls, config.animation);
        setInputValue('');
    };

    const removeImage = (index: number) => {
        const newUrls = config.urls.filter((_, i) => i !== index);
        updateValue(newUrls, config.animation);
    };

    const updateAnimation = (anim: AnimationType) => {
        updateValue(config.urls, anim);
    };

    const updateValue = (urls: string[], animation: AnimationType) => {
        // If only 1 URL, we can save as string to keep JSON clean (backward compat), 
        // OR always use object. Let's use object if > 1, string if 1 for now to match schema flexibility?
        // Actually, plan said "string | ImageConfig".
        // If urls.length === 1, we save as string? 
        // BUT user might want animation even for 1 image? No, animation needs 2+.
        // Let's ALWAYS save as ImageConfig if urls > 1.
        // If urls === 1, save as string.

        if (urls.length === 0) {
            onChange(null);
        } else if (urls.length === 1) {
            onChange(urls[0]); // Save as simple string
        } else {
            onChange({ urls, animation });
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-gray-700">{label}</label>
                {config.urls.length > 1 && (
                    <div className="flex items-center gap-2 text-xs">
                        <Film size={14} className="text-gray-400" />
                        <select
                            value={config.animation}
                            onChange={(e) => updateAnimation(e.target.value as AnimationType)}
                            className="bg-gray-50 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="fade">Fade (Suave)</option>
                            <option value="slide">Slide (Carrossel)</option>
                            <option value="zoom">Zoom (Ken Burns)</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addImage()}
                    placeholder={placeholder}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                    onClick={addImage}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Gallery */}
            {config.urls.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                    {config.urls.map((url, i) => (
                        <div key={i} className="group relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                            <img src={url} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                            <button
                                onClick={() => removeImage(i)}
                                className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
