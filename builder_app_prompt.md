Papel

Atue como Senior Electron + React Developer. Você vai implementar o "Lawyer LP Engine", um app desktop para gerenciar projetos de landing pages jurídicas e exportar um JSON config que será consumido por um gerador de sites.

Prioridade máxima: o JSON exportado deve ser 100% compatível com enhanced_lawyer_template.json (referência absoluta).

Entradas (inputs)

TEMPLATE_JSON = conteúdo de enhanced_lawyer_template.json (fonte absoluta do schema, defaults e validação).

(Opcional) PROJECT_JSON existente (abrir projeto).

(Opcional) ASSETS_FOLDER do projeto local.

Saídas (outputs)

Aplicativo Electron+React funcional com:

Seletor de Layout (cards): CLASSIC_LP, FUNNEL_QUIZ, LINK_BIO_PRO

Editor de campos mapeado 1:1 do template

Live Preview Visual (aproximação real do site)

Export JSON com config.layout_mode e config.project_slug

Assets uploader que salva em /assets e atualiza o JSON com paths relativos

Export opcional: netlify.toml (SPA React).

Regras de Contrato (CRÍTICO)
1) Schema absoluto e versionamento

Você deve tratar o TEMPLATE_JSON como schema source of truth:

Cada campo vira um input.

Defaults devem ser os defaults exatos do template.

Campos obrigatórios vêm do objeto __validation (no template).

No JSON final salvo em disco, sempre incluir no topo:

{
  "schema_version": "6.6.0",
  "generated_at": "ISO-8601",
  "locale": "pt-BR",
  "config": {
    "layout_mode": "CLASSIC_LP|FUNNEL_QUIZ|LINK_BIO_PRO",
    "project_slug": "kebab-case",
    "template_id": "enum-do-layout-escolhido",
    "variation": {
      "seed": "project_slug",
      "style_pack_id": "sp01|sp02|sp03"
    },
    "positioning": {
      "angle": "seguranca_juridica|rapidez|alto_padrao|consultivo|defesa_firme",
      "target_audience": "pais|mulheres|empresarios|servidores|geral",
      "tone": "formal|moderno|premium|acolhedor"
    }
  },
  "...resto": "..."
}


Obs: mesmo que teu template atual não tenha template_id/variation/positioning ainda, o app deve suportar esses campos e persistir (o gerador futuro vai usar).

2) Anti “site igual” (obrigatório no editor)

O editor deve forçar (UI com selects):

config.template_id (derivado do layout ou selecionável)

config.variation.style_pack_id (sp01/sp02/sp03)

config.positioning.angle

config.positioning.target_audience

config.positioning.tone

Sem isso, o app deve mostrar warning de duplicação (“alto risco de sites parecidos”).

3) Regras de validação e estado do projeto

O app deve computar validation.status: PASS | WARN | FAIL

Deve manter:

"validation": {
  "status": "PASS|WARN|FAIL",
  "errors": [],
  "warnings": []
}


FAIL se faltar campo obrigatório do __validation.
WARN se:

GTM/Pixel vazios (ok, mas avisar)

imagens ausentes (usa placeholder, mas avisar)

positioning/variation não preenchidos

4) Conversão (WhatsApp/Calendly)

Não depender de URL “crua” como fonte única.
No JSON final, normalize para:

"conversion": {
  "primary_action": {
    "type": "WHATSAPP",
    "phone_e164": "+55XXXXXXXXXXX",
    "prefill_message": "..."
  },
  "secondary_action": {
    "type": "CALENDLY|FORM|NONE",
    "url": null
  }
}


Se usuário digitar wa.me/... no input, o app deve extrair e preencher phone_e164.

6) Autoridade & Confiança (V4 e além)
O schema agora suporta campos de alta conversão. O editor DEVE fornecer UI para:

profile.years_experience (number): Anos de atuação.
profile.regional_focus (string): "Nacional", "São Paulo e Região", etc.

content.process_steps (Array):
{ "title": "1. Análise", "description": "..." }

content.faq_list (Array):
{ "question": "...", "answer": "..." }

content.testimonial_settings.google_rating (number): Nota (ex: 4.9).
content.testimonial_settings.review_count (number): Qtd reviews.

content.stats (Object):
{ "enabled": true, "items": [{ label, value, suffix }] }
Implementar com animação "count-up" quando entrar na viewport via IntersectionObserver.

