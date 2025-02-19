const { solicitudesBecas } = require('../../../adapters/db');

const createSolicitudBeca = require('./create.solicitud-beca.use-cases');
const findAllSolicitudesBeca = require('./find-all.solicitud-beca.use-cases');
const findOneSolicitudBeca = require('./find-one.solicitud-beca.use-cases');

module.exports = {
  createSolicitudBeca: createSolicitudBeca(
    solicitudesBecas.createSolicitudBecaQuery,
    solicitudesBecas.countSolicitudesBecasQuery,
    solicitudesBecas.findOneSolicitudBecaQuery,
    solicitudesBecas.findAllSolicitudesBecaQuery,
  ),

  findAllSolicitudesBeca: findAllSolicitudesBeca(
    solicitudesBecas.findAllSolicitudesBecaQuery,
  ),

  findOneSolicitudBeca: findOneSolicitudBeca(
    solicitudesBecas.findOneSolicitudBecaQuery,
  ),
};
