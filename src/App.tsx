import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Copy, Download, Trash2, FileJson, Minimize2, Expand, Check, AlertCircle, PlayCircle, ListTree, ArrowUp } from 'lucide-react';
import JsonTree from './components/JsonTree';

const EXAMPLE_JSON = {
  项目名称: "简约风 JSON 解析器",
  版本: "3.2.1",
  修复项: [
    "修复了回到顶部按钮不显示的问题",
    "增强了左右双面板的滚动条可见度",
    "优化了长内容下的容器层级"
  ],
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
  
  // 滚动状态
  const [showRightScrollTop, setShowRightScrollTop] = useState(false);
  const [showLeftScrollTop, setShowLeftScrollTop] = useState(false);
  
  const leftScrollRef = useRef<HTMLTextAreaElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);

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

  const scrollToTop = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 切换视图时回到顶部
  useEffect(() => {
    rightScrollRef.current?.scrollTo({ top: 0 });
  }, [viewMode]);

  return (
    <div className="min-h-screen h-screen flex flex-col bg-min-bg text-min-text overflow-hidden">
      {/* 顶部导航 */}
      <header className="min-header px-8 py-4 flex items-center justify-between shrink-0">
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
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* 左侧：输入区 */}
        <section className="flex-1 flex flex-col border-r border-min-border relative h-full">
          <div className="min-panel-header shrink-0">
            <div className="flex items-center gap-2">
              <span className="min-tag">Input</span>
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
            ref={leftScrollRef}
            value={input}
            onScroll={(e) => setShowLeftScrollTop(e.currentTarget.scrollTop > 300)}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full p-8 font-mono text-sm resize-none focus:outline-none bg-white text-gray-800 leading-relaxed border-none overflow-auto scroll-smooth"
            placeholder="在此粘贴 JSON 源码..."
            spellCheck={false}
          />
          {showLeftScrollTop && (
            <button
              onClick={() => scrollToTop(leftScrollRef)}
              className="absolute bottom-6 right-6 w-10 h-10 bg-white border border-min-border rounded-full shadow-lg flex items-center justify-center text-min-secondary hover:text-min-accent hover:border-min-accent transition-all z-20 animate-fade-in-up"
              title="回到顶部"
            >
              <ArrowUp size={20} />
            </button>
          )}
        </section>

        {/* 右侧：输出/预览区 */}
        <section className="flex-1 flex flex-col bg-min-sub relative h-full">
          <div className="min-panel-header shrink-0">
            <div className="flex items-center gap-2">
              <span className="min-tag">Output</span>
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

          <div 
            ref={rightScrollRef}
            onScroll={(e) => setShowRightScrollTop(e.currentTarget.scrollTop > 300)}
            className="flex-1 p-8 overflow-auto scroll-smooth relative"
          >
            {error ? (
              <div className="bg-red-50 border border-red-100 rounded-lg p-6 flex gap-4 text-red-600">
                <AlertCircle size={20} className="shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm">解析错误</h3>
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

          {/* 回到顶部按钮 */}
          {showRightScrollTop && (
            <button
              onClick={() => scrollToTop(rightScrollRef)}
              className="absolute bottom-6 right-6 w-10 h-10 bg-white border border-min-border rounded-full shadow-lg flex items-center justify-center text-min-secondary hover:text-min-accent hover:border-min-accent transition-all z-20 animate-fade-in-up"
              title="回到顶部"
            >
              <ArrowUp size={20} />
            </button>
          )}
        </section>
      </main>

      {/* 底部状态栏 */}
      <footer className="px-8 py-3 bg-white border-t border-min-border flex items-center justify-between text-[11px] text-min-secondary font-medium shrink-0">
        <div className="flex items-center gap-6">
          <span>大小: {parsedData ? `${JSON.stringify(parsedData).length} 字节` : '---'}</span>
          <span>字符总数: {input.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
          <span className="uppercase tracking-widest">{error ? 'Invalid' : 'Success'}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
