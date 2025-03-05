const { solicitudesBecas } = require('../../../adapters/db');

const createSolicitudBecaAlumno = require('./create.solicitud-beca-alumno.use-case');

module.exports = {
  createSolicitudBecaAlumno: createSolicitudBecaAlumno(
    solicitudesBecas.createSolicitudesBecasAlumnoQuery,
    solicitudesBecas.findOneSolicitudesBecasAlumnoQuery,
    solicitudesBecas.findOneSolicitudBecaQuery,
    solicitudesBecas.findOneAlumnoQuery,
    solicitudesBecas.findOneGradoQuery,
  ),
};
