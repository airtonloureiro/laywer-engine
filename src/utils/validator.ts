import type { LawyerProjectData, ValidationState, ValidationStatus } from '../types/schema';

export function validateProject(data: LawyerProjectData): ValidationState {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 1. FAIL if missing required fields (Schema Validation)
    if (!data.config.layout_mode) errors.push("Modo de Layout é obrigatório.");
    if (!data.config.project_slug) errors.push("Slug do Projeto é obrigatório.");
    if (!data.profile.name) errors.push("Nome do Advogado é obrigatório.");
    if (!data.profile.oab) errors.push("OAB é obrigatória.");
    if (!data.profile.city) errors.push("Cidade é obrigatória.");
    if (!data.profile.main_practice_area) errors.push("Área de Atuação é obrigatória.");

    // 2. FAIL if Conversion is invalid
    if (data.conversion.primary_action.type === 'WHATSAPP') {
        if (!data.conversion.primary_action.phone_e164) {
            errors.push("Telefone WhatsApp (E.164) é obrigatório.");
        }
    }

    // 3. FAIL if Multi-Image empty (when using object)
    if (data.images.hero_bg && typeof data.images.hero_bg === 'object' && 'urls' in data.images.hero_bg) {
        if (data.images.hero_bg.urls.length === 0) {
            errors.push("Carrossel de Hero deve ter pelo menos 1 imagem.");
        }
    }

    // 4. WARN if Anti-Duplication fields missing
    if (!data.config.variation?.style_pack_id) warnings.push("Pacote de Estilo não selecionado (risco de duplicação).");
    if (!data.config.positioning?.angle) warnings.push("Ângulo de Venda não definido.");
    if (!data.config.positioning?.target_audience) warnings.push("Público Alvo não definido.");
    if (!data.config.positioning?.tone) warnings.push("Tom de Voz não definido.");

    // 5. WARN if Intelligence missing
    if (!data.intelligence.gtm_id && !data.intelligence.pixel_id) {
        warnings.push("Sem GTM ou Pixel configurado (Analytics desligado).");
    }

    // Determine Status
    let status: ValidationStatus = 'PASS';
    if (warnings.length > 0) status = 'WARN';
    if (errors.length > 0) status = 'FAIL';

    return { status, errors, warnings };
}
