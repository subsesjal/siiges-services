const findAllEjesServSoc = (
  findAllEjesServicioSocialQuery,
) => async ({ dimensionServicioSocialId }) => {
  const filters = {};
  if (dimensionServicioSocialId) {
    filters.dimensionServicioSocialId = dimensionServicioSocialId;
  }

  return findAllEjesServicioSocialQuery(filters);
};

module.exports = findAllEjesServSoc;
