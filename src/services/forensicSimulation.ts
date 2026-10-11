import { ForensicScenario } from '../types';

export const SCENARIO_PRESETS: Record<string, ForensicScenario> = {
  attack1: {
    id: 'STR-2026-9921-IN',
    name: 'Virtual CEO Treasury Fraud (Pune Incident Archetype)',
    channel: 'rtgs',
    channelName: 'RTGS Mandate Hook (> ₹50L)',
    amount: '2,50,00,000',
    sender: 'CFO Suresh Nair',
    beneficiary: 'Apex Holdings Ltd (Yes Bank - YESB0000412)',
    refId: 'RTGS-2026-HDFC-9921',
    fileName: 'cfo_urgent_wire_mandate_15s.mp4',
    fileDetails: 'Size: 4.8 MB • Duration: 15.2s • H.264 / AAC 16kHz',
    riskScore: 84, // High (>65%)
    tier: 'high',
    statusLabel: 'ESCROW QUARANTINE REQUIRED',
    plainEnglishExplanation:
      'The voice pitch closely resembles CFO Suresh Nair, but lip motions in seconds 02–05 lag speech phonemes by 88ms. No natural blood volume pulse was detected in facial regions (SNR: 0.2 dB vs expected > 1.8 dB). HiFi-GAN neural vocoder phase cutoff detected at 15.8 kHz. DO NOT release funds without completing Escrow Quarantine.',
    rppg: {
      snr: '0.2 dB',
      snrValue: 0.2,
      peakFreq: '0.18 Hz (Flat Synthetic)',
      passed: false,
      description: 'Absence of autonomous cardiovascular micro-pulse. Fourier power spectrum matches static diffusion hallucination.'
    },
    sync: {
      lagMs: 88,
      correlation: 0.31,
      passed: false,
      description: 'Lip aperture velocities lag acoustic plosive phonemes by 88ms, violating aerodynamic physics ceiling of 40ms.'
    },
    spectral: {
      cutoffKhz: '15.8 kHz (HiFi-GAN Cutoff)',
      prnuMatched: false,
      prnuConfidence: 4.2,
      saccades: 'Rigid synthetic ocular fixation',
      passed: false
    },
    sha256Manifest: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f9b31d8c005b821e2e42b6a91',
    latencyMs: 790
  },
  attack2: {
    id: 'STR-2026-9922-IN',
    name: 'vKYC Virtual Camera Injection (OBS / DeepFaceLive)',
    channel: 'vkyc',
    channelName: 'WebRTC vKYC Sidecar',
    amount: '65,00,000',
    sender: 'Applicant Ramesh Khurana',
    beneficiary: 'Khurana MicroLending A/C (HDFC000104)',
    refId: 'VKYC-2026-APP-8104',
    fileName: 'webrtc_vkyc_stream_dump.mp4',
    fileDetails: 'Size: 12.4 MB • Duration: 30.0s • WebRTC VP8 / Opus',
    riskScore: 48, // Medium (15-65%)
    tier: 'med',
    statusLabel: 'DYNAMIC STEP-UP CHALLENGE REQUIRED',
    plainEnglishExplanation:
      'Borderline physiological signal detected due to virtual camera injection driver (OBS/DeepFaceLive). rPPG pulse power is attenuated (SNR 1.1 dB) and lip-sync demonstrates 52ms delay under heavy lighting compression. Trigger out-of-band Aadhaar OTP verification before issuing loan approval.',
    rppg: {
      snr: '1.1 dB',
      snrValue: 1.1,
      peakFreq: '0.92 Hz (Attenuated)',
      passed: false,
      description: 'Weak cardiac harmonic envelope due to synthetic face-swap warping at facial boundaries.'
    },
    sync: {
      lagMs: 52,
      correlation: 0.62,
      passed: false,
      description: 'Phoneme-viseme alignment displays 52ms jitter, marginally exceeding the 40ms tolerance window.'
    },
    spectral: {
      cutoffKhz: '16.4 kHz (Borderline)',
      prnuMatched: false,
      prnuConfidence: 18.5,
      saccades: 'Corneal micro-saccades absent',
      passed: false
    },
    sha256Manifest: '3c91a0298e82ef45b201dc9412a81f33c7b5a8e32901f42198be903102d128bb',
    latencyMs: 610
  },
  control3: {
    id: 'STR-2026-9923-IN',
    name: 'Legitimate Customer Mandate (Low-Light Smartphone)',
    channel: 'wa',
    channelName: 'WhatsApp Business API',
    amount: '18,50,000',
    sender: 'Partner Rajesh Singhania',
    beneficiary: 'Singhania Industrial Supplies (SBIN000492)',
    refId: 'WA-MSG-2026-10492',
    fileName: 'customer_mobile_recording_360p.mp4',
    fileDetails: 'Size: 2.1 MB • Duration: 11.5s • H.264 360p Compressed',
    riskScore: 8, // Low (<15%)
    tier: 'low',
    statusLabel: 'STRAIGHT-THROUGH CLEARANCE',
    plainEnglishExplanation:
      'Authentic human physiological presence confirmed. POS algorithm extracted clear sinusoidal cardiac blood volume pulse (SNR: 2.4 dB at 1.15 Hz). Phoneme-viseme acoustic synchrony well within physiological threshold (18ms lag). Natural CMOS sensor PRNU verified. Approved for instant release.',
    rppg: {
      snr: '2.4 dB',
      snrValue: 2.4,
      peakFreq: '1.15 Hz (Clean Human Pulse)',
      passed: true,
      description: 'Rhythmic systolic peaks and dicrotic notch extracted despite 360p video compression.'
    },
    sync: {
      lagMs: 18,
      correlation: 0.94,
      passed: true,
      description: 'Tight biological coupling between vocal tract acoustic power and 3D lip landmark expansion.'
    },
    spectral: {
      cutoffKhz: 'None (> 22 kHz Natural Spectrum)',
      prnuMatched: true,
      prnuConfidence: 97.8,
      saccades: 'Natural physiological ocular saccades',
      passed: true
    },
    sha256Manifest: 'e410b91f092837bc2810a4891b2c4819d08e7a634591a271049c819283a04ef9',
    latencyMs: 540
  }
};
