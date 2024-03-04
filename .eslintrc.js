module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential'],
  parser: 'vue-eslint-parser',
  overrides: [],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-undef': 'off',
    'vue/multi-word-component-names': 'off',
    'no-useless-escape': 'off',
    'no-prototype-builtins': 'off',
    'vue/no-mutating-props': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
  },
};
