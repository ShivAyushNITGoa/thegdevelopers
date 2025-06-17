const tailwindConfig = require('./tailwind.config.ts');

module.exports = {
  tailwind: tailwindConfig,
  colors: tailwindConfig.theme.extend.colors,
  fonts: tailwindConfig.theme.extend.fontFamily,
}; 