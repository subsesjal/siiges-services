const { createSolicitudServSoc } = require('./create.handlers.solicitud-serv-soc.adapters');
const { findOneSolicitudServSoc } = require('./find-one.handlers.solicitud-serv-soc.adapters');
const { findAllSolicitudesServSoc } = require('./find-all.handlers.solicitudes-serv-soc.adapters');
const { updateSolicitudServSoc } = require('./update.handlers.solicitud-serv-soc.adapters');
const { createSolicitudServSocAlumno } = require('./create.handlers.solicitud-ser-soc-alumno.adapters');
const { findOneSolicitudServSocAlumno } = require('./find-one.handlers.solicitud-serv-soc-alumno.adapters');
const { findAllSolicitudesServSocAlumno } = require('./find-all.handlers.solicitudes-serv-soc-alumnos.adapters');
const { deleteSolicitudServSoc } = require('./delete.handlers.solicitud-serv-soc.adapters');
const { findAllDimensionesServSoc } = require('./find-all.handlers.dimensiones-serv-soc.adapters');

module.exports = {
  createSolicitudServSoc,
  findOneSolicitudServSoc,
  findAllSolicitudesServSoc,
  updateSolicitudServSoc,
  createSolicitudServSocAlumno,
  findOneSolicitudServSocAlumno,
  findAllSolicitudesServSocAlumno,
  deleteSolicitudServSoc,
  findAllDimensionesServSoc,
};
