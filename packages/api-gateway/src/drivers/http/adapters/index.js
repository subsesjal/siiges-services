// Internal dependencies
const usuariosAdapter = require('./usuarios/handlers');
const filesAdapter = require('./files/handlers');
const institucionesAdapter = require('./institituciones/handlers');

module.exports = {
  usuariosAdapter,
  filesAdapter,
  institucionesAdapter,
};
