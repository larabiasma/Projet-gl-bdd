/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        md: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.5)',
      },
      colors:{
        primary : '#E5D9F2' ,
        secondary : "#F5EFFF",
        purple:"#A594F9",
        purple2:"#CDC1FF"
      },
      fontFamily:{
        bigLines:'Fanwood Text'
      }
      ,fontSize:{
        10:'80px'
      } , 
      borderRadius :{
        '5xl' :'100px',
        '4xl' :'50px',

      '8xl' :'200px'
      }
    
    },
  },
  plugins: [],
}