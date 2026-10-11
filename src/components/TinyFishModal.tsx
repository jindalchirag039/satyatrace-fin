import React from 'react';
import { X, Fish, Terminal, Globe, Shield, Check } from 'lucide-react';

interface TinyFishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TinyFishModal: React.FC<TinyFishModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Fish className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">TinyFish Web Agent Engine</h3>
              <p className="text-xs text-slate-500 font-mono">Autonomous Web Intelligence &amp; 1930 Portal Dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900 leading-relaxed">
            <strong>TinyFish Integration Role in SatyaTrace-FIN:</strong>{' '}
            SatyaTrace uses TinyFish's Web Agent API to automate live external verification without brittle manual scraping. It cross-checks recipient bank IFSCs against known mule account registries, queries the Indian Cybercrime Coordination Centre (I4C), and auto-executes the 1930 incident ticket submission during escrow quarantine.
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              TinyFish API Configuration
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 block mb-1">API Key Header:</span>
                <input
                  type="password"
                  value="tf_live_948271049281a9f02c"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded font-mono text-slate-700"
                  readOnly
                />
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Agent Endpoint:</span>
                <input
                  type="text"
                  value="https://api.tinyfish.ai/v1/agent/run"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded font-mono text-slate-700"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Live Agent Execution Script (TypeScript / SDK)
            </label>
            <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] overflow-x-auto">
              <pre>{`import { TinyFish } from '@tiny-fish/sdk';

const client = new TinyFish({ apiKey: process.env.TINYFISH_API_KEY });

// Trigger autonomous 1930 portal ticket dispatch
export async function dispatchToI4CPortal(evidenceReceipt) {
  const response = await client.agent.run({
    url: 'https://cybercrime.gov.in/Webform/IncidentReporting.aspx',
    goal: \`Submit high-risk financial deepfake escrow package #\${evidenceReceipt.id} to 1930 queue and verify temporary lien placed on beneficiary account \${evidenceReceipt.beneficiary}\`,
    timeoutMs: 25000
  });
  return response.data;
}`}</pre>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-800">Mule Registry Web Crawl Status</div>
              <div className="text-slate-500 text-[11px]">
                Last synced 4 minutes ago across 42 bank fraud databases
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-semibold rounded text-[11px] flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[3]" />
              Synced &amp; Active
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
};
