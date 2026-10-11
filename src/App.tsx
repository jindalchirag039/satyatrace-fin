import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { PortalHeroBanner } from './components/PortalHeroBanner';
import { JuryStressTestBar } from './components/JuryStressTestBar';
import { JuryAutoTourBanner } from './components/JuryAutoTourBanner';
import { Step1Initiation } from './components/Step1Initiation';
import { Step2Inspection } from './components/Step2Inspection';
import { Step3TrustReceipt } from './components/Step3TrustReceipt';
import { Step4Decisioning } from './components/Step4Decisioning';
import { CoreBankingTerminal } from './components/CoreBankingTerminal';
import { TinyFishModal } from './components/TinyFishModal';
import { VulnerabilityFaceOffModal } from './components/VulnerabilityFaceOffModal';
import { LiveWebcamModal } from './components/LiveWebcamModal';
import { Section65BCertificateModal } from './components/Section65BCertificateModal';
import { ArchitectureBlueprintModal } from './components/ArchitectureBlueprintModal';
import { OfficialGovFooter } from './components/OfficialGovFooter';
import { GatewayChannel, JuryStressTest, TerminalLog } from './types';
import { SCENARIO_PRESETS } from './services/forensicSimulation';

const INITIAL_LOGS: TerminalLog[] = [
  {
    id: 'log-1',
    timestamp: '07:40:01',
    tag: 'CBS mTLS',
    level: 'info',
    message: 'mTLS 1.3 AES-256 Handshake Established with Finacle Core Banking Proxy #NODE-04 (भारत सरकार)...',
  },
  {
    id: 'log-2',
    timestamp: '07:40:02',
    tag: 'DPDP RAM',
    level: 'dpdp',
    message: 'Ephemeral tmpfs RAM buffer allocated (0 persistent disk writes). Section 8 DPDP Act compliant.',
  },
  {
    id: 'log-3',
    timestamp: '07:40:02',
    tag: 'FUSION',
    level: 'info',
    message: 'Multi-Engine Bayesian Evidence Fusion engine primed in 312ms. SLA ceiling < 850ms.',
  },
  {
    id: 'log-4',
    timestamp: '07:40:03',
    tag: 'DPDP MEMORY',
    level: 'success',
    message: 'Volatile memory sandbox verified intact. Zero biometric retention guaranteed.',
  },
];

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedChannel, setSelectedChannel] = useState<GatewayChannel>('rtgs');
  const [demoKey, setDemoKey] = useState<string>('ceo_voice');
  const [isTinyFishOpen, setIsTinyFishOpen] = useState<boolean>(false);
  const [hasScanned, setHasScanned] = useState<boolean>(false);

  const wizardRef = useRef<HTMLDivElement>(null);

  // New Round 1 Victory Modals State
  const [isJuryTourActive, setIsJuryTourActive] = useState<boolean>(false);
  const [isFaceOffOpen, setIsFaceOffOpen] = useState<boolean>(false);
  const [isWebcamOpen, setIsWebcamOpen] = useState<boolean>(false);
  const [isSection65BOpen, setIsSection65BOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);

  // Jury Stress-Test State
  const [stressTests, setStressTests] = useState<JuryStressTest>({
    compressionFilter: false,
    lowLightSimulator: false,
    highNoiseFilter: false,
  });

  // Core Banking Terminal Logs State
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>(INITIAL_LOGS);

  const addTerminalLog = (
    level: TerminalLog['level'],
    tag: string,
    message: string
  ) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newEntry: TerminalLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: timeStr,
      level,
      tag,
      message,
    };
    setTerminalLogs((prev) => [...prev, newEntry]);
  };

  const scenarioMap: Record<string, string> = {
    ceo_voice: 'attack1',
    vkyc_cam: 'attack2',
    legit_human: 'control3',
    cfo_voice: 'attack1',
    vkyc_deepface: 'attack2',
    authentic_human: 'control3',
  };

  const activePresetKey = scenarioMap[demoKey] || 'attack1';
  const scenario = SCENARIO_PRESETS[activePresetKey] || SCENARIO_PRESETS.attack1;

  const handleSelectDemo = (key: string) => {
    setDemoKey(key);
    const mapped = scenarioMap[key];
    if (mapped && SCENARIO_PRESETS[mapped]) {
      const preset = SCENARIO_PRESETS[mapped];
      setSelectedChannel(preset.channel);
      addTerminalLog('info', 'DEMO SWITCH', `Loaded test case: ${preset.name} (${preset.refId})`);
    }
  };

  const handleStressTestChange = (updated: JuryStressTest) => {
    setStressTests(updated);
    if (updated.compressionFilter !== stressTests.compressionFilter) {
      addTerminalLog(
        'warn',
        'STRESS TEST',
        `WhatsApp 360p compression filter toggled ${updated.compressionFilter ? 'ON (-18dB SNR)' : 'OFF'}`
      );
    }
    if (updated.lowLightSimulator !== stressTests.lowLightSimulator) {
      addTerminalLog(
        'warn',
        'STRESS TEST',
        `Low-light condition simulator (15 LUX) toggled ${updated.lowLightSimulator ? 'ON' : 'OFF'}`
      );
    }
    if (updated.highNoiseFilter !== stressTests.highNoiseFilter) {
      addTerminalLog(
        'warn',
        'STRESS TEST',
        `High acoustic noise filter (+12dB) toggled ${updated.highNoiseFilter ? 'ON' : 'OFF'}`
      );
    }
  };

  const handleStartAnalysis = () => {
    setHasScanned(true);
    setCurrentStep(2);
    addTerminalLog(
      'info',
      'INSPECT START',
      `Executing POS rPPG, Wav2Vec 2.0 Lip-Sync, and CMOS PRNU on ${scenario.fileName}...`
    );
  };

  const handleCompleteScan = () => {
    setCurrentStep(3);
    addTerminalLog(
      'success',
      'INSPECT SEAL',
      `Analysis completed in ${scenario.latencyMs}ms (< 850ms SLA). SHA-256 seal generated.`
    );
  };

  const handleReset = () => {
    setDemoKey('ceo_voice');
    setSelectedChannel('rtgs');
    setHasScanned(false);
    setCurrentStep(1);
    addTerminalLog('dpdp', 'RAM PURGE', 'Cleared all buffered media from volatile tmpfs RAM. Session re-initialized.');
  };

  const canNavigateTo = (step: number) => {
    if (step === 1) return true;
    if (step === 2) return hasScanned || currentStep >= 2;
    if (step === 3) return hasScanned && currentStep >= 3;
    if (step === 4) return hasScanned && currentStep >= 4;
    return false;
  };

  const handleUseLiveWebcam = () => {
    setIsWebcamOpen(false);
    setSelectedChannel('vkyc');
    setDemoKey('legit_human');
    addTerminalLog('success', 'WEBRTC INGEST', 'Ingested real-time WebRTC 640x480 video feed. Calibrated POS rPPG tracker ready.');
    handleStartAnalysis();
  };

  const handleScrollToWizard = () => {
    if (wizardRef.current) {
      wizardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#475569] flex flex-col justify-between selection:bg-orange-100 selection:text-orange-900 pb-0">
      
      {/* 0. Topmost Grand National Cyber Crime Reporting Portal Banner (From Image 2: "Open krte hi dikhe") */}
      <PortalHeroBanner
        onStartGateway={handleScrollToWizard}
        onStartJuryTour={() => {
          setIsJuryTourActive(true);
          handleScrollToWizard();
        }}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenFaceOff={() => setIsFaceOffOpen(true)}
      />

      {/* 1. Header with Official GOI Masthead, National Emblem & Evaluation Triggers */}
      <div ref={wizardRef}>
        <Header
          onOpenTinyFish={() => setIsTinyFishOpen(true)}
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
          canNavigateTo={canNavigateTo}
          onOpenJuryTour={() => setIsJuryTourActive(true)}
          onOpenArchitecture={() => setIsArchitectureOpen(true)}
          onOpenFaceOff={() => setIsFaceOffOpen(true)}
        />
      </div>

      {/* 2. 60-Second Jury Evaluation Auto-Tour Controller Banner */}
      <JuryAutoTourBanner
        isActive={isJuryTourActive}
        onClose={() => setIsJuryTourActive(false)}
        onNavigateStep={(step) => {
          setHasScanned(true);
          setCurrentStep(step);
        }}
        currentWizardStep={currentStep}
        onOpenSection65B={() => setIsSection65BOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
      />

      {/* 3. Jury Stress-Test Control Strip */}
      <JuryStressTestBar
        stressTests={stressTests}
        onChange={handleStressTestChange}
      />

      {/* 4. Wizard Content Screens */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentStep === 1 && (
          <Step1Initiation
            channel={selectedChannel}
            onSelectChannel={(ch) => {
              setSelectedChannel(ch);
              addTerminalLog('info', 'CHANNEL INGEST', `Inbound proxy set to: ${ch.toUpperCase()}`);
            }}
            scenario={scenario}
            onSelectDemo={handleSelectDemo}
            onStartAnalysis={handleStartAnalysis}
            onOpenLiveWebcam={() => setIsWebcamOpen(true)}
            onOpenFaceOff={() => setIsFaceOffOpen(true)}
          />
        )}

        {currentStep === 2 && (
          <Step2Inspection
            scenario={scenario}
            stressTests={stressTests}
            onComplete={handleCompleteScan}
          />
        )}

        {currentStep === 3 && (
          <Step3TrustReceipt
            scenario={scenario}
            onProceedToDecision={() => {
              setCurrentStep(4);
              addTerminalLog('info', 'ROUTING', `Routing to Step 4 decisioning matrix for risk score: ${scenario.riskScore}/100`);
            }}
            onBackToScan={() => setCurrentStep(2)}
            onOpenSection65B={() => setIsSection65BOpen(true)}
          />
        )}

        {currentStep === 4 && (
          <Step4Decisioning
            scenario={scenario}
            onReset={handleReset}
            onBackToReceipt={() => setCurrentStep(3)}
            onOpenTinyFishModal={() => setIsTinyFishOpen(true)}
            onLogMessage={addTerminalLog}
          />
        )}
      </main>

      {/* 5. Modals & Sidecars */}

      {/* 5A. TinyFish Agent Modal */}
      <TinyFishModal
        isOpen={isTinyFishOpen}
        onClose={() => setIsTinyFishOpen(false)}
      />

      {/* 5B. Traditional Banking vs SatyaTrace Vulnerability Face-Off Modal */}
      <VulnerabilityFaceOffModal
        isOpen={isFaceOffOpen}
        onClose={() => setIsFaceOffOpen(false)}
        onLaunchDemo={() => {
          setIsFaceOffOpen(false);
          handleSelectDemo('ceo_voice');
          handleStartAnalysis();
        }}
      />

      {/* 5C. Live WebRTC Webcam / Mic Liveness Modal */}
      <LiveWebcamModal
        isOpen={isWebcamOpen}
        onClose={() => setIsWebcamOpen(false)}
        onUseLiveFeed={handleUseLiveWebcam}
      />

      {/* 5D. Section 65B Indian Evidence Act Legal Court Certificate Modal */}
      <Section65BCertificateModal
        isOpen={isSection65BOpen}
        onClose={() => setIsSection65BOpen(false)}
        scenario={scenario}
      />

      {/* 5E. Core Banking Architecture Blueprint Modal */}
      <ArchitectureBlueprintModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      {/* 6. Collapsible Core Banking Proxy Terminal (CBS Logs) */}
      <CoreBankingTerminal
        logs={terminalLogs}
        onClearLogs={() => setTerminalLogs([])}
      />

      {/* 7. Official Government Footer (From Image 1: Added across all pages with visitor count & scroll-to-top) */}
      <OfficialGovFooter
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenFaceOff={() => setIsFaceOffOpen(true)}
      />

    </div>
  );
};

export default App;
