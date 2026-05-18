const { Logger } = require('@siiges-services/shared');
const axios = require('axios');
const { config } = require('../../../../config/environment');

const SERVICIO_FIRMA_DOCUMENTO = 'firma_documento';
const BATCH_SIZE = 5;

const getBasicAuthHeader = () => {
  const { clientId, clientSecret } = config.firmaElectronica;
  const credentials = `${clientId}:${clientSecret}`;
  const base64Credentials = Buffer.from(credentials).toString('base64');
  return `Basic ${base64Credentials}`;
};

const obtenerTokenExterno = async () => {
  const { urlToken, username, password } = config.firmaElectronica;

  const response = await axios({
    method: 'POST',
    url: urlToken,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: getBasicAuthHeader(),
    },
    data: new URLSearchParams({
      username,
      password,
      grant_type: 'password',
    }).toString(),
  });

  return response.data;
};

const buscarFirmanteEnApiTitulo = async (curp) => {
  try {
    const { baseUrl, apiKey } = config.apiTitulos;

    const response = await axios({
      method: 'GET',
      url: `${baseUrl}/representantes-legales/${curp}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });

    const firmanteData = response.data?.data || response.data;

    if (firmanteData?.curp) {
      return firmanteData;
    }
    return null;
  } catch (err) {
    Logger.error(`[firma-documento] Data: ${JSON.stringify(err.response?.data)}`);
    return null;
  }
};

const validarFirmante = async (
  autoridad,
  programaId,
  findOneFirmanteQuery,
  createOneFirmanteQuery,
) => {
  const { tipoFirmante, curp } = autoridad;

  let firmante = await findOneFirmanteQuery({ curpFirmante: curp });

  if (firmante) {
    return { valido: true, firmante };
  }

  if (tipoFirmante === 'sicyt') {
    return { valido: false, error: 'Firmante SICYT no autorizado' };
  }

  const firmanteExterno = await buscarFirmanteEnApiTitulo(curp);

  if (!firmanteExterno) {
    return { valido: false, error: 'Firmante no encontrado en el sistema de título' };
  }

  try {
    firmante = await createOneFirmanteQuery({
      primerNombre: firmanteExterno.nombre || '',
      segundoNombre: '',
      apellidoPaterno: firmanteExterno.primerApellido || '',
      apellidoMaterno: firmanteExterno.segundoApellido || '',
      curpFirmante: curp,
      programaId,
    });
  } catch (err) {
    Logger.error(`[firma-documento] Error al guardar firmante: ${err.message}`);
  }

  return { valido: true, firmante };
};

const firmarDocumentoExterno = async (pkcs7, claveDocumento, tipoServicio, accessToken) => {
  const { urlFirma } = config.firmaElectronica;

  const response = await axios({
    method: 'POST',
    url: urlFirma,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${accessToken}`,
    },
    data: new URLSearchParams({
      pkcs7,
      clavedocumento: claveDocumento,
      tiposervicio: tipoServicio,
    }).toString(),
  });

  return response.data;
};

const isTokenExpired = (tokenExterno) => {
  if (!tokenExterno) return true;
  const now = new Date();
  const fechaExpiracion = new Date(tokenExterno.fechaExpiracion);
  return now >= fechaExpiracion;
};

