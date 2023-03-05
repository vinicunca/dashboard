const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['@vinicunca/eslint-config', '@unocss'],

  rules: {
    'sonarjs/prefer-single-boolean-return': 'off',
  },
});
