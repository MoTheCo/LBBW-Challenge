/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:     '#061319',
        stone:   '#0B2A3A',
        stone2:  '#0F3543',
        teal:    '#3E8E8A',
        tealhi:  '#5BB8B1',
        gold:    '#B08D57',
        goldhi:  '#D2B07A',
        sand:    '#E8E1D5',
        paper:   '#FBFAF7',
        graphit: '#2B2B2B',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        ui: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
