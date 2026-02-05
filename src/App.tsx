// React imports removed as they are unused
import { LayoutSelector } from './components/LayoutSelector';
import { GeneralForm } from './components/FormSections/GeneralForm';
import { MarketingForm } from './components/FormSections/MarketingForm';
import { AssetsColorsForm } from './components/FormSections/AssetsColorsForm';
import { ContentForm } from './components/FormSections/ContentForm';
import { useBuilderStore } from './hooks/useBuilderStore';
import { Download, Code2, Settings } from 'lucide-react';

function App() {
  const { data } = useBuilderStore();

  const handleExportJson = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.config.project_slug || 'project'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerateNetlify = () => {
    const tomlContent = `[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`;

    const blob = new Blob([tomlContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'netlify.toml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    try {
      const { generateProjectZip, downloadZip } = await import('./utils/zipGenerator');
      const blob = await generateProjectZip(data);
      downloadZip(blob, `${data.config.project_slug}-starter-kit.zip`);
    } catch (error) {
      console.error("Failed to generate zip", error);
      alert("Erro ao gerar ZIP. Verifique o console.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/20">
              <Code2 size={20} className="text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-gray-900">
              Lawyer Engine <span className="text-gray-400 font-normal">v6.0</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
              {data.config.layout_mode}
            </div>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-all border border-gray-200 shadow-sm hover:shadow"
            >
              <Download size={16} />
              Export JSON
            </button>
            <button
              onClick={handleGenerateNetlify}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-all border border-gray-200 shadow-sm hover:shadow"
            >
              <Code2 size={16} />
              Config Netlify
            </button>
            <button
              onClick={handleDownloadZip}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-all shadow-md shadow-slate-900/10 hover:shadow-lg hover:shadow-slate-900/20"
            >
              <Download size={16} />
              Baixar Projeto (.zip)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Editor Column */}
          <div className="lg:col-span-7 space-y-10">

            {/* Section: Layout Mode */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-gray-900">
                <Settings className="text-blue-600" size={20} />
                <h2 className="text-xl font-bold tracking-tight">Configuração & Layout</h2>
              </div>
              <LayoutSelector />
            </section>

            <GeneralForm />
            <MarketingForm />
            <AssetsColorsForm />
            <ContentForm />

          </div>

          {/* Preview Column (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-500 uppercase text-xs tracking-wider">Live Preview (JSON)</h3>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-[calc(100vh-12rem)] overflow-auto shadow-sm">
                <pre className="font-mono text-xs text-blue-600 leading-relaxed">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
