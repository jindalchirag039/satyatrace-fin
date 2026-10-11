import React from 'react';

interface TelemetryGaugeProps {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  targetThreshold?: number;
  dangerAbove?: boolean;
  statusText: string;
  statusType: 'success' | 'warning' | 'danger';
}

export const TelemetryGauge: React.FC<TelemetryGaugeProps> = ({
  label,
  sublabel,
  value,
  min,
  max,
  unit,
  targetThreshold,
  dangerAbove = false,
  statusText,
  statusType,
}) => {
  const clampedValue = Math.min(Math.max(value, min), max);
  const normalized = (clampedValue - min) / (max - min);

  const radius = 48;
  const cx = 65;
  const cy = 60;
  
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength * (1 - normalized);

  const getStatusColor = () => {
    switch (statusType) {
      case 'success':
        return '#059669'; // India Green
      case 'warning':
        return '#D97706'; // Saffron Gold
      case 'danger':
        return '#DC2626'; // Threat Red
    }
  };

  const statusBg =
    statusType === 'success'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
      : statusType === 'warning'
      ? 'bg-amber-50 text-amber-900 border-amber-300'
      : 'bg-red-50 text-red-900 border-red-300';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold text-[#002147] block">{label}</span>
          <span className="text-[11px] text-slate-500 block">{sublabel}</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusBg}`}>
          {statusText}
        </span>
      </div>

      <div className="flex items-center justify-center my-2 relative">
        <svg width="130" height="75" viewBox="0 0 130 75" className="overflow-visible">
          {/* Background Track Arc */}
          <path
            d="M 17 60 A 48 48 0 0 1 113 60"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Threshold marker */}
          {targetThreshold !== undefined && (
            (() => {
              const tNorm = (targetThreshold - min) / (max - min);
              const angle = Math.PI - tNorm * Math.PI;
              const tx = cx + (radius + 2) * Math.cos(angle);
              const ty = cy - (radius + 2) * Math.sin(angle);
              return (
                <circle
                  cx={tx}
                  cy={ty}
                  r="3.5"
                  fill="#002147"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              );
            })()
          )}

          {/* Active Value Arc */}
          <path
            d="M 17 60 A 48 48 0 0 1 113 60"
            fill="none"
            stroke={getStatusColor()}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
          />

          {/* Needle / Center Pin */}
          <circle cx={cx} cy={cy} r="4" fill="#002147" />
        </svg>

        {/* Value Text Overlay */}
        <div className="absolute bottom-0 text-center">
          <div className="text-lg font-black font-mono tracking-tight text-[#002147]">
            {value.toFixed(1)}
            <span className="text-xs font-normal text-slate-500 ml-0.5">{unit}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-1.5 mt-1">
        <span>Min: {min}{unit}</span>
        {targetThreshold !== undefined && (
          <span className="text-[#002147] font-semibold">
            Ceiling: {targetThreshold}{unit}
          </span>
        )}
        <span>Max: {max}{unit}</span>
      </div>
    </div>
  );
};
