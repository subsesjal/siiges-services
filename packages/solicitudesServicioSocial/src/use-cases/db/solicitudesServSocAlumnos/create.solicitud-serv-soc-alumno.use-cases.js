const { checkers } = require('@siiges-services/shared');

const createSolicitudServSocAlumno = (
  createSolicitudServSocAlumnoQuery,
  findOneSolicitudServSocAlumnoQuery,
  findOneSolicitudServSocQuery,
  findOneAlumnoQuery,
  findOneGradoQuery,
  findOneModalidadServicioSocialQuery,
  findOneSectorServicioSocialQuery,
  findOneEjeServicioSocialQuery,
) => async (data) => {
  const include = [
    { association: 'alumno' },
    { association: 'grado' },
    { association: 'modalidadServicioSocial' },
    { association: 'sectorServicioSocial' },
    {
      association: 'ejeServicioSocial',
      include: [{ association: 'dimensionServicioSocial' }],
    },
  ];

  const queryFunctions = {
    solicitudServicioSocial: [data.solicitudServicioSocialId, findOneSolicitudServSocQuery],
    alumno: [data.alumnoId, findOneAlumnoQuery],
    grado: [data.gradoId, findOneGradoQuery],
    modalidadServicioSocial: [data.modalidadServicioSocialId, findOneModalidadServicioSocialQuery],
    sectorServicioSocial: [data.sectorServicioSocialId, findOneSectorServicioSocialQuery],
    ejeServicioSocial: [data.ejeServicioSocialId, findOneEjeServicioSocialQuery],
  };

  await checkers.findValidator(queryFunctions);

  const { id } = await createSolicitudServSocAlumnoQuery(data);

  return findOneSolicitudServSocAlumnoQuery({ id }, { include });
};

module.exports = createSolicitudServSocAlumno;
