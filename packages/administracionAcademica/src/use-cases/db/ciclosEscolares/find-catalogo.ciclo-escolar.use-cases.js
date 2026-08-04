const findCatalogoCicloEscolar = (
  findCatalogoCicloEscolarQuery,
) => async () => {
  const ciclosEscolares = await findCatalogoCicloEscolarQuery();

  return ciclosEscolares.filter(
    (ciclo) => ciclo.tipo === 1 || (ciclo.tipo === 2 && ciclo.ciclosActivos === true),
  );
};

module.exports = { findCatalogoCicloEscolar };
