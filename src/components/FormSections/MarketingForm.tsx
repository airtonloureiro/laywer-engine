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
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">Estratégia de Conversão</h3>
                        <p className="text-xs text-gray-500">Defina como o lead deve entrar em contato.</p>
                    </div>
                </div>

                {/* Primary Action: WhatsApp */}
                <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-green-800">Ação Primária (Botão Principal)</h4>
                        <span className="px-2 py-1 bg-white text-xs font-bold text-green-600 rounded border border-green-200">WHATSAPP</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-green-700">Número (com DDD)</label>
                            <input
                                type="text"
                                value={data.conversion.primary_action.phone_e164 || ''}
                                onChange={(e) => updateConversion({
                                    primary_action: { ...data.conversion.primary_action, phone_e164: e.target.value }
                                })}
                                placeholder="+55 11 99999-9999"
                                className="w-full bg-white border border-green-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-mono text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-green-700">Mensagem Inicial</label>
                            <input
                                type="text"
                                value={data.conversion.primary_action.prefill_message || ''}
                                onChange={(e) => updateConversion({
                                    primary_action: { ...data.conversion.primary_action, prefill_message: e.target.value }
                                })}
                                placeholder="Olá, gostaria de agendar uma consulta..."
                                className="w-full bg-white border border-green-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Secondary Action */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-700">Ação Secundária (Opcional)</h4>
                        <select
                            value={data.conversion.secondary_action?.type || 'NONE'}
                            onChange={(e) => updateConversion({
                                secondary_action: {
                                    type: e.target.value as any,
                                    url: data.conversion.secondary_action.url
                                }
                            })}
                            className="bg-white text-xs font-bold text-gray-600 rounded border border-gray-300 px-2 py-1 focus:outline-none cursor-pointer"
                        >
                            <option value="NONE">NENHUMA</option>
                            <option value="CALENDLY">CALENDLY (Agendamento)</option>
                            <option value="FORM">FORMULÁRIO (Typeform/Google)</option>
                        </select>
                    </div>

                    {data.conversion.secondary_action?.type !== 'NONE' && (
                        <div className="space-y-2 animate-fadeIn">
                            <label className="block text-xs font-semibold text-gray-600">Link da Ferramenta</label>
                            <input
                                type="text"
                                value={data.conversion.secondary_action.url || ''}
                                onChange={(e) => updateConversion({
                                    secondary_action: { ...data.conversion.secondary_action, url: e.target.value }
                                })}
                                placeholder={data.conversion.secondary_action.type === 'CALENDLY' ? "https://calendly.com/seu-link" : "https://typeform.com/..."}
                                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
