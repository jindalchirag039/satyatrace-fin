import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface OfficialGovFooterProps {
  onOpenArchitecture?: () => void;
  onOpenFaceOff?: () => void;
}

export const OfficialGovFooter: React.FC<OfficialGovFooterProps> = ({
  onOpenArchitecture,
  onOpenFaceOff,
}) => {
  const [visitorCount, setVisitorCount] = useState<number>(14892104);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 12000);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const formattedCount = visitorCount.toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN');

  return (
    <footer className="w-full bg-[#181B20] text-slate-300 font-sans border-t border-slate-700/80 relative z-30 select-none">
      
      {/* Subtle Top 1px Accent Highlight */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />

      {/* Row 1: Essential Links + Social Media Roundels (Matches Image 1) */}
      <div className="border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          
          {/* Statutory Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2.5 gap-y-1 text-[11px] text-slate-300">
            <a href="#feedback" onClick={(e) => { e.preventDefault(); alert(lang === 'hi' ? "राष्ट्रीय साइबर अपराध पोर्टल फीडबैक फॉर्म।" : "National Cybercrime Reporting Portal Feedback Form initiated."); }} className="hover:text-white hover:underline transition-colors">
              {t.footerFeedback}
            </a>
            <span className="text-slate-600">|</span>
            <a href="#faq" onClick={(e) => { e.preventDefault(); alert(lang === 'hi' ? "डीपफेक वित्तीय धोखाधड़ी: धारा ६५बी एवं एस्क्रो नीतियां।" : "Frequently Asked Questions (FAQ) for Deepfake Financial Frauds: Section 65B & Escrow policies."); }} className="hover:text-white hover:underline transition-colors">
              {t.footerFaq}
            </a>
            <span className="text-slate-600">|</span>
            <a href="#contact" onClick={(e) => { e.preventDefault(); alert(lang === 'hi' ? "भारतीय साइबर अपराध समन्वय केंद्र (I4C), गृह मंत्रालय, नई दिल्ली।" : "Contact National Cyber Crime Coordination Centre (I4C), MHA, New Delhi."); }} className="hover:text-white hover:underline transition-colors">
              {t.footerContact}
            </a>
            <span className="text-slate-600">|</span>
            <a href="#policies" onClick={(e) => { e.preventDefault(); alert(lang === 'hi' ? "भारत सरकार वेबसाइट नीतियां: GIGW 3.0 एवं STQC प्रमाणित।" : "Government of India Website Policies: GIGW 3.0 & STQC Certified."); }} className="hover:text-white hover:underline transition-colors">
              {t.footerPolicies}
            </a>
            <span className="text-slate-600">|</span>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert(lang === 'hi' ? "गोपनीयता नीति: डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम २०२३।" : "Privacy Policy: Digital Personal Data Protection Act, 2023 (RAM-Only Volatile Execution)."); }} className="hover:text-white hover:underline transition-colors">
              {t.footerPrivacy}
            </a>
            <span className="text-slate-600">|</span>
            <a href="#disclaimer" onClick={(e) => { e.preventDefault(); alert(lang === 'hi' ? "अस्वीकरण: सत्यट्रेस-फिन भारतीय रिज़र्व बैंक एवं I4C दिशानिर्देशों के तहत संचालित होता है।" : "Disclaimer: SatyaTrace-FIN operates under Reserve Bank of India & I4C core banking guidelines."); }} className="hover:text-white hover:underline transition-colors">
              {t.footerDisclaimer}
            </a>
          </div>

          {/* Social Media Circular Roundels */}
          <div className="flex items-center space-x-2">
            
            {/* X / Twitter */}
            <a
              href="https://twitter.com/Cyberdost"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
              title="X (@Cyberdost)"
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/CyberDostI4C"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity font-bold text-[10px]"
              title="Facebook"
            >
              f
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@CyberDost"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-80 transition-opacity text-[8px]"
              title="YouTube"
            >
              ▶
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/cyberdosti4c"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:opacity-80 transition-opacity text-[8px]"
              title="Instagram"
            >
              📷
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/cyberdosti4c"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-[#229ED9] text-white flex items-center justify-center hover:opacity-80 transition-opacity text-[8px]"
              title="Telegram"
            >
              ✈
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/indian-cyber-crime-coordination-centre"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
              title="LinkedIn"
            >
              <span className="text-[10px] font-bold leading-none font-sans">in</span>
            </a>

            {/* Koo */}
            <a
              href="https://kooapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 flex items-center justify-center hover:opacity-80 transition-opacity text-[10px] font-black"
              title="Koo App"
            >
              K
            </a>

            {/* MyGov India */}
            <a
              href="https://mygov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-[#E91E63] text-white flex items-center justify-center hover:opacity-80 transition-opacity text-[9px] font-bold"
              title="MyGov India"
            >
              GOV
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/911930"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
              title="WhatsApp Cyber Helpline"
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
            </a>

          </div>

        </div>
      </div>

      {/* Row 2: Management Credits + Visitor Counter + Scroll-to-Top Button */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 bg-[#131519]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          
          {/* Left: Content Managed By MHA Credit */}
          <div className="text-center md:text-left">
            <span>
              {t.footerManagedBy}
            </span>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {lang === 'hi'
                ? 'भारतीय रिज़र्व बैंक (RBI) कोर बैंकिंग गेटवे प्रॉक्सी ग्रिड • डीपीडीपी अधिनियम २०२३ विधिक अनुपालन'
                : 'Integrated with Reserve Bank of India (RBI) Core Banking Proxy Grid • DPDP Act 2023 Compliant'}
            </div>
          </div>

          {/* Right: Visitor Counter & Last Updated */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-slate-300 font-mono">
                {t.footerVisitors}: <span className="font-bold text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700/60">{formattedCount}</span>
              </div>
              <div className="text-[10px] text-slate-500">
                {t.footerUpdated}: 31/08/2026
              </div>
            </div>

            {/* Scroll to Top Blue Circular Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="w-7 h-7 rounded-full bg-[#0088CC] hover:bg-[#0077B3] text-white flex items-center justify-center shadow-md transition-all transform hover:-translate-y-0.5 flex-shrink-0 cursor-pointer"
              title="Scroll to Top"
            >
              <ChevronUp className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
};
