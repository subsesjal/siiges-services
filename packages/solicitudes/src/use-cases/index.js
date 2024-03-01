const solicitudesUseCases = require('./db/solicitudes');
const diligenciasUseCases = require('./db/diligencias');
const asignaturasUseCases = require('./db/asignaturas');
const docentesUseCases = require('./db/docentes');
const plantelesUseCases = require('./db/planteles');
const trayectoriasUseCases = require('./db/trayectorias');
const evaluacionesUseCases = require('./db/evaluaciones');

module.exports = {
  ...solicitudesUseCases,
  ...diligenciasUseCases,
  ...asignaturasUseCases,
  ...docentesUseCases,
  ...plantelesUseCases,
  ...trayectoriasUseCases,
  ...evaluacionesUseCases,
};
