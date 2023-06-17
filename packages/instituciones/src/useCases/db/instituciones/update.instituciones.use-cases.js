const { checkers } = require('@siiges-services/shared');

const updateInstitucion = (
  findOneInstitucionQuery,
  updateInstitucionQuery,
  updatePersonaQuery,
  createRectorQuery,
) => async (identifierObj, data) => {
  const { rector } = data;

  const include = [{
    association: 'rector',
    include: [{ association: 'persona' }],
  }];

  const institucion = await findOneInstitucionQuery(identifierObj, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(institucion, 'instituciones', identifierObj.id);

  const institucionUpdated = await updateInstitucionQuery(identifierObj, data);

  if (rector) {
    if (institucion.rector) {
      const personaUpdated = await updatePersonaQuery(
        { id: institucion.rector.personaId },
        rector.persona,
      );
      institucionUpdated.dataValues.rector = {
        persona: personaUpdated,
      };
    } else {
      const includeRector = [{ association: 'persona' }];
      const rectorData = { institucionId: institucion.id, ...rector };
      const rectorCreated = await createRectorQuery(rectorData, includeRector);
      institucionUpdated.dataValues.rector = rectorCreated;
    }
  }

  return institucionUpdated;
};

module.exports = updateInstitucion;
