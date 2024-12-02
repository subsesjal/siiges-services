const { solicitudesBecas } = require('../../../adapters/db');

const createSolicitudBeca = require('./create.solicitud-beca.use-cases');

module.exports = {
  createSolicitudBeca: createSolicitudBeca(
    solicitudesBecas.createSolicitudBecaQuery,
    solicitudesBecas.countSolicitudesBecasQuery,
  ),
};
