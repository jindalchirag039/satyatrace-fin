import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shield, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { ForensicScenario, JuryStressTest } from '../types';
import { TelemetryGauge } from './TelemetryGauge';
import { useLanguage } from '../context/LanguageContext';

interface Step2InspectionProps {
  scenario: ForensicScenario;
  stressTests: JuryStressTest;
  onComplete: () => void;
}

export const Step2Inspection: React.FC<Step2InspectionProps> = ({
  scenario,
  stressTests,
  onComplete,
}) => {
  const { lang, t } = useLanguage();
  const totalFrames = 450;
  const [currentFrame, setCurrentFrame] = useState(120);
  const [isPlaying, setIsPlaying] = useState(true);

  const [elapsedMs, setElapsedMs] = useState(0);
  const targetLatency = scenario.latencyMs;
  const isFinished = elapsedMs >= targetLatency;

  const rppgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const syncCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setElapsedMs(0);
    const interval = setInterval(() => {
      setElapsedMs((prev) => {
        if (prev + 30 >= targetLatency) {
          clearInterval(interval);
          return targetLatency;
        }
        return prev + 30;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [scenario, targetLatency]);

  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentFrame((prev) => (prev >= totalFrames ? 0 : prev + 1));
      }, 33);
      return () => clearInterval(interval);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const adjustedSnr = Math.max(
    0.1,
    scenario.rppg.snrValue -
      (stressTests.lowLightSimulator ? 0.3 : 0) -
      (stressTests.compressionFilter ? 0.2 : 0)
  );

  const adjustedLag = Math.max(
    12,
    scenario.sync.lagMs + (stressTests.highNoiseFilter ? 6 : 0)
  );

  const adjustedPrnu = Math.max(
    2,
    scenario.spectral.prnuConfidence - (stressTests.compressionFilter ? 5 : 0)
  );

  const currentTimeSec = (currentFrame / 30).toFixed(2);
  const isLagDetectedAtFrame =
    !scenario.sync.passed && currentFrame >= 60 && currentFrame <= 220;

  // Render Canvas A: rPPG Capillary Pulse Spectrum
  useEffect(() => {
    const canvas = rppgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Target Threshold Line (1.8 dB)
    const thresholdY = h / 2 - 25;
    ctx.strokeStyle = '#94A3B8';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, thresholdY);
    ctx.lineTo(w, thresholdY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#64748B';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('Target SNR Threshold > 1.8 dB (ISO/IEC 30107-3)', 15, thresholdY - 4);

    const isPass = scenario.rppg.passed;
    const frameOffset = currentFrame * 0.08;

    // Authentic Reference Guide Wave (Green dashed)
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const t = x * 0.035 + frameOffset;
      const y = h / 2 - 38 * Math.sin(t) - 14 * Math.sin(2 * t + 0.5);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Actual Payload Stream (Solid)
    ctx.strokeStyle = isPass ? '#059669' : '#DC2626';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      let y: number;
      if (isPass) {
        const t = x * 0.035 + frameOffset;
        const noise = stressTests.compressionFilter ? (Math.random() - 0.5) * 6 : 0;
        y = h / 2 - 36 * Math.sin(t) - 13 * Math.sin(2 * t + 0.5) + noise;
      } else {
        const noise = (Math.random() - 0.5) * (stressTests.compressionFilter ? 12 : 6);
        y = h / 2 + 22 + noise;
      }
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#002147';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText('POS Remote Photoplethysmography (0.8–2.5 Hz Bandpass)', 15, 18);

    if (!isPass) {
      ctx.fillStyle = '#DC2626';
      ctx.fillText(
        `⚠ FLATLINE / SYNTHETIC ARTIFACT DETECTED (SNR: ${adjustedSnr.toFixed(1)} dB < 1.8 dB)`,
        15,
        h - 12
      );
    } else {
      ctx.fillStyle = '#059669';
      ctx.fillText(
        `✓ RHYTHMIC 1.15 Hz CARDIAC SYSTOLIC PEAKS LOCKED (SNR: ${adjustedSnr.toFixed(1)} dB)`,
        15,
        h - 12
      );
    }
  }, [scenario, currentFrame, adjustedSnr, stressTests]);

  // Render Canvas B: Lip-Phoneme Aerodynamic Lag Waveform
  useEffect(() => {
    const canvas = syncCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    const frameOffset = currentFrame * 0.05;
    const isPass = scenario.sync.passed;

    // Track 1: Speech Phoneme Pitch (Wav2Vec 2.0) - Ashoka Indigo
    ctx.strokeStyle = '#002147';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const t = x * 0.045 + frameOffset;
      const acousticNoise = stressTests.highNoiseFilter ? (Math.random() - 0.5) * 8 : 0;
      const y = 50 + Math.sin(t * 0.8) * Math.sin(t * 3.2) * 28 + acousticNoise;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Track 2: 3D Lip Landmark Aperture Velocity - Saffron / Red
    const lagPx = isPass ? 8 : (adjustedLag / 88) * 60;
    ctx.strokeStyle = isPass ? '#D97706' : '#DC2626';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const t = (x - lagPx) * 0.045 + frameOffset;
      const aperture = Math.max(0, Math.sin(t * 0.8)) * 32;
      const y = 140 - aperture;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    if (!isPass) {
      ctx.fillStyle = 'rgba(220, 38, 38, 0.12)';
      ctx.fillRect(200, 20, 140, h - 35);
      ctx.strokeStyle = '#DC2626';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(200, 20, 140, h - 35);

      ctx.fillStyle = '#DC2626';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(`DESYNC LAG: ${adjustedLag}ms (> 40ms CEILING)`, 205, 34);
    } else {
      ctx.fillStyle = '#059669';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(`✓ AERODYNAMIC PHASE SYNCHRONIZED (LAG ${adjustedLag}ms ≤ 40ms)`, 15, h - 12);
    }

    ctx.fillStyle = '#475569';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Top: Audio Speech Phonemes (Wav2Vec 2.0)', 15, 18);
    ctx.fillText('Bottom: 3D Lip Landmark Aperture Velocity', 15, 105);
  }, [scenario, currentFrame, adjustedLag, stressTests]);

  return (
    <div className="space-y-6">
      
      {/* Sub-Second SLA Telemetry Progress Header with Tricolor Accent */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(90deg, #FF9933 0%, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%, #138808 100%)',
          }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-xs font-bold mb-2 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>{lang === 'hi' ? 'चरण ०२ / ०४' : 'Step 02 of 04'}</span>
              <span>•</span>
              <span>/inspect — {lang === 'hi' ? 'द्वि-धारा फोरेंसिक ऑसिलोस्कोप' : 'Dual-Stream Forensic Oscilloscope'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#002147] tracking-tight">
              {t.step2Heading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t.step2Sub}
            </p>
          </div>

          {/* Live Sub-Second Telemetry Box */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 shadow-2xs">
            <div className="mr-4">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Latency Elapsed</div>
              <div className="text-2xl font-black font-mono text-[#002147]">{elapsedMs}ms</div>
            </div>
            <div className="pl-4 border-l border-slate-200 text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">SLA Ceiling</div>
              <div className="text-sm font-bold font-mono text-emerald-700">&lt; 850ms</div>
            </div>
          </div>
        </div>

        {/* Animated Telemetry Bar with Saffron/Tricolor styling */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-slate-700">
              {elapsedMs < targetLatency * 0.35 && 'Ingesting tmpfs stream & normalising 16kHz audio...'}
              {elapsedMs >= targetLatency * 0.35 && elapsedMs < targetLatency * 0.7 && 'Engine 1 Locked. Correlating Wav2Vec 2.0 Lip-Phoneme Kinematics...'}
              {elapsedMs >= targetLatency * 0.7 && !isFinished && 'Engine 2 Verified. Extracting CMOS PRNU & Vocoder STFT Spectrum...'}
              {isFinished && `Completed in ${targetLatency}ms (< 850ms Budget Met). Bayesian Vector Calibrated.`}
            </span>
            <span className="font-mono font-bold text-[#002147]">
              {Math.min(100, Math.round((elapsedMs / targetLatency) * 100))}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-600 via-orange-500 to-[#002147] h-2 rounded-full transition-all duration-100"
              style={{ width: `${Math.min(100, Math.round((elapsedMs / targetLatency) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Frame-by-Frame Inspector View: Media Player Container + Scrubber Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[#002147] text-sm">
              Live Frame Scrubber &amp; Physiological ROI Tracker
            </span>
            <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {scenario.fileName}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono text-slate-600">
            <span>
              Frame: <strong className="text-[#002147]">{currentFrame}</strong> / {totalFrames}
            </span>
            <span>•</span>
            <span>
              Timecode: <strong className="text-[#002147]">{currentTimeSec}s</strong> / 15.00s
            </span>
          </div>
        </div>

        {/* Visual Media Frame Canvas / Player Simulation */}
        <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 h-56 sm:h-64 flex items-center justify-center">
          
          {/* Simulated Face Geometry & Mesh */}
          <div className="relative w-44 h-48 sm:w-52 sm:h-56 flex flex-col items-center justify-center border border-indigo-400/40 rounded-3xl bg-indigo-950/20 shadow-inner">
            
            {/* Forehead ROI box */}
            <div className="absolute top-8 w-24 h-8 border-2 border-dashed border-emerald-400/80 rounded flex items-center justify-center bg-emerald-500/10">
              <span className="text-[9px] font-mono font-bold text-emerald-300">BVP ROI: Forehead</span>
            </div>

            {/* Left & Right Malar Tissue Boxes */}
            <div className="absolute top-20 left-4 w-12 h-10 border border-emerald-400/70 rounded flex items-center justify-center bg-emerald-500/10">
              <span className="text-[8px] font-mono text-emerald-300">Malar L</span>
            </div>
            <div className="absolute top-20 right-4 w-12 h-10 border border-emerald-400/70 rounded flex items-center justify-center bg-emerald-500/10">
              <span className="text-[8px] font-mono text-emerald-300">Malar R</span>
            </div>

            {/* Mouth Landmark Aperture Tracker */}
            <div
              className={`absolute bottom-8 w-20 h-8 border-2 rounded-lg flex items-center justify-center transition-all ${
                isLagDetectedAtFrame
                  ? 'border-red-500 bg-red-500/20 animate-pulse'
                  : 'border-amber-400/80 bg-amber-500/10'
              }`}
            >
              <span className="text-[9px] font-mono font-bold text-amber-200">
                {isLagDetectedAtFrame ? '⚠️ LIP-SYNC LAG' : '3D Lip Aperture'}
              </span>
            </div>

            <div className="text-slate-500 text-xs font-mono select-none">
              +468 Landmark Mesh
            </div>
          </div>

          {/* Stress-Test Active Overlays */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {stressTests.compressionFilter && (
              <span className="px-2 py-0.5 rounded bg-amber-900/80 border border-amber-600 text-amber-200 text-[10px] font-mono font-bold">
                WhatsApp 360p Artifact Filtering Active
              </span>
            )}
            {stressTests.lowLightSimulator && (
              <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-amber-500 text-amber-300 text-[10px] font-mono font-bold">
                Low-Light 15 LUX Contrast Boost Active
              </span>
            )}
            {stressTests.highNoiseFilter && (
              <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500 text-red-200 text-[10px] font-mono font-bold">
                +12dB Acoustic Babble Noise Suppression Active
              </span>
            )}
          </div>

          {/* Detection Alert Banner */}
          {isLagDetectedAtFrame && (
            <div className="absolute bottom-3 inset-x-3 bg-red-600/90 border border-red-400 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-white animate-bounce" />
                <span>PHONEME-VISEME DECOUPLING: 88ms Cross-Modal Delay</span>
              </div>
              <span className="font-mono text-[11px] bg-red-800 px-2 py-0.5 rounded">
                Frame #{currentFrame} Violation
              </span>
            </div>
          )}

        </div>

        {/* Scrubber Controls */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#002147] to-[#0D3B66] text-white flex items-center justify-center hover:opacity-95 transition-opacity shadow-2xs"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}
              className="p-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              title="Step backward 1 frame"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <input
              type="range"
              min="0"
              max={totalFrames}
              value={currentFrame}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentFrame(Number(e.target.value));
              }}
              className="flex-1 accent-orange-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />

            <button
              type="button"
              onClick={() => setCurrentFrame((prev) => Math.min(totalFrames, prev + 1))}
              className="p-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              title="Step forward 1 frame"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 2 Live Animated Waveform Canvases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Canvas A */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#002147] text-sm">
                Canvas A: rPPG Capillary Pulse Spectrum (POS Algorithm)
              </h3>
              <p className="text-xs text-slate-500">
                Remote Photoplethysmography extracting autonomic facial pulse (Target SNR &gt; 1.8 dB).
              </p>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded border ${
                scenario.rppg.passed
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-red-50 text-red-800 border-red-300'
              }`}
            >
              {scenario.rppg.passed ? '✓ Pulse Verified' : '⚠ Synthetic Flatline'}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 overflow-hidden">
            <canvas
              ref={rppgCanvasRef}
              width={560}
              height={180}
              className="w-full h-44 block"
            />
          </div>
        </div>

        {/* Canvas B */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#002147] text-sm">
                Canvas B: Lip-Phoneme Aerodynamic Lag Waveform
              </h3>
              <p className="text-xs text-slate-500">
                Wav2Vec 2.0 phonemes correlated with 3D lip landmark aperture velocity.
              </p>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded border ${
                scenario.sync.passed
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-red-50 text-red-800 border-red-300'
              }`}
            >
              {scenario.sync.passed ? '✓ Invariant Phase' : '⚠ Desync Violation'}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 overflow-hidden">
            <canvas
              ref={syncCanvasRef}
              width={560}
              height={180}
              className="w-full h-44 block"
            />
          </div>
        </div>

      </div>

      {/* 3 Telemetry Speedometers / Gauges */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#002147] mb-3">
          Physical Invariant Gauges &amp; Threshold Speedometers (भौतिक सत्यापन मीटर)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <TelemetryGauge
            label="Gauge 1: POS Pulse SNR Level"
            sublabel="Target Threshold: > 1.8 dB"
            value={adjustedSnr}
            min={0}
            max={3.0}
            unit=" dB"
            targetThreshold={1.8}
            dangerAbove={false}
            statusText={adjustedSnr >= 1.8 ? 'PASS (> 1.8 dB)' : 'ANOMALY'}
            statusType={adjustedSnr >= 1.8 ? 'success' : adjustedSnr >= 1.0 ? 'warning' : 'danger'}
          />

          <TelemetryGauge
            label="Gauge 2: Audio-Visual Phase Lag"
            sublabel="Ceiling Threshold: ≤ 40 ms"
            value={adjustedLag}
            min={0}
            max={120}
            unit=" ms"
            targetThreshold={40}
            dangerAbove={true}
            statusText={adjustedLag <= 40 ? 'PASS (≤ 40 ms)' : 'DESYNC FAIL'}
            statusType={adjustedLag <= 40 ? 'success' : adjustedLag <= 60 ? 'warning' : 'danger'}
          />

          <TelemetryGauge
            label="Gauge 3: CMOS Sensor PRNU Match"
            sublabel="Target Hardware Silicon: > 75%"
            value={adjustedPrnu}
            min={0}
            max={100}
            unit="%"
            targetThreshold={75}
            dangerAbove={false}
            statusText={adjustedPrnu >= 75 ? 'HARDWARE MATCH' : 'VIRTUAL CAM'}
            statusType={adjustedPrnu >= 75 ? 'success' : adjustedPrnu >= 50 ? 'warning' : 'danger'}
          />

        </div>
      </div>

      {/* Primary CTA: Official Government Defense Button with Saffron Border */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base shadow-2xs border border-emerald-300">
            ✓
          </div>
          <div>
            <h4 className="font-bold text-[#002147] text-base">
              Multi-Modal Inference Sealed Under SLA ({scenario.latencyMs}ms)
            </h4>
            <p className="text-xs text-slate-600">
              Bayesian Evidence Fusion combined posterior probabilities. Cryptographic manifest prepared.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-[#002147] via-[#0D3B66] to-[#002147] hover:from-[#001733] hover:to-[#0D3B66] text-white font-extrabold text-sm rounded-xl shadow-md transition-all border-b-4 border-amber-500 cursor-pointer"
        >
          <span>{t.receiptCta}</span>
        </button>
      </div>

    </div>
  );
};
