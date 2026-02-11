const { dotenv } = require('@siiges-services/shared');

const config = {
  urlTitulacion: dotenv.getEnvironmentVar('URL_TITULACION'),
  // Firma Electrónica - Servicio Jalisco
  firmaElectronica: {
    baseUrl: dotenv.getEnvironmentVar('FIRMA_ELECTRONICA_BASE_URL'),
    clientId: dotenv.getEnvironmentVar('FIRMA_ELECTRONICA_CLIENT_ID'),
    clientSecret: dotenv.getEnvironmentVar('FIRMA_ELECTRONICA_CLIENT_SECRET'),
    username: dotenv.getEnvironmentVar('FIRMA_ELECTRONICA_USERNAME'),
    password: dotenv.getEnvironmentVar('FIRMA_ELECTRONICA_PASSWORD'),
  },
};

module.exports = {
  config,
};
