const { createSolicitudServSoc } = require('./create.handlers.solicitud-serv-soc.adapters');
const { findOneSolicitudServSoc } = require('./find-one.handlers.solicitud-serv-soc.adapters');
const { findAllSolicitudesServSoc } = require('./find-all.handlers.solicitudes-serv-soc.adapters');
const { updateSolicitudServSoc } = require('./update.handlers.solicitud-serv-soc.adapters');
const { createSolicitudServSocAlumno } = require('./create.handlers.solicitud-ser-soc-alumno.adapters');
const { updateSolicitudServSocAlumno } = require('./update.handlers.solicitud-ser-soc-alumno.adapters');
const { findOneSolicitudServSocAlumno } = require('./find-one.handlers.solicitud-serv-soc-alumno.adapters');
const { findAllSolicitudesServSocAlumno } = require('./find-all.handlers.solicitudes-serv-soc-alumnos.adapters');
const { deleteSolicitudServSoc } = require('./delete.handlers.solicitud-serv-soc.adapters');
const { deleteSolicitudServSocAlumno } = require('./delete.handlers.solicitud-serv-soc-alumno.adapters');
const { findAllDimensionesServSoc } = require('./find-all.handlers.dimensiones-serv-soc.adapters');
const { findAllEjesServSoc } = require('./find-all.handlers.ejes-serv-soc.adapters');

module.exports = {
  createSolicitudServSoc,
  findOneSolicitudServSoc,
  findAllSolicitudesServSoc,
  updateSolicitudServSoc,
  createSolicitudServSocAlumno,
  updateSolicitudServSocAlumno,
  findOneSolicitudServSocAlumno,
  findAllSolicitudesServSocAlumno,
  deleteSolicitudServSoc,
  deleteSolicitudServSocAlumno,
  findAllDimensionesServSoc,
  findAllEjesServSoc,
};
