const createSolicitudBecaSchema = require('./create.solicitud-beca.schema');
const { updateSolicitudBecaSchema } = require('./update.solicitud-beca.schema');
const findAllSolicitudesBecasSchema = require('./find-all.solicitudes-becas.schema');
const findOneSolicitudBecaSchema = require('./find-one.solicitud-beca.schema');

module.exports = {
  createSolicitudBecaSchema,
  updateSolicitudBecaSchema,
  findAllSolicitudesBecasSchema,
  findOneSolicitudBecaSchema,
};
