const orgColegiados = require('./orgColegiados/orgColegiados.db.adapter');
const instituciones = require('./instituciones/instituciones.db.adapter');
const planesMaestros = require('./planesMaestros/planesMaestros.db.adapter');

module.exports = {
  orgColegiados,
  instituciones,
  planesMaestros,
};
