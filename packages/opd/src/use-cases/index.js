const orgColegiados = require('./db/orgColegiados');
const acuerdos = require('./db/acuerdos');
const planesMaestros = require('./db/planMaestro');
const presupuestos = require('./db/presupuestos');

module.exports = {
  ...orgColegiados,
  ...acuerdos,
  ...planesMaestros,
  ...presupuestos,
};
