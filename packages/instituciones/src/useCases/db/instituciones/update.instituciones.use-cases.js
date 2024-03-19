const { checkers } = require('@siiges-services/shared');

const updateRector = async (
  institucion,
  rector,
  updatePersonaQuery,
  createRectorQuery,
) => {
  if (rector) {
    const { rector: currentRector } = institucion;
    if (currentRector) {
      await updatePersonaQuery(
        { id: currentRector.personaId },
        rector.persona,
      );
    } else {
      const includeRector = [{ association: 'persona' }];
      const rectorData = { institucionId: institucion.id, ...rector };
      await createRectorQuery(rectorData, includeRector);
    }
  }
};

const updateRatificacionesNombre = async (
  institucion,
  ratificacionesNombre,
  updateRatificacionQuery,
  createRatificacionQuery,
  identifierObj,
) => {
  if (ratificacionesNombre) {
    const { ratificacionesNombre: currentRatificaciones } = institucion;
    if (currentRatificaciones.length) {
      const lastRatificacionId = currentRatificaciones[0].id;
      await updateRatificacionQuery({
        id: lastRatificacionId,
        institucionId: identifierObj.id,
      }, ratificacionesNombre);
    } else {
      await createRatificacionQuery(ratificacionesNombre);
    }
  }
};

const updateInstitucion = (
  findOneInstitucionQuery,
  updateInstitucionQuery,
  updatePersonaQuery,
  updateRatificacionQuery,
  createRatificacionQuery,
  createRectorQuery,
) => async (identifierObj, data) => {
  const { rector, ratificacionesNombre } = data;

  const include = [
    {
      association: 'ratificacionesNombre',
      limit: 1,
      order: [['createdAt', 'DESC']],
    },
    {
      association: 'rector',
      include: [{ association: 'persona' }],
    }];

  const institucion = await findOneInstitucionQuery(identifierObj, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(institucion, 'instituciones', identifierObj.id);

  let institucionUpdated = await updateInstitucionQuery(identifierObj, data);

  await updateRector(
    institucion,
    rector,
    updatePersonaQuery,
    createRectorQuery,
  );

  await updateRatificacionesNombre(
    institucion,
    ratificacionesNombre,
    updateRatificacionQuery,
    createRatificacionQuery,
    identifierObj,
  );

  institucionUpdated = await findOneInstitucionQuery(identifierObj, {
    undefined,
    include,
    strict: false,
  });

  return institucionUpdated;
};

module.exports = updateInstitucion;
