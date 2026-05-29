const { Op } = require('sequelize');

const findAllMatriculaActiva = (
  findAllProgramasQuery,
  findAllAlumnosQuery,
) => async ({ institucionId, plantelId, programaId }) => {
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
        include: [
          { association: 'institucion' },
          { association: 'domicilio' },
        ],
      },
    ],
    strict: true,
  });

  if (!programas?.length) return { totalGeneral: 0, programas: [] };

  const programaIds = programas.map((p) => p.id);

  const alumnos = await findAllAlumnosQuery(
    { programaId: { [Op.in]: programaIds }, situacionId: 1 },
    { attributes: ['id', 'programaId'], strict: false },
  );

  const countByPrograma = {};
  alumnos.forEach((a) => {
    countByPrograma[a.programaId] = (countByPrograma[a.programaId] || 0) + 1;
  });

  const result = programas.map((p) => ({
    programaId: p.id,
    programa: p.nombre,
    acuerdoRvoe: p.acuerdoRvoe,
    plantelId: p.plantelId,
    plantel: p.plantel,
    institucionId: p.plantel?.institucionId,
    institucion: p.plantel?.institucion?.nombre,
    totalAlumnos: countByPrograma[p.id] || 0,
  }));

  const totalGeneral = result.reduce((acc, r) => acc + r.totalAlumnos, 0);

  return { totalGeneral, programas: result };
};

module.exports = findAllMatriculaActiva;
