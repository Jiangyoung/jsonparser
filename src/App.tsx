import { useState, useCallback, useMemo } from 'react';
import { Copy, Download, Trash2, FileJson, Minimize2, Expand, Check, AlertCircle, PlayCircle, ListTree } from 'lucide-react';
import JsonTree from './components/JsonTree';

const EXAMPLE_JSON = {
  项目名称: "简约风 JSON 解析器",
  版本: "3.1.0",
  更新说明: "将格式化与压缩逻辑移至右侧输出区，保持左侧输入内容不变。",
  特性: ["自动换行", "树形/文本双视图", "响应式布局", "PWA 离线使用"],
  作者: {
    姓名: "Gemini CLI",
    github: "Jiangyoung"
  }
};

type ViewMode = 'tree' | 'format' | 'minify';

function App() {
  const [input, setInput] = useState(JSON.stringify(EXAMPLE_JSON, null, 2));
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
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

  const outputContent = useMemo(() => {
    if (!parsedData) return "";
    if (viewMode === 'minify') return JSON.stringify(parsedData);
    return JSON.stringify(parsedData, null, 2);
  }, [parsedData, viewMode]);

  const handleCopy = useCallback(() => {
    const textToCopy = viewMode === 'tree' ? JSON.stringify(parsedData, null, 2) : outputContent;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [outputContent, viewMode, parsedData]);

  const handleExample = useCallback(() => {
    setInput(JSON.stringify(EXAMPLE_JSON, null, 2));
    setViewMode('tree');
  }, []);

  const handleExport = useCallback(() => {
    if (!parsedData) return;
    const blob = new Blob([outputContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').split('.')[0];
    link.href = url;
    link.download = `data_${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [outputContent, parsedData]);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-min-bg text-min-text">
      {/* 顶部导航 */}
      <header className="min-header px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileJson className="text-min-accent" size={24} />
          <h1 className="text-lg font-semibold tracking-tight">JSON Parser</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCopy} 
            className={`min-button-primary flex items-center gap-2 transition-all ${copied ? 'bg-green-600' : 'bg-min-accent'}`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? '已复制' : '复制结果'}
          </button>
          <button onClick={handleExport} className="min-button-secondary flex items-center gap-2">
            <Download size={16} />
            导出 JSON
          </button>
        </div>
      </header>

      {/* 主体内容 */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* 左侧：输入区 */}
        <section className="flex-1 flex flex-col border-r border-min-border">
          <div className="min-panel-header">
            <div className="flex items-center gap-2">
              <span className="min-tag">Input</span>
              <span className="text-[10px] text-min-secondary font-mono italic">源数据</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleExample} className="text-xs font-medium text-min-accent hover:opacity-70 flex items-center gap-1 transition-opacity">
                <PlayCircle size={14} />
                加载示例
              </button>
              <button onClick={handleClear} className="text-xs font-medium text-min-secondary hover:text-red-500 flex items-center gap-1 transition-colors">
                <Trash2 size={14} />
                清空
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full p-8 font-mono text-sm resize-none focus:outline-none bg-white text-gray-800 leading-relaxed border-none"
            placeholder="在此粘贴 JSON 源码..."
            spellCheck={false}
          />
        </section>

        {/* 右侧：输出/预览区 */}
        <section className="flex-1 flex flex-col bg-min-sub">
          <div className="min-panel-header">
            <div className="flex items-center gap-2">
              <span className="min-tag">Output</span>
              <span className="text-[10px] text-min-secondary font-mono italic">输出结果</span>
            </div>
            <div className="flex bg-white rounded-md border border-min-border p-0.5 shadow-sm">
              <button 
                onClick={() => setViewMode('tree')}
                className={`px-3 py-1 rounded-sm text-xs font-medium transition-all flex items-center gap-1 ${viewMode === 'tree' ? 'bg-min-accent text-white shadow-sm' : 'text-min-secondary hover:text-min-text'}`}
              >
                <ListTree size={12} />
                树形图
              </button>
              <button 
                onClick={() => setViewMode('format')}
                className={`px-3 py-1 rounded-sm text-xs font-medium transition-all flex items-center gap-1 ${viewMode === 'format' ? 'bg-min-accent text-white shadow-sm' : 'text-min-secondary hover:text-min-text'}`}
              >
                <Expand size={12} />
                格式化
              </button>
              <button 
                onClick={() => setViewMode('minify')}
                className={`px-3 py-1 rounded-sm text-xs font-medium transition-all flex items-center gap-1 ${viewMode === 'minify' ? 'bg-min-accent text-white shadow-sm' : 'text-min-secondary hover:text-min-text'}`}
              >
                <Minimize2 size={12} />
                压缩
              </button>
            </div>
          </div>

          <div className="flex-1 p-8 overflow-auto">
            {error ? (
              <div className="bg-red-50 border border-red-100 rounded-lg p-6 flex gap-4 text-red-600">
                <AlertCircle size={20} className="shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm underline decoration-2">解析错误 (Syntax Error)</h3>
                  <p className="text-xs mt-3 leading-relaxed opacity-90 break-all font-mono bg-white/50 p-3 rounded border border-red-200">{error}</p>
                </div>
              </div>
            ) : parsedData ? (
              <div className="bg-white rounded-lg border border-min-border p-8 min-h-full shadow-sm">
                {viewMode === 'tree' ? (
                  <JsonTree data={parsedData} />
                ) : (
                  <pre className="font-mono text-sm text-gray-800 break-all whitespace-pre-wrap leading-relaxed animate-in fade-in duration-300">
                    {outputContent}
                  </pre>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-min-secondary/30">
                <FileJson size={48} strokeWidth={1} className="opacity-20" />
                <p className="mt-4 text-sm font-medium tracking-widest uppercase opacity-40">Ready to Analyze</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 底部状态栏 */}
      <footer className="px-8 py-3 bg-white border-t border-min-border flex items-center justify-between text-[11px] text-min-secondary font-medium">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            大小: {parsedData ? `${JSON.stringify(parsedData).length} 字节` : '---'}
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            字符总数: {input.length}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] tracking-widest uppercase opacity-60">Status:</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full shadow-sm ${error ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            <span className={`uppercase tracking-widest font-bold ${error ? 'text-red-500' : 'text-green-600'}`}>
              {error ? 'Invalid' : 'Success'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
