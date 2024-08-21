const createSolicitudFolioSchema = require('./create.solicitud-folio.schema');
const findOneSolicitudFolioSchema = require('./find-one.solicitud-folio.schema');
const findAllSolicitudesFoliosSchema = require('./find-all.solicitudes-folio.schema');
const createSolicitudFolioAlumnoSchema = require('./create.solicitud-folio-alumno.schema');
const findOneSolicitudFolioAlumnoSchema = require('./find-one.solicitud-folio-alumno.schema');
const updateSolicitudFolioAlumnoSchema = require('./update.solicitud-folio-alumno.schema');
const udpateSolicitudFolioSchema = require('./update.solicitud-folio.schema');
const findAllSolicitudFolioAlumnoSchema = require('./find-all.solicitudes-folio-alumno.schema');
const deleteSolicitudFolioAlumnoSchema = require('./delete.solicitud-folio-alumno.schema');
const assignFoliosAlumnosSchema = require('./assign.folios-documentos.schema');

module.exports = {
  createSolicitudFolioSchema,
  findOneSolicitudFolioSchema,
  findAllSolicitudesFoliosSchema,
  createSolicitudFolioAlumnoSchema,
  findOneSolicitudFolioAlumnoSchema,
  updateSolicitudFolioAlumnoSchema,
  udpateSolicitudFolioSchema,
  findAllSolicitudFolioAlumnoSchema,
  deleteSolicitudFolioAlumnoSchema,
  assignFoliosAlumnosSchema,
};
