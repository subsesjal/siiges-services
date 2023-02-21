const { checkers } = require('@siiges-services/shared');

const findPlantelesInstitucion = (findOneInstitucionQuery) => async (identifierObj) => {
  const include = [
    {
      association: 'rector',
      include: [{ association: 'persona' }],
    },
    { association: 'ratificacionesNombre' },
    {
      association: 'planteles',
      include: [
        {
          association: 'domicilio',
          include: [{ association: 'estado' }, { association: 'municipio' }],
        },
        {
          association: 'directores',
          include: [{ association: 'persona' }],
        }],
    }];

  const plantelesInstitucion = await findOneInstitucionQuery(identifierObj, {
    undefined,
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(plantelesInstitucion);

  return plantelesInstitucion;
};

module.exports = findPlantelesInstitucion;
