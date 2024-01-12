const orgColegiados = require('./db/orgColegiados');
const acuerdos = require('./db/acuerdos');
const planesMaestros = require('./db/planMaestro');

module.exports = {
  ...orgColegiados,
  ...acuerdos,
  ...planesMaestros,
};
