/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logoFont: ["\"Poetsen One\", sans-serif"],
        bodyFont: ["\"Poppins\", sans-serif"],
        buttonFont: ["\"Raleway\", sans-serif"],
        // headingFont: ["\"Playfair Display\", serif"],
      },
      colors: {
        textColour: '#2b2b2b',
        topBarBg: '#000000',
        headerBg: '#ffffff',
      },
      fontSize: {
        largeScreenlogoContent: '35px',
        smallScreenlogoContent: '25px',
        largeScreenContent: '14px',
        smallScreenContent: '11px',
      },
      animation: {
        navBarMenuOpen: "navBarMenuOpen 0.5s linear",
        navBarMenuClose: "navBarMenuClose 0.6s linear",
        arrowRotate: "arrowRotate 0.2s linear",
        arrowRotateBack: "arrowRotateBack 0.2s linear",
        blueSlider: "blueSlider 2s ease forwards",
        returnBlueSlider: "returnBlueSlider 2s ease forwards",
        form: "form 2s ease forwards",
        formReturn: "formReturn 2s ease forwards",
        formSecond: "formSecond 2s ease forwards",
        formSecondReturn: "formSecondReturn 2s ease forwards",
        loginText: "loginText 2s ease forwards",
        returnLoginText: "returnLoginText 2s ease forwards",
        sideBarOpen: "sideBarOpen 0.6s ease-out forwards",
        sideBarClose: "sideBarClose 0.6s ease-out forwards",
      },
      keyframes: {
        navBarMenuOpen: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "25%": { opacity: "0.4", transform: "translateX(-75%)" },
          "50%": { opacity: "0.5", transform: "translateX(-50%)" },
          "60%": { opacity: "0.6", transform: "translateX(-40%)" },
          "70%": { opacity: "0.7", transform: "translateX(-30%)" },
          "80%": { opacity: "0.8", transform: "translateX(-20%)" },
          "90%": { opacity: "0.9", transform: "translateX(-10%)" },
          "100%": { opacity: "1", transform: "translateX(0%)" },
        },
        navBarMenuClose: {
          "0%": { opacity: "1", transform: "translateX(0%)" },
          "10%": { opacity: ".9", transform: "translateX(-10%)" },
          "20%": { opacity: ".8", transform: "translateX(-20%)" },
          "30%": { opacity: ".7", transform: "translateX(-30%)" },
          "40%": { opacity: ".6", transform: "translateX(-40%)" },
          "50%": { opacity: ".5", transform: "translateX(-50%)" },
          "60%": { opacity: ".4", transform: "translateX(-60%)" },
          "70%": { opacity: ".3", transform: "translateX(-70%)" },
          "80%": { opacity: ".2", transform: "translateX(-80%)" },
          "100%": { opacity: ".1", transform: "translateX(-100%)" },
        },
        arrowRotate: {
          "0%": { transform: 'rotate(18deg)' },
          "10%": { transform: 'rotate(36deg)' },
          "20%": { transform: 'rotate(54deg)' },
          "30%": { transform: 'rotate(72deg)' },
          "40%": { transform: 'rotate(90deg)' },
          "50%": { transform: 'rotate(108deg)' },
          "60%": { transform: 'rotate(126deg)' },
          "70%": { transform: 'rotate(144deg)' },
          "80%": { transform: 'rotate(162deg)' },
          "90%": { transform: 'rotate(180deg)' },
          "100%": { transform: 'rotate(180deg)' },
        },
        arrowRotateBack: {
          "0%": { transform: 'rotate(180deg)' },
          "10%": { transform: 'rotate(180deg)' },
          "20%": { transform: 'rotate(162deg)' },
          "30%": { transform: 'rotate(144deg)' },
          "40%": { transform: 'rotate(126deg)' },
          "50%": { transform: 'rotate(108deg)' },
          "60%": { transform: 'rotate(90deg)' },
          "70%": { transform: 'rotate(72deg)' },
          "80%": { transform: 'rotate(54deg)' },
          "90%": { transform: 'rotate(36deg)' },
          "100%": { transform: 'rotate(18deg)' },
        },
        ////////////For Sidebar////////////
        sideBarOpen: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        sideBarClose: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        ////////////For Blue Box///////////
        blueSlider: {
          from: {
            right: '-15%'
          },
          to: {
            right: '65%'
          }
        },
        returnBlueSlider: {
          from: {
            right: '65%'
          },
          to: {
            right: '-15%'
          }
        },
        ////////////For form Box///////////
        form: {
          from: {
            left: '-50%'
          },
          to: {
            left: '0'
          }
        },
        formReturn: {
          from: {
            left: '0'
          },
          to: {
            left: '-50%'
          }
        },
        ////////////For formSecond Box///////////
        formSecond: {
          from: {
            right: '0'
          },
          to: {
            right: '-40%'
          }
        },
        formSecondReturn: {
          from: {
            right: '-40%'
          },
          to: {
            right: '0'
          }
        },
      }
    },
  },
  plugins: [],
}