import React from 'react';
import { useBuilderStore } from '../../hooks/useBuilderStore';
import { Palette, Image as ImageIcon, Upload } from 'lucide-react';
import { MediaManager } from '../MediaManager';

export const AssetsColorsForm: React.FC = () => {
    const { data, updateTheme, updateImages } = useBuilderStore();

    return (
        <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                        <Palette size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Cores & Tema</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Cor Primária</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={data.theme.primary_color}
                                onChange={(e) => updateTheme({ primary_color: e.target.value })}
                                className="h-11 w-11 rounded-lg border border-gray-200 p-1 cursor-pointer bg-white"
                            />
                            <input
                                type="text"
                                value={data.theme.primary_color}
                                onChange={(e) => updateTheme({ primary_color: e.target.value })}
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Cor Secundária</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={data.theme.secondary_color}
                                onChange={(e) => updateTheme({ secondary_color: e.target.value })}
                                className="h-11 w-11 rounded-lg border border-gray-200 p-1 cursor-pointer bg-white"
                            />
                            <input
                                type="text"
                                value={data.theme.secondary_color}
                                onChange={(e) => updateTheme({ secondary_color: e.target.value })}
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Fonte (Headings)</label>
                    <select
                        value={data.theme.font_heading}
                        onChange={(e) => updateTheme({ font_heading: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all cursor-pointer"
                    >
                        <option value="">Seguir Style Pack (Padrão)</option>
                        <option value="Fraunces">Fraunces (Elegante/Serifa)</option>
                        <option value="Space Grotesk">Space Grotesk (Moderno/Tech)</option>
                        <option value="Inter">Inter (Neutro/Corporativo)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        *Se selecionado, substitui a fonte de títulos do Style Pack.
                    </p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                        <ImageIcon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Imagens (Upload)</h3>
                </div>

                {/* Helper for uploads */}
                <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-lg flex gap-3 border border-gray-100">
                    <Upload size={14} className="mt-0.5 text-gray-400" />
                    <p>Em ambiente web, insira a URL da imagem (ou arraste para assets e use path relativo).</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Foto do Perfil</label>
                        <input
                            type="text"
                            value={data.images.profile_photo || ''}
                            onChange={(e) => updateImages({ profile_photo: e.target.value })}
                            placeholder="./assets/profile.jpg"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                    </div>

                    <MediaManager
                        label="Background Hero (Suporta Múltiplos)"
                        value={data.images.hero_bg}
                        onChange={(val) => updateImages({ hero_bg: val })}
                        placeholder="./assets/hero.jpg"
                    />

                    <MediaManager
                        label="Fotos do Escritório"
                        value={data.images.office_photo}
                        onChange={(val) => updateImages({ office_photo: val })}
                        placeholder="./assets/office.jpg"
                    />
                </div>
            </div>
        </div>
    );
};
