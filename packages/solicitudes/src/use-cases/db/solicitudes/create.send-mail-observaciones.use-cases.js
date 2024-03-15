const boom = require('@hapi/boom');

const createSendMailObservacion = (
  findAllSolicitudSeccionQuery,
  updateSolicitudQuery,
  findProgramasBySolicitudIdQuery,
) => async ({ solicitudId }) => {
  const include = [
    {
      association: 'solicitud',
      attributes: ['id', 'folio'],
      include: [
        {
          association: 'usuario',
          attributes: ['id', 'usuario', 'correo'],
        }],
    },
    {
      association: 'seccion',
      attributes: ['id', 'nombre'],
    },
  ];
  const findAllSolicitudes = await findAllSolicitudSeccionQuery({
    solicitudId,
  }, { include });

  if (!findAllSolicitudes.length) {
    throw boom.notFound('No se encontraron observaciones');
  }
  const { solicitud } = findAllSolicitudes[0];
  const { usuario } = solicitud;

  const mapObservacionesTemplate = findAllSolicitudes.map((data) => {
    const { observaciones, seccion } = data;
    const { nombre } = seccion;
    return { nombre, observaciones };
  });

  const { plantel } = await findProgramasBySolicitudIdQuery(solicitudId);
  const mailOptions = {
    usuarioId: usuario.id,
    email: usuario.correo,
    params: {
      nombre: plantel.institucion.nombre,
      email: usuario.correo,
      folio: solicitud.folio,
      observacion: mapObservacionesTemplate,
    },
  };

  await updateSolicitudQuery(
    { id: solicitudId },
    { estatusSolicitudId: 200 },
  );

  return { findAllSolicitudes, mailOptions };
};

module.exports = { createSendMailObservacion };
