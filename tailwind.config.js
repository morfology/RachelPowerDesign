const fontsTheme = {
"fonts": {
  "font_family": {
    "primary": "open sans",
    "primary_type": "sans-serif",
    "secondary": "Oswald",
    "secondary_type": "sans-serif"
  },
  "font_size": {
    "base": "16",
    "scale": "1.250"
  }
}
};



let font_base = Number(fontsTheme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(fontsTheme.fonts.font_size.scale);
let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;

// Here is where this setup pulls out font weight etc.
// but it does not seem to do anything with it. We may want
// to add this in the nexjs way ~MP
if (fontsTheme.fonts.font_family.primary) {
  fontPrimary = fontsTheme.fonts.font_family.primary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontPrimaryType = fontsTheme.fonts.font_family.primary_type;
}
if (fontsTheme.fonts.font_family.secondary) {
  fontSecondary = fontsTheme.fonts.font_family.secondary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontSecondaryType = fontsTheme.fonts.font_family.secondary_type;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: important:true + no safelist causes menu fail!!
  ///important: true,  // !important
  content: [
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/content/**/*.{md,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  // safelist: [{ pattern: /^swiper-/ }],
  
  theme: {
    screens: {
      sm: "540px",
      md: "724px",
      lg: "1280px",
      xl: "2800px",
      "2xl": "3200px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        "text": "#444444",  // => text-default
        "light": "#717171",  // => text-light
        "dark": "#272727",  // => text-dark
        "primary": "#b19777", // => text-primary
        //secondary: "#000"  // => text-secondary

        "body": "#fff",  // => bg-body
        "border": "#eaeaea",  // => border-border
        "theme-light": "#f4f4f4",  // => bg-theme-light
        "theme-dark": "#fff",  // => bg-theme-dark

        'bauen-grey': '#777',
        'bauen-black': '#272727',
        'bauen-brown': '#b19777'
        //  bauen bg col is #fff plain white        
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
      },
      // Claude addition 10/10/24
      fontSize: {
        base: font_base + "px",
        'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '0.7rem' }],
        'h2': ['2rem', { lineHeight: '1.2', letterSpacing: '0.5rem' }],
        'h3': ['1.75rem', { lineHeight: '1.2', letterSpacing: '0.3rem' }],
        'h1-sm': ['1.8rem', { lineHeight: '1.2', letterSpacing: '0.5rem' }],
        'h2-sm': ['1.5rem', { lineHeight: '1.2', letterSpacing: '0.4rem' }],
        'h3-sm': ['1.3rem', { lineHeight: '1.2', letterSpacing: '0.3rem' }],
      },
    },
  },


  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
      },
    }),
  ],
};
