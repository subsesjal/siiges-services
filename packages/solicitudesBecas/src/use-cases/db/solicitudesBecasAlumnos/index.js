const { solicitudesBecas } = require('../../../adapters/db');

const createSolicitudBecaAlumno = require('./create.solicitud-beca-alumno.use-case');
const findOneSolicitudBecaAlumno = require('./find-one.solicitud-beca-alumno.use-cases');
const findAllSolicitudesBecasAlumnos = require('./find-all.solicitudes-becas-alumnos.use-cases');
const updateSolicitudBecaAlumno = require('./update.solicitud-beca-alumno.use.case');

module.exports = {
  createSolicitudBecaAlumno: createSolicitudBecaAlumno(
    solicitudesBecas.createSolicitudesBecasAlumnoQuery,
    solicitudesBecas.findOneSolicitudesBecasAlumnoQuery,
    solicitudesBecas.findOneSolicitudBecaQuery,
    solicitudesBecas.findOneAlumnoQuery,
    solicitudesBecas.findOneGradoQuery,
  ),
  findOneSolicitudBecaAlumno: findOneSolicitudBecaAlumno(
    solicitudesBecas.findOneSolicitudesBecasAlumnoQuery,
    solicitudesBecas.findOneSolicitudBecaQuery,
  ),
  findAllSolicitudesBecasAlumnos: findAllSolicitudesBecasAlumnos(
    solicitudesBecas.findAllSolicitudesBecasAlumnosQuery,
  ),
  updateSolicitudBecaAlumno: updateSolicitudBecaAlumno(
    solicitudesBecas.findOneSolicitudesBecasAlumnoQuery,
    solicitudesBecas.updateSolicitudBecaAlumnoQuery,
  ),
};
