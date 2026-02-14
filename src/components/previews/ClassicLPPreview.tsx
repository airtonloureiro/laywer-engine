import type { LawyerProjectData } from '../../types';
import { Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Carousel } from '../Carousel';
import { TestimonialSlider } from '../TestimonialSlider';
import { getStylePack } from '../../utils/stylePacks'; // Import helper

import { LAWYER_TEMPLATES } from '../../data/templates';

interface PreviewProps {
    data: LawyerProjectData;
}

export function ClassicLPPreview({ data }: PreviewProps) {
    const { profile, theme, images, content, features, style_config, config } = data;
    const borderRadius = style_config?.borderRadius || '0.5rem';
    const activeTemplate = LAWYER_TEMPLATES.find(t => t.id === data.templateId);

    // Get Style Pack (Fonts)
    const sp = getStylePack(config.variation?.style_pack_id);

    // Override Priority: theme.font_heading > sp.fonts.h1.family
    // We treat 'Serif'/'Sans' (legacy) as null to force update, or map them if needed. 
    // Assuming user migrates to new values.
    const activeHeadingFont = (theme.font_heading && theme.font_heading !== 'Serif' && theme.font_heading !== 'Sans')
        ? theme.font_heading
        : sp.fonts.h1.family;

    return (
        <div
            className="w-full min-h-[800px] flex flex-col font-sans text-sm shadow-sm transition-colors duration-300"
            style={{
                backgroundColor: theme.background_color || '#ffffff',
                color: theme.text_color || '#1f2937',
                fontFamily: sp.fonts.body.family, // Apply Body Font
                fontWeight: sp.fonts.body.weight
            }}
        >
            {/* Header */}
            <header
                className="p-4 flex justify-between items-center border-b"
                style={{
                    backgroundColor: theme.background_color || '#ffffff',
                    borderColor: theme.text_color ? `${theme.text_color}20` : '#f3f4f6'
                }}
            >
                <div className="font-bold text-lg" style={{ color: theme.primary_color, fontFamily: sp.fonts.h2.family, fontWeight: sp.fonts.h2.weight }}>
                    {images.logo_url ? <img src={images.logo_url} alt="Logo" className="h-8 object-contain" /> : 'LOGO'}
                </div>
                <nav className="hidden md:flex gap-4 text-xs font-medium opacity-80" style={{ color: theme.text_color }}>
                    <span>Home</span>
                    <span>Sobre</span>
                    <span>Áreas</span>
                    <span>Contato</span>
                </nav>
            </header>

            {/* Hero Section - Dynamic Variant */}
            <section className="relative min-h-[500px] flex items-center bg-cover bg-center overflow-hidden">
                {/* Background Carousel */}
                <div className="absolute inset-0 z-0">
                    <Carousel
                        images={images.hero_bg}
                        alt="Background Hero"
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                </div>

                <div className="container mx-auto px-6 relative z-20 w-full h-full flex flex-col justify-center">
                    {/* Render based on Hero Variant */}
                    {activeTemplate?.structure?.heroVariant === 'split_left' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="text-white space-y-6 text-left">
                                <span className="uppercase tracking-widest text-[10px] font-semibold bg-white/20 px-3 py-1 rounded inline-block">
                                    {profile.city}
                                </span>
                                <h1
                                    className="text-4xl md:text-5xl leading-tight"
                                    style={{ fontFamily: activeHeadingFont, fontWeight: sp.fonts.h1.weight }}
                                >
                                    Defesa Especializada em <span style={{ color: theme.secondary_color }}>{profile.main_practice_area}</span>
                                </h1>
                                <p className="text-white/80 text-sm max-w-md leading-relaxed">
                                    {profile.oab} | {profile.name} — Atuação jurídica de excelência focada em resolver seu problema.
                                </p>
                                <button
                                    className={`px-8 py-3 text-white shadow-lg transform transition-transform hover:scale-105 ${activeTemplate.structure?.buttonStyle === 'pill' ? 'rounded-full' : 'rounded'}`}
                                    style={{
                                        backgroundColor: theme.secondary_color,
                                        borderRadius: borderRadius,
                                        fontFamily: sp.fonts.cta.family,
                                        fontWeight: sp.fonts.cta.weight
                                    }}
                                >
                                    Agendar Consulta
                                </button>
                            </div>
                            {/* Right side placeholder */}
                            <div className="hidden md:block">
                                {/* Placeholder for split content */}
                            </div>
                        </div>
                    ) : (
                        /* Default Center Variant */
                        <div className="text-center text-white space-y-6 max-w-2xl mx-auto">
                            <span className="uppercase tracking-widest text-[10px] font-semibold bg-white/20 px-3 py-1 rounded inline-block">
                                {profile.city}
                            </span>
                            <h1
                                className="text-3xl md:text-5xl leading-tight"
                                style={{ fontFamily: activeHeadingFont, fontWeight: sp.fonts.h1.weight }}
                            >
                                Defesa Especializada em {profile.main_practice_area}
                            </h1>
                            <p className="text-white/80 text-sm">
                                {profile.oab} | {profile.name}
                            </p>
                            <button
                                className={`px-8 py-3 text-white shadow-lg transform transition-transform hover:scale-105 mt-4 ${activeTemplate?.structure?.buttonStyle === 'pill' ? 'rounded-full' : 'rounded'}`}
                                style={{
                                    backgroundColor: theme.secondary_color,
                                    borderRadius: borderRadius,
                                    fontFamily: sp.fonts.cta.family, // Apply CTA Font
                                    fontWeight: sp.fonts.cta.weight
                                }}
                            >
                                Falar com Especialista
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* About */}
            <section className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                    <h2
                        className="text-lg"
                        style={{
                            color: theme.primary_color,
                            fontFamily: sp.fonts.h2.family,
                            fontWeight: sp.fonts.h2.weight
                        }}
                    >
                        Sobre o Escritório
                    </h2>
                    <p className="text-xs leading-relaxed opacity-80">
                        Com anos de experiência e atuação focada em resultados, oferecemos um atendimento humanizado e estratégico para resolver seus problemas jurídicos com a máxima eficiência.
                    </p>
                    <div className="flex gap-2 text-xs font-medium opacity-90">
                        <div className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-600" /> Ética</div>
                        <div className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-600" /> Transparência</div>
                    </div>
                </div>
                <div className="h-32 bg-gray-100 overflow-hidden relative shadow-lg" style={{ borderRadius }}>
                    <Carousel
                        images={images.office_photo}
                        alt="Escritório"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                </div>
            </section>

            {/* Differentials */}
            <section className="p-8" style={{ backgroundColor: theme.background_color ? `${theme.background_color}fa` : '#f9fafb' }}>
                <div className="text-center mb-6">
                    <h2
                        className="text-lg"
                        style={{
                            color: theme.primary_color,
                            fontFamily: sp.fonts.h2.family,
                            fontWeight: sp.fonts.h2.weight
                        }}
                    >
                        Por Que Nos Escolher?
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {content.differentials_list.map((diff, i) => {
                        const isGlass = activeTemplate?.structure?.cardStyle === 'glass';
                        const isMinimal = activeTemplate?.structure?.cardStyle === 'border_minimal';

                        return (
                            <div
                                key={i}
                                className={`p-6 transition-all duration-300 hover:-translate-y-1 ${isGlass ? 'backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-xl' :
                                    isMinimal ? 'bg-white border hover:border-blue-500 shadow-sm' :
                                        'bg-white shadow-md border-l-4'
                                    }`}
                                style={{
                                    backgroundColor: isGlass ? undefined : (theme.background_color || '#ffffff'),
                                    borderRadius: borderRadius,
                                    borderColor: isMinimal ? undefined : theme.secondary_color,
                                    borderLeftWidth: isGlass || isMinimal ? 0 : 4
                                }}
                            >
                                <h3
                                    className={`text-sm mb-2 ${isGlass ? 'text-white' : ''}`}
                                    style={{
                                        fontFamily: sp.fonts.h2.family,
                                        fontWeight: sp.fonts.h2.weight
                                    }}
                                >
                                    {diff.title}
                                </h3>
                                <p className={`text-xs ${isGlass ? 'text-white/70' : 'opacity-70'}`}>{diff.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Testimonials */}
            {features.show_testimonials && (
                <section className="p-8 border-t border-gray-100">
                    <h2
                        className="text-center text-lg mb-6"
                        style={{
                            color: theme.primary_color,
                            fontFamily: sp.fonts.h2.family,
                            fontWeight: sp.fonts.h2.weight
                        }}
                    >
                        O Que Nossos Clientes Dizem
                    </h2>
                    <div className="max-w-6xl mx-auto">
                        <TestimonialSlider
                            testimonials={content.testimonials_list}
                            settings={content.testimonial_settings}
                        />
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="mt-auto p-6 text-center text-white space-y-4" style={{ backgroundColor: theme.primary_color }}>
                <div>
                    <h3
                        className="text-lg"
                        style={{
                            fontFamily: sp.fonts.h2.family,
                            fontWeight: sp.fonts.h2.weight
                        }}
                    >
                        {profile.name}
                    </h3>
                    <p className="text-white/60 text-xs">{profile.oab}</p>
                </div>
                <div className="flex justify-center gap-4 text-xs opacity-80">
                    <span className="flex items-center gap-1"><Phone size={12} /> (00) 0000-0000</span>
                    {features.show_map && <span className="flex items-center gap-1"><MapPin size={12} /> {profile.city}</span>}
                </div>
                <div className="text-[10px] text-white/40 pt-4 border-t border-white/10">
                    © {new Date().getFullYear()} Todos os direitos reservados.
                    <br />
                    <a href="https://agenciajuri.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors mt-2 inline-block">
                        Desenvolvido por Agência Juri
                    </a>
                </div>
            </footer>
        </div>
    );
}
