import React, { useState, useEffect } from 'react';
import { Play, Pause, X, ChevronRight, ChevronLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface JuryAutoTourBannerProps {
  isActive: boolean;
  onClose: () => void;
  onNavigateStep: (stepNumber: number) => void;
  currentWizardStep: number;
  onOpenSection65B?: () => void;
  onOpenArchitecture?: () => void;
}

interface TourStepInfo {
  step: number;
  title: string;
  badge: string;
  description: string;
  keyHighlight: string;
}

const TOUR_STEPS: TourStepInfo[] = [
  {
    step: 1,
    title: 'Pre-Transaction Channel Inception',
    badge: 'Step 1 of 4: Inbound Proxy',
    description: 'Intercepts high-value RTGS (> ₹50L), vKYC video sessions, and WhatsApp voice notes before ledger settlement.',
    keyHighlight: 'Try the 1-click Attack Demos (CEO Voice Clone or vKYC Virtual Camera Injection) below.',
  },
  {
    step: 2,
    title: 'Parallel Tri-Modal Forensic Inspection',
    badge: 'Step 2 of 4: < 850ms Telemetry',
    description: 'Executes rPPG biological pulse extraction, Wav2Vec 2.0 phoneme-viseme lag, and CMOS PRNU silicon noise checks concurrently.',
    keyHighlight: 'Watch the live telemetry gauges and dual canvas waveform tracking micro-capillary blood pulses in real time.',
  },
  {
    step: 3,
    title: 'Cryptographic Trust Receipt & Section 65B Affidavit',
    badge: 'Step 3 of 4: Tamper-Proof Audit',
    description: 'Calculates Bayesian risk score (0-100) and binds all telemetry to an immutable SHA-256 cryptographic seal.',
    keyHighlight: 'Complies with Section 65B Indian Evidence Act / Sec 63 BSA 2023 for direct court admissibility.',
  },
  {
    step: 4,
    title: '15-Min Reversible Escrow & 1930 Cybercrime Escalation',
    badge: 'Step 4 of 4: Pre-Ledger Defense',
    description: 'Freezes flagged funds in a reversible escrow vault rather than letting them drain to mule accounts, then dispatches evidence to I4C.',
    keyHighlight: 'Features 1-click TinyFish AI Agent automated incident dispatch to the National 1930 Portal.',
  },
];

export const JuryAutoTourBanner: React.FC<JuryAutoTourBannerProps> = ({
  isActive,
  onClose,
  onNavigateStep,
  currentWizardStep,
  onOpenSection65B,
  onOpenArchitecture,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTourIndex, setCurrentTourIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(15);

  useEffect(() => {
    if (!isActive) return;
    // Sync tour step with wizard step
    setCurrentTourIndex(Math.max(0, Math.min(3, currentWizardStep - 1)));
  }, [currentWizardStep, isActive]);

  useEffect(() => {
    if (!isActive || !isPlaying) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Advance to next tour step
          setCurrentTourIndex((curr) => {
            const nextIdx = (curr + 1) % TOUR_STEPS.length;
            onNavigateStep(TOUR_STEPS[nextIdx].step);
            return nextIdx;
          });
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isPlaying, onNavigateStep]);

  if (!isActive) return null;

  const currentInfo = TOUR_STEPS[currentTourIndex];

  const handleNext = () => {
    const nextIdx = (currentTourIndex + 1) % TOUR_STEPS.length;
    setCurrentTourIndex(nextIdx);
    onNavigateStep(TOUR_STEPS[nextIdx].step);
    setSecondsRemaining(15);
  };

  const handlePrev = () => {
    const prevIdx = (currentTourIndex - 1 + TOUR_STEPS.length) % TOUR_STEPS.length;
    setCurrentTourIndex(prevIdx);
    onNavigateStep(TOUR_STEPS[prevIdx].step);
    setSecondsRemaining(15);
  };

  return (
    <div className="bg-[#002147] text-white border-b-2 border-amber-500 shadow-xl relative z-40 animate-fadeIn">
      {/* Tricolor Mini Top Bar */}
      <div
        className="h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, #FF9933 0%, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%, #138808 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Left: Step Info */}
          <div className="flex items-start space-x-3 flex-1">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5 shadow-md">
              {currentInfo.step}/4
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                  {currentInfo.badge}
                </span>
                <span className="text-slate-400 text-xs">&bull;</span>
                <span className="text-xs font-bold text-white">
                  {currentInfo.title}
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5 leading-snug">
                {currentInfo.description}{' '}
                <span className="text-amber-300 font-semibold">{currentInfo.keyHighlight}</span>
              </p>
            </div>
          </div>

          {/* Right: Controls & Progress */}
          <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-end flex-shrink-0 pt-2 md:pt-0 border-t border-slate-700 md:border-none">
            
            {/* Countdown Badge */}
            <div className="flex items-center space-x-1.5 px-2 py-1 rounded bg-slate-800/80 border border-slate-600 text-[11px] font-mono text-slate-300">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-amber-400 transition-colors"
                title={isPlaying ? 'Pause Auto-Advance' : 'Resume Auto-Advance'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <span>{isPlaying ? `${secondsRemaining}s` : 'PAUSED'}</span>
            </div>

            {/* Prev / Next buttons */}
            <button
              onClick={handlePrev}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1 transition-colors shadow-sm"
              title="Next Step"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Quick Modals Shortcuts */}
            {onOpenSection65B && (
              <button
                onClick={onOpenSection65B}
                className="hidden lg:inline-flex items-center px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-amber-300 border border-amber-500/40"
              >
                Sec 65B Proof
              </button>
            )}

            {onOpenArchitecture && (
              <button
                onClick={onOpenArchitecture}
                className="hidden lg:inline-flex items-center px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-blue-300 border border-blue-500/40"
              >
                Topology
              </button>
            )}

            {/* Exit Tour */}
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors ml-2"
              title="Exit Tour"
            >
              <X className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};
