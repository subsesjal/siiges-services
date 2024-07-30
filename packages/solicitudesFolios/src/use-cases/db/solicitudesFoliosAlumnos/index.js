const {
  solicitudesFoliosAlumnos,
  solicitudesFolios,
} = require('../../../adapters/db');

const findOneSolicitudFolioAlumno = require('./find-one.solicitud-folio-alumno.use-cases');
const createSolicitudFolioAlumno = require('./create.solicitud-folio-alumnos.use-cases');
const updateSolicitudFolioAlumno = require('./update.solicitud-folio-alumno.use-cases');

module.exports = {
  createSolicitudFolioAlumno: createSolicitudFolioAlumno(
    solicitudesFoliosAlumnos.findOneAlumnoQuery,
    solicitudesFolios.findOneSolicitudFolioQuery,
    solicitudesFoliosAlumnos.createSolicitudFolioAlumnoQuery,
  ),
  findOneSolicitudFolioAlumno: findOneSolicitudFolioAlumno(
    solicitudesFoliosAlumnos.findOneSolicitudFolioAlumnoQuery,
  ),
  updateSolicitudFolioAlumno: updateSolicitudFolioAlumno(
    solicitudesFoliosAlumnos.updateSolicitudFolioAlumnoQuery,
    solicitudesFoliosAlumnos.findOneSolicitudFolioAlumnoQuery,
  ),
};
