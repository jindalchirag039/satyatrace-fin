export type GatewayChannel = 'rtgs' | 'vkyc' | 'wa';

export type RiskTier = 'low' | 'med' | 'high';

export interface ForensicScenario {
  id: string;
  name: string;
  channel: GatewayChannel;
  channelName: string;
  amount: string;
  sender: string;
  beneficiary: string;
  refId: string;
  fileName: string;
  fileDetails: string;
  riskScore: number;
  tier: RiskTier;
  statusLabel: string;
  plainEnglishExplanation: string;
  rppg: {
    snr: string;
    snrValue: number;
    peakFreq: string;
    passed: boolean;
    description: string;
  };
  sync: {
    lagMs: number;
    correlation: number;
    passed: boolean;
    description: string;
  };
  spectral: {
    cutoffKhz: string;
    prnuMatched: boolean;
    prnuConfidence: number;
    saccades: string;
    passed: boolean;
  };
  sha256Manifest: string;
  latencyMs: number;
}

export interface JuryStressTest {
  compressionFilter: boolean; // WhatsApp 360p Media Degradation
  lowLightSimulator: boolean;  // Low-Light Conditions Simulator
  highNoiseFilter: boolean;    // High Acoustic Noise Filter
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  tag: string;
  level: 'info' | 'warn' | 'error' | 'success' | 'dpdp';
  message: string;
}

export interface InspectionTelemetry {
  gpuInferenceMs: number;
  rppgPosMs: number;
  wav2vecSyncMs: number;
  spectralPrnuMs: number;
  bayesianFusionMs: number;
  totalLatencyMs: number;
  slaBudgetMs: number;
  slaMet: boolean;
}
