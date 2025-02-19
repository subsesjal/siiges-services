const { solicitudesBecas } = require('../../../adapters/db');

const createSolicitudBeca = require('./create.solicitud-beca.use-cases');
const findAllSolicitudesBecas = require('./find-all.solicitudes-becas.use-cases');
const findOneSolicitudBeca = require('./find-one.solicitud-beca.use-cases');

module.exports = {
  createSolicitudBeca: createSolicitudBeca(
    solicitudesBecas.createSolicitudBecaQuery,
    solicitudesBecas.countSolicitudesBecasQuery,
    solicitudesBecas.findOneSolicitudBecaQuery,
    solicitudesBecas.findAllSolicitudesBecasQuery,
  ),

  findAllSolicitudesBecas: findAllSolicitudesBecas(
    solicitudesBecas.findAllSolicitudesBecasQuery,
  ),

  findOneSolicitudBeca: findOneSolicitudBeca(
    solicitudesBecas.findOneSolicitudBecaQuery,
  ),
};
