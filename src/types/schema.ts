export type LayoutMode = 'CLASSIC_LP' | 'FUNNEL_QUIZ' | 'LINK_BIO_PRO';
export type Archetype = 'Gladiador' | 'Estrategista' | 'Conciliador';

export interface LawyerConfig {
    layout_mode: LayoutMode;
    project_slug: string;
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

export interface Conversion {
    primary_action_url: string;
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
