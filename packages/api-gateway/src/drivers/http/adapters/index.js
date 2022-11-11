// Internal dependencies
const usuariosAdapter = require('./usuarios/handlers');
const filesAdapter = require('./files/handlers');
const institucionesAdapter = require('./institituciones/handlers');
const solicitudesAdapter = require('./solicitudes/solicitudes.handlers');
const { representativeAdapter } = require('./solicitud');
const diligenceAdapter = require('./solicitud');

module.exports = {
  diligenceAdapter,
  filesAdapter,
  institucionesAdapter,
  solicitudesAdapter,
  representativeAdapter,
  usuariosAdapter,
};
