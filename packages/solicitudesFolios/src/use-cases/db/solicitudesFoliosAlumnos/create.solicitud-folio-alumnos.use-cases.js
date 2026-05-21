const { checkers, Logger } = require('@siiges-services/shared');

const hasInvalidSituacionValidacion = (validacion) => {
  const invalidSituations = [2, 4];
  return !validacion || invalidSituations.includes(validacion.situacionValidacionId);
};

const createSolicitudFolioAlumno = (
  findOneAlumnoQuery,
  findOneSolicitudFolioQuery,
  createAlumnoFolioQuery,
  findOneSolicitudFolioAlumnoQuery,
  countSolicitudFolioAlumnosQuery,
) => async (data) => {
  const { solicitudFolioId, alumnos } = data;

  const solicitudFolio = await findOneSolicitudFolioQuery({ id: solicitudFolioId });
  checkers.throwErrorIfDataIsFalsy(solicitudFolio, 'solicitudes-folios', solicitudFolioId);

  const fechaExpedicion = new Date(solicitudFolio.createdAt);
  fechaExpedicion.setHours(0, 0, 0, 0);

  const dia = fechaExpedicion.getDay();
  if (dia === 6) fechaExpedicion.setDate(fechaExpedicion.getDate() + 2);
  if (dia === 0) fechaExpedicion.setDate(fechaExpedicion.getDate() + 1);

  const fechaRegistro = new Date(fechaExpedicion);
  fechaRegistro.setDate(fechaExpedicion.getDate() + 5);

  const alumnoInclude = [
    { association: 'persona' },
    { association: 'validacion' },
  ];

  const consecutivoInicial = await countSolicitudFolioAlumnosQuery(
    { solicitudFolioId },
    { isDeleting: false },
  );

  const resultados = await Promise.all(
    alumnos.map(async (alumnoData, index) => {
      const { alumnoId, ...restData } = alumnoData;

      try {
        const alumno = await findOneAlumnoQuery(
          { id: alumnoId },
          { include: alumnoInclude, strict: false },
        );

        if (!alumno) {
          return {
            alumnoId,
            estatus: 'rechazado',
            mensaje: 'Alumno no encontrado',
          };
        }

        if (hasInvalidSituacionValidacion(alumno.validacion)) {
          return {
            alumnoId,
            estatus: 'rechazado',
            mensaje: 'Alumno no validado',
          };
        }

        const consecutivo = consecutivoInicial + index + 1;

        await createAlumnoFolioQuery({
          solicitudFolioId,
          alumnoId,
          consecutivo,
          fechaRegistro,
          fechaExpedicion,
          ...restData,
        });

        return {
          alumnoId,
          estatus: 'agregado',
          mensaje: 'Alumno agregado exitosamente',
        };
      } catch (error) {
        Logger.error(`[createSolicitudFolioAlumno] Error con alumno ${alumnoId}: ${error.message}`);
        return {
          alumnoId,
          estatus: 'rechazado',
          mensaje: error.message || 'Error al agregar alumno',
        };
      }
    }),
  );

  const agregados = resultados.filter((r) => r.estatus === 'agregado').length;
  const rechazados = resultados.filter((r) => r.estatus === 'rechazado').length;

  return {
    agregados,
    rechazados,
    resultados,
  };
};

module.exports = createSolicitudFolioAlumno;