conversion.sticky_cta (Object):
{ "enabled": true, "position": "bottom-right|center|left", "animation": "pulse|bounce|shake", "animation_speed": "normal|slow|fast" }
IMPORTANTE: Utilizar a biblioteca 'react-floating-whatsapp' (ou similar) para implementar esta funcionalidade.
Não reinventar a roda. Instalar a dependência e configurar de acordo com os parâmetros (avatar, nome, mensagem, position).
Se a animação/velocidade não for suportada nativamente pela lib, injetar CSS customizado ou wrapper.

Regra de Ouro (UX/UI - Chain of Events):
O botão de CTA (WhatsApp) NÃO pode sobrepor o Banner de Cookies (Privacy Consent).
- Se a barra de cookies estiver visível, o botão do WhatsApp deve flutuar ACIMA dela (offset bottom).
- Ao aceitar/fechar os cookies, o botão deve deslizar suavemente (transition-all) para sua posição original.
- Isso previne cliques acidentais e prioriza o consentimento (Compliance) sem esconder a conversão.

features.show_security_badges (boolean): Selos de "Sigilo" e "OAB" no footer.

Certifique-se de salvar essas estruturas corretamente no JSON final.

Regras de UI

Toggle: “Imagem única / Carrossel”

Se carrossel: permitir add/remove/reorder imagens

Salvar paths relativos quando forem uploads locais

UI/UX — Estrutura do app
Sidebar

Projetos: Novo / Abrir / Salvar / Salvar como

Abas:

Geral

Marketing & SEO

Assets & Cores

Aba Conteúdo
Editor de Listas para:
- Process Steps (Como Funciona)
- FAQ (Perguntas Frequentes)
- Depoimentos (com Google Rating)
- Diferenciais

Editor de Perfil estendido (Anos de experiência, Foco Regional)

Deploy (opcional)

Aba Geral (foco da tarefa)
Nome do projeto
Slug (auto gerado kebab-case; editável)
Select Cards (Layout Mode):
CLASSIC_LP — Site Institucional Completo (ícone site)
FUNNEL_QUIZ — Página de Captura/Ads (ícone funil)
LINK_BIO_PRO — Cartão de Visita Digital (ícone mobile)
Seleção adicional (obrigatória p/ anti-duplicação):
style pack (sp01/sp02/sp03)
positioning angle / target_audience / tone

Aba Marketing & SEO
Bairros (tags input)
Endereço Completo (string) + Google Maps Embed URL (iframe logic)
GTM / Pixel (inputs; validar formato; se vazio => não renderizar script no preview)
Arquétipo (Gladiador/Estrategista/Conciliador)

Aba Assets & Cores
Uploads (auto-save em /assets)
Color pickers
Multi-imagens (carrosséis)

Live Preview Visual (obrigatório)
Substitui o preview JSON.

Regras do preview

Renderizar uma aproximação do site final dependendo do layout_mode:
CLASSIC_LP: hero (com badges de autoridade) + processo + FAQ + sticky CTA
FUNNEL_QUIZ: hero curto + prova + CTA + formulário/quiz placeholder + footer
LINK_BIO_PRO: card mobile + botões + mini provas + footer

Branding (obrigatório)

Footer: “Desenvolvido por Agência Juri” linkando para https://agenciajuri.com.br

Copyright dinâmico:

new Date().getFullYear()

Depoimentos avançados (obrigatório)
content.testimonial_settings controla:
icon: star (renderiza 5 estrelas), quote, check
layout: image_top, image_side, image_right, minimal
google_rating / review_count (exibe badge de prova social)

Carousel obrigatório:
Desktop: se depoimentos > 3
Mobile: se depoimentos > 1
Slider automático (autoplay) com pause on hover

Export / Persistência
JSON final gravado em disco
Sempre salvar o JSON completo
Atualizar paths de imagens para ./assets/...
Incluir generated_at atualizado

Deploy (opcional)

Botão “Gerar Config Netlify”:

criar netlify.toml SPA padrão na raiz do projeto

Requisitos técnicos

Electron + React (Vite recomendado)

Estado com store (Zustand ou Redux Toolkit)

Form builder baseado em schema: gerar inputs a partir do template (mapeamento 1:1)

Validação runtime: Zod (ou equivalente)

Sem inventar campos fora do template + extensões controladas (schema_version, generated_at, validation, config.template_id, config.variation, config.positioning, features.sticky_cta, content.process/faq)