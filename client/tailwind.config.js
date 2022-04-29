module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['inter'],
        'dongle': ['dongle']
      }, 
      colors: {
        'cta': "#0A95FF",
        'cta-fade': "#E1ECF4",
        'cta-fade-text': "#2C5877"
      },
      gridTemplateColumns: {
        'layout': '0.35fr 1.9fr 0.6fr',
        'post-layout': '0.13fr, 0.87fr'
      },
      minHeight: {
        'custom': 'calc(100vh - 65px)'
      }
    },
  },
  plugins: [],
}
