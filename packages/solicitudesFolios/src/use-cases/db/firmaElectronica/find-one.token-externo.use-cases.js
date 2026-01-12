const findOneTokenExterno = (findOneTokenExternoQuery) => async (servicio) => {
  const token = await findOneTokenExternoQuery({
    servicio,
    activo: true,
  });

  if (!token) {
    return null;
  }

  // Verificar si el token está expirado
  const now = new Date();
  const isExpired = now >= new Date(token.fechaExpiracion);

  if (isExpired) {
    return null;
  }

  return token;
};

module.exports = findOneTokenExterno;