const firmarUnDocumentoIes = async (
  documento,
  catalogo,
  tokenExterno,
  createDocumentoFirmadoQuery,
  updateDocumentoFirmadoQuery,
  findOneDocumentoFirmadoQuery,
) => {
  const {
    pkcs7,
    folioInterno,
    objetoPorFirmar,
    autoridad,
  } = documento;

  let documentoFirmado = await findOneDocumentoFirmadoQuery({ folioInterno });

  if (documentoFirmado) {
    if (documentoFirmado.firmaDigitalIes) {
      return {
        folioInterno,
        estatusFirmado: 'exitoso',
        mensaje: 'Ya firmado por IES',
      };
    }
  } else {
    documentoFirmado = await createDocumentoFirmadoQuery({
      catalogoFirmaElectronicaId: catalogo.id,
      objetoPorFirmar: JSON.stringify(objetoPorFirmar),
      folioInterno,
      pkcs7Ies: pkcs7,
      curpFirmanteIes: autoridad.curp,
      nombreFirmanteIes: autoridad.nombre,
    });
  }

  let firmaResponse;
  try {
    firmaResponse = await firmarDocumentoExterno(
      pkcs7,
      catalogo.claveDocumento,
      catalogo.tipoServicio,
      tokenExterno.accessToken,
    );
  } catch (err) {
    const errorMsg = err.response?.data
      ? JSON.stringify(err.response.data)
      : err.message;

    await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      {
        pkcs7Ies: pkcs7,
        curpFirmanteIes: autoridad.curp,
        nombreFirmanteIes: autoridad.nombre,
        firmaResponseIes: errorMsg,
      },
    );

    return {
      folioInterno,
      estatusFirmado: 'rechazado',
    };
  }

  if (!firmaResponse || firmaResponse.error || !firmaResponse.identificadorunico) {
    await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      {
        pkcs7Ies: pkcs7,
        curpFirmanteIes: autoridad.curp,
        nombreFirmanteIes: autoridad.nombre,
        firmaResponseIes: JSON.stringify(firmaResponse),
      },
    );

    return {
      folioInterno,
      estatusFirmado: 'rechazado',
    };
  }

  await updateDocumentoFirmadoQuery(
    { id: documentoFirmado.id },
    {
      pkcs7Ies: pkcs7,
      curpFirmanteIes: autoridad.curp,
      nombreFirmanteIes: autoridad.nombre,
      datosFirmanteIes: firmaResponse.datosfirmante,
      firmaResponseIes: JSON.stringify(firmaResponse),
      fechaFirmadoIes: firmaResponse.fechafirmado
        ? new Date(firmaResponse.fechafirmado)
        : new Date(),
      identificadorUnicoIes: firmaResponse.identificadorunico,
      hashObjetoFirmadoIes: firmaResponse.hashobjetofirmado,
      firmaDigitalIes: firmaResponse.firmadigital,
      secuenciaDocumentoIes: firmaResponse.secuenciadocumento,
      objetoFirmadoIes: firmaResponse.objetofirmado,
      uriValidacionIes: firmaResponse.urivalidacion,
      tipoDocumentoIes: firmaResponse.tipodocumento,
      identificadorDocumentoIes: firmaResponse.identificadordocumento,
      dependenciaDocumentoIes: firmaResponse.dependenciadocumento,
    },
  );

  return {
    folioInterno,
    estatusFirmado: 'exitoso',
  };
};

const firmarUnDocumentoSicyt = async (
  documento,
  catalogo,
  tokenExterno,
  updateDocumentoFirmadoQuery,
  findOneDocumentoFirmadoQuery,
) => {
  const {
    pkcs7,
    folioInterno,
    autoridad,
  } = documento;

  const documentoFirmado = await findOneDocumentoFirmadoQuery({ folioInterno });

  if (!documentoFirmado) {
    return {
      folioInterno,
      estatusFirmado: 'rechazado',
      mensaje: 'No existe registro previo de firma IES',
    };
  }

  if (!documentoFirmado.firmaDigitalIes) {
    return {
      folioInterno,
      estatusFirmado: 'rechazado',
      mensaje: 'Requiere firma IES primero',
    };
  }

  if (documentoFirmado.firmaDigitalSicyt) {
    return {
      folioInterno,
      estatusFirmado: 'exitoso',
      mensaje: 'Ya firmado por SICYT',
    };
  }

  let firmaResponse;
  try {
    firmaResponse = await firmarDocumentoExterno(
      pkcs7,
      catalogo.claveDocumento,
      catalogo.tipoServicio,
      tokenExterno.accessToken,
    );
  } catch (err) {
    const errorMsg = err.response?.data
      ? JSON.stringify(err.response.data)
      : err.message;

    await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      {
        pkcs7Sicyt: pkcs7,
        curpFirmanteSicyt: autoridad.curp,
        nombreFirmanteSicyt: autoridad.nombre,
        firmaResponseSicyt: errorMsg,
      },
    );

    return {
      folioInterno,
      estatusFirmado: 'rechazado',
    };
  }

  if (!firmaResponse || firmaResponse.error || !firmaResponse.identificadorunico) {
    await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      {
        pkcs7Sicyt: pkcs7,
        curpFirmanteSicyt: autoridad.curp,
        nombreFirmanteSicyt: autoridad.nombre,
        firmaResponseSicyt: JSON.stringify(firmaResponse),
      },
    );

    return {
      folioInterno,
      estatusFirmado: 'rechazado',
    };
  }

  await updateDocumentoFirmadoQuery(
    { id: documentoFirmado.id },
    {
      pkcs7Sicyt: pkcs7,
      curpFirmanteSicyt: autoridad.curp,
      nombreFirmanteSicyt: autoridad.nombre,
      datosFirmanteSicyt: firmaResponse.datosfirmante,
      firmaResponseSicyt: JSON.stringify(firmaResponse),
      fechaFirmadoSicyt: firmaResponse.fechafirmado
        ? new Date(firmaResponse.fechafirmado)
        : new Date(),
      identificadorUnicoSicyt: firmaResponse.identificadorunico,
      hashObjetoFirmadoSicyt: firmaResponse.hashobjetofirmado,
      firmaDigitalSicyt: firmaResponse.firmadigital,
      secuenciaDocumentoSicyt: firmaResponse.secuenciadocumento,
      objetoFirmadoSicyt: firmaResponse.objetofirmado,
      uriValidacionSicyt: firmaResponse.urivalidacion,
      tipoDocumentoSicyt: firmaResponse.tipodocumento,
      identificadorDocumentoSicyt: firmaResponse.identificadordocumento,
      dependenciaDocumentoSicyt: firmaResponse.dependenciadocumento,
    },
  );

  return {
    folioInterno,
    estatusFirmado: 'exitoso',
  };
};

