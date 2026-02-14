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

    // 3. Generate Blob
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
