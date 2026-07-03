const { Op } = require('sequelize');
const { Logger } = require('@siiges-services/shared');

const SITUACION_INACTIVO = 2;

const findAllAlumnosInactivos = (
  findAllProgramasQuery,
  findAllAlumnosQuery,
  findOneValidacionQuery,
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

  return Promise.all(alumnos.map(async (a) => {
    const programa = programaById[a.programaId];
    const persona = a.persona || {};
    const nombreCompleto = [
      persona.nombre,
      persona.apellidoPaterno,
      persona.apellidoMaterno,
    ].filter(Boolean).join(' ');

    const validacionData = await findOneValidacionQuery(
      { alumnoId: a.id },
      {
        include: [
          { association: 'tipo' },
          { association: 'situacionValidacion' },
          { association: 'estado' },
          { association: 'nivel' },
        ],
        strict: false,
      },
    );

    const validacion = validacionData ? {
      id: validacionData.id,
      institucionProcedencia: validacionData.nombreInstitucionEmisora,
      estadoProcedencia: validacionData.estado?.nombre,
      cct: validacionData.claveCentroTrabajoEmisor,
      nivelEstudios: validacionData.nivel?.nombre,
      fechaInicioAntecedentes: validacionData.fechaInicioAntecedente,
      fechaFinAntecedentes: validacionData.fechaFinAntecedente,
      folio: validacionData.folio,
      fechaExpedicion: validacionData.fechaExpedicion,
      situacionDocumento: validacionData.estatus,
      tipoValidacion: validacionData.tipo?.nombre,
      situacionValidacion: validacionData.situacionValidacion?.nombre,
      fechaValidacion: validacionData.fechaValidacion,
      cedulaProfesional: validacionData.cedulaProfesional,
      archivoValidacion: validacionData.archivoValidacion,
      observaciones: validacionData.observaciones,
      usuarioId: validacionData.usuarioId,
    } : null;

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
      validacion,
    };
  }));
};

module.exports = findAllAlumnosInactivos;
