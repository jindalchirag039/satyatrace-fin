import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

export interface Translations {
  // Navigation & Portal Header
  govOfIndia: string;
  mha: string;
  i4c: string;
  portalName: string;
  portalSub: string;
  amritMahotsav: string;
  languageSelect: string;
  home: string;
  navIntercept: string;
  navVs: string;
  navBlueprint: string;
  navJuryTour: string;
  navLearning: string;
  navContact: string;
  minimizeBanner: string;
  showBanner: string;

  // Hero Banner
  heroSlide1Title: string;
  heroSlide1Subtitle: string;
  heroSlide2Title: string;
  heroSlide2Subtitle: string;
  heroSlide3Title: string;
  heroSlide3Subtitle: string;
  launchIntercept: string;
  juryTourBtn: string;
  cbsBlueprintBtn: string;
  modiName: string;
  modiRole: string;
  modiVision: string;
  shahName: string;
  shahRole: string;
  shahCommand: string;

  // Header Sub-bar & Steps
  nodeLabel: string;
  gatewayTagline: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  dpdpBadge: string;
  tinyFishBtn: string;
  whyBanksFailBtn: string;

  // Stress-Test Strip
  stressStripTitle: string;
  stressStripSub: string;
  waFilter: string;
  lowLightFilter: string;
  noiseFilter: string;

  // Step 1: Intercept
  step1Heading: string;
  step1Sub: string;
  rtgsTitle: string;
  rtgsDesc: string;
  vkycTitle: string;
  vkycDesc: string;
  waTitle: string;
  waDesc: string;
  quickDemosTitle: string;
  demoCeo: string;
  demoVkyc: string;
  demoControl: string;
  dropzoneTitle: string;
  dropzoneSub: string;
  webcamBtn: string;
  inspectCta: string;

  // Step 2: Inspection
  step2Heading: string;
  step2Sub: string;
  rppgGauge: string;
  lagGauge: string;
  prnuGauge: string;
  canvasATitle: string;
  canvasBTitle: string;
  receiptCta: string;

  // Step 3: Trust Receipt
  step3Heading: string;
  step3Sub: string;
  findingCardTitle: string;
  manifestCardTitle: string;
  ramWipeBadge: string;
  exportPdfBtn: string;
  actionCta: string;

  // Step 4: Decisioning
  step4Heading: string;
  step4Sub: string;
  greenTierTitle: string;
  amberTierTitle: string;
  redTierTitle: string;
  escrowTimerNotice: string;
  dispatch1930Btn: string;
  dispatchSuccessMsg: string;
  resetBtn: string;

  // Terminal & Footer
  terminalTitle: string;
  footerFeedback: string;
  footerFaq: string;
  footerContact: string;
  footerPolicies: string;
  footerPrivacy: string;
  footerDisclaimer: string;
  footerManagedBy: string;
  footerVisitors: string;
  footerUpdated: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    govOfIndia: 'GOVERNMENT OF INDIA',
    mha: 'MINISTRY OF HOME AFFAIRS',
    i4c: 'Indian Cyber Crime Coordination Centre (I4C) • Working Together With Vigour',
    portalName: 'National Cyber Crime Reporting Portal',
    portalSub: 'Official Gateway Under Ministry of Home Affairs',
    amritMahotsav: 'Azadi Ka Amrit Mahotsav',
    languageSelect: 'Language',
    home: 'Home',
    navIntercept: 'SatyaTrace-FIN Gateway Intercept +',
    navVs: 'Traditional Banks vs SatyaTrace',
    navBlueprint: 'CBS Architecture Blueprint +',
    navJuryTour: '⚡ 60s Jury Evaluation Tour +',
    navLearning: 'Learning Corner +',
    navContact: 'Contact Us',
    minimizeBanner: '▲ Minimize',
    showBanner: '▼ Show Portal Banner',

