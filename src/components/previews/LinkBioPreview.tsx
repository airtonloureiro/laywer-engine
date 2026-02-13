import type { LawyerProjectData } from '../../types';
import { MessageCircle, MapPin, Share2, Instagram, Facebook, Linkedin } from 'lucide-react';

interface PreviewProps {
    data: LawyerProjectData;
}

export function LinkBioPreview({ data }: PreviewProps) {
    const { profile, theme, images } = data;

    return (
        <div
            className="w-full min-h-[800px] flex flex-col items-center justify-start py-12 px-6 font-sans text-sm relative overflow-hidden"
            style={{
                backgroundColor: theme.primary_color,
                color: '#ffffff'
            }}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

            {/* Share Button (Top Right) */}
            <button className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Share2 size={16} className="text-white" />
            </button>

            {/* Profile Section */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4 mb-8 w-full max-w-xs">
                <div className="relative group cursor-pointer">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-200 blur"></div>
                    <img
                        src={images.profile_photo || undefined}
                        alt={profile.name}
                        className="relative w-28 h-28 rounded-full border-4 border-[#0f172a] object-cover shadow-2xl"
                    />
                </div>

                <div>
                    <h1 className="text-xl font-bold tracking-tight">{profile.name}</h1>
                    <p className="text-white/60 text-xs font-medium uppercase tracking-wider mt-1">{profile.main_practice_area}</p>
                    <div className="flex items-center justify-center gap-1 mt-2 text-white/40 text-[10px]">
                        <MapPin size={10} />
                        <span>{profile.city}</span>
                    </div>
                </div>
            </div>

            {/* Links Section */}
            <div className="w-full max-w-xs space-y-3 relative z-10">
                <button
                    className="w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    style={{
                        backgroundColor: '#25D366', // WhatsApp Green
                        color: '#ffffff'
                    }}
                >
                    <MessageCircle size={20} />
                    <span>Falar no WhatsApp</span>
                </button>

                <button
                    className="w-full py-3.5 px-6 rounded-xl font-medium bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all flex items-center justify-center group"
                >
                    <span>Agendar Consulta</span>
                </button>

                <button
                    className="w-full py-3.5 px-6 rounded-xl font-medium bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all flex items-center justify-center group"
                >
                    <span>Ver Site Oficial</span>
                </button>

                {/* Separator */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

                {/* Socials */}
                <div className="flex justify-center gap-4">
                    <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white">
                        <Instagram size={20} />
                    </a>
                    <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white">
                        <Facebook size={20} />
                    </a>
                    <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white">
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="mt-auto pt-12 text-center relative z-10">
                <p className="text-[10px] text-white/30 font-light">
                    {profile.oab}
                </p>
                <a href="https://agenciajuri.com.br" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/20 hover:text-white/40 transition-colors mt-2 block">
                    Desenvolvido por Agência Juri
                </a>
            </div>
        </div>
    );
}
