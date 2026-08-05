const boom = require('@hapi/boom');

const updateCatalogoCicloEscolar = (
  findOneCatalogoCicloEscolarQuery,
  updateCatalogoCicloEscolarQuery,
) => async (id, body) => {
  const catalogoCicloEscolar = await findOneCatalogoCicloEscolarQuery({ id });

  if (!catalogoCicloEscolar) {
    throw boom.notFound('Ciclo escolar no encontrado en el catálogo');
  }

  const cicloEscolarActualizado = await updateCatalogoCicloEscolarQuery({ id }, body);

  return cicloEscolarActualizado;
};

module.exports = { updateCatalogoCicloEscolar };
