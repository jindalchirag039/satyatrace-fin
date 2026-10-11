/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        border: '#E2E8F0',
        heading: '#0F172A',
        body: '#475569',
        muted: '#64748B',
        indigo: {
          institutional: '#4F46E5',
        },
        emerald: {
          authentic: '#10B981',
        },
        amber: {
          stepup: '#F59E0B',
        },
        crimson: {
          escrow: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
