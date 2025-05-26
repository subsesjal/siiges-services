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
    'linebreak-style': 0,
    'import/no-extraneous-dependencies':
    [
      'error',
      {
        packageDir: [
          __dirname,
          path.join(__dirname, 'packages/administracionAcademica'),
          path.join(__dirname, 'packages/api-gateway'),
          path.join(__dirname, 'packages/authentication'),
          path.join(__dirname, 'packages/core'),
          path.join(__dirname, 'packages/externalService'),
          path.join(__dirname, 'packages/files'),
          path.join(__dirname, 'packages/inspecciones'),
          path.join(__dirname, 'packages/instituciones'),
          path.join(__dirname, 'packages/notificaciones'),
          path.join(__dirname, 'packages/opd'),
          path.join(__dirname, 'packages/shared'),
          path.join(__dirname, 'packages/solicitudes'),
          path.join(__dirname, 'packages/solicitudesBecas'),
          path.join(__dirname, 'packages/solicitudesFolios'),
          path.join(__dirname, 'packages/solicitudesRevEquiv'),
          path.join(__dirname, 'packages/solicitudesServicioSocial'),
          path.join(__dirname, 'packages/usuario'),
        ],
      },
    ],
  },
};
