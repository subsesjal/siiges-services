const { solicitudesBecas } = require('../../../adapters/db');

const createSolicitudBeca = require('./create.solicitud-beca.use-cases');
const updateSolicitudBeca = require('./update.solicitud-beca.use-cases');

module.exports = {
  createSolicitudBeca: createSolicitudBeca(
    solicitudesBecas.createSolicitudBecaQuery,
    solicitudesBecas.countSolicitudesBecasQuery,
    solicitudesBecas.findOneSolicitudBecaQuery,
  ),
  updateSolicitudBeca: updateSolicitudBeca(
    solicitudesBecas.findOneSolicitudBecaQuery,
    solicitudesBecas.updateSolicitudesBecasQuery,
  ),
};
