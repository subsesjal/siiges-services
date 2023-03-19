const { checkers } = require('@siiges-services/shared');

const update = (
  findDiligenciaQuery,
  updateDiligenciaQuery,
  updatePersonaQuery,
) => async (identifierObj, data) => {
  const { diligenciaId } = identifierObj;

  const diligencia = await findDiligenciaQuery(diligenciaId);
  checkers.throwErrorIfDataIsFalsy(diligencia, 'diligencias', diligenciaId);

  let personaUpdated;
  const diligenciaUpdated = await updateDiligenciaQuery({ id: diligencia.id }, data);

  if (data.persona) {
    const { persona } = data;
    personaUpdated = await updatePersonaQuery({ id: diligencia.personaId }, persona);
    diligenciaUpdated.dataValues.persona = personaUpdated.dataValues;
  }

  return diligenciaUpdated;
};

module.exports = update;
