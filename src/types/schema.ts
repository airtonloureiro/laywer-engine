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
    // Authority V4
    years_experience?: number;
    specializations?: string[]; // List of specific areas
    post_grad?: string[]; // List of degrees
    regional_focus?: string; // e.g., "Atendimento Nacional"
}

export interface SeoLocal {
    target_neighborhoods: string[];
    main_keyword: string;
    street_address?: string; // Full address for display
    map_embed_url?: string; // Google Maps Embed iframe src
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
    sticky_cta?: {
        enabled: boolean;
        position: CTAPosition;
        animation: CTAAnimation;
        animation_speed: AnimationSpeed;
    };
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

export type CTAPosition = 'bottom-left' | 'bottom-center' | 'bottom-right';
export type CTAAnimation = 'pulse' | 'bounce' | 'shake' | 'none';
export type AnimationSpeed = 'slow' | 'normal' | 'fast';

export interface Features {
    show_testimonials: boolean;
    show_map: boolean;
    show_security_badges?: boolean;
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
    google_rating?: number;
    review_count?: number;
}

export interface ProcessStep {
    title: string;
    description: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface Differential {
    title: string;
    description: string;
    icon?: string;
}

export interface StatItem {
    label: string;
    value: number;
    suffix?: string;
}

export interface Stats {
    enabled: boolean;
    items: StatItem[];
}

export interface Content {
    testimonials_list: Testimonial[];
    testimonial_settings?: TestimonialSettings;
    differentials_list: Differential[];
    process_steps?: ProcessStep[];
    faq_list?: FAQItem[];
    stats?: Stats;
}

export interface PrivacyConfig {
    consent: {
        enabled: boolean;
        provider: 'react-cookie-consent' | 'klaro' | 'osano' | 'custom';
        default: 'necessary_only' | 'opt_in' | 'opt_out';
        categories: string[];
        policy_url: string;
    };
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
    privacy: PrivacyConfig;
    conversion: Conversion;
    images: Images;
    theme: Theme;
    features: Features;
    content: Content;
}
