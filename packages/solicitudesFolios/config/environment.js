const { dotenv } = require('@siiges-services/shared');

const config = {
  apiBaseUrl: dotenv.getEnvironmentVar('API_BASE_URL'),
  // Configuración de Firma Electrónica
  feBaseUrl: dotenv.getEnvironmentVar('FE_BASE_URL') || 'https://ws.jalisco.gob.mx/fe',
  feClientId: dotenv.getEnvironmentVar('FE_CLIENT_ID') || 'fe',
  feClientSecret: dotenv.getEnvironmentVar('FE_CLIENT_SECRET'),
  feUsername: dotenv.getEnvironmentVar('FE_USERNAME'),
  fePassword: dotenv.getEnvironmentVar('FE_PASSWORD'),
  feTokenExpirationBuffer: parseInt(dotenv.getEnvironmentVar('FE_TOKEN_EXPIRATION_BUFFER') || '300', 10),
};

module.exports = {
  config,
};
