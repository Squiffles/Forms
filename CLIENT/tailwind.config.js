/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')


export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "flame": "#D36135",
                "softBlack": "#02020B",
                "indigo": "#033F63",
                "ashGray": "#C6D8D3",
                "white": "#FDF0D5",
            },
            fontFamily: {
                "sans": ["Regular", ...defaultTheme.fontFamily.sans],
            }
        },
    },
    plugins: [],
};