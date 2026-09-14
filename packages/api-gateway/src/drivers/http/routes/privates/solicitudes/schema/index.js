const createSolicitudProgramaSchema = require('./create.solicitud-programa.schema');
const createSolicitudRefrendoSchema = require('./create.solicitud-refrendo.schema');
const createCambioRepresentanteLegalSchema = require('./create.cambio-representante-legal.schema');
const createActualizacionSchema = require('./create.actualizacion.schema');
const createCambioNombreInstitucionSchema = require('./create.cambio-nombre-institucion.schema');
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
const deleteSolicitudSchema = require('./delete.solicitud.schema');

module.exports = {
  createSolicitudProgramaSchema,
  createSolicitudRefrendoSchema,
  createCambioRepresentanteLegalSchema,
  createActualizacionSchema,
  createCambioNombreInstitucionSchema,
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
  deleteSolicitudSchema,
};
