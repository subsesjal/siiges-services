const { checkers } = require('@siiges-services/shared');

const updateSolicitudServSocAlumno = (
  updateSolServSocAlumnoQuery,
  findOneSolServSocAlumnoQuery,
  findOneAlumnoQuery,
  findOneGradoQuery,
  findOneModalidadServSocQuery,
  findOneSectorServSocQuery,
  findOneEjeServSocQuery,
) => async (identifierObj, changes) => {
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
    solicitudServicioSocialAlumno: [identifierObj.id, findOneSolServSocAlumnoQuery],
    alumno: [changes.alumnoId, findOneAlumnoQuery],
    grado: [changes.gradoId, findOneGradoQuery],
    modalidadServicioSocial: [changes.modalidadServicioSocialId, findOneModalidadServSocQuery],
    sectorServicioSocial: [changes.sectorServicioSocialId, findOneSectorServSocQuery],
    ejeServicioSocial: [changes.ejeServicioSocialId, findOneEjeServSocQuery],
  };

  await checkers.findValidator(queryFunctions);

  return updateSolServSocAlumnoQuery(identifierObj, changes, { include });
};

module.exports = updateSolicitudServSocAlumno;
