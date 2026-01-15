const createDocumentoFirmado = (createDocumentoFirmadoQuery) => async (data) => {
  const {
    solicitudFolioId,
    folioValidacion,
    hashObjetoFirmado,
    idDocumento,
    datosFirmante,
    objetoFirmado,
    firmaResponse,
    uriValidacion,
    tipoDocumento,
    claveDocumento,
    tipoServicio,
    estatusFirmado,
  } = data;

  const documentoData = {
    solicitudFolioId,
    folioValidacion,
    hashObjetoFirmado,
    idDocumento,
    datosFirmante,
    objetoFirmado,
    firmaResponse,
    uriValidacion,
    tipoDocumento,
    claveDocumento,
    tipoServicio,
    estatusFirmado: estatusFirmado || 'exitoso',
    fechaFirmado: new Date(),
  };

  const newDocumento = await createDocumentoFirmadoQuery(documentoData);

  return newDocumento;
};

module.exports = createDocumentoFirmado;
