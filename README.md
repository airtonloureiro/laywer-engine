# Lawyer Engine

Este projeto é uma ferramenta desenvolvida para construir, customizar e exportar templates de landing pages focadas no nicho jurídico.

O objetivo é facilitar a criação de páginas de alta conversão para advogados, permitindo ajustes visuais e de conteúdo de forma rápida e prática.

## 🛠 Tecnologias Utilizadas

- **React** + **TypeScript**: Para a lógica e interface do usuário.
- **Vite**: Ferramenta de build rápida e servidor de desenvolvimento.
- **Tailwind CSS**: Para estilização moderna e responsiva.
- **Zod**: Validação de schemas e dados.
- **Zustand**: Gerenciamento de estado leve e eficiente.
- **JSZip**: Funcionalidade para exportar o projeto gerado como um arquivo ZIP.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento na sua máquina.

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada) instalado.

### 1. Instalar Dependências

Abra o terminal na pasta do projeto e execute o comando:

```bash
npm install
```

Este comando irá baixar e instalar todas as bibliotecas listadas no `package.json`.

### 2. Rodar Localmente

Para iniciar o servidor de desenvolvimento e visualizar o projeto no navegador:

```bash
npm run dev
```

Após rodar o comando, o terminal mostrará o endereço local (geralmente `http://localhost:5173`). Basta clicar no link ou colá-lo no seu navegador.

### 3. Gerar Build de Produção

Quando quiser gerar a versão final otimizada para deploy:

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `dist`.

---

Desenvolvido para **Agência Juri**.
