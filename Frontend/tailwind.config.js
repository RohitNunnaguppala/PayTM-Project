/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';

export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"
];

export const theme = {
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.2s ease-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'translateY(-10px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
  },
};

export const plugins = [];
