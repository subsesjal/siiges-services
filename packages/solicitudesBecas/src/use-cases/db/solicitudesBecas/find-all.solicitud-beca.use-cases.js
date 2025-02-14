const findAllSolicitudBeca = (findAllSolicitudBecaQuery) => async () => {
  const becas = await findAllSolicitudBecaQuery();
  return becas;
};

module.exports = findAllSolicitudBeca;
