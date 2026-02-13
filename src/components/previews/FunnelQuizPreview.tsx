import type { LawyerProjectData } from '../../types';
import { ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { Carousel } from '../Carousel';
import { TestimonialSlider } from '../TestimonialSlider';

interface PreviewProps {
    data: LawyerProjectData;
}

export function FunnelQuizPreview({ data }: PreviewProps) {
    const { profile, theme, images } = data;

    return (
        <div className="bg-white w-full min-h-[800px] flex flex-col font-sans text-sm">
            {/* NO Header Menu for High Conversion */}

            {/* Hero - Full Height Style */}
            <section
                className="relative flex-1 min-h-[500px] flex flex-col items-center justify-center text-center p-6 overflow-hidden"
            >
                {/* Background Carousel */}
                <div className="absolute inset-0 z-0">
                    <Carousel
                        images={images.hero_bg}
                        alt="Background Hero"
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 z-10 transition-colors"></div>
                </div>

                <div className="relative z-20 flex flex-col items-center">
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full mb-6 inline-flex items-center gap-2 px-4 border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-white text-[10px] uppercase tracking-wide font-bold">Plantão 24h em {profile.city}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-white leading-tight max-w-lg mb-6 drop-shadow-lg">
                        Precisa de um advogado especialista em <span className="text-yellow-400">{profile.main_practice_area}</span>?
                    </h1>

                    <p className="text-gray-200 text-sm max-w-md mb-8 leading-relaxed">
                        Não tome nenhuma decisão antes de falar conosco. Proteja seus direitos agora mesmo com quem entende do assunto.
                    </p>

                    <button
                        className="group relative overflow-hidden rounded-full font-bold text-white shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] transition-all hover:scale-105"
                        style={{ backgroundColor: theme.secondary_color }}
                    >
                        <div className="px-8 py-4 flex items-center gap-3 text-base">
                            FALAR COM ESPECIALISTA
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="absolute inset-0 rounded-full ring-2 ring-white/20"></div>
                    </button>

                    <div className="mt-8 flex items-center justify-center gap-6 text-gray-400 text-xs">
                        <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-400" /> Sigilo Absoluto</div>
                        <div className="flex items-center gap-1.5"><Clock size={14} className="text-green-400" /> Resposta Rápida</div>
                    </div>
                </div>
            </section>

            {/* Authority Section (Below Fold) */}
            <section className="bg-white py-12 px-6">
                <div className="max-w-md mx-auto text-center space-y-4">
                    <img
                        src={images.profile_photo || undefined}
                        alt={profile.name}
                        className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-xl object-cover"
                    />
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">{profile.name}</h3>
                        <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">{profile.oab}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 text-left mt-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div className="flex gap-3">
                            <CheckCircle className="text-green-600 shrink-0" size={16} />
                            <p className="text-xs text-gray-600">Especialista em casos complexos de {profile.main_practice_area}.</p>
                        </div>
                        <div className="flex gap-3">
                            <CheckCircle className="text-green-600 shrink-0" size={16} />
                            <p className="text-xs text-gray-600">Atendimento personalizado e estratégico.</p>
                        </div>
                        <div className="flex gap-3">
                            <CheckCircle className="text-green-600 shrink-0" size={16} />
                            <p className="text-xs text-gray-600">Milhares de reais recuperados para clientes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials - Crucial for Conversion */}
            {data.features.show_testimonials && (
                <section className="bg-gray-50 py-12 px-6 border-t border-gray-200">
                    <div className="max-w-lg mx-auto text-center mb-8">
                        <h2 className="text-xl font-black text-gray-900 mb-2">Histórias de Sucesso</h2>
                        <p className="text-sm text-gray-600">Veja o que quem já contratou tem a dizer.</p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <TestimonialSlider
                            testimonials={images.logo_url ? data.content.testimonials_list : data.content.testimonials_list}
                            settings={data.content.testimonial_settings}
                        />
                    </div>
                </section>
            )}

            <footer className="bg-gray-900 text-gray-600 text-[10px] text-center p-4">
                {profile.name} © {new Date().getFullYear()} - Todos os direitos reservados.
                <br />
                <a href="https://agenciajuri.com.br" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity mt-1 inline-block">
                    Desenvolvido por Agência Juri
                </a>
            </footer>
        </div>
    );
}
