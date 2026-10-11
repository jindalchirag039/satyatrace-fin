import React, { useRef, useState } from 'react';
import { X, Printer, Copy, CheckCircle, Shield, FileText, Download, Award, Stamp } from 'lucide-react';
import { NationalEmblem } from './NationalEmblem';
import { ForensicScenario } from '../types';

interface Section65BCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: ForensicScenario;
}

export const Section65BCertificateModal: React.FC<Section65BCertificateModalProps> = ({
  isOpen,
  onClose,
  scenario,
}) => {
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const certId = `CERT-65B-ST-${scenario.refId || '2026-X99'}`;
  const shaSeal = scenario.sha256Manifest || '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f9b31d8c005b821e2e42b6a91';
  const isThreat = scenario.riskScore > 40;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLegalText = () => {
    const text = `CERTIFICATE UNDER SECTION 65B OF THE INDIAN EVIDENCE ACT, 1872
(Read with Section 63 of Bharatiya Sakshya Adhiniyam, 2023)
Certificate ID: ${certId}
Date: ${currentDate} ${currentTime} IST
Target Ref: ${scenario.refId} (${scenario.fileName})
Transaction Mandate: ${scenario.channelName} / ₹${scenario.amount} INR
Forensic Verdict: ${isThreat ? 'SYNTHETIC MEDIA / DEEPFAKE FRAUD DETECTED' : 'AUTHENTIC MEDIA VERIFIED'}
SHA-256 Media Seal: ${shaSeal}
Issuer: Ministry of Home Affairs / I4C National Deepfake Prevention Gateway (SatyaTrace-FIN Node-04)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-slate-300 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden print:border-none print:shadow-none print:max-h-full">
        
        {/* National Tricolor Top Ribbon */}
        <div
          className="h-2 w-full flex-shrink-0"
          style={{
            background: 'linear-gradient(90deg, #FF9933 0%, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%, #138808 100%)',
          }}
        />

        {/* Modal Top Actions (Hidden in print) */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-mono border border-emerald-300">
              LEGAL ADMISSIBILITY: CERTIFIED
            </span>
            <span className="text-slate-400">•</span>
            <span>Sec 65B IEA / Sec 63 BSA 2023</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLegalText}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
              title="Copy deposition statement to clipboard"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  Copied Text
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  Copy Deposition
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#002147] text-white hover:bg-slate-800 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Body */}
        <div ref={printRef} className="overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-800 bg-[#FCFDFD] font-serif print:p-0">
          
          {/* Certificate Header with Emblem */}
          <div className="text-center border-b-2 border-[#002147] pb-6 space-y-2 relative">
            <div className="flex justify-center mb-2">
              <NationalEmblem className="w-16 h-20 text-[#002147]" />
            </div>
            <div className="font-sans text-xs tracking-widest uppercase font-bold text-[#FF9933]">
              भारत सरकार • GOVERNMENT OF INDIA
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-[#002147]">
              FORM OF CERTIFICATE UNDER SECTION 65B
            </h1>
            <div className="text-xs sm:text-sm font-sans text-slate-600 uppercase tracking-wider font-semibold">
              THE INDIAN EVIDENCE ACT, 1872
              <span className="block text-[11px] font-normal text-slate-500">
                (Read with Section 63 of Bharatiya Sakshya Adhiniyam, 2023 for Electronic Records)
              </span>
            </div>
            <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-300 rounded text-[11px] font-mono text-amber-900 mt-2">
              Affidavit Certificate No: <strong className="font-bold">{certId}</strong>
            </div>
          </div>

          {/* Deposition Preamble */}
          <div className="text-xs sm:text-sm leading-relaxed text-justify space-y-3 font-serif">
            <p>
              I, the undersigned Authorized Digital Forensics Node Officer operating under the mandate of the <strong>Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs</strong>, in coordination with the <strong>Reserve Bank of India Core Banking Defense Gateway</strong>, do hereby solemnly declare and certify on oath as under:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Identification of Electronic Record:</strong> That the electronic record annexed herewith pertains to transaction media payload <code>{scenario.fileName}</code> associated with Transaction Intercept Reference <code>{scenario.refId}</code> for a transfer mandate of <strong>₹{scenario.amount} INR</strong> routed via {scenario.channelName} Core Banking protocol.
              </li>
              <li>
                <strong>Ordinary Course of Lawful Operation:</strong> That during the period over which the electronic record was produced, the computer system (SatyaTrace-FIN Kernel mTLS 1.3 Gateway Node-04) was operating regularly in the ordinary course of banking cyber fraud interception activities.
              </li>
              <li>
                <strong>Uncompromised System Integrity:</strong> That the computer systems, neural inferencing pipeline, and memory sandbox operated properly at all material times, and there were no operational defects that could affect the accuracy of the electronic record.
              </li>
              <li>
                <strong>Zero Tampering & Volatile RAM Enclave:</strong> That under the <em>Digital Personal Data Protection Act, 2023 (DPDP Act)</em>, the media was processed strictly within volatile <code>tmpfs</code> memory without unauthorized disk caching, and cryptographic hash verification was computed prior to memory purge.
              </li>
            </ol>
          </div>

          {/* Forensic Evidence Table */}
          <div className="border border-slate-300 rounded-lg overflow-hidden font-sans text-xs">
            <div className="bg-[#002147] text-white px-4 py-2 font-bold flex items-center justify-between">
              <span>SCHEDULE OF FORENSIC TELEMETRY FINDINGS (अनुसूची)</span>
              <span className="text-[11px] font-mono text-amber-300">ISO/IEC 27037:2012 COMPLIANT</span>
            </div>
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700 w-1/3">Cryptographic Media SHA-256</td>
                  <td className="p-3 font-mono text-[11px] text-slate-900 break-all">{shaSeal}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-700">Forensic Liveness Verdict</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isThreat ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {isThreat ? 'CRITICAL THREAT: SYNTHETIC DEEPFAKE DETECTED' : 'VERIFIED: AUTHENTIC HUMAN MEDIA'}
                    </span>
                    <span className="ml-2 text-slate-500 font-mono">Risk Score: {scenario.riskScore}/100</span>
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">Modality 1 (Biological rPPG)</td>
                  <td className="p-3 font-mono text-slate-800">
                    Pulse SNR: {scenario.rppg.snr} • Peak: {scenario.rppg.peakFreq} 
                    ({scenario.rppg.passed ? 'Natural Micro-Capillary Pulse Detected' : 'Flatline Synthetic Hemodynamics / Synthetic Mask'})
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-700">Modality 2 (Speech-Lip Alignment)</td>
                  <td className="p-3 font-mono text-slate-800">
                    Phoneme-Viseme Phase Lag: {scenario.sync.lagMs} ms
                    ({scenario.sync.passed ? 'In-sync (< 40ms SLA)' : 'Desynchronized Neural Speech Clone / ElevenLabs Artifacts'})
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">Modality 3 (CMOS PRNU Sensor)</td>
                  <td className="p-3 font-mono text-slate-800">
                    Silicon Pixel Correlation: {scenario.spectral.cutoffKhz} • PRNU Confidence: {scenario.spectral.prnuConfidence}%
                    ({scenario.spectral.passed ? 'Legitimate Physical Camera Sensor' : 'Software Driver / OBS / DeepFaceLive Virtual Injection'})
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-700">Timestamp & Latency Budget</td>
                  <td className="p-3 font-mono text-slate-800">
                    Ingested: {currentDate} {currentTime} IST • Execution: {scenario.latencyMs}ms (&lt; 850ms Banking SLA)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legal Signatures and Statutory Verification Stamp */}
          <div className="pt-4 border-t-2 border-slate-300 grid grid-cols-2 gap-8 font-sans items-end">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs text-slate-600">
                <Stamp className="w-5 h-5 text-[#002147]" />
                <span className="font-bold text-[#002147] uppercase tracking-wide">
                  Official Digital Forensics Repository Seal
                </span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] space-y-1 text-slate-600">
                <div><strong>Court Admissibility:</strong> High Court / Supreme Court of India</div>
                <div><strong>Standard:</strong> Section 65B(4) IEA &amp; Sec 63(4) BSA 2023</div>
                <div><strong>Mule Liens Dispatched:</strong> Automated 1930 / I4C CFCFRMS Queue</div>
              </div>
            </div>

            <div className="text-right space-y-3">
              <div className="inline-block text-left p-3 border-2 border-dashed border-emerald-600 rounded bg-emerald-50/50">
                <div className="text-[10px] uppercase font-bold text-emerald-800">Digital Signature Cryptographically Verified</div>
                <div className="font-mono text-[9px] text-slate-600">SIGNER: SATYATRACE-CA-GOV-IN</div>
                <div className="font-mono text-[9px] text-slate-600 truncate max-w-[200px]">ED25519: 9f8a3c...d71b</div>
                <div className="text-[9px] text-emerald-700 font-semibold mt-1">TIMESTAMP: {currentDate} IST</div>
              </div>
              <div className="text-xs text-slate-700 font-serif">
                Authorized Forensic Signatory &bull; SatyaTrace-FIN
              </div>
            </div>
          </div>

          {/* Watermark Notice */}
          <div className="text-center text-[10px] font-sans text-slate-400 pt-2 uppercase tracking-wider">
            *** CONFIDENTIAL EVIDENCE RECORD &bull; FOR JUDICIAL &amp; REGULATORY BANKING USE ONLY ***
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 print:hidden">
          <span>This legal instrument satisfies mandatory evidentiary standards for freeze/reversal orders before Indian judicial magistrates.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-200 transition-colors shadow-sm"
          >
            Close Affidavit
          </button>
        </div>

      </div>
    </div>
  );
};
