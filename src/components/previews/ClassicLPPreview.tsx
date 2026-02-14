import type { LawyerProjectData } from '../../types/schema';
import { Phone, MapPin, CheckCircle2, Star, Shield, Clock, Award } from 'lucide-react';
import { Carousel } from '../Carousel';
import { TestimonialSlider } from '../TestimonialSlider';
import { StatsSection } from '../StatsSection';
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
                                    {profile.oab} | {profile.name}
                                </p>

                                {/* Authority Badges */}
                                <div className="flex flex-wrap gap-3 my-4">
                                    {(profile.years_experience || 0) > 0 && (
                                        <div className="bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded flex items-center gap-2">
                                            <Clock size={12} className="text-yellow-400" />
                                            <span className="text-[10px] font-medium text-white/90">+{profile.years_experience} Anos de Experiência</span>
                                        </div>
                                    )}
                                </div>
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

                            {/* Authority Badges */}
                            <div className="flex flex-wrap justify-center gap-3 md:gap-6 my-6">
                                {(profile.years_experience || 0) > 0 && (
                                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded flex items-center gap-2">
                                        <Clock size={12} className="text-yellow-400" />
                                        <span className="text-[10px] font-medium text-white/90">+{profile.years_experience} Anos de Experiência</span>
                                    </div>
                                )}
                                <div className="bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded flex items-center gap-2">
                                    <Award size={12} className="text-yellow-400" />
                                    <span className="text-[10px] font-medium text-white/90">Especialista em {profile.main_practice_area}</span>
                                </div>
                            </div>
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

            {/* Stats Section */}
            {data.content.stats?.enabled && data.content.stats.items.length > 0 && (
                <StatsSection
                    items={data.content.stats.items}
                    theme={theme}
                    fontFamily={sp.fonts.h1.family}
                />
            )}

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

            {/* Testimonials & Social Proof */}
            {features.show_testimonials && (
                <section className="p-8 border-t border-gray-100 bg-gray-50/50">
                    <div className="text-center mb-8">
                        <h2
                            className="text-lg mb-2"
                            style={{
                                color: theme.primary_color,
                                fontFamily: sp.fonts.h2.family,
                                fontWeight: sp.fonts.h2.weight
                            }}
                        >
                            O Que Nossos Clientes Dizem
                        </h2>

                        {/* Google Rating Badge */}
                        {(content.testimonial_settings?.google_rating || 0) > 0 && (
                            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mt-2">
                                <div className="flex gap-0.5 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill="currentColor" className={i < Math.floor(content.testimonial_settings?.google_rating || 5) ? "" : "opacity-30"} />
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-gray-700">
                                    {content.testimonial_settings?.google_rating}
                                </span>
                                <span className="text-[10px] text-gray-500 border-l border-gray-200 pl-2 ml-1">
                                    {content.testimonial_settings?.review_count}+ avaliações no Google
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <TestimonialSlider
                            testimonials={content.testimonials_list}
                            settings={content.testimonial_settings}
                        />
                    </div>
                </section>
            )}

            {/* Process Steps (How it Works) */}
            {content.process_steps && content.process_steps.length > 0 && (
                <section className="p-8 md:p-12 bg-white">
                    <div className="text-center mb-10">
                        <h2
                            className="text-xl md:text-2xl mb-3"
                            style={{
                                color: theme.primary_color,
                                fontFamily: sp.fonts.h2.family,
                                fontWeight: sp.fonts.h2.weight
                            }}
                        >
                            Como Funciona o Atendimento
                        </h2>
                        <p className="opacity-60 text-xs md:text-sm">Passo a passo para a resolução do seu caso</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-0.5 bg-gray-100 -z-0"></div>

                        {content.process_steps.map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold mb-4 shadow-lg transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: theme.secondary_color }}
                                >
                                    {idx + 1}
                                </div>
                                <h3
                                    className="text-base font-bold mb-2"
                                    style={{ fontFamily: sp.fonts.h2.family }}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-xs text-gray-500 leading-relaxed max-w-xs px-4">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            {content.faq_list && content.faq_list.length > 0 && (
                <section className="p-8 md:p-16" style={{ backgroundColor: theme.background_color ? `${theme.background_color}fa` : '#f9fafb' }}>
                    <div className="max-w-3xl mx-auto">
                        <h2
                            className="text-center text-xl md:text-2xl mb-8"
                            style={{
                                color: theme.primary_color,
                                fontFamily: sp.fonts.h2.family,
                                fontWeight: sp.fonts.h2.weight
                            }}
                        >
                            Perguntas Frequentes
                        </h2>
                        <div className="space-y-3">
                            {content.faq_list.map((faq, idx) => (
                                <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="px-5 py-4 font-semibold text-gray-800 text-sm flex justify-between items-center cursor-pointer hover:bg-gray-50">
                                        <span>{faq.question}</span>
                                        <span className="text-gray-300 transform rotate-45">+</span>
                                        {/* Note: Ideally this would be an interactive accordion, but for preview check static is fine or simple toggle. 
                                             Let's keep it static open or simulated for now to avoid complex client state in preview if possible, 
                                             but `details` tag is a good native solution. */}
                                    </div>
                                    <div className="px-5 pb-4 text-xs text-gray-500 leading-relaxed border-t border-gray-50 bg-gray-50/30">
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Map Section */}
            {data.features.show_map && (
                <section className="py-12 bg-gray-50 border-t border-gray-200">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-8">
                            <h2
                                className="text-xl mb-2"
                                style={{
                                    color: theme.primary_color,
                                    fontFamily: sp.fonts.h2.family,
                                    fontWeight: sp.fonts.h2.weight
                                }}
                            >
                                Nossa Localização
                            </h2>
                            <p className="text-xs opacity-60">Venha nos fazer uma visita</p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
                                {data.seo_local.map_embed_url ? (
                                    <iframe
                                        src={data.seo_local.map_embed_url}
                                        width="100%"
                                        height="400"
                                        style={{ border: 0, borderRadius: '8px' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-[400px] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 gap-2">
                                        <MapPin size={48} className="opacity-20" />
                                        <span className="text-sm">Configure o Google Maps na aba Marketing & SEO</span>
                                    </div>
                                )}
                            </div>
                            {data.seo_local.street_address && (
                                <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 text-sm">
                                    <MapPin size={16} />
                                    <span>{data.seo_local.street_address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="mt-auto p-10 text-center text-white space-y-6" style={{ backgroundColor: theme.primary_color }}>
                <div>
                    <h3
                        className="text-xl mb-1"
                        style={{
                            fontFamily: sp.fonts.h2.family,
                            fontWeight: sp.fonts.h2.weight
                        }}
                    >
                        {profile.name}
                    </h3>
                    <p className="text-white/60 text-xs tracking-wider uppercase">{profile.oab}</p>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-xs opacity-80">
                    <span className="flex items-center justify-center gap-2"><Phone size={14} /> (00) 0000-0000</span>
                    {features.show_map && <span className="flex items-center justify-center gap-2"><MapPin size={14} /> {profile.city}</span>}
                    <span className="flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Atendimento {profile.regional_focus || 'Nacional'}</span>
                </div>

                {features.show_security_badges && (
                    <div className="flex justify-center gap-4 pt-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <div className="flex items-center gap-1.5 border border-white/20 px-3 py-1 rounded text-[10px]">
                            <Shield size={10} /> Sigilo Absoluto
                        </div>
                        <div className="flex items-center gap-1.5 border border-white/20 px-3 py-1 rounded text-[10px]">
                            <CheckCircle2 size={10} /> OAB Verificada
                        </div>
                    </div>
                )}

                <div className="text-[10px] text-white/30 pt-8 border-t border-white/10">
                    © {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.
                    <br />
                    <a href="https://agenciajuri.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors mt-2 inline-block">
                    </a>
                </div>
            </footer>


        </div>
    );
}
