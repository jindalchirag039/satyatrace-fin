import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Octagon,
  Zap,
  RotateCcw,
  Download,
  Loader2,
  ChevronLeft,
  Clock,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { ForensicScenario } from '../types';
import { executeTinyFish1930Dispatch, TinyFishAgentRunResponse } from '../services/tinyfishService';
import { useLanguage } from '../context/LanguageContext';

interface Step4DecisioningProps {
  scenario: ForensicScenario;
  onReset: () => void;
  onBackToReceipt: () => void;
  onOpenTinyFishModal: () => void;
  onLogMessage?: (level: 'info' | 'warn' | 'error' | 'success' | 'dpdp', tag: string, msg: string) => void;
}

export const Step4Decisioning: React.FC<Step4DecisioningProps> = ({
  scenario,
  onReset,
  onBackToReceipt,
  onOpenTinyFishModal,
  onLogMessage,
}) => {
  const { lang, t } = useLanguage();
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<TinyFishAgentRunResponse | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  // Live Golden Window 15-Minute Countdown Timer (900 seconds)
  const [countdownSeconds, setCountdownSeconds] = useState(900);

  useEffect(() => {
    if (scenario.tier === 'high') {
      const timer = setInterval(() => {
        setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [scenario.tier]);

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handle1930Dispatch = async () => {
    setIsDispatching(true);
    onLogMessage?.('info', 'API 1930', `Dispatching cryptographic bundle #${scenario.id} to National 1930 Cybercrime Portal API via TinyFish...`);

    try {
      const res = await executeTinyFish1930Dispatch({
        url: 'https://cybercrime.gov.in/Webform/IncidentReporting.aspx',
        goal: `Auto-dispatch forensic escrow pack #${scenario.id} to 1930 API`,
        evidenceId: scenario.id,
        beneficiaryAccount: scenario.beneficiary,
        amount: scenario.amount,
        evidenceHash: scenario.sha256Manifest,
      });

      setDispatchResult(res);
      setShowToast(true);
      onLogMessage?.('success', 'API 1930', `Evidence Bundle #${scenario.id} ingested into 1930 Portal API in 24 seconds. Incident Ticket: ${res.ticketId}`);
      onLogMessage?.('warn', 'MULE LIEN', `Inter-bank temporary lien locked on ${scenario.beneficiary}. Escrow quarantine enforced.`);
    } finally {
      setIsDispatching(false);
    }
  };

  const handleExportEvidencePack = () => {
    const data = {
      title: 'CERTIFIED_FINANCIAL_FORENSIC_EVIDENCE_BUNDLE',
      system: 'SatyaTrace-FIN Gateway v2.4 (National Pre-Transaction Defense)',
      scenario,
      dispatch: dispatchResult,
      timestamp: new Date().toISOString(),
      compliance: {
        dpdp_act_2023: 'Section 8 Compliant',
        ram_only: true,
        zero_retention_verified: true,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SatyaTrace_Govt_Evidence_${scenario.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Live Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-900 text-white px-5 py-3.5 rounded-xl shadow-xl border-2 border-emerald-400 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="text-xs">
            <div className="font-extrabold text-sm text-emerald-100">
              राष्ट्रीय १९३० पोर्टल में सफलतापूर्वक दर्ज (Successfully Ingested)
            </div>
            <div className="font-mono text-emerald-200">
              Evidence Bundle #{scenario.id} Ingested into 1930 Portal API in 24 seconds
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="ml-2 text-emerald-300 hover:text-white font-bold text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Primary Decisioning Outcome Card with Tricolor Ribbon */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        
        {/* Tricolor Ribbon */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: 'linear-gradient(90deg, #FF9933 0%, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%, #138808 100%)',
          }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 pt-1">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-xs font-bold mb-2 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>{lang === 'hi' ? 'चरण ०४ / ०४' : 'Step 04 of 04'}</span>
              <span>•</span>
              <span>/action — {lang === 'hi' ? 'स्वचालित गेटवे नीति निष्पादन' : 'Automated Gateway Policy Execution'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#002147] tracking-tight">
              {t.step4Heading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t.step4Sub}
            </p>
          </div>

          {/* Outcome Pill */}
          <div>
            {scenario.tier === 'low' && (
              <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center space-x-2 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>{lang === 'hi' ? 'सीधा क्लियरेंस पास — धनराशि प्रेषित' : 'STRAIGHT-THROUGH CLEARANCE — FUNDS DISPATCHED'}</span>
              </div>
            )}
            {scenario.tier === 'med' && (
              <div className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center space-x-2 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                <span>{lang === 'hi' ? 'अतिरिक्त चुनौती सक्रिय — आधार ओटीपी प्रेषित' : 'STEP-UP CHALLENGE TRIGGERED — AADHAAR OTP SENT'}</span>
              </div>
            )}
            {scenario.tier === 'high' && (
              <div className="px-4 py-2 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-bold flex items-center space-x-2 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span>{lang === 'hi' ? '१५-मिनट प्रतिवर्ती एस्क्रो संगरोध' : '15-MIN REVERSIBLE ESCROW QUARANTINE'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tri-Color Gateway Policy Matrix */}
        <div className="mt-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#002147] mb-3">
            Tri-Color Gateway Policy Matrix (त्रि-रंग गेटवे नीति मैट्रिक्स)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Green Tier (< 15% Risk) */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                scenario.tier === 'low'
                  ? 'border-2 border-emerald-600 bg-emerald-50/60 shadow-2xs'
                  : 'border-slate-200 bg-slate-50 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-800 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mr-1.5" />
                  Green Tier (&lt; 15%)
                </span>
                <span className="text-[11px] font-mono text-slate-500">Instant Release</span>
              </div>
              <h4 className="font-bold text-[#002147] text-sm">Instant CBS Dispatch Token</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Authentic human physiological presence confirmed across all invariant checks. Finacle clearance token issued instantly with 0 friction.
              </p>
            </div>

            {/* Amber Tier (15% - 65% Risk) */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                scenario.tier === 'med'
                  ? 'border-2 border-amber-600 bg-amber-50/60 shadow-2xs'
                  : 'border-slate-200 bg-slate-50 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-amber-800 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-600 mr-1.5" />
                  Amber Tier (15–65%)
                </span>
                <span className="text-[11px] font-mono text-slate-500">Step-Up Challenge</span>
              </div>
              <h4 className="font-bold text-[#002147] text-sm">Dynamic Out-of-Band Auth</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Borderline confidence due to lighting/compression. Triggers out-of-band Aadhaar OTP or Reverse IVR without false accusations.
              </p>
            </div>

            {/* Red Tier (> 65% Risk) */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                scenario.tier === 'high'
                  ? 'border-2 border-red-600 bg-red-50/60 shadow-2xs'
                  : 'border-slate-200 bg-slate-50 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-red-800 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-600 mr-1.5 animate-ping" />
                  Red Tier (&gt; 65%)
                </span>
                <span className="text-[11px] font-mono font-bold text-red-700">Escrow Quarantine</span>
              </div>
              <h4 className="font-bold text-[#002147] text-sm">15-Min Reversible Escrow</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Definite synthetic deepfake markers. Capital held in reversible bank escrow to halt money laundering before mule dispersal.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Action Execution Details Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        
        {/* Tier: LOW */}
        {scenario.tier === 'low' && (
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg flex-shrink-0 border border-emerald-300">
              <CheckCircle className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-bold text-[#002147] text-base">Instant Core Banking Clearance Dispatched</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero-touch legitimate customer pass. Finacle Release Token issued. Transaction of <strong>₹{scenario.amount}</strong> dispatched directly to {scenario.beneficiary}.
              </p>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-slate-700 space-y-1">
                <div>
                  CBS_CLEARANCE_TOKEN: <span className="text-[#002147] font-bold">FINACLE-REL-2026-TOKEN-88192</span>
                </div>
                <div>
                  RBI_DPDP_STATUS: <span className="text-emerald-700 font-bold">AUTHENTIC_HUMAN_CONFIRMED</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tier: MED */}
        {scenario.tier === 'med' && (
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg flex-shrink-0 border border-amber-300">
              <AlertTriangle className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-3 flex-1">
              <div>
                <h3 className="font-bold text-[#002147] text-base">Dynamic Out-of-Band Verification Challenge</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Borderline confidence score ({scenario.riskScore}/100) due to optical compression. Triggered out-of-band verification to avoid false accusations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-xs">
                  <div className="font-bold text-amber-900 mb-1">1. Aadhaar UIDAI OTP Dispatch</div>
                  <div className="text-slate-600 mb-2">
                    Dispatched to registered mobile (*** *** 8291). Funds remain buffered until OTP is submitted.
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="681920"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="px-2.5 py-1 text-xs border border-amber-300 rounded bg-white w-28 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setOtpVerified(true)}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-semibold"
                    >
                      Verify
                    </button>
                    {otpVerified && <span className="text-emerald-700 font-bold">✓ Verified</span>}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div className="font-bold text-slate-800 mb-1">2. Automated Reverse IVR Callback</div>
                  <div className="text-slate-600 mb-2">
                    Simultaneous voice call initiated to confirm transaction authorization out-of-band.
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Reverse IVR Dialed: Call connected to corporate landline.')}
                    className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold"
                  >
                    Dial IVR Callback
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tier: HIGH */}
        {scenario.tier === 'high' && (
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg flex-shrink-0 border border-red-300">
              <Octagon className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="font-bold text-[#002147] text-base">
                  Escrow Quarantine Activated (₹{scenario.amount})
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Definite synthetic deepfake markers identified: absent cardiac hemodynamics, severe phoneme-viseme lag, and HiFi-GAN phase cutoff. Funds locked in 15-minute reversible bank escrow to prevent mule dispersal.
                </p>
              </div>

              {/* Live Golden Window Countdown Timer */}
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold shadow-2xs">
                    <Clock className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-800 block">
                      Golden Window Countdown Timer (गोल्डन विंडो टाइमर)
                    </span>
                    <span className="text-xs text-red-900 font-semibold">
                      15:00 Reversible Escrow Active — Funds Frozen in Bank Perimeter
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-red-300 shadow-2xs self-start sm:self-auto">
                  <span className="text-xs font-bold text-slate-600">Remaining:</span>
                  <span className="text-xl font-black font-mono text-red-600">
                    {formatCountdown(countdownSeconds)}
                  </span>
                </div>
              </div>

              {/* Direct Action Button: 1-Click Direct Dispatch Evidence Package to National 1930 Cybercrime Portal API */}
              <div className="p-4 bg-[#002147] text-white rounded-xl space-y-3 shadow-sm border border-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      National Cybercrime 1930 Defense Integration (१९३० पोर्टल एकीकरण)
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Auto-dispatch signed cryptographic evidence pack to the National Cybercrime Portal (I4C) API via TinyFish Web Agent.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handle1930Dispatch}
                    disabled={isDispatching || dispatchResult !== null}
                    className="px-5 py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-2 flex-shrink-0 disabled:opacity-80 border-b-2 border-red-900"
                  >
                    {isDispatching ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{lang === 'hi' ? 'टाइनीफिश द्वारा प्रेषित हो रहा है...' : 'Dispatching via TinyFish...'}</span>
                      </>
                    ) : dispatchResult ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                        <span>{lang === 'hi' ? '१९३० पोर्टल में प्रेषित' : 'Dispatched to 1930 Portal'}</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        <span>{t.dispatch1930Btn}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Dispatch Results Box */}
                {dispatchResult && (
                  <div className="p-3 bg-[#0A192F] rounded-lg border border-slate-700 text-xs font-mono space-y-1 text-slate-200">
                    <div className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>DISPATCHED TO I4C 1930 CYBERCRIME PORTAL VIA TINYFISH AGENT</span>
                    </div>
                    <div>
                      INCIDENT_TICKET_ID: <span className="font-semibold text-white">{dispatchResult.ticketId}</span>
                    </div>
                    <div>
                      BENEFICIARY_MULE_LIEN:{' '}
                      <span className="text-red-400 font-semibold">{dispatchResult.muleAccountLienStatus}</span>
                    </div>
                    <div>
                      EVIDENCE_HASH:{' '}
                      <span className="text-amber-400 text-[11px]">
                        {scenario.sha256Manifest.substring(0, 32)}...
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>
                  Bank L2 SOC Escalation: <strong>Ticket #SOC-8911 Auto-Assigned</strong>
                </span>
                <span className="text-slate-600">
                  Lien Protection: <strong className="text-emerald-700 font-mono">NPCI Stop-Payment Protocol Active</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Navigation Footer with Reset Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-200 gap-3">
        <button
          type="button"
          onClick={onBackToReceipt}
          className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? '← विश्वास रसीद की समीक्षा करें' : 'Review Cryptographic Trust Receipt'}</span>
        </button>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleExportEvidencePack}
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-2xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>{lang === 'hi' ? 'प्रमाणित साक्ष्य पैक डाउनलोड करें' : 'Download Certified Evidence Pack'}</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-[#002147] to-[#0D3B66] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md transition-all border-b-2 border-amber-500 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-300" />
            <span>{t.resetBtn}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
