const createSolicitudFolioSchema = require('./create.solicitud-folio.schema');
const findOneSolicitudFolioSchema = require('./find-one.solicitud-folio.schema');
const findAllSolicitudesFoliosSchema = require('./find-all.solicitudes-folio.schema');
const createSolicitudFolioAlumnoSchema = require('./create.solicitud-folio-alumno.schema');
const findOneAlumnoSchema = require('./find-one.solicitud-folio-alumno.schema');
const updateSolicitudFolioAlumnoSchema = require('./updateSolicitudFolioAlumnoSchema');
const udpateSolicitudFolioSchema = require('./update.solicitud-folio.schema');

module.exports = {
  createSolicitudFolioSchema,
  findOneSolicitudFolioSchema,
  findAllSolicitudesFoliosSchema,
  createSolicitudFolioAlumnoSchema,
  findOneAlumnoSchema,
  updateSolicitudFolioAlumnoSchema,
  udpateSolicitudFolioSchema,
};
