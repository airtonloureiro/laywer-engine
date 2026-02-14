export const AGENT_INSTRUCTIONS = `# Instruções para o Agente de Desenvolvimento (v6.7)

Você é um **Senior React Engineer** encarregado de construir uma Landing Page Jurídica de alta conversão.

## 📦 Conteúdo do Pacote
Este pacote contém:
1. \`config.json\`: A fonte da verdade com todos os dados.
2. \`/fonts\`: Pasta contendo a configuração de tipografia.
3. \`AGENT.md\`: Estas instruções.

## 📐 Modo de Layout: {{LAYOUT_MODE}}
**ATENÇÃO:** O design deve seguir estritamente o modo selecionado:

- **CLASSIC_LP**: Site institucional completo (Hero, Sobre, Áreas, Depoimentos, Footer).
- **FUNNEL_QUIZ**: Página focada em conversão única (Pergunta Grande + Botão Gigante). Menu deve ser removido.
- **LINK_BIO_PRO**: Cartão digital mobile-first. Lista vertical de botões.

## 🎨 Regras Visuais Específicas (Template)
{{TEMPLATE_RULES}}

## ✒️ Tipografia & Estilo
- **Fontes**: Arquivos de configuração estão na pasta \`/fonts\`.
  - Importe \`fonts/fonts.css\` no seu \`index.css\` ou entry point.
  - O arquivo já contém os @imports corretos do Google Fonts para este projeto.
  - Use a fonte principal definida em \`data.style_config.fontFamily\`.
- **Cores**: Use estritamente \`theme.primary_color\` e \`theme.secondary_color\`.
- **Bordas**: Use \`style_config.borderRadius\`.

## 🛡️ Privacidade (Consentimento) - CRÍTICO
O projeto exige conformidade com LGPD.
1. **Biblioteca**: Use \`react-cookie-consent\`.
2. **Configuração**: Leia \`data.privacy.consent\`.
3. **Regra de Ouro (Scripts)**:
   - Scripts de GTM (\`data.intelligence.gtm_id\`) e Pixel (\`data.intelligence.pixel_id\`) **SÓ PODEM SER INJETADOS** se o usuário aceitar a categoria 'analytics' ou 'marketing'.
   - Use o estado do consentimento para renderizar esses scripts condicionalmente.

## 📲 Sticky CTA & Stacking (Chain of Events)
Se \`data.conversion.sticky_cta.enabled\` for true:
1. Implemente um botão flutuante do WhatsApp (use \`react-whatsapp\` ou link direto).
2. **Posição**: Siga \`data.conversion.sticky_cta.position\` (ex: bottom-right).
3. **Stacking Inteligente**: 
   - O botão do WhatsApp **NÃO PODE** ficar sobre o Banner de Cookies.
   - Se o Banner estiver visível, o botão do WhatsApp deve ter um \`bottom offset\` maior (flutuar ACIMA do banner).
   - Quando o banner fechar, o botão desce suavemente.

## 🖼️ Imagens & Carrosséis
- O campo \`data.images.hero_bg\` pode ser uma string (URL única) OU um objeto \`{ urls: string[], animation: string }\`.
- Se for objeto com múltiplas URLs, implemente um **Carrossel de Fundo** (Fade/Slide).

## 🛠️ Stack Tecnológica
- React (Vite)
- Tailwind CSS
- Lucide Icons
- react-cookie-consent

## 📝 Tarefas
1. Inicialize um projeto React + Tailwind.
2. Instale dependências (\`react-cookie-consent\`, \`framer-motion\`).
3. Copie os assets (se houver links no JSON).
4. Importe a tipografia da pasta \`/fonts\`.
5. Implemente a página seguindo o \`layout_mode\` e as regras acima.

## 🚀 Como Validar
O resultado final deve ser um arquivo único ou projeto otimizado pronto para deploy no Netlify.

Boa sorte, Engenheiro.`;
