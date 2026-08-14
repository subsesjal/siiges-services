const boom = require('@hapi/boom');

const createCatalogoCicloEscolar = (
  findOneCatalogoCicloEscolarQuery,
  createCatalogoCicloEscolarQuery,
) => async (body) => {
  const { nombre, descripcion } = body;

  const cicloEscolarExistente = await findOneCatalogoCicloEscolarQuery({ nombre });

  if (cicloEscolarExistente) {
    throw boom.conflict('Ya existe un ciclo escolar con ese nombre');
  }

  const cicloEscolarCreado = await createCatalogoCicloEscolarQuery({
    nombre,
    descripcion,
  });

  return cicloEscolarCreado;
};

module.exports = { createCatalogoCicloEscolar };
