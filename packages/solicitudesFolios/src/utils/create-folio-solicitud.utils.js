const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const TIPO_DOCUMENTO_MAPPING = {
  1: 'T',
  2: 'C',
};

const createFolioSolicitud = (totalSolicitudes, tipoDocumentoId) => {
  if (checkers.isUndefined(totalSolicitudes)) throw boom.badRequest('totalSolciitudes is undefined');
  if (checkers.isUndefined(tipoDocumentoId)) throw boom.badRequest('tipoDocumentoId is undefined');

  const numeroConsecutivo = totalSolicitudes + 1;
  const d = new Date();
  const currentYear = d.getFullYear();

  // SFC20240001
  return `SF${TIPO_DOCUMENTO_MAPPING[tipoDocumentoId]}${currentYear}${numeroConsecutivo.toString().padStart(4, '0')}`;
};

module.exports = {
  createFolioSolicitud,
};
