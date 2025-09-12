// Export the Tailwind CSS configuration object used by the build (PostCSS) pipeline
module.exports = {
  // File paths that Tailwind should scan to generate utility classes
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // Theme customization and design tokens
  theme: {
    // Extend the default Tailwind theme instead of replacing it
    extend: {
      // Add variant support for the "transform" utilities on group hover
      // Note: In Tailwind v3, most variants are available by default; this entry may be legacy/inert.
      transform: ['group-hover'],
    },
  },
  // Tailwind plugins to load (official or community)
  plugins: [],
}