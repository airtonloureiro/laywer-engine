import type { LayoutMode } from '../types/schema';

export interface LawyerTemplate {
    id: string;
    name: string;
    description: string;
    layoutMode: LayoutMode;
    style: {
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        textColor: string;
        fontFamily?: string;
        borderRadius?: string;
    };
    structure?: {
        heroVariant?: 'center' | 'split_left' | 'split_right';
        sectionOrder?: string[]; // e.g. ['header', 'hero', 'stats', 'about', 'differentials', 'testimonials', 'footer']
        aboutVariant?: 'image_left' | 'image_right' | 'stacked';
        featuresVariant?: 'grid' | 'list' | 'carousel';
        cardStyle?: 'default' | 'glass' | 'border_minimal';
        buttonStyle?: 'rounded' | 'square' | 'pill';
    };
    promptRules: string; // Specific instructions for the AI generator
}

export const LAWYER_TEMPLATES: LawyerTemplate[] = [
    // --- CLASSIC_LP TEMPLATES ---
    {
        id: 'authority_classic',
        name: '🏛️ Autoridade Clássica',
        description: 'Tradicional. Hero centralizado, layout espaçoso. Foco em imagem institucional.',
        layoutMode: 'CLASSIC_LP',
        style: {
            primaryColor: '#1e3a8a',
            secondaryColor: '#ca8a04',
            backgroundColor: '#ffffff',
            textColor: '#1f2937',
            borderRadius: '4px',
            fontFamily: 'Playfair Display'
        },
        structure: {
            heroVariant: 'center',
            sectionOrder: ['header', 'hero', 'about', 'differentials', 'testimonials', 'footer'],
            aboutVariant: 'image_left',
            featuresVariant: 'grid',
            cardStyle: 'default',
            buttonStyle: 'rounded'
        },
        promptRules: `ESTILO: CLÁSSICO E SÓBRIO.
        - Use fontes serifadas para títulos.
        - Layout espaçoso, foco em credibilidade.
        - Hero Section: Texto centralizado sobre imagem de fundo.
        - Ordem: Hero -> Sobre -> Diferenciais.`
    },
    {
        id: 'modern_conversion',
        name: '✨ Moderno (Foco Conversão)',
        description: 'Layout dividido (Split). Hero com foto à direita e texto/CTA à esquerda. Ideal para captura.',
        layoutMode: 'CLASSIC_LP',
        style: {
            primaryColor: '#0f172a',
            secondaryColor: '#2563eb', // Bright Blue
            backgroundColor: '#f8fafc',
            textColor: '#0f172a',
            borderRadius: '12px',
            fontFamily: 'Inter'
        },
        structure: {
            heroVariant: 'split_left',
            sectionOrder: ['header', 'hero', 'differentials', 'testimonials', 'about', 'footer'], // Proof before About
            aboutVariant: 'stacked',
            featuresVariant: 'list',
            cardStyle: 'border_minimal',
            buttonStyle: 'pill'
        },
        promptRules: `ESTILO: MODERNO E CLEAN.
        - Use fontes sans-serif geométricas (Inter).
        - Hero Section: Layout SPLIT (Texto esquerda, Imagem direita).
        - PROVA SOCIAL PRIMEIRO: Mostre diferenciais e depoimentos antes do "Sobre".`
    },
    {
        id: 'dark_premium',
        name: '🌑 Dark Premium',
        description: 'Sofisticado e exclusivo. Fundo escuro com cards estilo "Glassmorphism".',
        layoutMode: 'CLASSIC_LP',
        style: {
            primaryColor: '#d4af37',
            secondaryColor: '#e5e7eb',
            backgroundColor: '#111827',
            textColor: '#f3f4f6',
            borderRadius: '8px',
            fontFamily: 'Cinzel'
        },
        structure: {
            heroVariant: 'center',
            sectionOrder: ['header', 'hero', 'differentials', 'about', 'testimonials', 'footer'],
            aboutVariant: 'image_right',
            featuresVariant: 'grid',
            cardStyle: 'glass',
            buttonStyle: 'square'
        },
        promptRules: `ESTILO: DARK MODE PREMIUM.
        - Fundo Escuro (#111827).
        - Detalhes dravos (#d4af37).
        - Efeito Glassmorphism (fundo translúcido) nos cards.
        - Estrutura de luxo.`
    },

    // --- FUNNEL_QUIZ TEMPLATES ---
    {
        id: 'funnel_hard_sell',
        name: '🚀 Hard Sell (Urgência)',
        description: 'Fundo vermelho/preto. Gatilhos mentais de escassez e urgência.',
        layoutMode: 'FUNNEL_QUIZ',
        style: {
            primaryColor: '#dc2626',
            secondaryColor: '#000000',
            backgroundColor: '#ffffff',
            textColor: '#111827',
            borderRadius: '6px'
        },
        structure: {
            heroVariant: 'center',
            buttonStyle: 'rounded'
        },
        promptRules: `ESTILO: HARD SELL (URGÊNCIA).
        - Cores vibrantes (Vermelho) para CTA.
        - Copywriting agressivo.
        - Elementos piscantes ou de destaque para o botão.`
    },
    {
        id: 'funnel_soft_trust',
        name: '🤝 Soft Trust (Consultivo)',
        description: 'Mais leve e acolhedor. Foco em passar segurança antes de pedir a ação.',
        layoutMode: 'FUNNEL_QUIZ',
        style: {
            primaryColor: '#2563eb',
            secondaryColor: '#1e40af',
            backgroundColor: '#eff6ff',
            textColor: '#1e293b',
            borderRadius: '16px'
        },
        structure: {
            heroVariant: 'split_left',
            buttonStyle: 'pill'
        },
        promptRules: `ESTILO: SOFT SELL (CONFIANÇA).
        - Tons de azul e branco.
        - Sem agressividade visual.
        - Foco na foto do advogado passando calma.`
    },

    // --- LINK_BIO TEMPLATES ---
    {
        id: 'bio_minimal',
        name: '📱 Bio Minimalista',
        description: 'Botões simples, foto central. Fundo sólido.',
        layoutMode: 'LINK_BIO_PRO',
        style: {
            primaryColor: '#000000',
            secondaryColor: '#ffffff',
            backgroundColor: '#f3f4f6',
            textColor: '#1f2937',
            borderRadius: '8px'
        },
        promptRules: `ESTILO: BIO LINK CLEAN.
        - Botões retangulares simples.
        - Fundo claro.`
    },
    {
        id: 'bio_gradient',
        name: '🌈 Bio Gradient',
        description: 'Fundo gradiente moderno, botões com efeito glass.',
        layoutMode: 'LINK_BIO_PRO',
        style: {
            primaryColor: '#ffffff',
            secondaryColor: '#ffffff',
            backgroundColor: '#4f46e5', // Indigo
            textColor: '#ffffff',
            borderRadius: '24px'
        },
        promptRules: `ESTILO: GRADIENT GLASS.
        - Fundo com gradiente roxo/azul.
        - Botões translúcidos (Glassmorphism).`
    }
];
