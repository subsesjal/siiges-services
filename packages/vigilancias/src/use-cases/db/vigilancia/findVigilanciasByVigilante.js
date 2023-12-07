const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared');
const { findVigilanciasByVigilanteQuery } = require('./index');

const findVigilanciasByVigilante = (findVigilanciasByVigilanteQuery) => async ({ vigilanteId, queryParams }) => {
  try {
    // Aquí puedes agregar lógica para manejar queryParams, si es necesario
    // Por ejemplo, si necesitas filtrar las vigilancias basadas en algún criterio

    const where = { vigilanteId };
    if (queryParams && queryParams.algunCriterio) {
      where.algunCampo = queryParams.algunCriterio;
    }

    const include = [
      // Aquí tus asociaciones, si las necesitas
    ];

    const vigilancias = await findVigilanciasByVigilanteQuery(where, { include });

    checkers.throwErrorIfDataIsFalsy(vigilancias, 'vigilancias', vigilanteId);

    return vigilancias;
  } catch (error) {
    // Manejo de errores específicos o lanzar un error general
    throw boom.badImplementation(error.message);
  }
};

module.exports = findVigilanciasByVigilante;
