const findVigilanciasByVigilante = require('./findVigilanciasByVigilante');
const vigilanciaService = require('../../../adapter/db/index');

module.exports = {
  findVigilanciasByVigilante: findVigilanciasByVigilante(vigilanciaService.findAllVigilanciasQuery),
};
