const path = require('path');

module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    "linebreak-style": 0,
    'import/no-extraneous-dependencies':
    [
      'error',
      {
        packageDir: [
          __dirname,
          path.join(__dirname, 'packages/shared'),
          path.join(__dirname, 'packages/core'),
          path.join(__dirname, 'packages/authentication'),
          path.join(__dirname, 'packages/usuario'),
          path.join(__dirname, 'packages/api-gateway'),
          path.join(__dirname, 'packages/files'),
        ],
      },
    ],
  },
};
