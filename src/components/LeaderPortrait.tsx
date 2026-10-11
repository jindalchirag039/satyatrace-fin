import React, { useState } from 'react';

interface LeaderPortraitProps {
  leader: 'modi' | 'amitshah';
  className?: string;
  size?: 'normal' | 'large';
}

export const LeaderPortrait: React.FC<LeaderPortraitProps> = ({
  leader,
  className = '',
  size = 'normal',
}) => {
  const [photoError, setPhotoError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const isModi = leader === 'modi';

  // High-Resolution Official Government of India Studio Portraits
  const primaryPhoto = isModi
    ? 'https://upload.wikimedia.org/wikipedia/commons/4/44/Shri_Narendra_Modi%2C_Prime_Minister_of_India.jpg'
    : 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Shri_Amit_Shah.jpg';

  const backupPhoto = isModi
    ? 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Narendra_Modi_2023.jpg'
    : 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Shri_Amit_Shah_in_Raigad.jpg';

  // Local user uploaded official portal banner
  const localBanner = '/portal_banner.png';
  const fsBanner = '/@fs/C:/Users/hp/.gemini/antigravity/brain/e7293d4b-d235-446e-827f-80bbeac34584/.user_uploaded/media_1791686260310_4900eaad.png';

  const containerDimensions = size === 'large'
    ? 'w-28 h-36 sm:w-32 sm:h-40'
    : 'w-24 h-30 sm:w-28 sm:h-36';

  return (
    <div
      className={`relative ${containerDimensions} rounded-xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-[#092244] flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        boxShadow: '0 8px 24px -4px rgba(217, 119, 6, 0.4), 0 0 16px 2px rgba(255, 153, 51, 0.3)',
      }}
    >
      {/* ----------------------------------------------------------------------- */}
      {/* 1. LAYER 1: Fallback Vector SVG (Guarantees NEVER BLANK if offline) */}
      {/* ----------------------------------------------------------------------- */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {isModi ? (
          <svg viewBox="0 0 140 180" className="w-full h-full" fill="none">
            <defs>
              <linearGradient id="modiBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B2545" />
                <stop offset="50%" stopColor="#133E6E" />
                <stop offset="100%" stopColor="#0A1C30" />
              </linearGradient>
              <linearGradient id="modiVest" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4E342E" />
                <stop offset="100%" stopColor="#2E1C18" />
              </linearGradient>
              <linearGradient id="modiKurta" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
            </defs>
            <rect width="140" height="180" fill="url(#modiBg)" />
            <circle cx="70" cy="55" r="46" fill="#FF9933" opacity="0.2" />
            <circle cx="70" cy="55" r="36" fill="#FFFFFF" opacity="0.1" />
            <circle cx="70" cy="55" r="26" fill="#138808" opacity="0.16" />
            <path d="M12 180 C18 132 44 122 70 122 C96 122 122 132 128 180 Z" fill="url(#modiKurta)" />
            <path d="M34 180 C36 138 52 130 70 130 C88 130 104 138 106 180 Z" fill="url(#modiVest)" />
            <line x1="70" y1="132" x2="70" y2="180" stroke="#8D6E63" strokeWidth="1.5" />
            <rect x="58" y="96" width="24" height="26" rx="4" fill="#E8B896" />
            <ellipse cx="70" cy="65" rx="26" ry="32" fill="#F0C3A0" />
            <path d="M44 55 C42 35 56 20 70 20 C84 20 98 35 96 55 C92 38 84 30 70 30 C56 30 48 38 44 55 Z" fill="#F5F5F5" />
            <path d="M52 50 Q58 48 64 51" stroke="#9E9E9E" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M76 51 Q82 48 88 50" stroke="#9E9E9E" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <rect x="50" y="52" width="16" height="11" rx="2.5" fill="rgba(255,255,255,0.35)" stroke="#78909C" strokeWidth="1.3" />
            <rect x="74" y="52" width="16" height="11" rx="2.5" fill="rgba(255,255,255,0.35)" stroke="#78909C" strokeWidth="1.3" />
            <line x1="66" y1="56" x2="74" y2="56" stroke="#78909C" strokeWidth="1.3" />
            <circle cx="58" cy="57" r="2.2" fill="#3E2723" />
            <circle cx="82" cy="57" r="2.2" fill="#3E2723" />
            <path d="M70 56 L68 68 L73 68" stroke="#D7A17E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M52 68 Q70 66 88 68 Q70 76 52 68 Z" fill="#FFFFFF" />
            <path d="M48 72 C48 98 56 108 70 108 C84 108 92 98 92 72 C86 86 80 94 70 94 C60 94 54 86 48 72 Z" fill="#FFFFFF" />
          </svg>
        ) : (
          <svg viewBox="0 0 140 180" className="w-full h-full" fill="none">
            <defs>
              <linearGradient id="shahBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B2545" />
                <stop offset="50%" stopColor="#133E6E" />
                <stop offset="100%" stopColor="#0A1C30" />
              </linearGradient>
              <linearGradient id="shahKurta" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#ECEFF1" />
              </linearGradient>
              <linearGradient id="shawlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E65100" />
                <stop offset="50%" stopColor="#FF9933" />
                <stop offset="100%" stopColor="#BF360C" />
              </linearGradient>
            </defs>
            <rect width="140" height="180" fill="url(#shahBg)" />
            <circle cx="70" cy="55" r="46" fill="#138808" opacity="0.16" />
            <circle cx="70" cy="55" r="36" fill="#FFFFFF" opacity="0.1" />
            <circle cx="70" cy="55" r="26" fill="#FF9933" opacity="0.2" />
            <path d="M10 180 C16 130 42 120 70 120 C98 120 124 130 130 180 Z" fill="url(#shahKurta)" />
            <path d="M78 122 C82 140 85 160 88 180 L114 180 C112 155 106 135 102 122 Z" fill="url(#shawlGrad)" />
            <line x1="83" y1="128" x2="93" y2="180" stroke="#FFE0B2" strokeWidth="1.3" />
            <rect x="56" y="94" width="28" height="28" rx="4" fill="#E8B896" />
            <ellipse cx="70" cy="65" rx="28" ry="33" fill="#F0C3A0" />
            <path d="M42 50 C40 34 54 20 70 20 C86 20 100 34 98 50 C94 34 86 28 70 28 C54 28 46 34 42 50 Z" fill="#263238" />
            <path d="M50 49 Q57 47 64 50" stroke="#263238" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M76 50 Q83 47 90 49" stroke="#263238" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <rect x="48" y="51" width="18" height="12" rx="3" fill="rgba(255,255,255,0.3)" stroke="#1A237E" strokeWidth="1.5" />
            <rect x="74" y="51" width="18" height="12" rx="3" fill="rgba(255,255,255,0.3)" stroke="#1A237E" strokeWidth="1.5" />
            <line x1="66" y1="56" x2="74" y2="56" stroke="#1A237E" strokeWidth="1.5" />
            <circle cx="57" cy="56" r="2.2" fill="#212121" />
            <circle cx="83" cy="56" r="2.2" fill="#212121" />
            <path d="M70 55 L67 69 L73 69" stroke="#D7A17E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M52 70 Q70 68 88 70 Q70 78 52 70 Z" fill="#ECEFF1" />
            <path d="M46 72 C46 100 55 110 70 110 C85 110 94 100 94 72 C88 88 82 96 70 96 C58 96 52 88 46 72 Z" fill="#ECEFF1" />
          </svg>
        )}
      </div>

      {/* ----------------------------------------------------------------------- */}
      {/* 2. LAYER 2: Banner Crop with TOP OFFSET (Blue Navbar & Text Completely Eliminated) */}
      {/* ----------------------------------------------------------------------- */}
      <div className="absolute inset-0 overflow-hidden bg-[#092244]">
        <img
          src={localBanner}
          alt=""
          onError={(e) => {
            if (!e.currentTarget.src.includes('media_1791686260310_4900eaad.png')) {
              e.currentTarget.src = fsBanner;
            }
          }}
          className="max-w-none absolute pointer-events-none select-none transition-transform"
          style={
            isModi
              ? {
                  width: '560%',
                  height: 'auto',
                  left: '-84%',
                  top: '-168%', // Hides the top 34% (navbar, complaint text) completely
                }
              : {
                  width: '560%',
                  height: 'auto',
                  left: '-415%',
                  top: '-188%', // Hides the top 36% (navbar, contact text) completely
                }
          }
        />
      </div>

      {/* ----------------------------------------------------------------------- */}
      {/* 3. LAYER 3: Official Real Studio Photo (Perfect Fit, Zero Text, No Referrer) */}
      {/* ----------------------------------------------------------------------- */}
      {!photoError && (
        <img
          src={primaryPhoto}
          alt={isModi ? 'Hon’ble PM Shri Narendra Modi' : 'Hon’ble HM Shri Amit Shah'}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          loading="eager"
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            if (e.currentTarget.src !== backupPhoto) {
              e.currentTarget.src = backupPhoto;
            } else {
              setPhotoError(true);
            }
          }}
        />
      )}

      {/* Note: NO text overlay, NO captions inside the photo frame as requested. Pure, clean photo fit. */}
    </div>
  );
};
