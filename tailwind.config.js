/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: '#F5F5F5',
        border: '#E5E7EB',
        card: '#FFFFFF',
        foreground: '#1A1A1A',
        muted: '#6B7280',
        primary: {
          DEFAULT: '#DC1F2E',
          foreground: '#FFFFFF',
          600: '#C01B28',
          700: '#A71621',
        },
        secondary: {
          DEFAULT: '#E60000',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#10B981',
          foreground: '#FFFFFF',
        },
        info: {
          DEFAULT: '#3B82F6',
          foreground: '#FFFFFF',
        },
        sidebar: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
        md: '10px',
        sm: '8px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(220, 31, 46, 0.2)',
        subtle: '0 4px 20px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