    heroSlide1Title: 'SatyaTrace-FIN Pre-Transaction Deepfake Defense Gateway',
    heroSlide1Subtitle: 'Sub-second (< 850ms) biometric & acoustic intercept stopping AI voice clones, OBS virtual cameras, and CEO wire fraud before core banking ledger settlement.',
    heroSlide2Title: 'Ephemeral tmpfs RAM Sandbox (Zero Biometric Disk Storage)',
    heroSlide2Subtitle: 'Fully compliant with Section 8 DPDP Act 2023. All video/audio frames purged from volatile memory in < 3.0 seconds with tamper-proof SHA-256 Section 65B court seal.',
    heroSlide3Title: '15-Minute Reversible Escrow Quarantine Vault',
    heroSlide3Subtitle: 'Non-invasive mTLS 1.3 sidecar proxy for Finacle, TCS BaNCS, and SAP. Flagged transfers held within bank perimeter, preventing ₹2.5 Cr permanent capital loss.',
    launchIntercept: 'Launch Pre-Transaction Gateway Intercept ↓',
    juryTourBtn: '⚡ 60s Jury Evaluation Tour',
    cbsBlueprintBtn: 'CBS Architecture Blueprint',
    modiName: 'Shri Narendra Modi',
    modiRole: "Hon'ble Prime Minister of India",
    modiVision: 'Vision: Cyber Secure Bharat 2047',
    shahName: 'Shri Amit Shah',
    shahRole: "Hon'ble Union Minister for Home Affairs",
    shahCommand: 'I4C National Command',

    nodeLabel: 'NODE #04 PUNE-HQ',
    gatewayTagline: 'National Pre-Transaction Deepfake Defense Gateway (Core Banking Proxy)',
    step1: '01 Intercept Channel',
    step2: '02 Forensic Verification',
    step3: '03 Trust Receipt',
    step4: '04 Escrow & 1930 Action',
    dpdpBadge: 'DPDP 2023 | 0-Retention',
    tinyFishBtn: 'TinyFish Agent',
    whyBanksFailBtn: 'Why Banks Fail',

    stressStripTitle: 'Jury Stress-Test Strip',
    stressStripSub: 'Real-time physical perturbation simulation (ISO/IEC 30107-3 compliant):',
    waFilter: 'WhatsApp 360p Compression',
    lowLightFilter: 'Low-Light Simulator',
    noiseFilter: 'High Acoustic Noise Filter',

    step1Heading: 'Intercept Transaction Channel & Forensic Sandbox',
    step1Sub: 'Select banking transaction channel and stream payload for sub-second inspection:',
    rtgsTitle: 'RTGS / NEFT Mandate (> ₹50 Lakhs)',
    rtgsDesc: 'High-Value Corporate Treasury Wire Transfer Hook',
    vkycTitle: 'vKYC Digital Lending Intercept',
    vkycDesc: 'Real-time WebRTC Video Session Intercept',
    waTitle: 'WhatsApp Corporate Treasury Note',
    waDesc: 'Executive Voice/Video Mandate Authorization',
    quickDemosTitle: '1-Click Jury Attack Demonstration Presets:',
    demoCeo: '🔴 Attack Demo: CEO WhatsApp Voice Clone',
    demoVkyc: '🔴 Attack Demo: vKYC OBS Virtual Camera',
    demoControl: '🟢 Control Demo: Authentic Human Video',
    dropzoneTitle: 'Drag and drop intercepted transaction media for analysis',
    dropzoneSub: 'Supported formats: .mp4, .wav, .mov (Max 50MB) • RAM-only ephemeral buffer',
    webcamBtn: 'Use Live Webcam Feed',
    inspectCta: 'Execute Multi-Modal Pre-Transaction Inspection →',

    step2Heading: 'Dual-Stream Forensic Oscilloscope',
    step2Sub: 'Real-time POS rPPG pulse extraction, phoneme-viseme aerodynamics, and sensor PRNU matching:',
    rppgGauge: 'POS Pulse SNR Level',
    lagGauge: 'Audio-Visual Phase Lag',
    prnuGauge: 'CMOS Sensor PRNU Match',
    canvasATitle: 'Canvas A: rPPG Capillary Pulse Spectrum (Biological Hemodynamics)',
    canvasBTitle: 'Canvas B: Lip-Phoneme Aerodynamic Lag Waveform',
    receiptCta: 'Generate Cryptographic Trust Receipt →',

    step3Heading: 'Official Cryptographic Trust Receipt & Hologram Certificate',
    step3Sub: 'Certified under Section 65B Indian Evidence Act & DPDP Act 2023 (Tamper-Proof Audit Manifest):',
    findingCardTitle: 'Plain-Language Forensic Diagnostic Finding',
    manifestCardTitle: 'Cryptographic SHA-256 Hash Manifest & Audit Chain',
    ramWipeBadge: 'RAM-Only Memory Wipe Verified (0 Disk Storage)',
    exportPdfBtn: 'Export Official Evidence Pack PDF',
    actionCta: 'Proceed to Core Banking Action →',

