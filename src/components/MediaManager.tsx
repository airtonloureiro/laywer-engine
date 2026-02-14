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

    // Determine mode based on value type
    const isCarousel = typeof value === 'object' && value !== null && 'urls' in value;

    // Normalize state
    const currentUrls = isCarousel ? (value as ImageConfig).urls : (value ? [value as string] : []);
    const currentAnim = isCarousel ? (value as ImageConfig).animation : 'fade';

    const toggleMode = () => {
        if (isCarousel) {
            // Switch to Single (take first image or null)
            onChange(currentUrls[0] || null);
        } else {
            // Switch to Carousel
            onChange({ urls: currentUrls, animation: 'fade' });
        }
    };

    const addImage = () => {
        if (!inputValue.trim()) return;
        const newUrls = [...currentUrls, inputValue.trim()];

        if (isCarousel) {
            onChange({ urls: newUrls, animation: currentAnim });
        } else {
            // In single mode, replace the image
            onChange(inputValue.trim());
        }
        setInputValue('');
    };

    const removeImage = (index: number) => {
        const newUrls = currentUrls.filter((_, i) => i !== index);
        if (isCarousel) {
            onChange({ urls: newUrls, animation: currentAnim });
        } else {
            onChange(null);
        }
    };

    const updateAnimation = (anim: AnimationType) => {
        if (isCarousel) {
            onChange({ urls: currentUrls, animation: anim });
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-gray-700">{label}</label>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleMode}
                        className={`text-xs px-2 py-1 rounded border ${isCarousel
                            ? 'bg-blue-50 text-blue-600 border-blue-200'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                    >
                        {isCarousel ? 'Modo Carrossel' : 'Modo Único'}
                    </button>

                    {isCarousel && (
                        <div className="flex items-center gap-1">
                            <Film size={12} className="text-gray-400" />
                            <select
                                value={currentAnim}
                                onChange={(e) => updateAnimation(e.target.value as AnimationType)}
                                className="bg-gray-50 border border-gray-200 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                            >
                                <option value="fade">Fade</option>
                                <option value="slide">Slide</option>
                                <option value="zoom">Zoom</option>
                            </select>
                        </div>
                    )}
                </div>
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
                    title={isCarousel ? "Adicionar ao Carrossel" : "Substituir Imagem"}
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Gallery / Preview */}
            {currentUrls.length > 0 && (
                <div className={`grid gap-2 mt-2 ${isCarousel ? 'grid-cols-4' : 'grid-cols-1'}`}>
                    {currentUrls.map((url, i) => (
                        <div key={i} className="group relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                            <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                <button
                                    onClick={() => removeImage(i)}
                                    className="bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all shadow-lg"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            {isCarousel && <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                                #{i + 1}
                            </div>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
