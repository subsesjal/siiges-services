const { solicitudesBecas } = require('../../../adapters/db');

const createSolicitudBeca = require('./create.solicitud-beca.use-cases');
const findAllSolicitudBeca = require('./find-all.solicitud-beca.use-cases');

module.exports = {
  createSolicitudBeca: createSolicitudBeca(
    solicitudesBecas.createSolicitudBecaQuery,
    solicitudesBecas.countSolicitudesBecasQuery,
    solicitudesBecas.findOneSolicitudBecaQuery,
    solicitudesBecas.findAllSolicitudBecaQuery,
  ),

  findAllSolicitudBeca: findAllSolicitudBeca(
    solicitudesBecas.findAllSolicitudBecaQuery,
  ),
};
