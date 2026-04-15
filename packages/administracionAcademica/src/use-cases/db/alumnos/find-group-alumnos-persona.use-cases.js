const { checkers } = require('@siiges-services/shared');
const { Op } = require('sequelize');

const findGroupAlumnosPersona = (findAllPersonasQuery, findAllAlumnosQuery) => async ({
  curp,
  nombre,
  apellidoPaterno,
  apellidoMaterno,
}) => {
  const wherePersona = {};

  if (curp) wherePersona.curp = curp;
  if (nombre) wherePersona.nombre = { [Op.like]: `%${nombre}%` };
  if (apellidoPaterno) wherePersona.apellidoPaterno = { [Op.like]: `%${apellidoPaterno}%` };
  if (apellidoMaterno) wherePersona.apellidoMaterno = { [Op.like]: `%${apellidoMaterno}%` };

  checkers.throwErrorIfDataIsFalsy(
    Object.keys(wherePersona).length > 0,
    'persona',
    'sin parámetros de búsqueda',
  );

  // Paso 1: traer todas las personas que coincidan
  const personas = await findAllPersonasQuery(wherePersona);
  checkers.throwErrorIfDataIsFalsy(personas?.length, 'personas', JSON.stringify(wherePersona));

  // Paso 2: extraer sus ids
  const personaIds = personas.map((p) => p.id);

  // Paso 3: traer todos los alumnos que tengan esos persona_id
  const include = [
    { association: 'persona' },
    { association: 'equivalencia' },
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
    {
      association: 'alumnoGrupos',
      include: [{
        association: 'grupo',
        include: [{ association: 'grado' }],
      }],
    },
  ];

  const alumnos = await findAllAlumnosQuery(
    { personaId: { [Op.in]: personaIds } },
    { include, strict: false },
  );

  checkers.throwErrorIfDataIsFalsy(alumnos?.length, 'alumnos', personaIds);

  return alumnos;
};

module.exports = findGroupAlumnosPersona;
