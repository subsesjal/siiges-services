const alumnos = require('./alumnos/alumno.db.adapter');
const programas = require('./programas/programa.db.adapter');
const ciclosEscolares = require('./ciclosEscolares/ciclosEscolares.db.adapter');
const grupos = require('./grupos/grupos.db.adapter');

module.exports = {
  alumnos,
  programas,
  ciclosEscolares,
  grupos,
};
