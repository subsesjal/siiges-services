const { Op } = require('sequelize');
const { Logger } = require('@siiges-services/shared');

const TIPO_EXTRAORDINARIO = 2;

const findAllAlumnosExtraordinarios = (
  findAllProgramasQuery,
  findAllGruposQuery,
  findAllCalificacionesQuery,
) => async ({
  institucionId, plantelId, programaId, cicloEscolarId,
}) => {
  Logger.info('[alumnos]: buscar alumnos extraordinarios');

  const wherePlantel = { institucionId };
  if (plantelId) wherePlantel.id = plantelId;

  const wherePrograma = {
    acuerdoRvoe: { [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: '' }] },
  };
  if (programaId) wherePrograma.id = programaId;

  const programas = await findAllProgramasQuery(wherePrograma, {
    include: [{ association: 'plantel', where: wherePlantel }],
    strict: true,
  });

  if (!programas?.length) return [];

  const programaIds = programas.map((p) => p.id);

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
      order: [
        [{ model: 'alumno', as: 'alumno' }, 'matricula', 'ASC'],
      ],
      include: [
        {
          association: 'alumno',
          where: { programaId: { [Op.in]: programaIds } },
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
