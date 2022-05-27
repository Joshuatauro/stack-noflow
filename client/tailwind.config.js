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
        'cta-fade-text': "#2C5877",
        'dark': "#121212",
        'dark-fade': '#363636',
        'dark-text': "#c4c4c4",
        'dark-cta-fade': "#13283F",
        'dark-cta-fade-text': "#38BDF8"
      },
      gridTemplateColumns: {
        'layout': '0.35fr 1.9fr 0.6fr',
        'new-layout': '0.35fr 2.5fr',
        'inner-layout': '1.9fr 0.57fr',
        'post-layout': '0.1fr, 0.9fr'
      },
      minHeight: {
        'custom': 'calc(100vh - 65px)'
      },
      borderRadius: {
        'default': "5px"
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
