const { Logger } = require('@siiges-services/shared');

const TIPO_EXTRAORDINARIO = 2;

const findAllAlumnosExtraordinarios = (
  findAllGruposQuery,
  findAllCalificacionesQuery,
) => async ({ cicloEscolarId }) => {
  Logger.info('[alumnos]: buscar alumnos extraordinarios');

  const grupos = await findAllGruposQuery({ cicloEscolarId });
  const grupoIds = grupos.map(({ id }) => id);

  if (grupoIds.length === 0) return [];

  const whereCalificacion = {
    tipo: TIPO_EXTRAORDINARIO,
    grupoId: grupoIds,
  };

  return findAllCalificacionesQuery(
    whereCalificacion,
    {
      include: [
        {
          association: 'alumno',
          include: [
            { association: 'persona' },
            {
              association: 'programa',
              include: [
                {
                  association: 'plantel',
                  include: [
                    { association: 'institucion' },
                  ],
                },
              ],
            },
          ],
        },
        {
          association: 'asignatura',
          include: [
            { association: 'grado' },
          ],
        },
        {
          association: 'grupo',
        },
      ],
      strict: false,
    },
  );
};

module.exports = findAllAlumnosExtraordinarios;
