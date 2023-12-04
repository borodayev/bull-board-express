module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript'
  ],
  env: {
    es6: true,
    node: true
  },
  plugins: ['prettier', 'import', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        fixToUnknown: true,
        ignoreRestArgs: false
      }
    ],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        allowTemplateLiterals: true
      }
    ],
    '@typescript-eslint/no-use-before-define': 'error',
    'require-await': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'none'
      }
    ],
    'spaced-comment': ['error', 'always'],
    'no-underscore-dangle': 0,
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-plusplus': 0,
    'class-methods-use-this': 0,
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
        comments: 1000,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json']
      },
      node: {
        extensions: ['.js', '.ts']
      }
    }
  }
};
