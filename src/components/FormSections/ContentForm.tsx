import React from 'react';
import { useBuilderStore } from '../../hooks/useBuilderStore';
import { Quote, Sparkles, Plus, Trash2, ListOrdered, HelpCircle } from 'lucide-react';
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
                    {/* Global Settings */}
                    <div className="grid grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Ícone Padrão</label>
                            <select
                                value={data.content.testimonial_settings?.icon || 'star'}
                                onChange={(e) => updateContent({
                                    testimonial_settings: {
                                        ...(data.content.testimonial_settings || { layout: 'image_top' }),
                                        icon: e.target.value as any
                                    }
                                })}
                                className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            >
                                <option value="star">Estrelas (Padrão)</option>
                                <option value="quote">Aspas</option>
                                <option value="check">Check</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Layout do Card</label>
                            <select
                                value={data.content.testimonial_settings?.layout || 'image_top'}
                                onChange={(e) => updateContent({
                                    testimonial_settings: {
                                        ...(data.content.testimonial_settings || { icon: 'star' }),
                                        layout: e.target.value as any
                                    }
                                })}
                                className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            >
                                <option value="image_top">Foto no Topo</option>
                                <option value="image_side">Foto na Lateral (Esq)</option>
                                <option value="image_right">Foto na Lateral (Dir)</option>
                                <option value="minimal">Minimalista (Sem foto)</option>
                            </select>
                        </div>
                    </div>

                    {/* Social Proof (Google) */}
                    <div className="grid grid-cols-2 gap-4 bg-yellow-50/30 p-4 rounded-lg border border-yellow-100">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Nota Google (0-5)</label>
                            <input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={data.content.testimonial_settings?.google_rating || 4.9}
                                onChange={(e) => updateContent({
                                    testimonial_settings: {
                                        ...(data.content.testimonial_settings || { icon: 'star', layout: 'image_top' }),
                                        google_rating: parseFloat(e.target.value)
                                    }
                                })}
                                className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Qtd. Avaliações</label>
                            <input
                                type="number"
                                min="0"
                                value={data.content.testimonial_settings?.review_count || 100}
                                onChange={(e) => updateContent({
                                    testimonial_settings: {
                                        ...(data.content.testimonial_settings || { icon: 'star', layout: 'image_top' }),
                                        review_count: parseInt(e.target.value)
                                    }
                                })}
                                className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            />
                        </div>
                    </div>

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
                                <div className="flex gap-4">
                                    <div className="flex-1 space-y-3">
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => updateTestimonial(idx, 'name', e.target.value)}
                                            className="w-full bg-transparent border-b border-gray-200 focus:border-blue-500 px-0 py-1 text-sm font-bold text-gray-900 focus:outline-none"
                                            placeholder="Nome do Cliente"
                                        />
                                        <input
                                            type="text"
                                            value={item.role || ''}
                                            onChange={(e) => updateTestimonial(idx, 'role', e.target.value)}
                                            className="w-full bg-transparent border-b border-gray-200 focus:border-blue-500 px-0 py-1 text-xs text-gray-500 focus:outline-none"
                                            placeholder="Cargo/Função (Opcional)"
                                        />
                                    </div>
                                    <div className="w-16">
                                        <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group/img cursor-pointer border border-gray-300">
                                            {item.photo ? (
                                                <img src={item.photo} alt="Foto" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-500 text-center p-1">
                                                    Foto URL
                                                </div>
                                            )}
                                            {/* Overlay input removed */}
                                            {/* Better: Just a text input below or popover. Let's make it a text input. */}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-gray-500 shrink-0">Foto URL:</span>
                                    <input
                                        type="text"
                                        value={item.photo || ''}
                                        onChange={(e) => updateTestimonial(idx, 'photo', e.target.value)}
                                        className="flex-1 bg-white border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="https://..."
                                    />
                                </div>

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

            {/* Process Steps (Como Funciona) */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <ListOrdered size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Como Funciona (Etapas)</h3>
                    </div>
                    <button
                        onClick={() => updateContent({
                            process_steps: [
                                ...(data.content.process_steps || []),
                                { title: 'Nova Etapa', description: 'Descrição da etapa...' }
                            ]
                        })}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors font-medium"
                    >
                        <Plus size={14} /> Adicionar
                    </button>
                </div>

                <div className="space-y-4">
                    {(data.content.process_steps || []).map((step, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
                            <button
                                onClick={() => updateContent({
                                    process_steps: data.content.process_steps?.filter((_, i) => i !== idx)
                                })}
                                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="flex gap-3">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold shrink-0">
                                    {idx + 1}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <input
                                        type="text"
                                        value={step.title}
                                        onChange={(e) => {
                                            const newSteps = [...(data.content.process_steps || [])];
                                            newSteps[idx].title = e.target.value;
                                            updateContent({ process_steps: newSteps });
                                        }}
                                        className="w-full bg-transparent border-b border-gray-200 focus:border-green-500 px-0 py-1 text-sm font-bold text-gray-900 focus:outline-none"
                                        placeholder="Título da Etapa"
                                    />
                                    <textarea
                                        value={step.description}
                                        onChange={(e) => {
                                            const newSteps = [...(data.content.process_steps || [])];
                                            newSteps[idx].description = e.target.value;
                                            updateContent({ process_steps: newSteps });
                                        }}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 min-h-[50px] focus:outline-none focus:ring-1 focus:ring-green-500"
                                        placeholder="Descrição da etapa..."
                                    />
                                </div>
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

            {/* FAQ */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <HelpCircle size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Perguntas Frequentes (FAQ)</h3>
                    </div>
                    <button
                        onClick={() => updateContent({
                            faq_list: [
                                ...(data.content.faq_list || []),
                                { question: 'Nova Pergunta', answer: 'Resposta aqui...' }
                            ]
                        })}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors font-medium"
                    >
                        <Plus size={14} /> Adicionar
                    </button>
                </div>

                <div className="space-y-4">
                    {(data.content.faq_list || []).map((faq, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
                            <button
                                onClick={() => updateContent({
                                    faq_list: data.content.faq_list?.filter((_, i) => i !== idx)
                                })}
                                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) => {
                                        const newList = [...(data.content.faq_list || [])];
                                        newList[idx].question = e.target.value;
                                        updateContent({ faq_list: newList });
                                    }}
                                    className="w-full bg-transparent border-b border-gray-200 focus:border-purple-500 px-0 py-1 text-sm font-bold text-gray-900 focus:outline-none"
                                    placeholder="Pergunta"
                                />
                                <textarea
                                    value={faq.answer}
                                    onChange={(e) => {
                                        const newList = [...(data.content.faq_list || [])];
                                        newList[idx].answer = e.target.value;
                                        updateContent({ faq_list: newList });
                                    }}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 min-h-[50px] focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    placeholder="Resposta..."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
