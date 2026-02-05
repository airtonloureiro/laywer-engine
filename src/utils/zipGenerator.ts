import JSZip from 'jszip';
import { AGENT_INSTRUCTIONS } from './agentPromptTemplate';
import type { LawyerProjectData } from '../types/schema';

export const generateProjectZip = async (data: LawyerProjectData) => {
    const zip = new JSZip();

    // 1. Add Configuration JSON
    zip.file('config.json', JSON.stringify(data, null, 2));

    // 2. Add AGENT.md Instructions
    const instructions = AGENT_INSTRUCTIONS.replace('{{LAYOUT_MODE}}', data.config.layout_mode);
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
