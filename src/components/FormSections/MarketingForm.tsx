import React from 'react';
import { useBuilderStore } from '../../hooks/useBuilderStore';
import { TagInput } from '../TagInput';
import { Target, BarChart3, MessageSquare } from 'lucide-react';

export const MarketingForm: React.FC = () => {
    const { data, updateSeo, updateIntelligence, updateConversion } = useBuilderStore();

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                        <Target size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Marketing & SEO Local</h3>
                </div>

                {/* Local SEO */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Palavra-Chave Principal</label>
                        <input
                            type="text"
                            value={data.seo_local.main_keyword}
                            onChange={(e) => updateSeo({ main_keyword: e.target.value })}
                            placeholder="Ex: Advogado Trabalhista em SP"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                        />
                    </div>

                    <TagInput
                        label="Bairros de Atuação (SEO Local)"
                        tags={data.seo_local.target_neighborhoods}
                        onChange={(tags) => updateSeo({ target_neighborhoods: tags })}
                        placeholder="Digite o bairro e tecle Enter..."
                    />
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <BarChart3 size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Inteligência & Analytics</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Google Tag Manager (ID)</label>
                        <input
                            type="text"
                            value={data.intelligence.gtm_id}
                            onChange={(e) => updateIntelligence({ gtm_id: e.target.value })}
                            placeholder="GTM-XXXXXX"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Facebook Pixel (ID)</label>
                        <input
                            type="text"
                            value={data.intelligence.pixel_id}
                            onChange={(e) => updateIntelligence({ pixel_id: e.target.value })}
                            placeholder="1234567890"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600">
                        <MessageSquare size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Conversão (WhatsApp)</h3>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Link do WhatsApp</label>
                    <input
                        type="text"
                        value={data.conversion.primary_action_url}
                        onChange={(e) => updateConversion({ primary_action_url: e.target.value })}
                        placeholder="https://wa.me/5511999999999"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                </div>
            </div>
        </div>
    );
};
