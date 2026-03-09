const { checkers } = require('@siiges-services/shared');

const findOneAlumnos = (findOneAlumnosQuery) => async (identifierObj) => {
  const include = [
    { association: 'persona' },
    { association: 'equivalencia' },
    { association: 'alumnoTipoTramites' },
    {
      association: 'programa',
      include: [{
        association: 'plantel',
        include: [
          { association: 'institucion' },
          { association: 'domicilio' },
        ],
      }],
    },
    {
      association: 'alumnoGrupos',
      include: [{
        association: 'grupo',
        include: [{
          association: 'grado'
        }]
      }]
    },
  ];

  const alumno = await findOneAlumnosQuery(identifierObj, {
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', identifierObj.id);

  return alumno;
};

module.exports = findOneAlumnos;
