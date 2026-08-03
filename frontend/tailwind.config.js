// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8ecf3',
          100: '#d1d8e7',
          200: '#a3b1cf',
          300: '#758ab7',
          400: '#47639f',
          500: '#1a2940',    // سورمه‌ای تیره اصلی
          600: '#2c3e6b',    // سورمه‌ای متوسط
          700: '#4a6fa5',    // سورمه‌ای روشن
          800: '#6b8fc4',
          900: '#8dafe3',
        },
        gold: {
          50: '#fbf5e8',
          100: '#f7ebd1',
          200: '#efd7a3',
          300: '#e7c375',
          400: '#dfaf47',
          500: '#d4a843',    // طلایی اصلی
          600: '#b8922e',    // طلایی تیره
          700: '#9c7a25',
          800: '#80631d',
          900: '#644d16',
        },
      },
      fontFamily: {
        sans: ['IranYekan', 'Vazirmatn', 'IranSans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}