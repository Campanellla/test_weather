module.exports = {
  presets: ['next/babel'],

  plugins: [
    /* Plugin to load styled component */
    ['styled-components', { ssr: true }],
  ],
}
