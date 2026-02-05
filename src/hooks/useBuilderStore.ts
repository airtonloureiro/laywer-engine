import { create } from 'zustand';
import type { LawyerProjectData, LayoutMode } from '../types/schema';

interface BuilderState {
    data: LawyerProjectData;
    // Actions
    updateConfig: (patch: Partial<LawyerProjectData['config']>) => void;
    updateProfile: (patch: Partial<LawyerProjectData['profile']>) => void;
    updateSeo: (patch: Partial<LawyerProjectData['seo_local']>) => void;
    updateIntelligence: (patch: Partial<LawyerProjectData['intelligence']>) => void;
    updateConversion: (patch: Partial<LawyerProjectData['conversion']>) => void;
    updateImages: (patch: Partial<LawyerProjectData['images']>) => void;
    updateTheme: (patch: Partial<LawyerProjectData['theme']>) => void;
    updateFeatures: (patch: Partial<LawyerProjectData['features']>) => void;
    updateContent: (patch: Partial<LawyerProjectData['content']>) => void;
    // Helpers
    setLayoutMode: (mode: LayoutMode) => void;
    reset: () => void;
}

const DEFAULT_DATA: LawyerProjectData = {
    config: {
        layout_mode: 'CLASSIC_LP',
        project_slug: 'nome-projeto-exemplo'
    },
    profile: {
        name: 'Dr. Nome do Advogado',
        oab: 'OAB/SP 000000',
        city: 'São Paulo - SP',
        archetype: 'Estrategista',
        main_practice_area: 'Direito Civil'
    },
    seo_local: {
        target_neighborhoods: ['Centro', 'Zona Sul'],
        main_keyword: 'Advogado Especialista em Divórcio'
    },
    intelligence: {
        gtm_id: '',
        pixel_id: ''
    },
    conversion: {
        primary_action_url: 'https://wa.me/5511999999999'
    },
    images: {
        profile_photo: 'https://placehold.co/400x400/1e293b/ffffff?text=Foto+Perfil',
        hero_bg: 'https://placehold.co/1920x1080/0f172a/ffffff?text=Hero+Background',
        office_photo: 'https://placehold.co/800x600/334155/ffffff?text=Escritorio',
        logo_url: 'https://placehold.co/200x80/transparent/000000?text=LOGO'
    },
    theme: {
        primary_color: '#0f172a',
        secondary_color: '#c2410c',
        font_heading: 'Serif'
    },
    features: {
        show_testimonials: true,
        show_map: false
    },
    content: {
        testimonials_list: [
            {
                name: "Cliente Exemplo",
                text: "Excelente profissional, resolveu meu caso rapidamente."
            }
        ],
        differentials_list: [
            {
                title: "Atendimento 24h",
                description: "Estamos disponíveis sempre que você precisar."
            }
        ]
    }
};

export const useBuilderStore = create<BuilderState>((set) => ({
    data: DEFAULT_DATA,

    updateConfig: (patch) => set((state) => ({
        data: { ...state.data, config: { ...state.data.config, ...patch } }
    })),
    updateProfile: (patch) => set((state) => ({
        data: { ...state.data, profile: { ...state.data.profile, ...patch } }
    })),
    updateSeo: (patch) => set((state) => ({
        data: { ...state.data, seo_local: { ...state.data.seo_local, ...patch } }
    })),
    updateIntelligence: (patch) => set((state) => ({
        data: { ...state.data, intelligence: { ...state.data.intelligence, ...patch } }
    })),
    updateConversion: (patch) => set((state) => ({
        data: { ...state.data, conversion: { ...state.data.conversion, ...patch } }
    })),
    updateImages: (patch) => set((state) => ({
        data: { ...state.data, images: { ...state.data.images, ...patch } }
    })),
    updateTheme: (patch) => set((state) => ({
        data: { ...state.data, theme: { ...state.data.theme, ...patch } }
    })),
    updateFeatures: (patch) => set((state) => ({
        data: { ...state.data, features: { ...state.data.features, ...patch } }
    })),
    updateContent: (patch) => set((state) => ({
        data: { ...state.data, content: { ...state.data.content, ...patch } }
    })),

    setLayoutMode: (mode) => set((state) => ({
        data: { ...state.data, config: { ...state.data.config, layout_mode: mode } }
    })),

    reset: () => set({ data: DEFAULT_DATA })
}));
