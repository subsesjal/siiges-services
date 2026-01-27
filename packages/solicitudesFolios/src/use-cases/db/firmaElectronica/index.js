const createTokenExterno = require('./create.token-externo.use-cases');
const findOneTokenExterno = require('./find-one.token-externo.use-cases');
const updateTokenExterno = require('./update.token-externo.use-cases');
const createDocumentoFirmado = require('./create.documento-firmado.use-cases');
const findOneDocumentoFirmado = require('./find-one.documento-firmado.use-cases');

module.exports = {
  createTokenExterno,
  findOneTokenExterno,
  updateTokenExterno,
  createDocumentoFirmado,
  findOneDocumentoFirmado,
};
