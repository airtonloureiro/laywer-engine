import type { LawyerProjectData } from '../../types';
import { Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Carousel } from '../Carousel';
import { TestimonialSlider } from '../TestimonialSlider';

interface PreviewProps {
    data: LawyerProjectData;
}

export function ClassicLPPreview({ data }: PreviewProps) {
    const { profile, theme, images, content, features } = data;

    return (
        <div className="bg-white w-full min-h-[800px] flex flex-col font-sans text-sm shadow-sm">
            {/* Header */}
            <header className="p-4 flex justify-between items-center border-b border-gray-100" style={{ backgroundColor: '#ffffff' }}>
                <div className="font-bold text-lg" style={{ color: theme.primary_color }}>
                    {images.logo_url ? <img src={images.logo_url} alt="Logo" className="h-8 object-contain" /> : 'LOGO'}
                </div>
                <nav className="hidden md:flex gap-4 text-xs font-medium text-gray-600">
                    <span>Home</span>
                    <span>Sobre</span>
                    <span>Áreas</span>
                    <span>Contato</span>
                </nav>
            </header>

            {/* Hero */}
            <section
                className="relative h-64 flex items-center justify-center text-center p-6 bg-cover bg-center overflow-hidden"
            >
                {/* Background Carousel */}
                <div className="absolute inset-0 z-0">
                    <Carousel
                        images={images.hero_bg}
                        alt="Background Hero"
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/70 z-10"></div>
                </div>

                <div className="text-white space-y-3 z-20 max-w-lg relative">
                    <span className="uppercase tracking-widest text-[10px] font-semibold bg-white/20 px-2 py-1 rounded">
                        {profile.city}
                    </span>
                    <h1 className="text-2xl font-bold font-serif leading-tight">
                        Defesa Especializada em {profile.main_practice_area}
                    </h1>
                    <p className="text-white/80 text-xs">
                        {profile.oab} | {profile.name}
                    </p>
                    <button
                        className="px-6 py-2 rounded font-medium text-white shadow-lg transform scale-90 mt-4"
                        style={{ backgroundColor: theme.secondary_color }}
                    >
                        Falar com Especialista
                    </button>
                </div>
            </section>

            {/* About */}
            <section className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                    <h2 className="text-lg font-bold" style={{ color: theme.primary_color }}>Sobre o Escritório</h2>
                    <p className="text-gray-600 text-xs leading-relaxed">
                        Com anos de experiência e atuação focada em resultados, oferecemos um atendimento humanizado e estratégico para resolver seus problemas jurídicos com a máxima eficiência.
                    </p>
                    <div className="flex gap-2 text-xs font-medium text-gray-700">
                        <div className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-600" /> Ética</div>
                        <div className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-600" /> Transparência</div>
                    </div>
                </div>
                <div className="h-32 bg-gray-100 rounded-lg overflow-hidden relative">
                    <Carousel
                        images={images.office_photo}
                        alt="Escritório"
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                </div>
            </section>

            {/* Differentials */}
            <section className="bg-gray-50 p-8">
                <div className="text-center mb-6">
                    <h2 className="text-lg font-bold" style={{ color: theme.primary_color }}>Por Que Nos Escolher?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {content.differentials_list.map((diff, i) => (
                        <div key={i} className="bg-white p-4 rounded shadow-sm border-l-4 border-blue-600">
                            <h3 className="font-bold text-sm mb-1">{diff.title}</h3>
                            <p className="text-xs text-gray-500">{diff.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            {features.show_testimonials && (
                <section className="p-8 border-t border-gray-100">
                    <h2 className="text-center text-lg font-bold mb-6" style={{ color: theme.primary_color }}>
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
                    <h3 className="font-serif font-bold text-lg">{profile.name}</h3>
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
