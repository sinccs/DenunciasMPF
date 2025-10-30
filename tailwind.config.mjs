/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        rojo: {
          DEFAULT: '#8E1D1D',
          claro: '#ec9292',
          oscuro: '#641414',
        },
        guia: '#1F7A8C',
        fuchsia: {
          DEFAULT: '#88116E',
        },
        'info-bg': '#F0690E', // Usado en Ciberfraude.html y UFEMA.html
        // Colores específicos de páginas
        'ufema-blue': '#00909a', // De UFEMA.html
        'ufema-highlight': '#9B2564', // De UFEMA.html
        'ciber-blue': '#1d4891', // De Ciberfraude.html
        'ciber-blue-light': '#3a67b0', // Un tono más claro para el highlight de Ciberfraude
        'justicia-blue': '#006472', // De AccesoJusticia.html
        'justicia-blue-dark': '#044f58', // Para hover en AccesoJusticia.html
        'justicia-blue-light': '#008c9e', // Un tono más claro para el highlight de AccesoJusticia
        'vg-purple': '#6f1264', // De VG.html
        'vg-purple-light': '#9e3a92', // Un tono más claro para el highlight de VG
        // Colores de NNyA.html
        'nnya-fuchsia': '#88116E',
        'nnya-fuchsia-chip': '#9B2564',
      },
    },
  },
  plugins: [],
}