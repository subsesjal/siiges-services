const { solicitudesServSoc } = require('../../../adapters/db');

const createSolicitudServSoc = require('./create.solicitud-serv-soc.use-cases');
const findOneSolicitudServSoc = require('./find-one.solicitud-serv-soc.use-cases');
const findAllSolicitudesServSoc = require('./find-all.solicitudes-serv-soc.use-cases');
const updateSolicitudServSoc = require('./update.solicitud-serv-soc.use-cases');
const createSolicitudServSocAlumno = require('./create.solicitud-serv-soc-alumno.use-cases');
const findOneSolicitudServSocAlumno = require('./find-one.solicitud-serv-soc-alumno.use-cases');
const findAllSolicitudesServSocAlumno = require('./find-all.solicitudes-serv-soc-alumnos.use-cases');

module.exports = {
  createSolicitudServSoc: createSolicitudServSoc(
    solicitudesServSoc.createSolicitudServicioSocialQuery,
    solicitudesServSoc.countSolicitudesServicioSocialQuery,
    solicitudesServSoc.findOneSolicitudServicioSocialQuery,
  ),
  findOneSolicitudServSoc: findOneSolicitudServSoc(
    solicitudesServSoc.findOneSolicitudServicioSocialQuery,
  ),
  findAllSolicitudesServSoc: findAllSolicitudesServSoc(
    solicitudesServSoc.findAllSolicitudesServicioSocialQuery,
  ),
  updateSolicitudServSoc: updateSolicitudServSoc(
    solicitudesServSoc.findOneSolicitudServicioSocialQuery,
    solicitudesServSoc.updateSolicitudServicioSocialQuery,
    solicitudesServSoc.updateDomicilioQuery,
  ),
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
  findOneSolicitudServSocAlumno: findOneSolicitudServSocAlumno(
    solicitudesServSoc.findOneSolicitudServicioSocialAlumnoQuery,
  ),
  findAllSolicitudesServSocAlumno: findAllSolicitudesServSocAlumno(
    solicitudesServSoc.findAllSolicitudesServicioSocialAlumnoQuery,
  ),
};
