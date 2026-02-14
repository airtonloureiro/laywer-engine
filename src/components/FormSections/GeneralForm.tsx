import React from 'react';
import { useBuilderStore } from '../../hooks/useBuilderStore';
import { User, MapPin, Briefcase } from 'lucide-react';
import type { Archetype } from '../../types/schema';

export const GeneralForm: React.FC = () => {
    const { data, updateConfig, updateProfile } = useBuilderStore();

    return (
        <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="p-2 bg-gray-100 rounded-lg text-gray-700">
                        <User size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Projeto & Perfil</h3>
                </div>

                {/* Project Slug */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Slug do Projeto (URL)</label>
                    <input
                        type="text"
                        value={data.config.project_slug}
                        onChange={(e) => updateConfig({ project_slug: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all font-medium"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Nome do Advogado(a)</label>
                        <input
                            type="text"
                            value={data.profile.name}
                            onChange={(e) => updateProfile({ name: e.target.value })}
                            placeholder="Ex: Dr. João Silva"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
                        />
                    </div>

                    {/* OAB */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">OAB</label>
                        <input
                            type="text"
                            value={data.profile.oab}
                            onChange={(e) => updateProfile({ oab: e.target.value })}
                            placeholder="OAB/SP 00000"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* City */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Cidade / Estado</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                            <input
                                type="text"
                                value={data.profile.city}
                                onChange={(e) => updateProfile({ city: e.target.value })}
                                placeholder="São Paulo - SP"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
                            />
                        </div>
                    </div>

                    {/* Practice Area */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Área de Atuação Principal</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-3 text-gray-400" size={16} />
                            <input
                                type="text"
                                value={data.profile.main_practice_area}
                                onChange={(e) => updateProfile({ main_practice_area: e.target.value })}
                                placeholder="Ex: Direito Trabalhista"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Archetype */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Arquétipo de Comunicação</label>
                    <select
                        value={data.profile.archetype}
                        onChange={(e) => updateProfile({ archetype: e.target.value as Archetype })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all cursor-pointer"
                    >
                        <option value="Estrategista">Estrategista (Foco em Planejamento/Resultados)</option>
                        <option value="Gladiador">Gladiador (Foco em Luta/Defesa Agressiva)</option>
                        <option value="Conciliador">Conciliador (Foco em Acordo/Paz)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Define o tom de voz dos textos gerados.</p>
                </div>
            </div>

            {/* Section: Identidade & Posicionamento (Anti-Duplication) */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-700">
                        <User size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">Identidade & Posicionamento</h3>
                        <p className="text-xs text-gray-500">Defina a "alma" do projeto para evitar sites iguais.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Style Pack */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Pacote de Estilo (Variação)</label>
                        <select
                            value={data.config.variation?.style_pack_id || 'sp01'}
                            onChange={(e) => updateConfig({
                                variation: {
                                    seed: data.config.project_slug,
                                    style_pack_id: e.target.value as any
                                }
                            })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 transition-all cursor-pointer"
                        >
                            <option value="sp01">Style Pack 01 (Padrão)</option>
                            <option value="sp02">Style Pack 02 (Alternativo)</option>
                            <option value="sp03">Style Pack 03 (Experimental)</option>
                        </select>
                    </div>

                    {/* Tone */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Tom de Voz</label>
                        <select
                            value={data.config.positioning?.tone || 'formal'}
                            onChange={(e) => updateConfig({
                                positioning: {
                                    ...data.config.positioning!,
                                    tone: e.target.value as any
                                }
                            })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 transition-all cursor-pointer"
                        >
                            <option value="formal">Formal & Tradicional</option>
                            <option value="moderno">Moderno & Direto</option>
                            <option value="premium">Premium & Exclusivo</option>
                            <option value="acolhedor">Acolhedor & Empático</option>
                        </select>
                    </div>

                    {/* Angle */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Ângulo de Venda</label>
                        <select
                            value={data.config.positioning?.angle || 'seguranca_juridica'}
                            onChange={(e) => updateConfig({
                                positioning: {
                                    ...data.config.positioning!,
                                    angle: e.target.value as any
                                }
                            })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 transition-all cursor-pointer"
                        >
                            <option value="seguranca_juridica">Segurança Jurídica</option>
                            <option value="rapidez">Rapidez na Resolução</option>
                            <option value="alto_padrao">Alto Padrão</option>
                            <option value="consultivo">Consultivo</option>
                            <option value="defesa_firme">Defesa Firme</option>
                        </select>
                    </div>

                    {/* Target Audience */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Público Alvo</label>
                        <select
                            value={data.config.positioning?.target_audience || 'geral'}
                            onChange={(e) => updateConfig({
                                positioning: {
                                    ...data.config.positioning!,
                                    target_audience: e.target.value as any
                                }
                            })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 transition-all cursor-pointer"
                        >
                            <option value="geral">Geral</option>
                            <option value="pais">Pais & Família</option>
                            <option value="mulheres">Mulheres</option>
                            <option value="empresarios">Empresários</option>
                            <option value="servidores">Servidores Públicos</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
