import React, { useState, type KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
    label: string;
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ label, tags, onChange, placeholder }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        }
    };

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onChange([...tags, trimmed]);
            setInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>

            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200 font-medium">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder || "Type and press Enter..."}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all placeholder:text-gray-400"
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="p-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
                >
                    <Plus size={20} />
                </button>
            </div>
        </div>
    );
};
