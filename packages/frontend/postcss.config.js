const tailwindConfig = require('./tailwind.config.ts').default;

module.exports = {
  plugins: {
    tailwindcss: { config: tailwindConfig },
    autoprefixer: {},
  },
}
