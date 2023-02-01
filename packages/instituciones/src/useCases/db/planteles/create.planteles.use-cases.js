const { checkers } = require('@siiges-services/shared');

const createPlantel = (findOneInstitucionQuery, createPlantelQuery, createDirectorQuery) => async (
  id,
  data,
  include,
) => {
  const institucion = await findOneInstitucionQuery({ id });
  checkers.throwErrorIfDataIsFalsy(institucion, 'instituciones', id);

  const { director, ...dataPlantel } = data;
  const newData = { institucionId: institucion.id, ...dataPlantel };

  const newPlantelInstitucion = await createPlantelQuery(newData, include);

  if (director) {
    const includeDirector = [{ association: 'persona' }];
    const directorData = { plantelId: newPlantelInstitucion.id, ...director };
    const newDirectorPlantel = await createDirectorQuery(
      directorData,
      includeDirector,
    );
    newPlantelInstitucion.dataValues.director = newDirectorPlantel;
  }

  return newPlantelInstitucion;
};

module.exports = createPlantel;
