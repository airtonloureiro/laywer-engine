export type StylePackId = 'sp01' | 'sp02' | 'sp03';

interface FontConfig {
    family: string;
    weight: number;
}

interface StylePackConfig {
    label: string;
    fonts: {
        body: FontConfig;
        h1: FontConfig;
        h2: FontConfig;
        cta: FontConfig;
    };
}

export const STYLE_PACKS: Record<StylePackId, StylePackConfig> = {
    sp01: {
        label: 'Institucional Clássico',
        fonts: {
            body: { family: 'Inter', weight: 400 },
            h1: { family: 'Fraunces', weight: 600 },
            h2: { family: 'Inter', weight: 600 },
            cta: { family: 'Inter', weight: 700 }
        }
    },
    sp02: {
        label: 'Moderno Conversão',
        fonts: {
            body: { family: 'Inter', weight: 400 },
            h1: { family: 'Space Grotesk', weight: 600 },
            h2: { family: 'Space Grotesk', weight: 500 },
            cta: { family: 'Inter', weight: 700 } // Defaulting CTA to Inter for readability
        }
    },
    sp03: {
        label: 'Minimal Premium',
        fonts: {
            body: { family: 'Inter', weight: 400 },
            h1: { family: 'Inter', weight: 700 }, // Bold Inter for Premium
            h2: { family: 'Inter', weight: 600 },
            cta: { family: 'Inter', weight: 700 }
        }
    }
};

export function getStylePack(id?: string): StylePackConfig {
    // Default to sp01 if invalid or missing
    return STYLE_PACKS[(id as StylePackId) || 'sp01'] || STYLE_PACKS['sp01'];
}
