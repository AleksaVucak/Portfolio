// Export the PostCSS configuration object for the build tools (e.g., CRA/Vite)
module.exports = {
  // List of PostCSS plugins to run, executed in the order defined
  plugins: {
    // Tailwind CSS: expands utilities based on tailwind.config.js and your source files
    tailwindcss: {},
    // Autoprefixer: adds vendor prefixes according to your browserslist targets
    autoprefixer: {},
  },
}