export const AGENT_INSTRUCTIONS = `# DIRETRIZES DE IMPLEMENTAÇÃO - PROJETO: {{LAYOUT_MODE}} (v7.1)

> **CONTEXTO:** Você é um Agente Inteligente operando dentro do ecossistema **Antigravity Kit**.

## 🛑 FASE 0: CARREGAMENTO DE CÉREBRO (OBRIGATÓRIO)

**ATENÇÃO:** Você está PROIBIDO de iniciar a implementação sem antes carregar o seu "Sistema Operacional".

1.  **🔍 Verificar Existência do .agent/**:
    - O diretório \`.agent/\` deve estar presente na raiz.
    - Se não estiver, **PARE** e solicite-o.

2.  **🧠 Ingerir Conhecimento (.agent)**:
    - Leia \`.agent/rules/GEMINI.md\` para entender as Leis Universais (Clean Code, Socratic Gate).
    - Leia \`.agent/agents/orchestrator.md\` para assumir a persona de Líder Técnico.
    - Identifique as Skills relevantes em \`.agent/skills/\` (ex: \`react-best-practices\`, \`tailwind-patterns\`).

3.  **📥 Carregar Fonte da Verdade (Projeto)**:
    - Leia \`config.json\` (Dados).
    - Leia \`/fonts\` (Tipografia).

**SÓ PROSSIGA APÓS ESTAR "CONECTADO" AO CÉREBRO (.AGENT).**

---

## 🎯 Objetivo da Missão
Desenvolver uma Landing Page Jurídica de alta performance utilizando os dados de \`config.json\` e a *expertise* carregada de \`.agent/\`.

## 📐 Layout & Estrutura (Modo: {{LAYOUT_MODE}})
Siga as regras definidas no JSON para o modo selecionado.
- **CLASSIC_LP**: Menu, Hero, Sobre, Diferenciais, Depoimentos, Footer.
- **FUNNEL_QUIZ**: Sem Menu, Hero de Conversão, Botão Gigante.
- **LINK_BIO_PRO**: Mobile-first, Lista de Links.

### Regras Visuais (Template)
{{TEMPLATE_RULES}}

---

## 🛠️ Requisitos Técnicos (Baseado em .agent/skills)

### 1. Tipografia (Local)
- Use a pasta \`/fonts\`. Importe \`fonts.css\`.
- Siga \`data.style_config.fontFamily\`.

### 2. Privacidade & Compliance (LGPD)
- Aplique a skill de privacidade/segurança.
- **Regra:** Scripts de tracking (GTM/Pixel) só carregam com consentimento ('marketing').
- Use \`react-cookie-consent\`.

### 3. UX: Sticky CTA & Stacking
- Implemente a lógica de "Chain of Events" (Botão WhatsApp flutua acima do Banner LGPD).
- Use animações suaves.

### 4. Imagens
- Suporte a Strings únicas ou Objetos de Carrossel em \`hero_bg\`.

---

## 🚀 Execução
1.  **Setup**: Vite + React + Tailwind.
2.  **Implementation**: Use as Skills do \`.agent\` para garantir qualidade (Clean Code, Performance).
3.  **Validation**: O código deve passar em lints e testes básicos.

Execute como o **Orchestrator**.`;

