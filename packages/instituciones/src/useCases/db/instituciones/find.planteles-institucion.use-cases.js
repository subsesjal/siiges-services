const { checkers } = require('@siiges-services/shared');
const { Op } = require('sequelize');

const findPlantelesInstitucion = (findOneInstitucionQuery) => async (identifierObj, query) => {
  const include = [
    {
      association: 'rector',
      include: [{ association: 'persona' }],
    },
    { association: 'ratificacionesNombre' },
    {
      association: 'planteles',
      ...(query.claveCentroTrabajo
        ? {
          where: {
            claveCentroTrabajo: {
              [Op.or]: [
                { [Op.ne]: null },
                { [Op.ne]: '' },
              ],
            },
          },
        }
        : {}),
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
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(plantelesInstitucion);

  return plantelesInstitucion;
};

module.exports = findPlantelesInstitucion;
