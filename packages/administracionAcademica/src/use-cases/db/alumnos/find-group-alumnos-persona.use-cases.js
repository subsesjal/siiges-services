const { checkers } = require('@siiges-services/shared');
const { Op } = require('sequelize');

const findGroupAlumnosPersona = (findAllPersonasQuery, findAllAlumnosQuery) => async ({
  curp,
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  matricula,
}) => {
  const wherePersona = {};
  const whereAlumno = {};

  if (curp) wherePersona.curp = curp;
  if (nombre) wherePersona.nombre = { [Op.like]: `%${nombre}%` };
  if (apellidoPaterno) wherePersona.apellidoPaterno = { [Op.like]: `%${apellidoPaterno}%` };
  if (apellidoMaterno) wherePersona.apellidoMaterno = { [Op.like]: `%${apellidoMaterno}%` };
  if (matricula) whereAlumno.matricula = { [Op.like]: `%${matricula}%` };

  checkers.throwErrorIfDataIsFalsy(
    Object.keys(wherePersona).length > 0 || Object.keys(whereAlumno).length > 0,
    'persona',
    'sin parámetros de búsqueda',
  );

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

  // Si hay filtros de persona, primero buscar los persona_ids
  if (Object.keys(wherePersona).length > 0) {
    const personas = await findAllPersonasQuery(wherePersona);
    checkers.throwErrorIfDataIsFalsy(personas?.length, 'personas', JSON.stringify(wherePersona));

    const personaIds = personas.map((p) => p.id);
    whereAlumno.personaId = { [Op.in]: personaIds };
  }

  const alumnos = await findAllAlumnosQuery(whereAlumno, { include, strict: false });
  checkers.throwErrorIfDataIsFalsy(alumnos?.length, 'alumnos', JSON.stringify(whereAlumno));

  return alumnos;
};

module.exports = findGroupAlumnosPersona;
