import React, { useEffect, useRef } from 'react';
import { ForensicScenario } from '../types';

interface WaveformCanvasProps {
  type: 'rppg' | 'sync' | 'spectral';
  scenario: ForensicScenario;
}

export const WaveformCanvas: React.FC<WaveformCanvasProps> = ({ type, scenario }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Draw Subtle Grid
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

    if (type === 'rppg') {
      const isPass = scenario.rppg.passed;

      // Authentic reference line (Green)
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x * 0.04;
        const y = h / 2 - 40 * Math.sin(t) - 15 * Math.sin(2 * t + 0.5) * Math.cos(t * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Sample Stream Line
      ctx.strokeStyle = isPass ? '#059669' : '#EF4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        let y: number;
        if (isPass) {
          const t = x * 0.04;
          y = h / 2 - 38 * Math.sin(t + 0.1) - 14 * Math.sin(2 * (t + 0.1) + 0.5);
        } else {
          // Synthetic flat line with chaotic noise
          const noise = (Math.random() - 0.5) * 8;
          y = h / 2 + 25 + noise;
        }
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('rPPG Power Spectrum (0.75 Hz – 2.5 Hz Bandpass)', 15, 20);

      if (!isPass) {
        ctx.fillStyle = '#EF4444';
        ctx.fillText('⚠ FLATLINE / SYNTHETIC ARTIFACT DETECTED (NO CARDIAC FREQUENCY)', 15, h - 15);
      } else {
        ctx.fillStyle = '#10B981';
        ctx.fillText('✓ RHYTHMIC 1.15 Hz SYSTOLIC PEAKS VERIFIED (BLOOD VOLUME PULSE)', 15, h - 15);
      }
    } else if (type === 'sync') {
      const isPass = scenario.sync.passed;

      // Track 1: Audio Phonemes (Wav2Vec 2.0)
      ctx.strokeStyle = '#6366F1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x * 0.05;
        const envelope = Math.abs(Math.sin(t * 0.8)) * Math.sin(t * 3.5);
        const y = 60 + envelope * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Track 2: 3D Lip Aperture (shifted by lag)
      const lagPixels = isPass ? 10 : 65;
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = (x - lagPixels) * 0.05;
        const aperture = Math.max(0, Math.sin(t * 0.8)) * 40;
        const y = 160 - aperture;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (!isPass) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.fillRect(180, 20, 110, h - 40);
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(180, 20, 110, h - 40);

        ctx.fillStyle = '#DC2626';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.fillText(`DESYNC LAG: ${scenario.sync.lagMs}ms (VIOLATION > 40ms)`, 185, 38);
      } else {
        ctx.fillStyle = '#059669';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.fillText(`✓ AERODYNAMIC PHASE SYNCHRONIZED (LAG ${scenario.sync.lagMs}ms ≤ 40ms)`, 20, h - 15);
      }

      ctx.fillStyle = '#475569';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText('Top: Audio Speech Phonemes (Wav2Vec 2.0)', 15, 20);
      ctx.fillText('Bottom: 3D Lip Landmark Aperture Velocity', 15, 120);
    } else if (type === 'spectral') {
      const isPass = scenario.spectral.passed;

      for (let x = 0; x < w; x += 15) {
        for (let y = 0; y < h; y += 12) {
          const freqKhz = ((h - y) / h) * 24;
          let intensity: number;

          if (!isPass && freqKhz > 15.8) {
            intensity = 0.04;
          } else {
            intensity = Math.max(0.1, 1 - freqKhz / 24 + Math.sin(x * 0.1 + y * 0.2) * 0.2);
          }

          ctx.fillStyle = `rgba(79, 70, 229, ${intensity * 0.75})`;
          ctx.fillRect(x, y, 14, 11);
        }
      }

      const cutoffY = h - (15.8 / 24) * h;
      ctx.strokeStyle = '#EF4444';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, cutoffY);
      ctx.lineTo(w, cutoffY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#DC2626';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('15.8 kHz — Synthetic Neural Vocoder Cutoff (HiFi-GAN)', 20, cutoffY - 6);
    }
  }, [type, scenario]);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-hidden">
      <canvas
        ref={canvasRef}
        width={900}
        height={220}
        className="w-full h-52 block"
      />
    </div>
  );
};
