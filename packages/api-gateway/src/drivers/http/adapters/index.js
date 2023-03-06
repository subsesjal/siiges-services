// Internal dependencies
const usuariosAdapter = require('./usuarios/handlers');
const usuariosUsuariosAdapter = require('./usuarios/usuarios/handlers');
const filesAdapter = require('./files/handlers');
const institucionesAdapter = require('./institituciones/handlers');
const municipiosAdapter = require('./municipios/handlers');
const solicitudesAdapter = require('./solicitudes/handlers');
const { representativeAdapter, diligenceAdapter } = require('./solicitud');
const asignaturasAdapter = require('./asignaturas/hadlers');

module.exports = {
  diligenceAdapter,
  filesAdapter,
  institucionesAdapter,
  solicitudesAdapter,
  representativeAdapter,
  usuariosAdapter,
  usuariosUsuariosAdapter,
  municipiosAdapter,
  asignaturasAdapter,
};
