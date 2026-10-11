import React from 'react';

interface NationalEmblemProps {
  className?: string;
  size?: number;
  variant?: 'gold' | 'monochrome' | 'tricolor';
}

export const NationalEmblem: React.FC<NationalEmblemProps> = ({
  className = '',
  size = 40,
  variant = 'gold',
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      style={{ width: size, height: size }}
      title="State Emblem of India (सत्यमेव जयते)"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-2xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield Outer Gold Base */}
        <path
          d="M50 4 L86 16 V50 C86 74 50 94 50 94 C50 94 14 74 14 50 V16 L50 4 Z"
          fill={variant === 'gold' ? 'url(#emblem-gold-grad)' : variant === 'tricolor' ? '#002147' : '#0A192F'}
          stroke="#D97706"
          strokeWidth="2.5"
        />

        {/* Ashoka Chakra 24-Spoke Wheel in center */}
        <circle cx="50" cy="52" r="16" stroke="#000080" strokeWidth="2.5" fill="#FFFFFF" />
        <circle cx="50" cy="52" r="3" fill="#000080" />
        
        {/* Spokes */}
        {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x2 = 50 + 16 * Math.cos(rad);
          const y2 = 52 + 16 * Math.sin(rad);
          return (
            <line
              key={deg}
              x1="50"
              y1="52"
              x2={x2}
              y2={y2}
              stroke="#000080"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Lion Capital Silhouette on top */}
        <path
          d="M42 22 C42 18, 58 18, 58 22 C62 20, 68 24, 66 30 C64 34, 58 35, 58 36 L42 36 C42 35, 36 34, 34 30 C32 24, 38 20, 42 22 Z"
          fill="#FDE68A"
          stroke="#B45309"
          strokeWidth="1.2"
        />

        {/* Top Central Crown/Pillars */}
        <rect x="47" y="16" width="6" height="6" rx="1" fill="#F59E0B" />
        <path d="M40 36 H60 V40 H40 Z" fill="#D97706" />

        {/* Bottom Banner Ribbon with Satyameva Jayate inscription */}
        <path
          d="M26 76 C38 72, 62 72, 74 76 L72 82 C60 78, 40 78, 28 82 Z"
          fill="#FEF3C7"
          stroke="#B45309"
          strokeWidth="1"
        />
        <text
          x="50"
          y="79"
          textAnchor="middle"
          fontSize="4.5"
          fontWeight="bold"
          fill="#78350F"
          fontFamily="serif"
        >
          सत्यमेव जयते
        </text>

        {/* Definitions */}
        <defs>
          <linearGradient id="emblem-gold-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFBEB" />
            <stop offset="0.4" stopColor="#FEF3C7" />
            <stop offset="0.8" stopColor="#FDE68A" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
