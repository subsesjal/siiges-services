// Internal dependencies
const usuariosAdapter = require('./usuarios/handlers');
const usuariosUsuariosAdapter = require('./usuarios/usuarios/handlers');
const filesAdapter = require('./files/handlers');
const institucionesAdapter = require('./institituciones/handlers');
const municipiosAdapter = require('./municipios/handlers');
const solicitudesAdapter = require('./solicitudes/handlers');
const diligenciasAdapter = require('./diligencias/handlers');
const { representativeAdapter } = require('./solicitud');
const asignaturasAdapter = require('./asignaturas/handlers');
const docentesAdapter = require('./docentes/handlers');
const plantelesAdapter = require('./planteles/handlers');
const inspeccionesAdapter = require('./inspecciones/handlers');
const trayectoriasAdapter = require('./trayectorias/handlers');
const authAdapter = require('./auth/handlers');
const alumnosAdapter = require('./alumnos/handlers');
const programasAdapter = require('./administracionAcademica/programas/handlers');

module.exports = {
  diligenciasAdapter,
  filesAdapter,
  institucionesAdapter,
  solicitudesAdapter,
  representativeAdapter,
  usuariosAdapter,
  usuariosUsuariosAdapter,
  municipiosAdapter,
  asignaturasAdapter,
  docentesAdapter,
  plantelesAdapter,
  inspeccionesAdapter,
  authAdapter,
  trayectoriasAdapter,
  alumnosAdapter,
  programasAdapter,
};
