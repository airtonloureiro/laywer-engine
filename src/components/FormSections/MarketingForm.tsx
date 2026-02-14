import React from 'react';
import { useBuilderStore } from '../../hooks/useBuilderStore';
import { TagInput } from '../TagInput';
import { Target, BarChart3, MessageSquare, Shield, AlertTriangle } from 'lucide-react';

export const MarketingForm: React.FC = () => {
    const { data, updateSeo, updateIntelligence, updatePrivacy, updateConversion, updateFeatures } = useBuilderStore();

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

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.features.show_map}
                                onChange={(e) => updateFeatures({ show_map: e.target.checked })}
                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm font-semibold text-gray-700">Exibir Mapa no Site</span>
                        </label>
                    </div>

                    {data.features.show_map && (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Endereço Completo</label>
                                <input
                                    type="text"
                                    value={data.seo_local.street_address || ''}
                                    onChange={(e) => updateSeo({ street_address: e.target.value })}
                                    placeholder="Av. Paulista, 1000 - cj 101, São Paulo - SP"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="block text-sm font-semibold text-gray-700">Google Maps Embed URL (iframe src)</label>
                                    <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="text-xs text-purple-600 hover:underline flex items-center gap-1">
                                        Abrir Google Maps <Target size={12} />
                                    </a>
                                </div>
                                <input
                                    type="text"
                                    value={data.seo_local.map_embed_url || ''}
                                    onChange={(e) => updateSeo({ map_embed_url: e.target.value })}
                                    placeholder="https://www.google.com/maps/embed?pb=..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-xs font-mono text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                />
                                <p className="text-[10px] text-gray-400">
                                    Vá no Google Maps → Compartilhar → Incorporar um mapa → Copie apenas o link dentro de src="..."
                                </p>
                            </div>
                        </>
                    )}
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
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <Shield size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Privacidade & LGPD</h3>
                        <p className="text-xs text-gray-500">Gestão de consentimento e cookies.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="flex items-center gap-2 cursor-pointer p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                        <input
                            type="checkbox"
                            checked={data.privacy?.consent?.enabled ?? true}
                            onChange={(e) => updatePrivacy({
                                consent: {
                                    ...(data.privacy?.consent || {
                                        provider: 'react-cookie-consent',
                                        default: 'necessary_only',
                                        categories: ['necessary', 'analytics', 'marketing'],
                                        policy_url: '/politica-de-privacidade'
                                    } as any), enabled: e.target.checked
                                }
                            })}
                            className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="font-semibold text-gray-800">Ativar Banner de Cookies (Consentimento)</span>
                    </label>

                    {data.privacy?.consent?.enabled && (
                        <div className="grid grid-cols-1 gap-4 animate-fadeIn">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Link da Política de Privacidade</label>
                                <input
                                    type="text"
                                    value={data.privacy.consent.policy_url}
                                    onChange={(e) => updatePrivacy({
                                        consent: { ...data.privacy.consent, policy_url: e.target.value }
                                    })}
                                    placeholder="/politica-de-privacidade"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Comportamento Padrão</label>
                                <select
                                    value={data.privacy.consent.default}
                                    onChange={(e) => updatePrivacy({
                                        consent: { ...data.privacy.consent, default: e.target.value as any }
                                    })}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                >
                                    <option value="necessary_only">Apenas Necessários (Recomendado LGPD)</option>
                                    <option value="opt_in">Opt-in (Bloqueia tudo até aceitar)</option>
                                    <option value="opt_out">Opt-out (Permitido até recusar)</option>
                                </select>
                            </div>

                            <div className="p-3 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-200 flex items-start gap-2">
                                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                                <p>Scripts de <strong>GTM</strong> e <strong>Pixel</strong> só serão injetados após o aceite do usuário (Categoria: Analytics/Marketing).</p>
                            </div>
                        </div>
                    )}
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

                {/* Sticky CTA Config */}
                <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-green-800">Botão Flutuante (WhatsApp Sticky)</h4>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.conversion.sticky_cta?.enabled ?? true}
                                onChange={(e) => updateConversion({
                                    sticky_cta: { ...(data.conversion.sticky_cta || { position: 'bottom-right', animation: 'pulse', animation_speed: 'normal' }), enabled: e.target.checked }
                                })}
                                className="rounded border-green-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-xs font-bold text-green-600">ATIVADO</span>
                        </label>
                    </div>

                    {data.conversion.sticky_cta?.enabled && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-green-700 mb-1">Posição</label>
                                <select
                                    value={data.conversion.sticky_cta.position || 'bottom-right'}
                                    onChange={(e) => updateConversion({
                                        sticky_cta: { ...data.conversion.sticky_cta!, position: e.target.value as any }
                                    })}
                                    className="w-full bg-white border border-green-200 rounded px-2 py-1.5 text-sm"
                                >
                                    <option value="bottom-right">Inferior Direito</option>
                                    <option value="bottom-center">Inferior Centro</option>
                                    <option value="bottom-left">Inferior Esquerdo</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-green-700 mb-1">Animação</label>
                                <select
                                    value={data.conversion.sticky_cta.animation || 'pulse'}
                                    onChange={(e) => updateConversion({
                                        sticky_cta: { ...data.conversion.sticky_cta!, animation: e.target.value as any }
                                    })}
                                    className="w-full bg-white border border-green-200 rounded px-2 py-1.5 text-sm"
                                >
                                    <option value="pulse">Pulse (Suave)</option>
                                    <option value="bounce">Bounce (Pulo)</option>
                                    <option value="shake">Shake (Tremor)</option>
                                    <option value="none">Sem Animação</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-green-700 mb-1">Velocidade</label>
                                <select
                                    value={data.conversion.sticky_cta.animation_speed || 'normal'}
                                    onChange={(e) => updateConversion({
                                        sticky_cta: { ...data.conversion.sticky_cta!, animation_speed: e.target.value as any }
                                    })}
                                    className="w-full bg-white border border-green-200 rounded px-2 py-1.5 text-sm"
                                >
                                    <option value="slow">Lento</option>
                                    <option value="normal">Normal</option>
                                    <option value="fast">Rápido</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
