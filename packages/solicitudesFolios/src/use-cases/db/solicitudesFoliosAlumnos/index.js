const {
  solicitudesFoliosAlumnos,
  solicitudesFolios,
} = require('../../../adapters/db');

const findOneSolicitudFolioAlumno = require('./find-one.solicitud-folio-alumno.use-cases');
const createSolicitudFolioAlumno = require('./create.solicitud-folio-alumnos.use-cases');
const updateSolicitudFolioAlumno = require('./update.solicitud-folio-alumno.use-cases');
const findAllSolicitudFolioAlumnos = require('./find-all.solicitud-folio-alumnos.use-cases');
const deleteSolicitudFolioAlumno = require('./delete.solicitud-folio-alumno.use-cases');
const assignFoliosAlumnos = require('./assign.folios-alumnos.use-cases');
const reportFolioDocumentoAlumno = require('./report.folio-documento-alumno.use-cases');

module.exports = {
  createSolicitudFolioAlumno: createSolicitudFolioAlumno(
    solicitudesFoliosAlumnos.findOneAlumnoQuery,
    solicitudesFolios.findOneSolicitudFolioQuery,
    solicitudesFoliosAlumnos.createSolicitudFolioAlumnoQuery,
    solicitudesFoliosAlumnos.findOneSolicitudFolioAlumnoQuery,
    solicitudesFoliosAlumnos.countSolicitudFolioAlumnosQuery,
  ),
  findOneSolicitudFolioAlumno: findOneSolicitudFolioAlumno(
    solicitudesFoliosAlumnos.findOneSolicitudFolioAlumnoQuery,
  ),
  updateSolicitudFolioAlumno: updateSolicitudFolioAlumno(
    solicitudesFoliosAlumnos.updateSolicitudFolioAlumnoQuery,
    solicitudesFoliosAlumnos.findOneSolicitudFolioAlumnoQuery,
  ),
  findAllSolicitudFolioAlumnos: findAllSolicitudFolioAlumnos(
    solicitudesFoliosAlumnos.findAllSolicitudFolioAlumnosQuery,
  ),
  deleteSolicitudFolioAlumno: deleteSolicitudFolioAlumno(
    solicitudesFoliosAlumnos.findOneSolicitudFolioAlumnoQuery,
    solicitudesFoliosAlumnos.deleteSolicitudFolioAlumnoQuery,
    solicitudesFoliosAlumnos.updateSolicitudFolioAlumnoQuery,
    solicitudesFoliosAlumnos.findAllSolicitudFolioAlumnosQuery,
  ),
  assignFoliosAlumnos: assignFoliosAlumnos(
    solicitudesFolios.findOneSolicitudFolioQuery,
    solicitudesFolios.updateSolicitudFolioQuery,
    solicitudesFoliosAlumnos.findAllSolicitudFolioAlumnosQuery,
    solicitudesFoliosAlumnos.findOneFolioDocumentoAlumnoQuery,
    solicitudesFoliosAlumnos.createFolioDocumentoAlumnoQuery,
    solicitudesFoliosAlumnos.countFoliosDocumentosAlumnosQuery,
    solicitudesFolios.findOneLibroQuery,
    solicitudesFolios.createLibroQuery,
    solicitudesFolios.findAllFojaQuery,
    solicitudesFolios.createFojaQuery,
  ),
  reportFolioDocumentoAlumno: reportFolioDocumentoAlumno(
    solicitudesFoliosAlumnos.reportFolioDocumentoAlumnoQuery,
  ),
};
