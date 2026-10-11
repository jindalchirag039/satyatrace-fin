import React from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'blue-portal' | 'light-header';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'blue-portal',
  className = '',
}) => {
  const { lang, setLang } = useLanguage();

  if (variant === 'blue-portal') {
    return (
      <div className={`flex items-center space-x-1.5 bg-[#006699] p-1 rounded-lg border border-white/30 text-xs shadow-xs ${className}`}>
        <Globe className="w-3.5 h-3.5 text-amber-300 ml-1" />
        <div className="flex items-center space-x-1 bg-[#004d73] p-0.5 rounded-md">
          <button
            type="button"
            onClick={() => setLang('hi')}
            className={`px-2 py-0.5 rounded text-[11px] font-extrabold transition-all cursor-pointer ${
              lang === 'hi'
                ? 'bg-amber-400 text-slate-950 shadow-sm scale-105'
                : 'text-white hover:text-amber-200 hover:bg-white/10'
            }`}
            title="सम्पूर्ण ऐप हिन्दी में देखें"
          >
            हिन्दी
          </button>
          <span className="text-white/40 text-[10px]">|</span>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-2 py-0.5 rounded text-[11px] font-extrabold transition-all cursor-pointer ${
              lang === 'en'
                ? 'bg-amber-400 text-slate-950 shadow-sm scale-105'
                : 'text-white hover:text-amber-200 hover:bg-white/10'
            }`}
            title="View entire app in English"
          >
            English
          </button>
        </div>
      </div>
    );
  }

  // Light Header Variant (Sticky Sub-bar)
  return (
    <div className={`inline-flex items-center space-x-1 bg-white border border-slate-300 rounded-lg p-0.5 shadow-2xs text-xs ${className}`}>
      <Globe className="w-3.5 h-3.5 text-blue-600 ml-1" />
      <button
        type="button"
        onClick={() => setLang('hi')}
        className={`px-2 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
          lang === 'hi'
            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
        title="हिन्दी भाषा चुनें"
      >
        हिन्दी
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
          lang === 'en'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
        title="Choose English language"
      >
        English
      </button>
    </div>
  );
};
