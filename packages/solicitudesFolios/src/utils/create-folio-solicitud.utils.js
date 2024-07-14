const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const createFolioSolicitud = (totalSolicitudes, nivelId) => {
  if (checkers.isUndefined(totalSolicitudes)) throw boom.badRequest('totalSolciitudes is undefined');

  if (checkers.isUndefined(nivelId)) throw boom.badRequest('nivelId is undefined');

  const numeroConsecutivo = totalSolicitudes + 1;
  const d = new Date();
  const currentYear = d.getFullYear();
  return `${currentYear}${numeroConsecutivo.toString().padStart(3, '0')}`;
};

module.exports = {
  createFolioSolicitud,
};
