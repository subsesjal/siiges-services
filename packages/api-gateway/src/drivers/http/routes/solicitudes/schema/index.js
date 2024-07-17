const createSolicitudProgramaSchema = require('./create.solicitud-programa.schema');
const createSolicitudRefrendoSchema = require('./create.solicitud-refrendo.schema');
const findAllSolicitudesProgramasSchema = require('./find-all.solicitudes-programas.schema');
const findOneSolicitudProgramaSchema = require('./find-one.solicitud-programa.schema');
const findOneSolicitudDetalleSchema = require('./find-one.solicitud-detalle.schema');
const findAllSolicitudesUsuarioSchema = require('./find.solicitud-usuario.schema');
const updateSolicitudProgramaSchema = require('./update.solicitud-programa.schema');
const setSolicitudSeccionSchema = require('./set.solicitud-seccion.schema');
const findOneSolicitudSeccionSchema = require('./find-one.solicitud-seccion.schema');
const updateSolcitudSeccionObservacionSchema = require('./update.seccion-observacion.schema');
const { createSendMailObservacionSchema } = require('./create.send-mail-observaciones.schema');
const { createDomicilioSolicitudProgramaSchema } = require('./create.domicilio-programa.schema');

module.exports = {
  createSolicitudProgramaSchema,
  createSolicitudRefrendoSchema,
  findAllSolicitudesProgramasSchema,
  findOneSolicitudProgramaSchema,
  findOneSolicitudDetalleSchema,
  findAllSolicitudesUsuarioSchema,
  updateSolicitudProgramaSchema,
  setSolicitudSeccionSchema,
  findOneSolicitudSeccionSchema,
  updateSolcitudSeccionObservacionSchema,
  createSendMailObservacionSchema,
  createDomicilioSolicitudProgramaSchema,
};
