const Boom = require('@hapi/boom');

const deleteCicloEscolar = (
  findOneCicloEscolarQuery,
  deleteCicloEscolarQuery,
  findGroupGrupoQuery,
) => async ({ id }) => {
  const ciclo = await findOneCicloEscolarQuery({ id });
  if (!ciclo) {
    throw Boom.notFound('Ciclo escolar no encontrado');
  }

  const gruposResult = await findGroupGrupoQuery({ cicloEscolarId: id });

  if (gruposResult && gruposResult.length > 0) {
    throw Boom.conflict(
      'El ciclo escolar no puede ser eliminado ya que tiene grupos vinculados',
    );
  }

  return deleteCicloEscolarQuery({ id });
};

module.exports = { deleteCicloEscolar };
