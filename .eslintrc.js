module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'airbnb/rules/react',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': 0,
    'react/jsx-curly-newline': 0,
    camelcase: 0,
    '@typescript-eslint/no-var-requires': 0,
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
