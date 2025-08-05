const { Op } = require('sequelize');

const findGroupPlantelInfraestructura = (
  findAllInfraestructuraQuery,
  findOneInfraestructuraQuery,
  findOneProgramaQuery,
  findAllProgramaInfraestructuraQuery,
) => async (identifierObj) => {
  const AULA_ID = 1;
  const { plantelId, programaId } = identifierObj;

  const include = [
    { association: 'tipoInstalacion' },
    {
      association: 'asignaturasInfraestructura',
      include: [
        { association: 'asignatura' },
      ],
    }];

  const plantelInfraestructuras = await findAllInfraestructuraQuery({
    plantelId,
    tipoInstalacionId: { [Op.not]: AULA_ID },
  }, {
    include,
    strict: false,
  });

  const infraestructuras = plantelInfraestructuras
    .map((infraestructura) => infraestructura.toJSON());

  // find programa
  const programa = await findOneProgramaQuery({ id: programaId, plantelId });
  let infraestructurasAsignaturas = [];

  if (programa) {
    const programaInfraestructuras = await findAllProgramaInfraestructuraQuery({
      programaId,
    });

    infraestructurasAsignaturas = await Promise.all(programaInfraestructuras
      .map(async (programaInfraestructura) => {
        const plantelInfraestructuraAsignatura = await findOneInfraestructuraQuery({
          id: programaInfraestructura.infraestructuraId,
        }, {
          include,
          strict: false,
        });

        return plantelInfraestructuraAsignatura.toJSON();
      }));
  }

  return [...infraestructuras, ...infraestructurasAsignaturas];
};

module.exports = findGroupPlantelInfraestructura;
