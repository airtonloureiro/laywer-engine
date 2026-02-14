import React from 'react';
import { useBuilderStore } from '../../hooks/useBuilderStore';
import { BarChart2, Plus, Trash2 } from 'lucide-react';

export const StatsForm: React.FC = () => {
    const { data, updateContent } = useBuilderStore();
    const stats = data.content.stats || { enabled: false, items: [] };

    const handleUpdate = (newStats: Partial<typeof stats>) => {
        updateContent({ stats: { ...stats, ...newStats } });
    };

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...stats.items];
        newItems[index] = { ...newItems[index], [field]: value };
        handleUpdate({ items: newItems });
    };

    const addItem = () => {
        handleUpdate({
            items: [...stats.items, { label: 'Novo Dado', value: 0, suffix: '+' }]
        });
    };

    const removeItem = (index: number) => {
        const newItems = stats.items.filter((_, i) => i !== index);
        handleUpdate({ items: newItems });
    };

    return (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <BarChart2 size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Estatísticas & Prova Social</h3>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={stats.enabled}
                        onChange={(e) => handleUpdate({ enabled: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-600">Ativar Seção</span>
                </label>
            </div>

            {stats.enabled && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {stats.items.map((item, index) => (
                            <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="col-span-2 md:col-span-1">
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Rótulo</label>
                                        <input
                                            type="text"
                                            value={item.label}
                                            onChange={(e) => updateItem(index, 'label', e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-sm"
                                            placeholder="Ex: Anos de Experiência"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Valor (Número)</label>
                                        <input
                                            type="number"
                                            value={item.value}
                                            onChange={(e) => updateItem(index, 'value', Number(e.target.value))}
                                            className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Sufixo</label>
                                        <input
                                            type="text"
                                            value={item.suffix || ''}
                                            onChange={(e) => updateItem(index, 'suffix', e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-sm"
                                            placeholder="Ex: +"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(index)}
                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors mt-6"
                                    title="Remover item"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addItem}
                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-blue-200 hover:text-blue-600 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                    >
                        <Plus size={16} />
                        Adicionar Estatística
                    </button>

                    <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-800 leading-relaxed">
                        <strong>Dica:</strong> Use números reais para aumentar a autoridade. Evite promessas de ganho de causa ("98% de vitórias").
                        Foque em: Anos de experiência, Casos atendidos, Vidas impactadas.
                    </div>
                </div>
            )}
        </div>
    );
};
