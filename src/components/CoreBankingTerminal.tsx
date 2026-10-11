import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronUp, ChevronDown, Copy, Check, Trash2 } from 'lucide-react';
import { TerminalLog } from '../types';

interface CoreBankingTerminalProps {
  logs: TerminalLog[];
  onClearLogs: () => void;
}

export const CoreBankingTerminal: React.FC<CoreBankingTerminalProps> = ({
  logs,
  onClearLogs,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  const handleCopyLogs = () => {
    const text = logs
      .map((l) => `[${l.timestamp}] [${l.tag}] ${l.message}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLevelColor = (level: TerminalLog['level']) => {
    switch (level) {
      case 'info':
        return 'text-sky-300';
      case 'warn':
        return 'text-amber-400';
      case 'error':
        return 'text-red-400';
      case 'success':
        return 'text-emerald-400';
      case 'dpdp':
        return 'text-teal-300 font-semibold';
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#002147] border-t-2 border-amber-500 shadow-2xl transition-all duration-300">
      
      {/* Drawer Toggle Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 sm:px-6 py-2.5 flex items-center justify-between cursor-pointer hover:bg-[#001733] transition-colors select-none"
      >
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center text-amber-300 border border-amber-400/30">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-white tracking-wide">
              कोर बैंकिंग टर्मिनल (Core Banking Proxy Terminal • Finacle / SAP mTLS 1.3)
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-amber-300/80 font-mono hidden sm:inline">
              Port: 8443 (GOI-PROXY-NODE)
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[11px] font-mono text-amber-200 bg-[#001733] px-2 py-0.5 rounded border border-amber-400/30">
            {logs.length} events logged
          </span>
          <button
            type="button"
            className="text-amber-300 hover:text-white p-1 rounded transition-colors text-xs font-bold"
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Monospace Terminal Output Window */}
      {isOpen && (
        <div className="border-t border-slate-700 bg-[#001226]">
          
          {/* Action Toolbar */}
          <div className="px-4 sm:px-6 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-[#001733]">
            <div className="flex items-center space-x-3">
              <span className="text-emerald-400">● LIVE mTLS FEED</span>
              <span>NODE: HDFC-PUNE-FIN-04</span>
              <span className="text-amber-300">DPDP: RAM-ONLY tmpfs</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleCopyLogs}
                className="hover:text-white flex items-center space-x-1 px-2 py-0.5 rounded hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Logs'}</span>
              </button>
              <button
                type="button"
                onClick={onClearLogs}
                className="hover:text-red-400 flex items-center space-x-1 px-2 py-0.5 rounded hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Log Stream Body */}
          <div className="h-48 overflow-y-auto p-4 font-mono text-xs space-y-1.5 select-text">
            {logs.length === 0 ? (
              <div className="text-slate-500 italic">No terminal proxy events recorded yet.</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start space-x-2.5 leading-relaxed">
                  <span className="text-slate-400 flex-shrink-0">[{log.timestamp}]</span>
                  <span className={`font-semibold flex-shrink-0 ${getLevelColor(log.level)}`}>
                    [{log.tag}]
                  </span>
                  <span className="text-slate-200 break-all">{log.message}</span>
                </div>
              ))
            )}
            <div ref={terminalEndRef} />
          </div>

        </div>
      )}

    </div>
  );
};
