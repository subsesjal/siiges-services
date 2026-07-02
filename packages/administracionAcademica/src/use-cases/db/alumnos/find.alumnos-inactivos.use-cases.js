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
    include: [
      {
        association: 'plantel',
        where: wherePlantel,
        include: [{ association: 'institucion' }],
      },
    ],
    strict: true,
  });

  if (!programas?.length) return [];

  const programaIds = programas.map((p) => p.id);
  const programaById = {};
  programas.forEach((p) => { programaById[p.id] = p; });

  const alumnos = await findAllAlumnosQuery(
    {
      programaId: { [Op.in]: programaIds },
      situacionId: SITUACION_INACTIVO,
    },
    {
      include: [{ association: 'persona' }],
      strict: false,
    },
  );

  return alumnos.map((a) => {
    const programa = programaById[a.programaId];
    const persona = a.persona || {};
    const nombreCompleto = [
      persona.nombre,
      persona.apellidoPaterno,
      persona.apellidoMaterno,
    ].filter(Boolean).join(' ');

    return {
      id: a.id,
      matricula: a.matricula,
      situacionId: a.situacionId,
      nombreCompleto,
      curp: persona.curp,
      fechaRegistro: a.createdAt,
      programaId: a.programaId,
      programa: programa?.nombre,
      acuerdoRvoe: programa?.acuerdoRvoe,
      plantelId: programa?.plantelId,
      plantel: programa?.plantel?.nombre,
      institucionId: programa?.plantel?.institucionId,
      institucion: programa?.plantel?.institucion?.nombre,
    };
  });
};

module.exports = findAllAlumnosInactivos;
