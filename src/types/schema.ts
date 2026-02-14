export type LayoutMode = 'CLASSIC_LP' | 'FUNNEL_QUIZ' | 'LINK_BIO_PRO';
export type Archetype = 'Gladiador' | 'Estrategista' | 'Conciliador';

export type ValidationStatus = 'PASS' | 'WARN' | 'FAIL';

export interface ValidationState {
    status: ValidationStatus;
    errors: string[];
    warnings: string[];
}

export interface LawyerConfig {
    layout_mode: LayoutMode;
    project_slug: string;
    template_id?: string;
    variation?: {
        seed: string;
        style_pack_id: 'sp01' | 'sp02' | 'sp03';
    };
    positioning?: {
        angle: 'seguranca_juridica' | 'rapidez' | 'alto_padrao' | 'consultivo' | 'defesa_firme';
        target_audience: 'pais' | 'mulheres' | 'empresarios' | 'servidores' | 'geral';
        tone: 'formal' | 'moderno' | 'premium' | 'acolhedor';
    };
}

export interface LawyerProfile {
    name: string;
    oab: string;
    city: string;
    archetype: Archetype;
    main_practice_area: string;
}

export interface SeoLocal {
    target_neighborhoods: string[];
    main_keyword: string;
}

export interface Intelligence {
    gtm_id: string;
    pixel_id: string;
}

export interface ConversionAction {
    type: 'WHATSAPP' | 'CALENDLY' | 'FORM' | 'NONE';
    phone_e164?: string;
    prefill_message?: string;
    url?: string;
}

export interface Conversion {
    primary_action: ConversionAction;
    secondary_action: ConversionAction;
}

export type AnimationType = 'fade' | 'slide' | 'zoom';

export interface ImageConfig {
    urls: string[];
    animation: AnimationType;
}

export interface Images {
    profile_photo: string | null;
    hero_bg: string | ImageConfig | null;
    office_photo: string | ImageConfig | null;
    logo_url: string | null;
}

export interface Theme {
    primary_color: string;
    secondary_color: string;
    font_heading: string;
    background_color?: string;
    text_color?: string;
}

export interface Features {
    show_testimonials: boolean;
    show_map: boolean;
}

export interface Testimonial {
    name: string;
    text: string;
    role?: string;
    photo?: string;
}

export type TestimonialIcon = 'star' | 'quote' | 'check';
export type TestimonialLayout = 'image_top' | 'image_side' | 'image_right' | 'minimal';

export interface TestimonialSettings {
    icon: TestimonialIcon;
    layout: TestimonialLayout;
}

export interface Differential {
    title: string;
    description: string;
    icon?: string;
}

export interface Content {
    testimonials_list: Testimonial[];
    testimonial_settings?: TestimonialSettings;
    differentials_list: Differential[];
}

export interface LawyerProjectData {
    schema_version: string;
    generated_at?: string;
    locale: string;
    templateId?: string; // Legacy support, moving to config.template_id
    style_config?: {
        borderRadius?: string;
        fontFamily?: string;
    };
    validation?: ValidationState;
    config: LawyerConfig;
    profile: LawyerProfile;
    seo_local: SeoLocal;
    intelligence: Intelligence;
    conversion: Conversion;
    images: Images;
    theme: Theme;
    features: Features;
    content: Content;
}
