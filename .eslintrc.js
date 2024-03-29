module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'prettier/react',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    jest: true,
  },
  globals: {
    window: true,
    document: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      0,
      {
        devDependencies: ['.storybook/**', 'stories/**'],
      },
    ],
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-curly-newline': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': [
      2,
      {
        allowExpressions: true,
      },
    ],
  },
};