    step4Heading: 'Autonomous Core Banking Policy & 1930 Dispatch',
    step4Sub: 'Deterministic bank-grade policy executed before ledger settlement:',
    greenTierTitle: 'Green Tier (< 15% Risk): Instant Core Banking Clearance Token',
    amberTierTitle: 'Amber Tier (15% - 65% Risk): Dynamic Step-Up Challenge (Out-of-band OTP / IVR)',
    redTierTitle: 'Red Tier (> 65% Risk): 15-Minute Reversible Escrow Quarantine',
    escrowTimerNotice: '15:00 Reversible Escrow Active — Funds Frozen in Bank Perimeter',
    dispatch1930Btn: '1-Click Direct Dispatch Evidence Package to National 1930 Cybercrime Portal API',
    dispatchSuccessMsg: 'Evidence Bundle Ingested into 1930 Portal API in 24 seconds',
    resetBtn: 'Initialize New Transaction Verification',

    terminalTitle: 'Core Banking Proxy Terminal (Finacle / SAP mTLS 1.3 Stream)',
    footerFeedback: 'Feedback',
    footerFaq: 'FAQ',
    footerContact: 'Contact Us',
    footerPolicies: 'Website Policies',
    footerPrivacy: 'Privacy Policy',
    footerDisclaimer: 'Disclaimer',
    footerManagedBy: 'Website Content Managed by Ministry of Home Affairs, Govt. of India. Best viewed in Mozilla Firefox, Google Chrome.',
    footerVisitors: 'Total Visitors',
    footerUpdated: 'Last Updated',
  },
  hi: {
    govOfIndia: 'भारत सरकार',
    mha: 'गृह मंत्रालय',
    i4c: 'भारतीय साइबर अपराध समन्वय केंद्र (I4C) • दृढतापूर्वक साथ कार्यशील',
    portalName: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल',
    portalSub: 'गृह मंत्रालय के अधीन आधिकारिक गेटवे',
    amritMahotsav: 'आज़ादी का अमृत महोत्सव',
    languageSelect: 'भाषा (Language)',
    home: 'मुख्य पृष्ठ',
    navIntercept: 'सत्यट्रेस-फिन गेटवे अवरोधन +',
    navVs: 'पारंपरिक बैंक बनाम सत्यट्रेस',
    navBlueprint: 'सीबीएस आर्किटेक्चर ब्लूप्रिंट +',
    navJuryTour: '⚡ ६० से० जूरी मूल्यांकन +',
    navLearning: 'लर्निंग कॉर्नर +',
    navContact: 'संपर्क सूत्र',
    minimizeBanner: '▲ छोटा करें',
    showBanner: '▼ पोर्टल बैनर दिखाएं',

    heroSlide1Title: 'राष्ट्रीय प्री-ट्रांजेक्शन वित्तीय डीपफेक सुरक्षा गेटवे',
    heroSlide1Subtitle: 'कोर बैंकिंग खाता निपटान से पहले एआई वॉयस क्लोन, ओबीएस वर्चुअल कैमरा एवं वित्तीय धोखाधड़ी को < ८५० मिलीसेकंड में रोकने वाली बायोमेट्रिक एवं ध्वनिक सुरक्षा प्रणाली।',
    heroSlide2Title: 'अस्थायी रैम सैंडबॉक्स • शून्य बायोमेट्रिक भंडारण',
    heroSlide2Subtitle: 'डीपीडीपी अधिनियम २०२३ की धारा ८ का पूर्ण अनुपालन। सभी वीडियो एवं ऑडियो फ्रेम < ३.० सेकंड में वोलेटाइल मेमोरी से नष्ट, साक्ष्य अधिनियम धारा ६५बी न्यायालय मुहर सहित।',
    heroSlide3Title: '१५-मिनट प्रतिवर्ती एस्क्रो संगरोध प्रणाली',
    heroSlide3Subtitle: 'फ़िनेकल, टीसीएस बैंक्स एवं एसएपी हेतु गैर-आक्रामक mTLS १.३ प्रॉक्सी। संदिग्ध धन बैंक परिधि में ही रोककर ₹२.५ करोड़ का स्थायी नुकसान शून्य किया जाता है।',
    launchIntercept: 'प्री-ट्रांजेक्शन गेटवे अवरोधन शुरू करें ↓',
    juryTourBtn: '⚡ ६० से० जूरी मूल्यांकन टूर',
    cbsBlueprintBtn: 'सीबीएस आर्किटेक्चर ब्लूप्रिंट',
    modiName: 'श्री नरेन्द्र मोदी',
    modiRole: 'माननीय प्रधानमंत्री, भारत सरकार',
    modiVision: 'संकल्प: साइबर सुरक्षित भारत २०४७',
    shahName: 'श्री अमित शाह',
    shahRole: 'माननीय केंद्रीय गृह मंत्री',
    shahCommand: 'आई४सी राष्ट्रीय कमान',

    nodeLabel: 'नोड #०४ पुणे मुख्यालय',
    gatewayTagline: 'राष्ट्रीय प्री-ट्रांजेक्शन वित्तीय डीपफेक सुरक्षा गेटवे (कोर बैंकिंग प्रॉक्सी)',
    step1: '०१ चैनल अवरोधन',
    step2: '०२ फोरेंसिक सत्यापन',
    step3: '०३ विश्वास रसीद',
    step4: '०४ एस्क्रो एवं १९३० कार्रवाई',
    dpdpBadge: 'डीपीडीपी २०२३ | शून्य भंडारण',
    tinyFishBtn: 'टाइनीफिश एजेंट',
    whyBanksFailBtn: 'बैंक क्यों विफल होते हैं',

    stressStripTitle: 'जूरी स्ट्रेस-टेस्ट स्ट्रिप',
    stressStripSub: 'वास्तविक समय भौतिक विकृति सिमुलेशन (ISO/IEC 30107-3 मानक):',
    waFilter: 'व्हाट्सएप ३६०पी कम्प्रेशन',
    lowLightFilter: 'कम रोशनी सिमुलेटर',
    noiseFilter: 'उच्च ध्वनि शोर फिल्टर',

    step1Heading: 'ट्रांजेक्शन चैनल एवं मीडिया अवरोधन सैंडबॉक्स',
    step1Sub: 'उप-सेकंड फोरेंसिक विश्लेषण के लिए बैंकिंग चैनल एवं संदिग्ध मीडिया पेलोड चुनें:',
    rtgsTitle: 'आरटीजीएस / नेफ्ट जनादेश (> ₹५० लाख)',
    rtgsDesc: 'उच्च मूल्य कॉर्पोरेट ट्रेजरी ट्रांसफर हुक',
    vkycTitle: 'वीकेवाईसी डिजिटल ऋण सत्यापन',
    vkycDesc: 'वास्तविक समय WebRTC वीडियो सत्र अवरोध',
    waTitle: 'व्हाट्सएप कॉर्पोरेट ट्रेजरी नोट',
    waDesc: 'कार्यकारी अधिकारी वॉयस/वीडियो संदेश प्रमाणीकरण',
    quickDemosTitle: 'जूरी मूल्यांकन हेतु १-क्लिक लाइव हमला डेमो:',
    demoCeo: '🔴 हमला डेमो: सीईओ व्हाट्सएप वॉयस क्लोन',
    demoVkyc: '🔴 हमला डेमो: वीकेवाईसी ओबीएस वर्चुअल कैमरा',
    demoControl: '🟢 नियंत्रण डेमो: प्रामाणिक मानव वीडियो',
    dropzoneTitle: 'फोरेंसिक जांच हेतु संदिग्ध ट्रांजेक्शन मीडिया फ़ाइल यहाँ छोड़ें',
    dropzoneSub: 'समर्थित प्रारूप: .mp4, .wav, .mov (अधिकतम ५० एमबी) • रैम-ओनली अस्थायी बफ़र',
    webcamBtn: 'लाइव वेबकैम से टेस्ट करें',
    inspectCta: 'बहु-आयामी प्री-ट्रांजेक्शन जांच निष्पादित करें →',

    step2Heading: 'द्वि-धारा फोरेंसिक ऑसिलोस्कोप',
    step2Sub: 'आर-पीपीजी कैपिलरी पल्स निष्कर्षण, लिप-फोनीम गतिशीलता एवं सीएमओएस सेंसर का लाइव मिलान:',
    rppgGauge: 'पीओएस पल्स एसएनआर स्तर',
    lagGauge: 'ऑडियो-विजुअल फेज अंतराल',
    prnuGauge: 'सीएमओएस सेंसर पीआरएनयू मिलान',
    canvasATitle: 'कैनवास ए: आर-पीपीजी कैपिलरी पल्स स्पेक्ट्रम (जैविक रक्त प्रवाह)',
    canvasBTitle: 'कैनवास बी: लिप-फोनीम वायुगतिकीय अंतराल तरंगरूप',
    receiptCta: 'क्रिप्टोग्राफिक विश्वास रसीद बनाएं →',

    step3Heading: 'आधिकारिक क्रिप्टोग्राफिक ट्रस्ट रसीद एवं होलोग्राम प्रमाण पत्र',
    step3Sub: 'भारतीय साक्ष्य अधिनियम की धारा ६५बी एवं डीपीडीपी अधिनियम २०२३ के तहत विधिवत प्रमाणित:',
    findingCardTitle: 'सरल भाषा में फोरेंसिक नैदानिक निष्कर्ष',
    manifestCardTitle: 'क्रिप्टोग्राफिक एसएचए-२५६ हैश घोषणापत्र एवं ऑडिट शृंखला',
    ramWipeBadge: 'रैम-ओनली मेमोरी वाइप सत्यापित (शून्य डिस्क भंडारण)',
    exportPdfBtn: 'आधिकारिक साक्ष्य पैक (पीडीएफ) डाउनलोड करें',
    actionCta: 'कोर बैंकिंग निर्णय पर आगे बढ़ें →',

    step4Heading: 'स्वचालित कोर बैंकिंग नीति निर्णय एवं राष्ट्रीय १९३० प्रेषण',
    step4Sub: 'खाता निपटान से पहले स्वचालित बैंक-ग्रेड नीति निष्पादन:',
    greenTierTitle: 'हरा स्तर (< १५% जोखिम): त्वरित कोर बैंकिंग क्लियरेंस टोकन जारी',
    amberTierTitle: 'अंबर स्तर (१५% - ६५% जोखिम): गतिशील अतिरिक्त चुनौती (आउट-ऑफ-बैंड ओटीपी / आईवीआर)',
    redTierTitle: 'लाल स्तर (> ६५% जोखिम): १५-मिनट प्रतिवर्ती एस्क्रो संगरोध सक्रिय',
    escrowTimerNotice: '१५:०० प्रतिवर्ती एस्क्रो सक्रिय — बैंक परिधि में धनराशि रोकी गई',
    dispatch1930Btn: 'राष्ट्रीय १९३० साइबर अपराध पोर्टल एपीआई को १-क्लिक साक्ष्य भेजें',
    dispatchSuccessMsg: 'साक्ष्य बंडल २४ सेकंड में राष्ट्रीय १९३० पोर्टल एपीआई में सफलतापूर्वक प्रेषित',
    resetBtn: 'नया लेन-देन सत्यापन प्रारंभ करें',

    terminalTitle: 'कोर बैंकिंग प्रॉक्सी टर्मिनल (फ़िनेकल / एसएपी mTLS १.३ स्ट्रीम)',
    footerFeedback: 'फीडबैक',
    footerFaq: 'अक्सर पूछे जाने वाले प्रश्न',
    footerContact: 'संपर्क करें',
    footerPolicies: 'वेबसाइट नीतियां',
    footerPrivacy: 'गोपनीयता नीति',
    footerDisclaimer: 'अस्वीकरण',
    footerManagedBy: 'वेबसाइट सामग्री गृह मंत्रालय, भारत सरकार द्वारा प्रबंधित। मोज़िला फ़ायरफ़ॉक्स, गूगल क्रोम में सर्वश्रेष्ठ दृश्य।',
    footerVisitors: 'कुल आगंतुक संख्या',
    footerUpdated: 'अंतिम अद्यतन',
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('satyatrace_lang');
      return (saved === 'hi' || saved === 'en') ? saved : 'hi'; // Default to Hindi as preferred by user
    } catch {
      return 'hi';
    }
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('satyatrace_lang', newLang);
    } catch (e) {
      console.warn('Could not persist language to localStorage', e);
    }
  };

  const toggleLang = () => {
    setLang(lang === 'hi' ? 'en' : 'hi');
  };

  const value: LanguageContextType = {
    lang,
    setLang,
    toggleLang,
    t: TRANSLATIONS[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
