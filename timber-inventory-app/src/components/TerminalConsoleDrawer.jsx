import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Trash2, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export function TerminalConsoleDrawer({ logs = [], onClearLogs }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  const handleCopy = () => {
    const text = logs.map(l => l.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-t border-slate-800 bg-slate-950 font-mono text-xs shadow-2xl shrink-0">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between cursor-pointer select-none hover:bg-slate-900 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-slate-200">Java Console Output Stream</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            {logs.length} line(s)
          </span>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {logs.length > 0 && (
            <>
              <button
                onClick={handleCopy}
                className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                title="Copy Terminal Logs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={onClearLogs}
                className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                title="Clear Terminal Output"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-slate-400 hover:text-slate-200"
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div 
          ref={scrollRef}
          className="p-4 h-56 overflow-y-auto space-y-1 bg-black/90 text-emerald-400 select-text"
        >
          {logs.length === 0 ? (
            <p className="text-slate-600 italic">No console output yet. Perform an operation above to view real-time Java terminal logs.</p>
          ) : (
            logs.map((log, idx) => (
              <div 
                key={idx} 
                className={`leading-relaxed whitespace-pre-wrap ${
                  log.type === 'error' 
                    ? 'text-rose-400' 
                    : log.type === 'warn' 
                    ? 'text-amber-400' 
                    : log.type === 'header'
                    ? 'text-yellow-300 font-bold'
                    : log.type === 'info'
                    ? 'text-cyan-300'
                    : 'text-emerald-400'
                }`}
              >
                {log.text}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
