const { solicitudesServSoc } = require('../../../adapters/db');

const createSolicitudServSocAlumno = require('./create.solicitud-serv-soc-alumno.use-cases');
const updateSolicitudServSocAlumno = require('./update.solicitud-serv-soc-alumno.use-cases');
const findOneSolicitudServSocAlumno = require('./find-one.solicitud-serv-soc-alumno.use-cases');
const findAllSolicitudesServSocAlumno = require('./find-all.solicitudes-serv-soc-alumnos.use-cases');

module.exports = {
  createSolicitudServSocAlumno: createSolicitudServSocAlumno(
    solicitudesServSoc.createSolicitudServicioSocialAlumnoQuery,
    solicitudesServSoc.findOneSolicitudServicioSocialAlumnoQuery,
    solicitudesServSoc.findOneSolicitudServicioSocialQuery,
    solicitudesServSoc.findOneAlumnoQuery,
    solicitudesServSoc.findOneGradoQuery,
    solicitudesServSoc.findOneModalidadServicioSocialQuery,
    solicitudesServSoc.findOneSectorServicioSocialQuery,
    solicitudesServSoc.findOneEjeServicioSocialQuery,
    solicitudesServSoc.findOneDimensionServicioSocialQuery,
  ),
  updateSolicitudServSocAlumno: updateSolicitudServSocAlumno(
    solicitudesServSoc.updateSolicitudServicioSocialAlumnoQuery,
    solicitudesServSoc.findOneSolicitudServicioSocialAlumnoQuery,
    solicitudesServSoc.findOneAlumnoQuery,
    solicitudesServSoc.findOneGradoQuery,
    solicitudesServSoc.findOneModalidadServicioSocialQuery,
    solicitudesServSoc.findOneSectorServicioSocialQuery,
    solicitudesServSoc.findOneEjeServicioSocialQuery,
  ),
  findOneSolicitudServSocAlumno: findOneSolicitudServSocAlumno(
    solicitudesServSoc.findOneSolicitudServicioSocialAlumnoQuery,
  ),
  findAllSolicitudesServSocAlumno: findAllSolicitudesServSocAlumno(
    solicitudesServSoc.findAllSolicitudesServicioSocialAlumnoQuery,
  ),
};
