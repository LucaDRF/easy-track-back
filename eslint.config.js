import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: { globals: { ...globals.browser, process: 'readonly', module: 'readonly'} },
    rules: {
      'brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],
      'eol-last': 'error',
      eqeqeq: 'error',
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      'key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true,
        },
      ],
      'keyword-spacing': 'error',
      'no-alert': 'error',
      'no-console': [
        'error',
        {
          allow: ['info'],
        },
      ],
      'no-trailing-spaces': 'error',
      'arrow-parens': ['error', 'as-needed'],
      semi: ['error', 'always'],
      'space-before-blocks': 'error',
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      quotes: ['error', 'single'],
    },
  },
  pluginJs.configs.recommended,
];