const procesarDocumentos = async (
  documentos,
  catalogo,
  tipoFirmante,
  findOneTokenExternoQuery,
  createTokenExternoQuery,
  updateTokenExternoQuery,
  createDocumentoFirmadoQuery,
  updateDocumentoFirmadoQuery,
  findOneDocumentoFirmadoQuery,
) => {
  let tokenExterno = await findOneTokenExternoQuery({
    servicio: SERVICIO_FIRMA_DOCUMENTO,
    activo: true,
  });

  if (isTokenExpired(tokenExterno)) {
    const tokenResponse = await obtenerTokenExterno();

    const tokenData = {
      servicio: SERVICIO_FIRMA_DOCUMENTO,
      accessToken: tokenResponse.access_token,
      tokenType: tokenResponse.token_type,
      expiresIn: String(tokenResponse.expires_in),
      fechaObtencion: new Date(),
      fechaExpiracion: new Date(Date.now() + tokenResponse.expires_in * 1000),
      activo: true,
    };

    if (tokenExterno) {
      tokenExterno = await updateTokenExternoQuery(
        { id: tokenExterno.id },
        tokenData,
      );
    } else {
      tokenExterno = await createTokenExternoQuery(tokenData);
    }
  }

  const resultados = [];

  for (let i = 0; i < documentos.length; i += BATCH_SIZE) {
    const lote = documentos.slice(i, i + BATCH_SIZE);

    // eslint-disable-next-line no-await-in-loop
    const resultadosLote = await Promise.all(
      lote.map((documento) => {
        if (tipoFirmante === 'ies') {
          return firmarUnDocumentoIes(
            documento,
            catalogo,
            tokenExterno,
            createDocumentoFirmadoQuery,
            updateDocumentoFirmadoQuery,
            findOneDocumentoFirmadoQuery,
          );
        }
        return firmarUnDocumentoSicyt(
          documento,
          catalogo,
          tokenExterno,
          updateDocumentoFirmadoQuery,
          findOneDocumentoFirmadoQuery,
        );
      }),
    );

    resultados.push(...resultadosLote);
  }

  const exitosos = resultados.filter((r) => r.estatusFirmado === 'exitoso').length;
  const rechazados = resultados.filter((r) => r.estatusFirmado === 'rechazado').length;

  Logger.info(`[firma-documento] Proceso completado: ${exitosos} exitosos, ${rechazados} rechazados`);

  return resultados;
};

const createFirmaDocumento = (
  findOneCatalogoFirmaElectronicaQuery,
  findOneTokenExternoQuery,
  createTokenExternoQuery,
  updateTokenExternoQuery,
  createDocumentoFirmadoQuery,
  updateDocumentoFirmadoQuery,
  findOneFirmanteQuery,
  createOneFirmanteQuery,
  findOneDocumentoFirmadoQuery,
) => async (documentos) => {
  if (!Array.isArray(documentos) || documentos.length === 0) {
    return { error: true, message: 'Se requiere al menos un documento para firmar' };
  }

  const primerDocumento = documentos[0];
  const { tipoDocumento, autoridad, programaId } = primerDocumento;

  if (!tipoDocumento) {
    return { error: true, message: 'El campo tipoDocumento es requerido' };
  }

  if (!autoridad || !autoridad.curp) {
    return { error: true, message: 'El campo autoridad.curp es requerido' };
  }

  const { tipoFirmante } = autoridad;

  const catalogo = await findOneCatalogoFirmaElectronicaQuery({
    nombreDocumento: tipoDocumento,
  });

  if (!catalogo) {
    return { error: true, message: `No se encontró configuración en catálogo para tipo de documento: ${tipoDocumento}` };
  }

  const { valido, error } = await validarFirmante(
    autoridad,
    programaId,
    findOneFirmanteQuery,
    createOneFirmanteQuery,
  );

  if (!valido) {
    return { error: true, message: error || 'Firmante no válido' };
  }

  Logger.info(`[firma-documento] Procesando ${documentos.length} documento(s) en lotes de ${BATCH_SIZE}`);

  const resultados = await procesarDocumentos(
    documentos,
    catalogo,
    tipoFirmante,
    findOneTokenExternoQuery,
    createTokenExternoQuery,
    updateTokenExternoQuery,
    createDocumentoFirmadoQuery,
    updateDocumentoFirmadoQuery,
    findOneDocumentoFirmadoQuery,
  );

  return { error: false, resultados };
};

module.exports = createFirmaDocumento;
