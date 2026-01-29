const { dotenv } = require('@siiges-services/shared');

const config = {
  urlTitulacion: dotenv.getEnvironmentVar('URL_TITULACION'),
};

module.exports = {
  config,
};
