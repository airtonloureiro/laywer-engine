# Prompt de Criação: Lawyer LP Engine (v3 - Multi-Layout)

Atue como um Senior Electron/React Developer. Preciso criar o **"Lawyer LP Engine"**, um Gerenciador Desktop de Landing Pages.

## 🎯 NOVIDADE DA VERSÃO 3
Adicionamos suporte a **Múltiplos Layouts**. O usuário pode escolher "Qual produto" quer gerar com os mesmos dados.

## 📋 SCHEMA DE DADOS (CRÍTICO)
Utilize o arquivo `enhanced_lawyer_template.json` como **referência absoluta** para criar **todos** os campos do formulário.
- **Validação:** Consulte o objeto `__validation` no JSON para saber quais campos são obrigatórios.
- **Defaults:** Se o usuário não preencher campos opcionais (imagem, features), utilize os valores exatos que estão no JSON (placeholders).
- Mapeie cada chave do JSON para um input correspondente na interface.

## 📂 UX & FLUXO
(Mesmo fluxo de Novo/Abrir projeto da v2).

## 📝 O EDITOR (Campos Atualizados)

### 1. Configurações do Projeto (Aba Geral)
- Nome do Projeto.
- **[Select Card] Modo de Layout**:
    - `CLASSIC_LP`: "Site Institucional Completo" (Ícone de Site).
    - `FUNNEL_QUIZ`: "Página de Captura/Ads" (Ícone de Funil).
    - `LINK_BIO_PRO`: "Cartão de Visita Digital" (Ícone de Mobile).

### 2. Marketing & SEO
- [Tags Input] Bairros.
- [Inputs] GTM/Pixel.
- [Select] Arquétipo (Gladiador/Estrategista/Conciliador).

### 3. Assets & Cores
- Uploads (com auto-save na pasta `/assets`).
- Color Pickers.

## 📦 LÓGICA DE EXPORTAÇÃO
Ao salvar, o JSON gerado deve incluir a chave `config.layout_mode` com a seleção do usuário.

```javascript
// Exemplo do JSON final gravado em disco
{
  "config": {
    "layout_mode": "FUNNEL_QUIZ", // <--- O Agente lê isso p/ decidir o layout
    "project_slug": "doutor-joao"
  },
  "profile": { ... },
  "images": { "profile_photo": "./assets/profile.jpg" ... }
}
```

## 🛠️ DEPLOY AUTOMÁTICO (Opcional - Aba Deploy)
Adicione um botão "Gerar Config Netlify".
- Ação: Criar arquivo `netlify.toml` na raiz do projeto com configurações padrão de React (SPA).
- Objetivo: Usuário arrasta a pasta pro Netlify e funciona.

## TAREFA
Implemente a interface principal focando no **Seletor de Layout** (cards visuais selecionáveis) e na estruturação correta do objeto `config` no JSON final.
