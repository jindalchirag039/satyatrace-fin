import React from 'react';
import { Shield, Fish, CheckCircle2, Award, ExternalLink, Lock, Zap, Layers, Scale } from 'lucide-react';
import { NationalEmblem } from './NationalEmblem';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenTinyFish: () => void;
  currentStep: number;
  onStepClick: (step: number) => void;
  canNavigateTo: (step: number) => boolean;
  onOpenJuryTour?: () => void;
  onOpenArchitecture?: () => void;
  onOpenFaceOff?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTinyFish,
  currentStep,
  onStepClick,
  canNavigateTo,
  onOpenJuryTour,
  onOpenArchitecture,
  onOpenFaceOff,
}) => {
  const { lang, t } = useLanguage();

  const wizardSteps = [
    { id: 1, label: t.step1, path: '/intercept' },
    { id: 2, label: t.step2, path: '/inspect' },
    { id: 3, label: t.step3, path: '/proof' },
    { id: 4, label: t.step4, path: '/action' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      
      {/* 1. National Tricolor Accent Bar (6px Tiranga) */}
      <div
        className="h-1.5 w-full shadow-2xs"
        style={{
          background: 'linear-gradient(90deg, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)',
        }}
      />

      {/* 2. Official Government of India Masthead */}
      <div className="bg-white border-b border-slate-150 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Left: State Emblem of India + Official Bilingual Ministry Hierarchy */}
          <div className="flex items-center space-x-3.5">
            <NationalEmblem size={52} variant="gold" />
            
            <div className="border-l border-slate-200 pl-3.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-extrabold text-[#78350F] text-xs sm:text-sm tracking-wide">
                  {t.govOfIndia}
                </span>
                <span className="text-slate-300">|</span>
                <span className="font-bold text-[#002147] text-xs sm:text-sm tracking-wide">
                  {lang === 'hi' ? 'भारत सरकार' : 'GOVERNMENT OF INDIA'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-300 font-mono">
                  {lang === 'hi' ? 'आधिकारिक पोर्टल' : 'GOI Portal'}
                </span>
              </div>

              <div className="text-[11px] font-semibold text-slate-700 leading-tight mt-0.5">
                {t.mha} • {t.i4c}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {lang === 'hi'
                  ? 'भारतीय रिज़र्व बैंक (RBI) कोर बैंकिंग गेटवे प्रॉक्सी • राष्ट्रीय डीपफेक सुरक्षा ग्रिड'
                  : 'Reserve Bank of India (RBI) Core Banking Gateway Proxy • National Deepfake Defense Grid'}
              </div>
            </div>
          </div>

          {/* Right: National Badges & Jury Evaluation Tools */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            
            {/* Language Switcher Button in Sticky Header */}
            <LanguageSwitcher variant="light-header" />

            {/* 60s Jury Evaluation Tour Button */}
            {onOpenJuryTour && (
              <button
                type="button"
                onClick={onOpenJuryTour}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 hover:brightness-105 shadow-sm transition-all border border-amber-400 animate-pulse"
                title="Start automated 60-second guided evaluation walkthrough for hackathon judges"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>{t.juryTourBtn}</span>
              </button>
            )}

            {/* Architecture Blueprint Modal Button */}
            {onOpenArchitecture && (
              <button
                type="button"
                onClick={onOpenArchitecture}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white text-[#002147] border border-slate-300 hover:bg-slate-50 shadow-2xs transition-colors"
                title="View Finacle / CBS Core Banking Proxy Architecture Blueprint"
              >
                <Layers className="w-3.5 h-3.5 text-blue-700" />
                <span>{t.cbsBlueprintBtn}</span>
              </button>
            )}

            {/* Traditional Banks vs SatyaTrace Face-Off */}
            {onOpenFaceOff && (
              <button
                type="button"
                onClick={onOpenFaceOff}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-2xs transition-colors"
                title="View Traditional Banking vs SatyaTrace-FIN Vulnerability Matrix"
              >
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.whyBanksFailBtn}</span>
              </button>
            )}

            {/* DPDP Act 2023 Statutory Compliance Stamp */}
            <div className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{t.dpdpBadge}</span>
            </div>

            {/* TinyFish Web Agent Engine */}
            <button
              type="button"
              onClick={onOpenTinyFish}
              className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 text-indigo-900 border border-indigo-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs"
              title="Inspect autonomous 1930 portal dispatch agent"
            >
              <Fish className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.tinyFishBtn}</span>
            </button>

          </div>

        </div>
      </div>

      {/* 3. Sub-Header: SatyaTrace-FIN Brand & Tricolor Step Wizard */}
      <div className="bg-[#FAFBFB] px-4 sm:px-6 lg:px-8 py-2.5 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Brand Title with Tricolor Tag */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-0.5 shadow-2xs flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center font-black text-[#002147] text-xs">
                सत्य
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-black text-[#002147] text-base sm:text-lg tracking-tight leading-none">
                  SatyaTrace<span className="text-[#FF9933] font-black">-FIN</span>
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                  {t.nodeLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {t.gatewayTagline}
              </p>
            </div>
          </div>

          {/* 4-Step Interactive Tricolor Security Wizard */}
          <nav aria-label="Workflow Steps" className="flex items-center space-x-1 sm:space-x-2 bg-white border border-slate-300 rounded-full px-2.5 py-1 text-xs shadow-2xs overflow-x-auto">
            {wizardSteps.map((st) => {
              const isActive = currentStep === st.id;
              const isPast = currentStep > st.id;
              const isClickable = canNavigateTo(st.id);

              return (
                <button
                  key={st.id}
                  type="button"
                  disabled={!isClickable}
                  onClick={() => onStepClick(st.id)}
                  className={`px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all text-xs font-bold whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-xs'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                      : isClickable
                      ? 'text-slate-600 hover:bg-slate-100'
                      : 'text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                      isActive
                        ? 'bg-white text-orange-700'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isPast ? '✓' : st.id}
                  </span>
                  <span>{st.label}</span>
                </button>
              );
            })}
          </nav>

        </div>
      </div>

    </header>
  );
};
