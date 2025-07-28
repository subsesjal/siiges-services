const { checkers, Logger } = require('@siiges-services/shared');

const findFileHistorial = (
  findOneAlumnoQuery,
  findAllCalificacionesQuery,
  GenerarHISTORIAL,
) => async (alumnoId) => {
  Logger.info('[files.findFileHistorial.use-case]: Generando archivo de historial académico');
  let include = [
    { association: 'persona' },
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
  ];
  const alumno = await findOneAlumnoQuery({ id: alumnoId }, {
    include,
    strict: false,
  });
  include = [
    { association: 'alumno' },
    { association: 'asignatura' },
    {
      association: 'grupo',
      include: [
        { association: 'cicloEscolar' },
        { association: 'grado' },
      ],
    },
  ];
  const calificaciones = await findAllCalificacionesQuery({ alumnoId }, {
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(calificaciones, 'calificaciones', alumnoId);

  const file = await GenerarHISTORIAL(alumno, calificaciones);
  return Buffer.from(file);
};

module.exports = { findFileHistorial };
