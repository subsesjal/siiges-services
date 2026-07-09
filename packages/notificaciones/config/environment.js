const { dotenv } = require('@siiges-services/shared');

const config = {
  serviceEmail: dotenv.getEnvironmentVar('SERVICE_EMAIL'),
  userEmail: dotenv.getEnvironmentVar('USER_EMAIL'),
  passwordEmail: dotenv.getEnvironmentVar('PASSWORD_EMAIL'),
  BaseUrlFront: dotenv.getEnvironmentVar('BASE_URL_FRONT'),
  TimeMail: dotenv.getEnvironmentVar('TIME_MAIL'),
  emailSoporteSiiges: dotenv.getEnvironmentVar('EMAIL_SOPORTE_SIIGES'),
  emailDireccionIncorporacion: dotenv.getEnvironmentVar('EMAIL_DIRECCION_INCORPORACION'),
};

module.exports = {
  config,
};
