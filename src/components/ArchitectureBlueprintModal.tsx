import React, { useState } from 'react';
import { X, Shield, Server, Cpu, Database, Network, ArrowRight, Lock, CheckCircle2, Zap, Layers, RefreshCw } from 'lucide-react';
import { NationalEmblem } from './NationalEmblem';

interface ArchitectureBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureBlueprintModal: React.FC<ArchitectureBlueprintModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'topology' | 'latency' | 'dpdp'>('topology');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-slate-300 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Tricolor Ribbon */}
        <div
          className="h-2 w-full flex-shrink-0"
          style={{
            background: 'linear-gradient(90deg, #FF9933 0%, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%, #138808 100%)',
          }}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <NationalEmblem className="w-8 h-10 text-[#002147]" />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-[#002147]">
                  SatyaTrace-FIN Core Banking Architecture Blueprint
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-100 text-indigo-800 border border-indigo-200">
                  v2.4 PROD SPEC
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Pre-Transaction Sidecar Gateway Topology &bull; Infosys Finacle / TCS BaNCS / SAP CBS Integration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('topology')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'topology'
                ? 'border-[#002147] text-[#002147]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Pre-Ledger System Topology (सिस्टम संरचना)</span>
          </button>
          <button
            onClick={() => setActiveTab('latency')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'latency'
                ? 'border-[#002147] text-[#002147]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>&lt; 850ms Sub-Second Latency Budget</span>
          </button>
          <button
            onClick={() => setActiveTab('dpdp')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'dpdp'
                ? 'border-[#002147] text-[#002147]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>DPDP Act 2023 RAM Enclave Specs</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-slate-700">
          
          {activeTab === 'topology' && (
            <div className="space-y-6">
              
              {/* Architecture Pipeline Flow Diagram */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    High-Trust Integration Pipeline (End-to-End Intercept)
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
                    Zero Core Banking Code Changes Required (Drop-in Proxy)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  
                  {/* Layer 1: Ingestion Channels */}
                  <div className="bg-white border-2 border-slate-300 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                          1
                        </div>
                        <h4 className="font-bold text-xs text-slate-900">Inbound Channels</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-3">High-risk transaction entry points</p>
                      <ul className="text-[11px] space-y-2 text-slate-600">
                        <li className="flex items-center space-x-1.5 bg-slate-50 p-1.5 rounded border border-slate-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>RTGS / NEFT (&gt; ₹50L)</span>
                        </li>
                        <li className="flex items-center space-x-1.5 bg-slate-50 p-1.5 rounded border border-slate-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>vKYC WebRTC Video</span>
                        </li>
                        <li className="flex items-center space-x-1.5 bg-slate-50 p-1.5 rounded border border-slate-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>WhatsApp Treasury API</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                      Protocol: ISO 20022 / WebRTC
                    </div>
                  </div>

                  {/* Layer 2: SatyaTrace-FIN Sidecar Proxy */}
                  <div className="bg-white border-2 border-[#002147] rounded-xl p-4 shadow-md flex flex-col justify-between relative ring-2 ring-blue-100">
                    <div className="absolute -top-2.5 right-3 bg-[#002147] text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                      Core Innovation
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded bg-[#002147] text-white flex items-center justify-center font-bold text-xs">
                          2
                        </div>
                        <h4 className="font-bold text-xs text-[#002147]">SatyaTrace-FIN Proxy</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-3">mTLS 1.3 Pre-Ledger Interceptor</p>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="p-1.5 bg-indigo-50 border border-indigo-200 rounded font-semibold text-indigo-900">
                          ⚡ Volatile tmpfs RAM Sandbox
                        </div>
                        <div className="p-1.5 bg-amber-50 border border-amber-200 rounded text-amber-900 font-mono text-[10px]">
                          &bull; POS rPPG Pulse Tracker<br/>
                          &bull; Wav2Vec 2.0 Lip Lag<br/>
                          &bull; CMOS PRNU Fingerprint
                        </div>
                        <div className="p-1.5 bg-emerald-50 border border-emerald-200 rounded font-semibold text-emerald-900 text-[10px]">
                          Bayesian Fusion &bull; SHA-256 Seal
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
                      Budget: &lt; 850ms Ephemeral
                    </div>
                  </div>

                  {/* Layer 3: Core Banking System (CBS) */}
                  <div className="bg-white border-2 border-slate-300 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                          3
                        </div>
                        <h4 className="font-bold text-xs text-slate-900">Core Banking Ledger</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-3">Finacle / BaNCS / SAP Bank</p>
                      <div className="space-y-2 text-[11px]">
                        <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-800">
                          <strong>Green (Score &lt; 25):</strong> Instant pacs.008 settlement to NPCI
                        </div>
                        <div className="p-2 bg-amber-50 border border-amber-200 rounded text-amber-800">
                          <strong>Amber (25–70):</strong> Dual-key maker-checker step-up challenge
                        </div>
                        <div className="p-2 bg-red-50 border border-red-200 rounded text-red-800">
                          <strong>Red (&gt; 70):</strong> 15-Min Reversible Escrow Quarantine
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                      Pre-settlement Hold
                    </div>
                  </div>

                  {/* Layer 4: National Cyber Defense (1930 / I4C) */}
                  <div className="bg-white border-2 border-slate-300 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded bg-orange-100 text-[#FF9933] flex items-center justify-center font-bold text-xs">
                          4
                        </div>
                        <h4 className="font-bold text-xs text-slate-900">I4C / 1930 Grid</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-3">National Law Enforcement</p>
                      <div className="space-y-2 text-[11px]">
                        <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                          <strong className="text-slate-800">TinyFish Agent:</strong> Dispatches payload + Section 65B affidavit in &lt; 24s
                        </div>
                        <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                          <strong className="text-slate-800">CFCFRMS Sync:</strong> Immediate nationwide freeze on suspected mule account
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-[#FF9933] font-bold text-right">
                      Golden 30-Min Window Saved
                    </div>
                  </div>

                </div>
              </div>

              {/* Key Technical Innovations Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-2 text-indigo-700 font-bold text-xs mb-1">
                    <Server className="w-4 h-4" />
                    <span>Non-Invasive Sidecar Proxy</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Operates as a high-throughput Envoy/Nginx sidecar. Banks do not rewrite legacy COBOL or Java backend logic—SatyaTrace intercepts API payloads via standard HTTP/2 and gRPC proxies.
                  </p>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs mb-1">
                    <Zap className="w-4 h-4" />
                    <span>Parallel Tri-Modal Inferencing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    rPPG, Wav2Vec 2.0, and PRNU run concurrently on GPU/NPU enclaves in under 420ms total compute time, well within the 850ms banking SLA budget before RTGS packet transmission.
                  </p>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs mb-1">
                    <Shield className="w-4 h-4" />
                    <span>Reversible Escrow vs Instant Loss</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Unlike traditional fraud scoring which alerts post-facto, SatyaTrace redirects flagged funds into an internal 15-minute reversible escrow account. Money never leaves the bank's core perimeter.
                  </p>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'latency' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-3">
                  SLA Latency Budget Breakdown (&lt; 850ms Banking Standard)
                </h4>
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>1. Media Ingestion &amp; Chunk Demuxing (tmpfs RAM)</span>
                      <span className="font-bold text-slate-900">38ms (4.5%)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[4.5%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>2. Face Detection &amp; ROI Mesh Extraction (68 Landmarks)</span>
                      <span className="font-bold text-slate-900">84ms (9.8%)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full w-[9.8%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>3. Parallel Modality Inferencing (rPPG + Wav2Vec + PRNU)</span>
                      <span className="font-bold text-indigo-700">320ms (37.6%) [CRITICAL PATH]</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full w-[37.6%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>4. Bayesian Evidence Fusion &amp; Risk Scoring Engine</span>
                      <span className="font-bold text-slate-900">42ms (4.9%)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[4.9%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>5. Cryptographic SHA-256 Receipt &amp; Section 65B Signing</span>
                      <span className="font-bold text-slate-900">28ms (3.3%)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[3.3%]" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-sans font-bold">
                    <span className="text-[#002147]">Total Interception Execution Time:</span>
                    <span className="text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300 font-mono">
                      512ms (SLA Margin: 338ms headroom remaining)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dpdp' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-3">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                  <Lock className="w-4 h-4 text-emerald-700" />
                  <span>Digital Personal Data Protection Act, 2023 (DPDP Act) Statutory Compliance</span>
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  Unlike conventional deepfake scanners that store customer video/voice clips in persistent S3/cloud storage (violating Section 8 DPDP Act data minimization requirements), <strong>SatyaTrace-FIN operates on an Ephemeral Volatile RAM Sandbox Architecture</strong>:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-slate-800">1. Zero Persistent Disk Writes:</strong>
                    <p className="text-slate-600">
                      All media frames are streamed exclusively into encrypted <code>tmpfs</code> RAM segments. No bytes ever touch SSD/HDD physical sectors.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-slate-800">2. Automated 3-Second Cryptographic Purge:</strong>
                    <p className="text-slate-600">
                      As soon as the mathematical feature vectors and SHA-256 telemetry seal are generated, RAM blocks are overwritten with zeros (<code>bzero()</code>) and purged.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-slate-800">3. Anonymized Feature Vectors Only:</strong>
                    <p className="text-slate-600">
                      Only non-reversible telemetry metrics (e.g., pulse frequency in Hz, phase lag in ms, PRNU noise variance) are retained for audit logging. Customer faces and voices are never stored.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-slate-800">4. Section 65B Cryptographic Proof:</strong>
                    <p className="text-slate-600">
                      A verifiable SHA-256 cryptographic fingerprint binds the verdict to the transaction ID without exposing private biometric assets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span className="font-mono">Reference Spec: ST-ARCH-CBS-2026-MHA-I4C</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-200 transition-colors shadow-sm"
          >
            Close Blueprint
          </button>
        </div>

      </div>
    </div>
  );
};
