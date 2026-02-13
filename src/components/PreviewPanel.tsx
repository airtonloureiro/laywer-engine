import { useState } from 'react';
import { useBuilderStore } from '../hooks/useBuilderStore';
import { ClassicLPPreview } from './previews/ClassicLPPreview';
import { FunnelQuizPreview } from './previews/FunnelQuizPreview';
import { LinkBioPreview } from './previews/LinkBioPreview';
import { Eye, Code, Smartphone, Monitor } from 'lucide-react';

export function PreviewPanel() {
    const { data } = useBuilderStore();
    const [viewMode, setViewMode] = useState<'visual' | 'json'>('visual');
    const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

    const renderPreview = () => {
        switch (data.config.layout_mode) {
            case 'CLASSIC_LP':
                return <ClassicLPPreview data={data} />;
            case 'FUNNEL_QUIZ':
                return <FunnelQuizPreview data={data} />;
            case 'LINK_BIO_PRO':
                return <LinkBioPreview data={data} />;
            default:
                return <div className="p-4 text-center text-gray-400">Layout Select not recognized</div>;
        }
    };

    // Force mobile view for LinkInBio
    const effectiveDeviceMode = data.config.layout_mode === 'LINK_BIO_PRO' ? 'mobile' : deviceMode;

    return (
        <div className="sticky top-24 space-y-4">
            {/* Header Controls */}
            <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setViewMode('visual')}
                        className={`p-2 rounded-md transition-colors ${viewMode === 'visual' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        title="Visual Preview"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('json')}
                        className={`p-2 rounded-md transition-colors ${viewMode === 'json' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        title="JSON Data"
                    >
                        <Code size={18} />
                    </button>
                </div>

                {viewMode === 'visual' && (
                    <div className="flex items-center gap-2 border-l border-gray-200 pl-2">
                        <button
                            onClick={() => setDeviceMode('desktop')}
                            disabled={data.config.layout_mode === 'LINK_BIO_PRO'}
                            className={`p-2 rounded-md transition-colors ${effectiveDeviceMode === 'desktop' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'} ${data.config.layout_mode === 'LINK_BIO_PRO' ? 'opacity-30 cursor-not-allowed' : ''}`}
                            title="Desktop View"
                        >
                            <Monitor size={18} />
                        </button>
                        <button
                            onClick={() => setDeviceMode('mobile')}
                            className={`p-2 rounded-md transition-colors ${effectiveDeviceMode === 'mobile' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Mobile View"
                        >
                            <Smartphone size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* Preview Area */}
            <div className="bg-gray-100 rounded-xl border border-gray-200 h-[calc(100vh-12rem)] overflow-hidden relative flex items-center justify-center shadow-inner">

                {viewMode === 'json' ? (
                    <div className="absolute inset-0 overflow-auto p-4 bg-slate-900">
                        <pre className="font-mono text-xs text-green-400 leading-relaxed">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                ) : (
                    <div
                        className={`transition-all duration-300 bg-white shadow-2xl overflow-y-auto no-scrollbar
               ${effectiveDeviceMode === 'mobile'
                                ? 'w-[375px] h-[90%] rounded-[3rem] border-8 border-gray-800'
                                : 'w-full h-full rounded-none'
                            }
             `}
                    >
                        {/* If mobile, add a notch/island visual */}
                        {effectiveDeviceMode === 'mobile' && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-50"></div>
                        )}

                        {renderPreview()}
                    </div>
                )}
            </div>
        </div>
    );
}
