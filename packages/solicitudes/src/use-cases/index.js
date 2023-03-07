const {
  createSolicitudPrograma,
  findAllSolicitudesProgramas,
  findOneSolicitudPrograma,
  findSolicitudesUsuario,
} = require('./db/solicitudes');

const { createAsignaturaPrograma } = require('./db/asignaturas');

module.exports = {
  createSolicitudPrograma,
  findAllSolicitudesProgramas,
  findOneSolicitudPrograma,
  findSolicitudesUsuario,
  createAsignaturaPrograma,
};
