import { useState, useCallback, useMemo } from 'react';
import { Copy, Download, Trash2, FileJson, Minimize2, Expand, Check, AlertCircle, PlayCircle } from 'lucide-react';
import JsonTree from './components/JsonTree';

const EXAMPLE_JSON = {
  project: "Apple Style JSON Parser",
  version: "1.0.0",
  features: ["Formatting", "Tree View", "Compression", "Export"],
  author: {
    name: "Gemini CLI",
    github: "https://github.com"
  },
  active: true,
  stats: {
    users: 1200,
    rating: 4.8
  }
};

function App() {
  const [input, setInput] = useState(JSON.stringify(EXAMPLE_JSON, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const parsedData = useMemo(() => {
    try {
      if (!input.trim()) return null;
      const data = JSON.parse(input);
      setError(null);
      return data;
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  }, [input]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [input]);

  const handleCompress = useCallback(() => {
    if (parsedData) {
      setInput(JSON.stringify(parsedData));
    }
  }, [parsedData]);

  const handleFormat = useCallback(() => {
    if (parsedData) {
      setInput(JSON.stringify(parsedData, null, 2));
    }
  }, [parsedData]);

  const handleExample = useCallback(() => {
    setInput(JSON.stringify(EXAMPLE_JSON, null, 2));
  }, []);

  const handleExport = useCallback(() => {
    if (!parsedData) return;
    const blob = new Blob([input], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').split('.')[0];
    link.href = url;
    link.download = `data_${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [input, parsedData]);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-10 px-6 py-4 border-b border-apple-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-apple-blue p-1.5 rounded-lg shadow-sm">
            <FileJson className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">JSON Parser</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleCopy} className="apple-button-secondary text-sm flex items-center gap-2">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={handleExport} className="apple-button text-sm flex items-center gap-2">
            <Download size={14} />
            Export
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Input area */}
        <section className="flex-1 flex flex-col border-r border-apple-border">
          <div className="bg-gray-50 px-4 py-2 border-b border-apple-border flex items-center justify-between">
            <span className="text-xs font-medium text-apple-secondary uppercase tracking-wider">Input</span>
            <div className="flex items-center gap-3">
              <button onClick={handleExample} className="flex items-center gap-1 text-[11px] font-medium text-apple-blue hover:opacity-80 transition-opacity">
                <PlayCircle size={13} />
                Example
              </button>
              <div className="w-px h-3 bg-apple-border mx-1" />
              <button onClick={handleFormat} className="flex items-center gap-1 text-[11px] font-medium text-apple-blue hover:opacity-80 transition-opacity">
                <Expand size={13} />
                Format
              </button>
              <button onClick={handleCompress} className="flex items-center gap-1 text-[11px] font-medium text-apple-blue hover:opacity-80 transition-opacity">
                <Minimize2 size={13} />
                Compress
              </button>
              <div className="w-px h-3 bg-apple-border mx-1" />
              <button onClick={handleClear} className="p-1 hover:bg-gray-200 rounded transition-colors text-apple-secondary" title="Clear">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full p-4 font-mono text-sm resize-none focus:outline-none bg-white"
            placeholder="Paste your JSON here..."
            spellCheck={false}
          />
        </section>

        {/* Output area */}
        <section className="flex-1 flex flex-col bg-[#fafafa]">
          <div className="bg-gray-50 px-4 py-2 border-b border-apple-border">
            <span className="text-xs font-medium text-apple-secondary uppercase tracking-wider">Tree View</span>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {error ? (
              <div className="apple-card bg-red-50 border-red-100 p-4 flex gap-3 text-red-600">
                <AlertCircle size={18} className="shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm">Invalid JSON</h3>
                  <p className="text-xs mt-1 leading-relaxed">{error}</p>
                </div>
              </div>
            ) : parsedData ? (
              <div className="bg-white apple-card p-6 min-h-full">
                <JsonTree data={parsedData} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-apple-secondary opacity-50">
                <FileJson size={48} strokeWidth={1} />
                <p className="mt-2 text-sm">No valid JSON data</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer / Status bar */}
      <footer className="px-6 py-2 bg-white border-t border-apple-border flex items-center justify-between text-[11px] text-apple-secondary">
        <div>
          {parsedData ? `Object size: ${JSON.stringify(parsedData).length} bytes` : 'Waiting for input'}
        </div>
        <div className="flex items-center gap-4">
          <span>Characters: {input.length}</span>
          <span>Status: {error ? 'Error' : 'Ready'}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
