const findVigilanciasByVigilante = require('./findVigilanciasByVigilante');
const { vigilancias } = require('../../../adapter/db/index');

module.exports = {
  findVigilanciasByVigilante: findVigilanciasByVigilante(vigilancias.findAllVigilanciasQuery),
};
