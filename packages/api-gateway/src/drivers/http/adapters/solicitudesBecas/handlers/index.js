const { updateSolicitudBeca } = require('./update.handlers.solicitud-beca.adapters');
const { createSolicitudBeca } = require('./create.handlers.solicitud-beca.adapters');
const { findAllSolicitudesBecas } = require('./find-all.handlers.solicitudes-becas.adapter');
const { findOneSolicitudBeca } = require('./find-one.handlers.solicitud-beca.adapter');
const { deleteSolicitudBeca } = require('./delete.handlers.solicitud-beca.adapters');
const { createSolicitudBecaAlumno } = require('./create.handlers.solicitud-becas-alumnos.adapter');
const { findOneSolicitudBecaAlumno } = require('./find-one.handlers.solicitud-beca-alumnos.adapter');
const { findAllSolicitudesBecasAlumnos } = require('./find-all.handlers.solicitudes-becas-alumnos.adapters');
const { deleteSolicitudBecaAlumno } = require('./delete.handlers.solicitud-beca-alumnos.adapters');
const { updateSolicitudBecaAlumno } = require('./update.handlers.solicitud-beca-alumno.adapters');

module.exports = {
  createSolicitudBeca,
  updateSolicitudBeca,
  findAllSolicitudesBecas,
  findOneSolicitudBeca,
  deleteSolicitudBeca,
  createSolicitudBecaAlumno,
  findOneSolicitudBecaAlumno,
  findAllSolicitudesBecasAlumnos,
  deleteSolicitudBecaAlumno,
  updateSolicitudBecaAlumno,
};
