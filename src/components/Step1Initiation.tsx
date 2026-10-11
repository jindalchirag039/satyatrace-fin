import React, { useState } from 'react';
import { CreditCard, Video, MessageSquare, Upload, Shield, Lock, Camera, Scale } from 'lucide-react';
import { GatewayChannel, ForensicScenario } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface Step1InitiationProps {
  channel: GatewayChannel;
  onSelectChannel: (channel: GatewayChannel) => void;
  scenario: ForensicScenario;
  onSelectDemo: (demoKey: string) => void;
  onStartAnalysis: () => void;
  onOpenLiveWebcam?: () => void;
  onOpenFaceOff?: () => void;
}

export const Step1Initiation: React.FC<Step1InitiationProps> = ({
  channel,
  onSelectChannel,
  scenario,
  onSelectDemo,
  onStartAnalysis,
  onOpenLiveWebcam,
  onOpenFaceOff,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const { lang, t } = useLanguage();

  return (
    <div className="space-y-6">
      
      {/* Official Government Step 1 Header Card with Tricolor Border */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(90deg, #FF9933 0%, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%, #138808 100%)',
          }}
        />

        <div className="max-w-3xl pt-1">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-xs font-bold mb-2.5 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>{lang === 'hi' ? 'चरण ०१ / ०४' : 'Step 01 of 04'}</span>
            <span>•</span>
            <span>/intercept — {lang === 'hi' ? 'प्री-लेजर चैनल अवरोधन' : 'Pre-Ledger Channel Interception'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
            {t.step1Heading}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
            {t.step1Sub}
          </p>
        </div>
      </div>

      {/* Hero Layout: Clean 2-Column Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Transaction Channel Selection Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#002147]">
              {lang === 'hi' ? 'इनबाउंड चैनल प्रॉक्सी चुनें' : 'Select Inbound Channel Proxy'}
            </label>
            <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
              {lang === 'hi' ? 'सक्रिय हुक' : 'Active Hook'}
            </span>
          </div>

          {/* Channel 1: RTGS / NEFT Mandate (> ₹50 Lakhs) */}
          <div
            onClick={() => onSelectChannel('rtgs')}
            className={`cursor-pointer rounded-xl p-4 sm:p-5 transition-all shadow-xs relative ${
              channel === 'rtgs'
                ? 'border-2 border-[#002147] bg-amber-50/20 shadow-sm ring-1 ring-[#002147]/20'
                : 'border border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center mb-2 shadow-2xs">
                <CreditCard className="w-5 h-5 stroke-[2]" />
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center bg-white ${
                  channel === 'rtgs' ? 'border-2 border-[#002147]' : 'border border-slate-300'
                }`}
              >
                {channel === 'rtgs' && <div className="w-2.5 h-2.5 rounded-full bg-[#002147]" />}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-[#002147] text-base">{t.rtgsTitle}</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{t.rtgsDesc}</p>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              {lang === 'hi'
                ? 'फ़िनेकल / एसएपी कोर बैंकिंग से जुड़ा गेटवे हुक। आरटीजीएस प्रेषण से पहले कार्यकारी फंड ट्रांसफर आदेशों की जांच करता है।'
                : 'Mandate payment gateway proxy hooked into Finacle / SAP Core Banking. Intercepts urgent executive fund transfer mandates before RTGS dispatch.'}
            </p>
            <div className="mt-3.5 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>SLA Target: <strong className="text-emerald-700">&lt; 850ms</strong></span>
              <span className="text-[#002147] font-bold">Finacle CBS Proxy</span>
            </div>
          </div>

          {/* Channel 2: vKYC Digital Lending Intercept */}
          <div
            onClick={() => onSelectChannel('vkyc')}
            className={`cursor-pointer rounded-xl p-4 sm:p-5 transition-all shadow-xs relative ${
              channel === 'vkyc'
                ? 'border-2 border-[#002147] bg-amber-50/20 shadow-sm ring-1 ring-[#002147]/20'
                : 'border border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center mb-2 shadow-2xs">
                <Video className="w-5 h-5 stroke-[2]" />
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center bg-white ${
                  channel === 'vkyc' ? 'border-2 border-[#002147]' : 'border border-slate-300'
                }`}
              >
                {channel === 'vkyc' && <div className="w-2.5 h-2.5 rounded-full bg-[#002147]" />}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-[#002147] text-base">{t.vkycTitle}</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{t.vkycDesc}</p>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              {lang === 'hi'
                ? 'बैंक वीकेवाईसी प्रदाताओं (IDfy, HyperVerge) हेतु साइडकार निरीक्षण। ओबीएस वर्चुअल कैमरा और रीयल-टाइम फेस स्वैप को रोकता है।'
                : 'Sidecar inspection for bank vKYC providers (IDfy, HyperVerge, Perfios). Neutralizes OBS virtual cameras and DeepFaceLive real-time face swaps.'}
            </p>
            <div className="mt-3.5 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Sensor Check: <strong>PRNU Noise</strong></span>
              <span className="text-[#002147] font-bold">Sidecar Stream</span>
            </div>
          </div>

          {/* Channel 3: WhatsApp Corporate Treasury Note */}
          <div
            onClick={() => onSelectChannel('wa')}
            className={`cursor-pointer rounded-xl p-4 sm:p-5 transition-all shadow-xs relative ${
              channel === 'wa'
                ? 'border-2 border-[#002147] bg-amber-50/20 shadow-sm ring-1 ring-[#002147]/20'
                : 'border border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center mb-2 shadow-2xs">
                <MessageSquare className="w-5 h-5 stroke-[2]" />
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center bg-white ${
                  channel === 'wa' ? 'border-2 border-[#002147]' : 'border border-slate-300'
                }`}
              >
                {channel === 'wa' && <div className="w-2.5 h-2.5 rounded-full bg-[#002147]" />}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-[#002147] text-base">{t.waTitle}</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{t.waDesc}</p>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              {lang === 'hi'
                ? 'ट्रेजरी अधिकारियों द्वारा फंड ट्रांसफर करने से पहले कॉर्पोरेट व्हाट्सएप वेबहुक वॉयस/वीडियो नोट्स को इंटरसेप्ट करता है।'
                : 'Captures corporate WhatsApp webhook voice/video notes before treasury executives execute wire disbursements.'}
            </p>
            <div className="mt-3.5 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Acoustic Check: <strong>HiFi-GAN Cutoff</strong></span>
              <span className="text-emerald-800 font-bold">mTLS Ingestion</span>
            </div>
          </div>
        </div>

        {/* Right Column: Drag-and-Drop Forensic Sandbox & Quick Demo Buttons */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#002147]">
              {lang === 'hi' ? 'फोरेंसिक मीडिया सैंडबॉक्स' : 'Forensic Media Sandbox'}
            </label>
            <div className="flex items-center space-x-2">
              {onOpenLiveWebcam && (
                <button
                  type="button"
                  onClick={onOpenLiveWebcam}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-900 border border-blue-300 hover:bg-blue-100 transition-colors shadow-2xs cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-blue-700" />
                  <span>{t.webcamBtn}</span>
                </button>
              )}
              {onOpenFaceOff && (
                <button
                  type="button"
                  onClick={onOpenFaceOff}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors shadow-2xs cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t.whyBanksFailBtn}</span>
                </button>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-5">
            
            {/* Quick-Test Demo Pills */}
            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2">
                {t.quickDemosTitle}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                
                {/* Attack Demo 1 */}
                <button
                  type="button"
                  onClick={() => onSelectDemo('ceo_voice')}
                  className="p-3 text-left rounded-lg border border-red-200 bg-red-50/70 hover:bg-red-100 transition-colors group cursor-pointer"
                >
                  <div className="text-[11px] font-bold text-red-900 flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 mr-1.5 flex-shrink-0 animate-pulse" />
                    <span>{t.demoCeo}</span>
                  </div>
                  <div className="text-[10px] text-red-700 mt-1 font-mono font-semibold">₹2.5 Cr RTGS Mandate</div>
                  <div className="text-[10px] text-red-500 mt-0.5">HiFi-GAN Cutoff @ 15.8 kHz</div>
                </button>

                {/* Attack Demo 2 */}
                <button
                  type="button"
                  onClick={() => onSelectDemo('vkyc_cam')}
                  className="p-3 text-left rounded-lg border border-amber-300 bg-amber-50/70 hover:bg-amber-100 transition-colors group cursor-pointer"
                >
                  <div className="text-[11px] font-bold text-amber-950 flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600 mr-1.5 flex-shrink-0" />
                    <span>{t.demoVkyc}</span>
                  </div>
                  <div className="text-[10px] text-amber-800 mt-1 font-mono font-semibold">DeepFaceLive Face-Swap</div>
                  <div className="text-[10px] text-amber-600 mt-0.5">CMOS PRNU Missing (0%)</div>
                </button>

                {/* Control Demo 3 */}
                <button
                  type="button"
                  onClick={() => onSelectDemo('legit_human')}
                  className="p-3 text-left rounded-lg border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 transition-colors group cursor-pointer"
                >
                  <div className="text-[11px] font-bold text-emerald-950 flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 mr-1.5 flex-shrink-0" />
                    <span>{t.demoControl}</span>
                  </div>
                  <div className="text-[10px] text-emerald-800 mt-1 font-mono font-semibold">360p Compressed Video</div>
                  <div className="text-[10px] text-emerald-600 mt-0.5">Clean 1.15 Hz BVP Pulse</div>
                </button>

              </div>
            </div>

            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
              }}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                isDragOver
                  ? 'border-orange-500 bg-orange-50/40'
                  : 'border-slate-300 hover:border-[#002147] bg-slate-50/60'
              }`}
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 text-[#002147] flex items-center justify-center mb-3 shadow-2xs border border-amber-200">
                <Upload className="w-5 h-5 stroke-[2.2] text-[#002147]" />
              </div>
              <div className="text-sm font-bold text-[#002147]">
                {scenario.fileName}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {t.dropzoneSub}
              </p>
            </div>

            {/* Transaction Mandate Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">{lang === 'hi' ? 'स्थानांतरण राशि:' : 'Transfer Mandate:'}</span>
                <span className="font-mono font-bold text-[#002147] text-sm">₹{scenario.amount} INR</span>
              </div>
              <div>
                <span className="text-slate-500 block">{lang === 'hi' ? 'कथित प्रेषक:' : 'Alleged Sender:'}</span>
                <span className="font-mono font-bold text-slate-800">{scenario.sender}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{lang === 'hi' ? 'लाभार्थी खाता:' : 'Beneficiary Account:'}</span>
                <span className="font-mono text-slate-700 truncate block">{scenario.beneficiary}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{lang === 'hi' ? 'संदर्भ संख्या:' : 'Mandate Reference:'}</span>
                <span className="font-mono text-slate-700">{scenario.refId}</span>
              </div>
            </div>

            {/* DPDP Act 2023 Statutory Stamp */}
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-300 text-xs text-emerald-950 flex items-start space-x-2">
              <Lock className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>{lang === 'hi' ? 'डीपीडीपी अधिनियम २०२३ वैधानिक सुरक्षा' : 'DPDP Act 2023 Statutory Compliance'}:</strong> {lang === 'hi' ? 'मीडिया पेलोड केवल वोलेटाइल tmpfs रैम में बफ़र किया जाता है (० डिस्क स्टोरेज)। विश्लेषण के बाद < ३.० सेकंड में ऑटो-पर्ज।' : 'Media slice is buffered strictly in volatile tmpfs RAM (0 persistent disk writes). Auto-purged upon completion in < 3.0s.'}
              </div>
            </div>

          </div>

          {/* Primary CTA: Official Government Defense Button */}
          <div className="flex items-center justify-end pt-2">
            <button
              onClick={onStartAnalysis}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#002147] via-[#0D3B66] to-[#002147] hover:from-[#001733] hover:to-[#0D3B66] text-white font-extrabold text-sm rounded-xl shadow-md transition-all transform hover:translate-x-0.5 border-b-4 border-amber-500 cursor-pointer"
            >
              <Shield className="w-5 h-5 text-amber-400 stroke-[2.3]" />
              <span>{t.inspectCta}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
