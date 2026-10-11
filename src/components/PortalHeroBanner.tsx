import React, { useState } from 'react';
import { Shield, ChevronRight, ChevronLeft, Zap, Layers, Globe } from 'lucide-react';
import { NationalEmblem } from './NationalEmblem';
import { LeaderPortrait } from './LeaderPortrait';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

interface PortalHeroBannerProps {
  onStartGateway: () => void;
  onStartJuryTour: () => void;
  onOpenArchitecture: () => void;
  onOpenFaceOff: () => void;
}

export const PortalHeroBanner: React.FC<PortalHeroBannerProps> = ({
  onStartGateway,
  onStartJuryTour,
  onOpenArchitecture,
  onOpenFaceOff,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const { lang, t } = useLanguage();

  const slides = [
    {
      badge: lang === 'hi' ? 'राष्ट्रीय प्री-ट्रांजेक्शन वित्तीय साइबर सुरक्षा गेटवे' : 'NATIONAL PRE-TRANSACTION CYBER DEFENSE',
      title: lang === 'hi' ? 'राष्ट्रीय प्री-ट्रांजेक्शन वित्तीय डीपफेक सुरक्षा गेटवे' : 'SatyaTrace-FIN Pre-Transaction Deepfake Defense Gateway',
      subtitle: lang === 'hi'
        ? 'कोर बैंकिंग खाता निपटान से पहले एआई वॉयस क्लोन, ओबीएस वर्चुअल कैमरा एवं वित्तीय धोखाधड़ी को < ८५० मिलीसेकंड में रोकने वाली बायोमेट्रिक एवं ध्वनिक सुरक्षा प्रणाली।'
        : 'Sub-second (< 850ms) biometric & acoustic intercept stopping AI voice clones, OBS virtual cameras, and CEO wire fraud before core banking ledger settlement.',
    },
    {
      badge: lang === 'hi' ? 'डीपीडीपी अधिनियम २०२३ विधिक अनुपालन' : 'DPDP ACT 2023 STATUTORY COMPLIANCE',
      title: lang === 'hi' ? 'अस्थायी रैम सैंडबॉक्स • शून्य बायोमेट्रिक भंडारण' : 'Ephemeral tmpfs RAM Sandbox (Zero Biometric Disk Storage)',
      subtitle: lang === 'hi'
        ? 'डीपीडीपी अधिनियम २०२३ की धारा ८ का पूर्ण अनुपालन। सभी वीडियो एवं ऑडियो फ्रेम < ३.० सेकंड में वोलेटाइल मेमोरी से नष्ट, साक्ष्य अधिनियम धारा ६५बी न्यायालय मुहर सहित।'
        : 'Fully compliant with Section 8 DPDP Act 2023. All video/audio frames purged from volatile memory in < 3.0 seconds with tamper-proof SHA-256 Section 65B court seal.',
    },
    {
      badge: lang === 'hi' ? 'फ़िनेकल एवं कोर बैंकिंग एकीकरण' : 'FINACLE & CORE BANKING INTEGRATION',
      title: lang === 'hi' ? '१५-मिनट प्रतिवर्ती एस्क्रो संगरोध प्रणाली' : '15-Minute Reversible Escrow Quarantine Vault',
      subtitle: lang === 'hi'
        ? 'फ़िनेकल, टीसीएस बैंक्स एवं एसएपी हेतु गैर-आक्रामक mTLS १.३ प्रॉक्सी। संदिग्ध धन बैंक परिधि में ही रोककर ₹२.५ करोड़ का स्थायी नुकसान शून्य किया जाता है।'
        : 'Non-invasive mTLS 1.3 sidecar proxy for Finacle, TCS BaNCS, and SAP. Flagged transfers held within bank perimeter, preventing ₹2.5 Cr permanent capital loss.',
    },
  ];

  const currentSlide = slides[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full bg-white select-none border-b border-slate-200 transition-all duration-300">
      
      {/* ========================================================================= */}
      {/* 1. NATIONAL PORTAL TOP MASTHEAD (Exact replica of Image 2 top bar) */}
      {/* ========================================================================= */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-2 border-b border-slate-150">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Ashoka Emblem + MHA + I4C + Bilingual Portal Title */}
          <div className="flex items-center space-x-3.5">
            <NationalEmblem size={44} variant="gold" />
            
            <div className="border-l border-slate-200 pl-3">
              <div className="text-[11px] font-extrabold text-[#78350F] leading-tight">
                {t.govOfIndia}
              </div>
              <div className="text-[10px] font-bold text-[#002147] leading-tight">
                {t.mha}
              </div>
              <div className="text-[9px] text-slate-500 font-medium">
                {t.i4c}
              </div>
            </div>

            <div className="hidden lg:block border-l-2 border-slate-300 pl-3.5">
              <div className="text-sm font-black text-[#002147] leading-tight tracking-tight">
                {t.portalName}
              </div>
              <div className="text-xs font-bold text-slate-700 leading-tight">
                {t.portalSub}
              </div>
            </div>
          </div>

          {/* Right: 75 Azadi Ka Amrit Mahotsav Logo + Interactive Language Switcher & Socials */}
          <div className="flex items-center space-x-3.5">
            
            {/* Azadi Ka Amrit Mahotsav 75 Emblem */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-50 to-orange-50 px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-white border border-amber-300 flex items-center justify-center font-black text-[10px] text-[#002147]">
                75
              </div>
              <div className="text-left leading-none">
                <div className="text-[10px] font-extrabold text-[#FF9933] uppercase">
                  {lang === 'hi' ? 'आज़ादी का' : 'Azadi Ka'}
                </div>
                <div className="text-[9px] font-bold text-[#138808]">
                  {lang === 'hi' ? 'अमृत महोत्सव' : 'Amrit Mahotsav'}
                </div>
              </div>
            </div>

            {/* Interactive Hindi / English Language Switcher */}
            <LanguageSwitcher variant="blue-portal" />

            {/* Mini Social Icons Strip from Image 2 */}
            <div className="hidden sm:flex items-center space-x-1">
              <span className="w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[9px] font-bold">f</span>
              <span className="w-4 h-4 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-[8px] font-bold">▶</span>
              <span className="w-4 h-4 rounded-full bg-[#E1306C] text-white flex items-center justify-center text-[8px] font-bold">📷</span>
              <span className="w-4 h-4 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-[8px] font-bold">in</span>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. OFFICIAL BLUE PORTAL NAVIGATION BAR (Exact replica of Image 2 menu) */}
      {/* ========================================================================= */}
      <nav className="bg-[#0088CC] text-white text-xs font-bold shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center overflow-x-auto whitespace-nowrap">
            
            {/* Home Icon */}
            <button
              onClick={onStartGateway}
              className="py-2.5 px-4 bg-[#006699] hover:bg-[#005580] flex items-center justify-center transition-colors"
              title={t.home}
            >
              <span className="text-sm">🏠</span>
            </button>

            <button
              onClick={onStartGateway}
              className="py-2.5 px-3.5 hover:bg-[#0077B3] transition-colors border-r border-[#33A1D6]/40"
            >
              {t.navIntercept}
            </button>

            <button
              onClick={onOpenFaceOff}
              className="py-2.5 px-3.5 hover:bg-[#0077B3] transition-colors border-r border-[#33A1D6]/40"
            >
              {t.navVs}
            </button>

            <button
              onClick={onOpenArchitecture}
              className="py-2.5 px-3.5 hover:bg-[#0077B3] transition-colors border-r border-[#33A1D6]/40"
            >
              {t.navBlueprint}
            </button>

            <button
              onClick={onStartJuryTour}
              className="py-2.5 px-3.5 hover:bg-[#0077B3] transition-colors border-r border-[#33A1D6]/40 text-amber-200"
            >
              {t.navJuryTour}
            </button>

            <a
              href="#learning"
              onClick={(e) => {
                e.preventDefault();
                alert(lang === 'hi' ? "लर्निंग कॉर्नर: बहु-आयामी बायोमेट्रिक सुरक्षा (rPPG + Wav2Vec + PRNU)।" : "Learning Corner: Multi-Modal Tri-Engine Forensic Detection Algorithms (rPPG + Wav2Vec + PRNU).");
              }}
              className="py-2.5 px-3.5 hover:bg-[#0077B3] transition-colors border-r border-[#33A1D6]/40 hidden md:inline-block"
            >
              {t.navLearning}
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                alert(lang === 'hi' ? "हेल्पलाइन १९३० एवं भारतीय साइबर अपराध समन्वय केंद्र (I4C)।" : "Helpline 1930 & National Cyber Crime Coordination Centre (I4C).");
              }}
              className="py-2.5 px-3.5 hover:bg-[#0077B3] transition-colors hidden lg:inline-block"
            >
              {t.navContact}
            </a>

          </div>

          {/* Toggle Banner Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="py-1 px-2.5 rounded bg-[#006699] hover:bg-[#005580] text-[11px] font-semibold text-slate-100 flex items-center space-x-1 ml-2 transition-colors flex-shrink-0"
            title={isCollapsed ? t.showBanner : t.minimizeBanner}
          >
            <span>{isCollapsed ? t.showBanner : t.minimizeBanner}</span>
          </button>

        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. GRAND CYBER HERO BANNER (PM Narendra Modi + HM Amit Shah + Azadi 75) */}
      {/* ========================================================================= */}
      {!isCollapsed && (
        <div className="relative overflow-hidden bg-gradient-to-r from-[#031B33] via-[#08305A] to-[#041D38] text-white">
          
          {/* Subtle Cyber Lock Watermark Backdrop & Circuit Geometry */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px), radial-gradient(#FF9933 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Left Column: Hon'ble Prime Minister Narendra Modi Portrait & MHA Badge */}
              <div className="flex items-center space-x-3.5 flex-shrink-0">
                <LeaderPortrait leader="modi" />

                <div className="hidden sm:block space-y-1">
                  <div className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                    {t.modiGov}
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {t.modiName}
                  </div>
                  <div className="text-[10px] text-slate-300 leading-tight">
                    {t.modiRole}
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded bg-blue-900/80 border border-blue-400/40 text-[9px] font-mono text-cyan-300 mt-1">
                    {t.modiVision}
                  </div>
                </div>
              </div>

              {/* Center Column: Azadi 75 Emblem + SatyaTrace-FIN Announcement + CTAs */}
              <div className="text-center max-w-2xl px-2 sm:px-4 space-y-3">
                
                {/* 75 Azadi Ka Amrit Mahotsav Center Ribbon */}
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs shadow-md">
                  <span className="text-amber-400 font-extrabold text-[11px]">75</span>
                  <span className="text-slate-300 text-[10px]">&bull;</span>
                  <span className="text-white font-bold text-[11px] tracking-wide">
                    {currentSlide.badge}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
                </div>

                {/* Main Titles */}
                <div>
                  <h1 className="text-lg sm:text-2xl font-black text-amber-400 tracking-tight leading-snug drop-shadow-md">
                    {currentSlide.title}
                  </h1>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {currentSlide.subtitle}
                </p>

                {/* Quick Action CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <button
                    onClick={onStartGateway}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-lg transition-transform transform hover:scale-[1.02] border border-amber-300"
                  >
                    <Shield className="w-4 h-4 stroke-[2.5]" />
                    <span>{t.launchIntercept}</span>
                  </button>

                  <button
                    onClick={onStartJuryTour}
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm transition-colors shadow-md"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>{t.juryTourBtn}</span>
                  </button>

                  <button
                    onClick={onOpenArchitecture}
                    className="inline-flex items-center space-x-1.5 px-3 py-2.5 rounded-xl font-semibold text-xs bg-slate-800/80 hover:bg-slate-700/80 text-blue-200 border border-blue-400/30 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-300" />
                    <span>{t.cbsBlueprintBtn}</span>
                  </button>
                </div>

                {/* Carousel Navigation Dots */}
                <div className="flex items-center justify-center space-x-2 pt-1">
                  <button onClick={prevSlide} className="p-1 text-slate-400 hover:text-white transition-colors" title="Previous Slide">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                  <button onClick={nextSlide} className="p-1 text-slate-400 hover:text-white transition-colors" title="Next Slide">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Right Column: Hon'ble Union Home Minister Amit Shah Portrait & I4C Badge */}
              <div className="flex items-center space-x-3.5 flex-shrink-0">
                <div className="hidden sm:block text-right space-y-1">
                  <div className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                    {t.shahGov}
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {t.shahName}
                  </div>
                  <div className="text-[10px] text-slate-300 leading-tight">
                    {t.shahRole}
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-400/40 text-[9px] font-mono text-emerald-300 mt-1">
                    {t.shahCommand}
                  </div>
                </div>

                <LeaderPortrait leader="amitshah" />
              </div>

            </div>
          </div>

          {/* Tricolor Subtle Bottom Stripe */}
          <div
            className="h-1 w-full"
            style={{
              background: 'linear-gradient(90deg, #FF9933 0%, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%, #138808 100%)',
            }}
          />

        </div>
      )}

    </div>
  );
};
