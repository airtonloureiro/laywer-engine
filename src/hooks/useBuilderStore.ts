import { create } from 'zustand';
import type { LawyerProjectData, LayoutMode } from '../types/schema';
import { LAWYER_TEMPLATES } from '../data/templates';

interface BuilderState {
    data: LawyerProjectData;
    // Actions
    updateConfig: (patch: Partial<LawyerProjectData['config']>) => void;
    updateProfile: (patch: Partial<LawyerProjectData['profile']>) => void;
    updateSeo: (patch: Partial<LawyerProjectData['seo_local']>) => void;
    updateIntelligence: (patch: Partial<LawyerProjectData['intelligence']>) => void;
    updatePrivacy: (patch: Partial<LawyerProjectData['privacy']>) => void;
    updateConversion: (patch: Partial<LawyerProjectData['conversion']>) => void;
    updateImages: (patch: Partial<LawyerProjectData['images']>) => void;
    updateTheme: (patch: Partial<LawyerProjectData['theme']>) => void;
    updateFeatures: (patch: Partial<LawyerProjectData['features']>) => void;
    updateContent: (patch: Partial<LawyerProjectData['content']>) => void;
    // Template
    applyTemplate: (templateId: string) => void;
    // Helpers
    setLayoutMode: (mode: LayoutMode) => void;
    setValidation: (validation: import('../types/schema').ValidationState) => void;
    reset: () => void;
}

const DEFAULT_DATA: LawyerProjectData = {
    schema_version: "6.6.0",
    locale: "pt-BR",
    validation: {
        status: 'WARN',
        errors: [],
        warnings: ['Projeto novo iniciado. Preencha os campos obrigatórios.']
    },
    config: {
        layout_mode: 'CLASSIC_LP',
        project_slug: 'meu-projeto-juridico',
        template_id: 'authority_classic',
        variation: {
            seed: 'meu-projeto-juridico',
            style_pack_id: 'sp01'
        },
        positioning: {
            angle: 'seguranca_juridica',
            target_audience: 'geral',
            tone: 'formal'
        }
    },
    profile: {
        name: 'Dr. Nome do Advogado',
        oab: 'OAB/SP 000000',
        city: 'São Paulo - SP',
        archetype: 'Estrategista',
        main_practice_area: 'Direito Civil',
        years_experience: 15,
        regional_focus: 'Atendimento Nacional'
    },
    seo_local: {
        target_neighborhoods: ['Centro', 'Bairro Nobre'],
        main_keyword: 'Advogado Especialista',
        street_address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
        map_embed_url: '' // Default empty, user must add
    },
    intelligence: {
        gtm_id: '',
        pixel_id: ''
    },
    privacy: {
        consent: {
            enabled: true,
            provider: 'react-cookie-consent',
            default: 'necessary_only',
            categories: ['necessary', 'analytics', 'marketing'],
            policy_url: '/politica-de-privacidade'
        }
    },
    conversion: {
        primary_action: {
            type: 'WHATSAPP',
            phone_e164: '',
            prefill_message: 'Olá, gostaria de agendar uma consulta.'
        },
        secondary_action: {
            type: 'NONE'
        },
        sticky_cta: {
            enabled: true,
            position: 'bottom-right',
            animation: 'pulse',
            animation_speed: 'normal'
        }
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
        font_heading: '' // Default to Style Pack
    },
    features: {
        show_testimonials: true,
        show_map: false,
        show_security_badges: true
    },
    content: {
        testimonials_list: [
            {
                name: "Maria Silva",
                text: "Profissional extremamente competente e atencioso. Recomendo muito!",
                role: "Empresária"
            },
            {
                name: "João Santos",
                text: "O Dr. resolveu meu caso com muita agilidade.",
                role: "Cliente - São Paulo"
            }
        ],
        testimonial_settings: {
            icon: 'star',
            layout: 'image_top',
            google_rating: 4.9,
            review_count: 124
        },
        differentials_list: [
            {
                title: "Atendimento 24h",
                description: "Estamos disponíveis sempre que você precisar."
            }
        ],
        process_steps: [
            { title: "1. Análise do Caso", description: "Entendemos sua situação detalhadamente." },
            { title: "2. Estratégia", description: "Definimos o melhor caminho jurídico." },
            { title: "3. Acompanhamento", description: "Você fica informado de cada passo." }
        ],
        faq_list: [
            { question: "Quanto custa a consulta?", answer: "Entre em contato para valores atualizados." },
            { question: "O atendimento é online?", answer: "Sim, atendemos em todo o Brasil digitalmente." }
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
    updatePrivacy: (patch) => set((state) => ({
        data: { ...state.data, privacy: { ...state.data.privacy, ...patch } }
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

    applyTemplate: (templateId) => set((state) => {
        // Find template by ID
        const template = LAWYER_TEMPLATES.find(t => t.id === templateId);
        if (!template) return state;

        return {
            data: {
                ...state.data,
                templateId: template.id,
                config: {
                    ...state.data.config,
                    layout_mode: template.layoutMode,
                    template_id: template.id // Sync config.template_id
                },
                style_config: {
                    borderRadius: template.style.borderRadius,
                    fontFamily: template.style.fontFamily
                },
                theme: {
                    ...state.data.theme,
                    primary_color: template.style.primaryColor,
                    secondary_color: template.style.secondaryColor,
                    background_color: template.style.backgroundColor,
                    text_color: template.style.textColor
                }
            }
        };
    }),

    setLayoutMode: (mode) => set((state) => ({
        data: { ...state.data, config: { ...state.data.config, layout_mode: mode } }
    })),

    setValidation: (validation) => set((state) => ({
        data: { ...state.data, validation }
    })),

    reset: () => set({ data: DEFAULT_DATA })
}));
