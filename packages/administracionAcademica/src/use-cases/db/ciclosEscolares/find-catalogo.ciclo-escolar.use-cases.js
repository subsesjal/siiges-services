const findCatalogoCicloEscolar = (
  findCatalogoCicloEscolarQuery,
) => async (all = false) => {
  const ciclosEscolares = await findCatalogoCicloEscolarQuery();

  if (all) {
    return ciclosEscolares;
  }

  return ciclosEscolares.filter(
    (ciclo) => ciclo.tipo === 1 || (ciclo.tipo === 2 && ciclo.ciclosActivos === true),
  );
};

module.exports = { findCatalogoCicloEscolar };
