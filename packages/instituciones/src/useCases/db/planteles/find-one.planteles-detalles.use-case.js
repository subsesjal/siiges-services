const { checkers } = require('@siiges-services/shared');

const findOnePlantel = (findOneInstitucionQuery, findOnePlantelQuery) => async (
  identifierObj,
) => {
  const { plantelId, institucionId } = identifierObj;

  const institucion = await findOneInstitucionQuery({ id: institucionId });
  checkers.throwErrorIfDataIsFalsy(institucion, 'instituciones', institucionId);

  const include = [
    { association: 'tipoInmueble' },
    {
      association: 'domicilio',
      include: [
        { association: 'estado' },
        { association: 'municipio' },
      ],
    },
    {
      association: 'directores',
      include: [{ association: 'persona' }],
    },
    { association: 'institucion' },
    {
      association: 'plantelEdificioNiveles',
      include: [
        { association: 'edificioNivel' },
      ],
    },
    {
      association: 'plantelSeguridadSistemas',
      include: [
        { association: 'seguridadSistema' },
      ],
    },
    {
      association: 'plantelHigienes',
      include: [
        { association: 'higiene' },
      ],
    },
    { association: 'saludInstituciones' },
    {
      association: 'infraestructuras',
      include: [
        {
          association: 'asignaturasInfraestructura',
          include: [
            { association: 'asignatura' },
          ],
        },
      ],
    },
  ];

  const plantel = await findOnePlantelQuery({
    id: plantelId,
    institucionId,
  }, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  return plantel;
};

module.exports = findOnePlantel;
