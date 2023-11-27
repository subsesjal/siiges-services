const orgColegiados = require('./db/orgColegiados');
const acuerdos = require('./db/acuerdos');

module.exports = {
  ...orgColegiados,
  ...acuerdos,
};
