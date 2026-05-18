const { dotenv } = require('@siiges-services/shared');

const config = {
  urlTitulacion: dotenv.getEnvironmentVar('URL_TITULACION'),
  // Firma Electrónica - Servicio Jalisco
  firmaElectronica: {
    urlToken: dotenv.getEnvironmentVar('FIRMA_ELECTRONICA_TOKEN_URL'),
    urlFirma: dotenv.getEnvironmentVar('FIRMA_ELECTRONICA_FIRMA_URL'),
    clientId: dotenv.getEnvironmentVar('FIRMA_ELECTRONICA_CLIENT_ID'),
    clientSecret: dotenv.getEnvironmentVar('FIRMA_ELECTRONICA_CLIENT_SECRET'),
    username: dotenv.getEnvironmentVar('FIRMA_ELECTRONICA_USERNAME'),
    password: dotenv.getEnvironmentVar('FIRMA_ELECTRONICA_PASSWORD'),
  },
  apiTitulos: {
    baseUrl: dotenv.getEnvironmentVar('URL_API_TITULO'),
    apiKey: dotenv.getEnvironmentVar('API_KEY_REPRESENTANTES'),
  },
};

module.exports = {
  config,
};
