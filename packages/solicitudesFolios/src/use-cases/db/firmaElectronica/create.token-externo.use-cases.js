const createTokenExterno = (createTokenExternoQuery) => async (data) => {
  const {
    servicio,
    accessToken,
    tokenType,
    expiresIn,
    fechaObtencion,
  } = data;

  // Calcular fecha de expiración
  const fechaExpiracion = new Date(fechaObtencion);
  fechaExpiracion.setSeconds(fechaExpiracion.getSeconds() + expiresIn);

  const tokenData = {
    servicio,
    accessToken,
    tokenType,
    expiresIn,
    fechaObtencion,
    fechaExpiracion,
    activo: true,
  };

  const newToken = await createTokenExternoQuery(tokenData);

  return newToken;
};

module.exports = createTokenExterno;
