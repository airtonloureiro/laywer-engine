import { useState, useRef, useEffect } from 'react';
import { useBuilderStore } from '../hooks/useBuilderStore';
import { LAWYER_TEMPLATES } from '../data/templates';
import { ChevronDown, Check, Palette } from 'lucide-react';

export function TemplateSelector() {
    const { data, applyTemplate } = useBuilderStore();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentTemplateId = data.templateId;
    const currentLayoutMode = data.config.layout_mode;

    const availableTemplates = LAWYER_TEMPLATES.filter(
        (t) => t.layoutMode === currentLayoutMode
    );

    const activeTemplate = availableTemplates.find(t => t.id === currentTemplateId) || availableTemplates[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (id: string) => {
        applyTemplate(id);
        setIsOpen(false);
    };

    if (availableTemplates.length === 0) return null;

    return (
        <div className="space-y-3" ref={dropdownRef}>
            <div className="relative">
                {/* Trigger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-all text-left"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                            <Palette size={18} />
                        </div>
                        <div>
                            <span className="block text-sm font-semibold text-gray-900">
                                {activeTemplate?.name || 'Selecione um Modelo'}
                            </span>
                            <span className="block text-xs text-gray-500">
                                {activeTemplate?.description.substring(0, 40)}...
                            </span>
                        </div>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="max-h-64 overflow-y-auto p-1.5 space-y-1">
                            {availableTemplates.map((template) => {
                                const isActive = currentTemplateId === template.id;
                                return (
                                    <button
                                        key={template.id}
                                        onClick={() => handleSelect(template.id)}
                                        className={`w-full flex items-start gap-3 p-3 rounded-md transition-colors text-left group ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`mt-0.5 w-4 h-4 rounded-full border flex-shrink-0 ${isActive ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                                            {isActive && <Check size={12} className="text-white m-auto" />}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                                                    {template.name}
                                                </span>
                                                {/* Color Preview Dots */}
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 rounded-full border border-gray-200" style={{ backgroundColor: template.style.backgroundColor }} />
                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: template.style.primaryColor }} />
                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: template.style.secondaryColor }} />
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 group-hover:text-gray-700 leading-snug">
                                                {template.description}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
