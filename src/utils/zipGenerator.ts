import JSZip from 'jszip';
import { AGENT_INSTRUCTIONS } from './agentPromptTemplate';
import type { LawyerProjectData } from '../types/schema';
import { LAWYER_TEMPLATES } from '../data/templates';

export const generateProjectZip = async (data: LawyerProjectData) => {
    const zip = new JSZip();

    // 1. Add Configuration JSON
    zip.file('config.json', JSON.stringify(data, null, 2));

    // 2. Add AGENT.md Instructions
    // Find the template logic
    const activeTemplate = LAWYER_TEMPLATES.find(t => t.id === data.templateId) || LAWYER_TEMPLATES[0];
    const rules = activeTemplate.promptRules || 'Siga as melhores práticas de UI/UX.';

    const instructions = AGENT_INSTRUCTIONS
        .replace('{{LAYOUT_MODE}}', data.config.layout_mode)
        .replace('{{TEMPLATE_RULES}}', rules);

    zip.file('AGENT.md', instructions);

    // 3. Add Fonts Folder
    const fontsFolder = zip.folder('fonts');
    if (fontsFolder) {
        // Generate Google Fonts URL based on Style Pack
        const stylePackId = data.config.variation?.style_pack_id || 'sp01';
        let cssContent = '/* Google Fonts Configuration */\n';

        // Map Style Packs to Import URLs
        const fontImports: Record<string, string> = {
            'sp01': '@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;400;600;700&family=Inter:wght@300;400;500;600;700&display=swap");',
            'sp02': '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap");',
            'sp03': '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");'
        };

        const importRule = fontImports[stylePackId] || fontImports['sp01'];

        cssContent += `${importRule}\n\n`;
        cssContent += `/* Usage:\n`;
        cssContent += `   Import this file at the top of your index.css:\n`;
        cssContent += `   @import './fonts/fonts.css';\n`;
        cssContent += `*/\n`;
        cssContent += `\n:root {\n`;
        cssContent += `  --font-heading: '${data.theme.font_heading || "Inter"}', sans-serif;\n`;
        cssContent += `  --font-body: 'Inter', sans-serif;\n`;
        cssContent += `}\n`;

        fontsFolder.file('fonts.css', cssContent);
        fontsFolder.file('README.md', '# Fonts\n\nEste projeto utiliza Google Fonts. O arquivo `fonts.css` contém os imports necessários.\n\nPara usar, importe-o no seu CSS principal.');
    }

    // 4. Generate Blob
    const blob = await zip.generateAsync({ type: 'blob' });
    return blob;
};

export const downloadZip = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
