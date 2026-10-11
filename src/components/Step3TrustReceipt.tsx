import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Download, Printer, Shield, CheckCircle2, AlertTriangle, Octagon, Lock, FileText } from 'lucide-react';
import { ForensicScenario } from '../types';
import { NationalEmblem } from './NationalEmblem';
import { useLanguage } from '../context/LanguageContext';

interface Step3TrustReceiptProps {
  scenario: ForensicScenario;
  onProceedToDecision: () => void;
  onBackToScan: () => void;
  onOpenSection65B?: () => void;
}

export const Step3TrustReceipt: React.FC<Step3TrustReceiptProps> = ({
  scenario,
  onProceedToDecision,
  onBackToScan,
  onOpenSection65B,
}) => {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'diagnostics' | 'manifest'>('diagnostics');
  const [copiedJson, setCopiedJson] = useState(false);

  const copyManifest = () => {
    const jsonStr = JSON.stringify(
      {
        certificate_title: 'GOVERNMENT_OF_INDIA_FORENSIC_TRUST_RECEIPT',
        government_body: 'Ministry of Home Affairs / I4C & Reserve Bank of India Proxy',
        system: 'SatyaTrace-FIN Gateway v2.4 (National Pre-Transaction Deepfake Defense)',
        receipt_id: scenario.id,
        timestamp_utc: new Date().toISOString(),
        channel: scenario.channelName,
        target_amount: scenario.amount,
        sender: scenario.sender,
        beneficiary: scenario.beneficiary,
        dpdp_act_2023: {
          statutory_protection: 'DPDP Act 2023 Section 8 Compliant',
          retention_policy: 'Linux tmpfs RAM-Only purged in < 3.0s',
          persistent_disk_writes: 0,
          pii_retained: false,
        },
        bayesian_risk_score: scenario.riskScore,
        diagnostics: {
          cardiac_pos_snr: scenario.rppg.snr,
          aerodynamic_lag_ms: scenario.sync.lagMs,
          vocoder_cutoff: scenario.spectral.cutoffKhz,
          cmos_prnu_matched: scenario.spectral.prnuMatched,
        },
        sha256_manifest: scenario.sha256Manifest,
      },
      null,
      2
    );

    navigator.clipboard.writeText(jsonStr);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleExportEvidence = () => {
    const data = {
      bundle: 'OFFICIAL_GOVERNMENT_EVIDENCE_PACK_SECTION_65B',
      issuer: 'Government of India - National Cyber Crime Coordination Centre',
      gateway: 'SatyaTrace-FIN Gateway v2.4',
      scenario,
      exportedAt: new Date().toISOString(),
      statutoryCompliance: 'DPDP Act 2023 Verified (Ephemeral RAM)',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SatyaTrace_Govt_Evidence_${scenario.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = () => {
    switch (scenario.tier) {
      case 'high':
        return {
          label: lang === 'hi' ? '१५-मिनट प्रतिवर्ती एस्क्रो संगरोध' : '15-MIN REVERSIBLE ESCROW QUARANTINE',
          className: 'bg-red-50 text-red-800 border-red-300',
          dot: 'bg-red-600',
        };
      case 'med':
        return {
          label: lang === 'hi' ? 'अतिरिक्त सत्यापन आवश्यक (ओटीपी/आईवीआर)' : 'STEP-UP AUTH REQUIRED',
          className: 'bg-amber-50 text-amber-900 border-amber-300',
          dot: 'bg-amber-600',
        };
      case 'low':
        return {
          label: lang === 'hi' ? 'स्वच्छ पास — प्रामाणिक अंतरण' : 'CLEAN PASS — FUNDS DISPATCHED',
          className: 'bg-emerald-50 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-600',
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="space-y-6">
      
      {/* Official Government Verification Certificate with Tricolor Ribbon */}
      <div className="bg-white border-2 border-slate-300 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        
        {/* Top Tricolor Ribbon Accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: 'linear-gradient(90deg, #FF9933 0%, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%, #138808 100%)',
          }}
        />

        {/* Certificate Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 pt-1">
          
          <div className="flex items-center space-x-4">
            {/* Official State Emblem */}
            <NationalEmblem size={56} variant="gold" />

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-[#002147] text-lg sm:text-xl tracking-tight">
                  SATYATRACE FORENSIC TRUST RECEIPT
                </span>
                <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-300">
                  #{scenario.id}
                </span>
              </div>
              <div className="text-xs text-amber-900 font-bold">
                भारत सरकार • गृह मंत्रालय (I4C) एवं भारतीय रिज़र्व बैंक अधिकृत
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                Target: {scenario.channelName} • Mandate: ₹{scenario.amount} INR • Intercept Node #04
              </p>
            </div>
          </div>

          {/* Status Header Badge */}
          <div className="flex items-center space-x-2">
            <div className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-2 border shadow-2xs ${statusBadge.className}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${statusBadge.dot} animate-pulse`} />
              <span>{statusBadge.label}</span>
            </div>
          </div>

        </div>

        {/* Visual Diagnostic Cards (Split View) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          
          {/* Card 1: Plain-Language Forensic Finding */}
          <div className="bg-[#F8FAF9] border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#002147]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Card 1: Plain-Language Forensic Finding (जैविक सत्यता निष्कर्ष)
                </h4>
              </div>
              <h3 className="font-extrabold text-[#002147] text-base mb-2">
                Biological Ground Truth Assessment
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
                "{scenario.plainEnglishExplanation}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Risk Score: <strong className="text-slate-900 font-bold">{scenario.riskScore}/100</strong></span>
              <span>Sub-Second Latency: <strong className="text-slate-900 font-bold">{scenario.latencyMs}ms</strong></span>
            </div>
          </div>

          {/* Card 2: Cryptographic SHA-256 Hash Manifest + RAM-Only Memory Wipe Verified */}
          <div className="bg-[#F8FAF9] border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#002147]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Card 2: Cryptographic Manifest &amp; DPDP Audit (क्रिप्टोग्राफिक मोहर)
                </h4>
              </div>

              {/* SHA-256 Hash Display */}
              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 font-mono text-xs">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  SHA-256 Tamper-Proof Evidence Seal:
                </span>
                <span className="text-indigo-700 font-bold break-all block text-[11px]">
                  {scenario.sha256Manifest}
                </span>
              </div>

              {/* RAM-Only Memory Wipe Verified Badge */}
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-950 text-xs flex items-center space-x-2.5">
                <Lock className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <div className="text-[11px] leading-tight">
                  <strong>RAM-Only Memory Wipe Verified:</strong> Ephemeral Linux <code className="bg-white px-1 rounded font-mono">tmpfs</code> buffer purged in &lt; 3.0s. 0 persistent disk writes.
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="text-slate-700 font-medium">Section 65B Indian Evidence Act Valid</span>
              <span className="text-emerald-700 font-bold">✓ DPDP Act Certified</span>
            </div>
          </div>

        </div>

        {/* Tabbed Diagnostic Details */}
        <div className="border border-slate-200 rounded-xl overflow-hidden mt-6">
          <div className="flex border-b border-slate-200 bg-slate-50 px-4">
            <button
              type="button"
              onClick={() => setActiveTab('diagnostics')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
                activeTab === 'diagnostics'
                  ? 'border-orange-600 text-[#002147]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Multi-Modal Evidence Breakdown (फोरेंसिक विवरण)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('manifest')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
                activeTab === 'manifest'
                  ? 'border-orange-600 text-[#002147]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Cryptographic Audit JSON Manifest
            </button>
          </div>

          <div className="p-5 bg-white">
            {activeTab === 'diagnostics' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800">1. Cardiovascular Hemodynamics</div>
                  <div className="text-slate-500">Cardiac POS SNR: <strong>{scenario.rppg.snr}</strong></div>
                  <div className="text-slate-500">Peak Frequency: <strong>{scenario.rppg.peakFreq}</strong></div>
                  <div className="text-[11px] text-slate-600 mt-1">{scenario.rppg.description}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800">2. Aerodynamic Speech Physics</div>
                  <div className="text-slate-500">Phoneme-Viseme Lag: <strong>{scenario.sync.lagMs} ms</strong></div>
                  <div className="text-slate-500">Cross-Modal Correlation: <strong>{scenario.sync.correlation}</strong></div>
                  <div className="text-[11px] text-slate-600 mt-1">{scenario.sync.description}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800">3. Sensor &amp; Hardware Artifacts</div>
                  <div className="text-slate-500">Vocoder Cutoff: <strong>{scenario.spectral.cutoffKhz}</strong></div>
                  <div className="text-slate-500">CMOS PRNU Matched: <strong>{scenario.spectral.prnuMatched ? 'Yes' : 'No (Synthetic)'}</strong></div>
                  <div className="text-[11px] text-slate-600 mt-1">Ocular Fixation: {scenario.spectral.saccades}</div>
                </div>
              </div>
            )}

            {activeTab === 'manifest' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">
                    Official Section 65B Admissible Cryptographic Token:
                  </span>
                  <button
                    type="button"
                    onClick={copyManifest}
                    className="px-3 py-1 text-xs font-bold bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center space-x-1"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied' : 'Copy Manifest JSON'}</span>
                  </button>
                </div>

                <div className="bg-[#002147] text-slate-200 rounded-xl p-4 font-mono text-xs overflow-x-auto">
                  <pre>{JSON.stringify(
                    {
                      certificate_title: 'GOVERNMENT_OF_INDIA_FORENSIC_TRUST_RECEIPT',
                      receipt_id: scenario.id,
                      timestamp_utc: '2026-10-11T07:40:00.000Z',
                      target_amount: scenario.amount,
                      sender: scenario.sender,
                      beneficiary: scenario.beneficiary,
                      dpdp_act_2023: {
                        retention_policy: 'Linux tmpfs RAM-Only purged in < 3s',
                        persistent_disk_writes: 0,
                      },
                      bayesian_risk_score: scenario.riskScore,
                      telemetry_latency_ms: scenario.latencyMs,
                      sha256_manifest: scenario.sha256Manifest,
                    },
                    null,
                    2
                  )}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: Export PDF / Print Certificate & Back Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-200 gap-3 mt-6">
          <button
            type="button"
            onClick={onBackToScan}
            className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'hi' ? '← वापस बहु-आयामी जांच पर जाएं' : 'Back to Multi-Modal Inspection'}</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            {onOpenSection65B && (
              <button
                type="button"
                onClick={onOpenSection65B}
                className="px-4 py-2.5 bg-amber-50 border border-amber-300 hover:bg-amber-100 rounded-xl text-xs font-bold text-amber-950 transition-colors shadow-2xs flex items-center space-x-1.5 cursor-pointer"
                title="View and print statutory court admissibility certificate under Sec 65B IEA / Sec 63 BSA 2023"
              >
                <FileText className="w-4 h-4 text-amber-700" />
                <span>{lang === 'hi' ? '📜 धारा ६५बी न्यायालय शपथ पत्र' : '📜 Section 65B Court Affidavit'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleExportEvidence}
              className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-2xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>{t.exportPdfBtn}</span>
            </button>

            <button
              type="button"
              onClick={handlePrintCertificate}
              className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-2xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>{lang === 'hi' ? 'प्रमाण पत्र प्रिंट करें' : 'Print Official Certificate'}</span>
            </button>

            {/* Primary CTA: Official Government Button */}
            <button
              type="button"
              onClick={onProceedToDecision}
              className="inline-flex items-center space-x-2 px-7 py-3 bg-gradient-to-r from-[#002147] via-[#0D3B66] to-[#002147] hover:from-[#001733] hover:to-[#0D3B66] text-white font-extrabold text-sm rounded-xl shadow-md transition-all border-b-4 border-amber-500 cursor-pointer"
            >
              <span>{t.actionCta}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
