const { Op } = require('sequelize');
const { checkers } = require('@siiges-services/shared');

const buildFileFDA04 = (
  findOneSolicitudProgramaQuery,
  findAllInfraestructura,
  findAllInfraestructuraPrograma,
  findOneInfraestructura,
  findPlantelHigieneByPlantelId,
  findSaludInstitucionesByPlantelId,
  createPhpFile,
) => async (solicitudId, tipoDocumento) => {
  const AULA_ID = 1;
  const include = [{
    association: 'programa',
    include: [
      { association: 'ciclo' },
      { association: 'nivel' },
      { association: 'modalidad' },
      {
        association: 'plantel',
        include: [
          {
            association: 'plantelEdificioNiveles',
            include: [{ association: 'edificioNivel' }],
          },
          { association: 'plantelSeguridadSistemas' },
          { association: 'plantelHigienes' },
          { association: 'saludInstituciones' },
          {
            association: 'infraestructuras',
            include: [{
              association: 'asignaturasInfraestructura',
              include: [{ association: 'asignatura' }],
            }],
          },
          {
            association: 'domicilio',
            include: [
              { association: 'estado' },
              { association: 'municipio' },
            ],
          },
          { association: 'institucion' },
        ],
      },
    ],
  },
  {
    association: 'usuario',
    include: [{ association: 'persona' }],
  },
  { association: 'estatusSolicitud' }];

  const solicitud = await findOneSolicitudProgramaQuery(
    { id: solicitudId },
    { include, strict: false },
  );

  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitud', solicitudId);

  const solicitudData = solicitud.toJSON();

  const includeInfraestructura = [
    { association: 'tipoInstalacion' },
    {
      association: 'asignaturasInfraestructura',
      include: [{ association: 'asignatura' }],
    },
  ];

  const infraestructurasGenerales = await findAllInfraestructura(
    {
      plantelId: solicitudData?.programa?.plantel?.id,
      tipoInstalacionId: { [Op.not]: AULA_ID },
    },
    { include: includeInfraestructura, strict: false },
  );

  const aulasAsociadas = await findAllInfraestructuraPrograma(
    { programaId: solicitudData?.programa?.id },
  );

  const aulasDetalladas = await Promise.all(
    (aulasAsociadas || []).map(async (item) => {
      const aula = await findOneInfraestructura(
        { id: item.infraestructuraId },
        { include: includeInfraestructura, strict: false },
      );
      return aula?.toJSON?.() ?? null;
    }),
  );

  const todasInfraestructuras = [
    ...(infraestructurasGenerales || []),
    ...aulasDetalladas.filter(Boolean),
  ];

  const plantelHigienes = await findPlantelHigieneByPlantelId({
    plantelId: solicitudData?.programa?.plantel?.id,
  });

  const saludInstituciones = await findSaludInstitucionesByPlantelId({
    plantelId: solicitudData?.programa?.plantel?.id,
  });

  solicitudData.programa.plantel.infraestructuras = todasInfraestructuras;
  solicitudData.programa.plantel.plantelHigienes = plantelHigienes;
  solicitudData.programa.plantel.saludInstituciones = saludInstituciones;

  const file = await createPhpFile(solicitudData, tipoDocumento);
  return Buffer.from(file);
};

module.exports = { buildFileFDA04 };
