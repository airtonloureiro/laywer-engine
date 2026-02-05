import React from 'react';
import { Layout, Filter, Smartphone, CheckCircle2 } from 'lucide-react';
import { useBuilderStore } from '../hooks/useBuilderStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export const LayoutSelector: React.FC = () => {
    const { data, setLayoutMode } = useBuilderStore();
    const currentMode = data.config.layout_mode;

    const options = [
        {
            id: 'CLASSIC_LP',
            label: 'Site Institucional',
            description: 'Estrutura completa com Sobre, Áreas, Depoimentos e Footer.',
            icon: Layout,
        },
        {
            id: 'FUNNEL_QUIZ',
            label: 'Página de Captura',
            description: 'Foco total em conversão. Hero section gigante e pergunta qualificadora.',
            icon: Filter,
        },
        {
            id: 'LINK_BIO_PRO',
            label: 'Cartão Digital',
            description: 'Mobile-first. Lista de botões para bio do Instagram/WhatsApp.',
            icon: Smartphone,
        },
    ] as const;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {options.map((option) => {
                const isSelected = currentMode === option.id;
                const Icon = option.icon;

                return (
                    <button
                        key={option.id}
                        onClick={() => setLayoutMode(option.id)}
                        className={cn(
                            "relative flex flex-col items-start p-6 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer",
                            "hover:border-gray-300 hover:bg-gray-50/50 hover:shadow-md",
                            isSelected
                                ? "border-gray-900 bg-white shadow-lg shadow-gray-200 ring-1 ring-gray-900/5"
                                : "border-gray-100 bg-white shadow-sm"
                        )}
                    >
                        <div className={cn(
                            "p-3 rounded-lg mb-4",
                            isSelected ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"
                        )}>
                            <Icon size={24} />
                        </div>

                        <h3 className={cn("text-lg font-bold mb-2", isSelected ? "text-gray-900" : "text-gray-700")}>
                            {option.label}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600">
                            {option.description}
                        </p>

                        {isSelected && (
                            <div className="absolute top-4 right-4 text-gray-900">
                                <CheckCircle2 size={20} />
                            </div>
                        )}
                    </button>
                );
            })}
        </div >
    );
};
