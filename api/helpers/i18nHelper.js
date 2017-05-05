const path = require('path');
const i18n = require('i18n');

// Locale Settings
i18n.configure({
  locales: ['en'],
  defaultLocale: 'en',
  directory: path.resolve(__dirname, '..', 'locales'),
  autoReload: true,
  objectNotation: true,
  // updateFiles: false,
});

module.exports = i18n.__;
