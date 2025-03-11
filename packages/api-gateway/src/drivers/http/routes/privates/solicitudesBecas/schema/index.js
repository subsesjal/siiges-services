const createSolicitudBecaSchema = require('./create.solicitud-beca.schema');
const { updateSolicitudBecaSchema } = require('./update.solicitud-beca.schema');
const findAllSolicitudesBecasSchema = require('./find-all.solicitudes-becas.schema');
const findOneSolicitudBecaSchema = require('./find-one.solicitud-beca.schema');
const deleteSolicitudBecaSchema = require('./delete.solicitud-beca.schema');
const createSolicitudBecaAlumnoSchema = require('./create.solicitud-beca-alumno.schema');
const findOneSolicitudBecaAlumnoSchema = require('./find-one.solicitud-beca-alumno.schema');
const findAllSolicitudesBecasAlumnosSchema = require('./find-all.solicitudes-becas-alumnos.schema');
const updateSolicitudBecaAlumnoSchema = require('./update.solicitud-beca-alumno.schema');

module.exports = {
  createSolicitudBecaSchema,
  updateSolicitudBecaSchema,
  findAllSolicitudesBecasSchema,
  findOneSolicitudBecaSchema,
  deleteSolicitudBecaSchema,
  createSolicitudBecaAlumnoSchema,
  findOneSolicitudBecaAlumnoSchema,
  findAllSolicitudesBecasAlumnosSchema,
  updateSolicitudBecaAlumnoSchema,
};
