import React from 'react';
import { useBuilderStore } from '../../hooks/useBuilderStore';
import { Quote, Sparkles, Plus, Trash2 } from 'lucide-react';
import type { Testimonial, Differential } from '../../types/schema';

export const ContentForm: React.FC = () => {
    const { data, updateContent } = useBuilderStore();

    const addTestimonial = () => {
        updateContent({
            testimonials_list: [
                ...data.content.testimonials_list,
                { name: 'Novo Cliente', text: 'Depoimento aqui...', role: 'Empresário' }
            ]
        });
    };

    const removeTestimonial = (index: number) => {
        updateContent({
            testimonials_list: data.content.testimonials_list.filter((_, i) => i !== index)
        });
    };

    const updateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
        const list = [...data.content.testimonials_list];
        list[index] = { ...list[index], [field]: value };
        updateContent({ testimonials_list: list });
    };

    const addDifferential = () => {
        updateContent({
            differentials_list: [
                ...data.content.differentials_list,
                { title: 'Novo Diferencial', description: 'Descrição do diferencial.' }
            ]
        });
    };

    const removeDifferential = (index: number) => {
        updateContent({
            differentials_list: data.content.differentials_list.filter((_, i) => i !== index)
        });
    };

    const updateDifferential = (index: number, field: keyof Differential, value: string) => {
        const list = [...data.content.differentials_list];
        list[index] = { ...list[index], [field]: value };
        updateContent({ differentials_list: list });
    };

    return (

        <div className="space-y-6">
            {/* Testimonials */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                            <Quote size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Depoimentos</h3>
                    </div>
                    <button
                        onClick={addTestimonial}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors font-medium"
                    >
                        <Plus size={14} /> Adicionar
                    </button>
                </div>

                <div className="space-y-4">
                    {data.content.testimonials_list.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-8 italic bg-gray-50 rounded-lg">Nenhum depoimento cadastrado.</p>
                    )}
                    {data.content.testimonials_list.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 p-5 rounded-lg border border-gray-200 relative group transition-all hover:bg-white hover:shadow-sm">
                            <button
                                onClick={() => removeTestimonial(idx)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => updateTestimonial(idx, 'name', e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-200 focus:border-blue-500 px-0 py-1 text-sm font-bold text-gray-900 focus:outline-none"
                                    placeholder="Nome do Cliente"
                                />
                                <textarea
                                    value={item.text}
                                    onChange={(e) => updateTestimonial(idx, 'text', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                                    placeholder="Texto do depoimento..."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Differentials */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
                            <Sparkles size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Diferenciais</h3>
                    </div>
                    <button
                        onClick={addDifferential}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors font-medium"
                    >
                        <Plus size={14} /> Adicionar
                    </button>
                </div>

                <div className="space-y-4">
                    {data.content.differentials_list.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-8 italic bg-gray-50 rounded-lg">Nenhum diferencial cadastrado.</p>
                    )}
                    {data.content.differentials_list.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 p-5 rounded-lg border border-gray-200 relative group transition-all hover:bg-white hover:shadow-sm">
                            <button
                                onClick={() => removeDifferential(idx)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => updateDifferential(idx, 'title', e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-200 focus:border-cyan-500 px-0 py-1 text-sm font-bold text-gray-900 focus:outline-none"
                                    placeholder="Título do Diferencial"
                                />
                                <textarea
                                    value={item.description}
                                    onChange={(e) => updateDifferential(idx, 'description', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500"
                                    placeholder="Descrição completa..."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
