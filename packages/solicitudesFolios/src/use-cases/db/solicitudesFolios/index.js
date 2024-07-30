// adapters/solicitudFolios/index.js
const {
  solicitudesFolios,
} = require('../../../adapters/db');

const createSolicitudFolio = require('./create.solicitud-folio.use-cases');
const findOneSolicitudFolio = require('./find-one.solicitud-programa.use-cases');
const findAllSolicitudesFolios = require('./find-all.solicitudes-folios.use-cases');
const findOneSolicitudFolioAlumno = require('./find-one.solicitudes-folios-alumno.use-cases');
const updateSolicitudFolioAlumno = require('./update.solicitud-folio-alumno.use-cases');
const createSolicitudFolioAlumno = require('./create.solicitud-folio-alumnos.use-cases');
const findOneSolicitudesFolioAlumno = require('./find-one.solicitudes-folios-alumno.use-cases');
const updateSolicitudFolio = require('./update.solicitud-folio.use-cases');

module.exports = {
  createSolicitudFolio: createSolicitudFolio(
    solicitudesFolios.createSolicitudFolioQuery,
    solicitudesFolios.countSolicitudesFoliosQuery,
  ),
  updateSolicitudFolio: updateSolicitudFolio(
    solicitudesFolios.findOneSolicitudFolioQuery,
    solicitudesFolios.updateSolicitudFolioQuery,
  ),
  findAllSolicitudesFolios: findAllSolicitudesFolios(
    solicitudesFolios.findAllSolicitudesFoliosQuery,
  ),
  findOneSolicitudFolio: findOneSolicitudFolio(
    solicitudesFolios.findOneSolicitudFolioQuery,
  ),
  createSolicitudFolioAlumno: createSolicitudFolioAlumno(
    solicitudesFolios.findOneAlumnoQuery,
    solicitudesFolios.findOneSolicitudFolioQuery,
    solicitudesFolios.createAlumnoFolioQuery,
  ),
  findOneSolicitudFolioAlumno: findOneSolicitudesFolioAlumno(
    solicitudesFolios.findOneSolicitudFolioAlumnoQuery,
  ),
  findOneAlumno: findOneSolicitudFolioAlumno(
    solicitudesFolios.findOneSolicitudFolioAlumnoQuery,
  ),
  updateSolicitudFolioAlumno: updateSolicitudFolioAlumno(
    solicitudesFolios.updateAndFindSolicitudQuery,
    solicitudesFolios.findOneSolicitudFolioAlumnoQuery,
  ),
};
