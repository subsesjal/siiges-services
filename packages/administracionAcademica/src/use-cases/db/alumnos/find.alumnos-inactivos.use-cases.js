const { Op } = require('sequelize');
const { Logger } = require('@siiges-services/shared');

const SITUACION_INACTIVO = 2;

const findAllAlumnosInactivos = (
  findAllProgramasQuery,
  findAllAlumnosQuery,
) => async ({ institucionId, plantelId, programaId }) => {
  Logger.info('[alumnos]: buscar alumnos inactivos');

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

  return findAllAlumnosQuery(
    {
      programaId: { [Op.in]: programaIds },
      situacionId: SITUACION_INACTIVO,
    },
    {
      include: [
        { association: 'persona' },
        {
          association: 'programa',
          include: [
            {
              association: 'plantel',
              include: [
                { association: 'institucion' },
                { association: 'domicilio' },
              ],
            },
          ],
        },
        {
          association: 'validacion',
          include: [
            { association: 'tipo' },
            { association: 'situacionValidacion' },
            { association: 'estado' },
            { association: 'nivel' },
          ],
        },
      ],
      strict: false,
    },
  );
};

module.exports = findAllAlumnosInactivos;
