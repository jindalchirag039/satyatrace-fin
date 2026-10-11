import React from 'react';
import { Sliders, Video, SunMedium, Volume2 } from 'lucide-react';
import { JuryStressTest } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface JuryStressTestBarProps {
  stressTests: JuryStressTest;
  onChange: (updated: JuryStressTest) => void;
}

export const JuryStressTestBar: React.FC<JuryStressTestBarProps> = ({
  stressTests,
  onChange,
}) => {
  const { lang, t } = useLanguage();

  const toggleFilter = (key: keyof JuryStressTest) => {
    onChange({
      ...stressTests,
      [key]: !stressTests[key],
    });
  };

  return (
    <section aria-label="Jury Stress-Test Control Strip" className="bg-[#F8FAF9] border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        
        {/* Left: Jury Stress-Test Badge & Label */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold">
            <Sliders className="w-3.5 h-3.5 text-amber-800" />
            <span className="uppercase tracking-wider">{t.stressStripTitle}</span>
          </div>
          <span className="text-xs text-slate-600 hidden sm:inline">
            {t.stressStripSub}
          </span>
        </div>

        {/* Center/Right: 3 Interactive Stress Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Toggle 1: WhatsApp 360p Media Degradation Filter */}
          <button
            type="button"
            onClick={() => toggleFilter('compressionFilter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all border cursor-pointer ${
              stressTests.compressionFilter
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-orange-700 shadow-2xs ring-2 ring-orange-300/40'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title="Simulate WhatsApp VP8/H.264 360p bitrate reduction to test POS rPPG robustness"
          >
            <Video className={`w-3.5 h-3.5 ${stressTests.compressionFilter ? 'text-white' : 'text-slate-500'}`} />
            <span>{t.waFilter}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                stressTests.compressionFilter
                  ? 'bg-amber-900 text-amber-100'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {stressTests.compressionFilter ? (lang === 'hi' ? 'चालू (-18dB)' : 'ON (-18dB)') : (lang === 'hi' ? 'बंद' : 'OFF')}
            </span>
          </button>

          {/* Toggle 2: Low-Light Conditions Simulator */}
          <button
            type="button"
            onClick={() => toggleFilter('lowLightSimulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all border cursor-pointer ${
              stressTests.lowLightSimulator
                ? 'bg-[#002147] text-amber-300 border-[#001733] shadow-2xs ring-2 ring-amber-400/30'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title="Simulate underexposed facial regions (< 20 lux) to test malar tissue pulse extraction"
          >
            <SunMedium className={`w-3.5 h-3.5 ${stressTests.lowLightSimulator ? 'text-amber-400' : 'text-slate-500'}`} />
            <span>{t.lowLightFilter}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                stressTests.lowLightSimulator
                  ? 'bg-[#001733] text-amber-300'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {stressTests.lowLightSimulator ? '15 LUX' : (lang === 'hi' ? 'बंद' : 'OFF')}
            </span>
          </button>

          {/* Toggle 3: High Acoustic Noise Filter */}
          <button
            type="button"
            onClick={() => toggleFilter('highNoiseFilter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all border cursor-pointer ${
              stressTests.highNoiseFilter
                ? 'bg-red-600 text-white border-red-700 shadow-2xs ring-2 ring-red-400/40'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title="Inject +12dB ambient background babble noise to verify Wav2Vec 2.0 phoneme invariance"
          >
            <Volume2 className={`w-3.5 h-3.5 ${stressTests.highNoiseFilter ? 'text-white' : 'text-slate-500'}`} />
            <span>{t.noiseFilter}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                stressTests.highNoiseFilter
                  ? 'bg-red-900 text-red-100'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {stressTests.highNoiseFilter ? '+12 dB' : (lang === 'hi' ? 'बंद' : 'OFF')}
            </span>
          </button>

        </div>

      </div>
    </section>
  );
};
