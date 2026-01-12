const findOneDocumentoFirmado = (findOneDocumentoFirmadoQuery) => async (filter) => {
  const documento = await findOneDocumentoFirmadoQuery(filter);

  return documento;
};

module.exports = findOneDocumentoFirmado;
