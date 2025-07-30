const boom = require('@hapi/boom');
const { Logger } = require('@siiges-services/shared');

const CICLOS_ESCOLARES_MAPPING = [
  '2024A',
  '2024B',
  '2024C',
  '2025A',
  '2025B',
  '2025C',
];

const createCiclos = (
  findUserUsersQuery,
  findOneProgramaQuery,
  findOneCicloEscolarQuery,
  createCicloEscolarQuery,
) => async (identifiers, data) => {
  Logger.info(`[CicloEscolar.createCiclos.use-case]: Ciclo escolar por Rvoe: ${identifiers.rvoe}`);
  const { rvoe, userId } = identifiers;
  const usuarios = await findUserUsersQuery({ secundarioId: userId });

  if (!usuarios || !usuarios.principalId) {
    throw boom.badRequest('El usuario no tiene un usuario principal asociado');
  }
  const { principalId } = usuarios;

  const includePrograma = [{
    association: 'plantel',
    include: [
      { association: 'institucion' },
    ],
  }];

  const programa = await findOneProgramaQuery({ acuerdoRvoe: rvoe }, { include: includePrograma });

  if (programa?.plantel?.institucion?.usuarioId !== principalId) {
    throw boom.forbidden(`El usuario no tiene acceso a la institucion del programa ${rvoe}`);
  }

  const isValidCicloEscolar = CICLOS_ESCOLARES_MAPPING.includes(data.nombre);

  if (!isValidCicloEscolar) {
    throw boom.badRequest(`El ciclo escolar ${data.nombre} no es válido`);
  }

  const exists = await findOneCicloEscolarQuery({ programaId: programa.id, nombre: data.nombre });

  if (exists) {
    throw boom.conflict(`El ciclo escolar ${data.nombre} ya existe`);
  }

  const cicloEscolar = await createCicloEscolarQuery({
    ...data,
    programaId: programa.id,
  });

  return cicloEscolar;
};

module.exports = createCiclos;
