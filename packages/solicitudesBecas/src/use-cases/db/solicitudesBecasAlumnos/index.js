const { solicitudesBecas } = require('../../../adapters/db');

const createSolicitudBecaAlumno = require('./create.solicitud-beca-alumno.use-case');
const findOneSolicitudBecaAlumno = require('./find-one.solicitud-beca-alumno.use-cases');

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
};
