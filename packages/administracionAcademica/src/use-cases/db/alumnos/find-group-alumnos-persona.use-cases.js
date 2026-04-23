const { checkers } = require('@siiges-services/shared');
const { Op } = require('sequelize');

const findGroupAlumnosPersona = (
  findAllPersonasQuery,
  findAllAlumnosQuery,
  findAllProgramasQuery,
  findPlantelQuery,
) => async ({
  curp,
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  matricula,
  acuerdoRvoe,
  cct,
  institucionId,
}) => {
  const wherePersona = {};
  const whereAlumno = {};

  if (curp) wherePersona.curp = curp;
  if (nombre) wherePersona.nombre = { [Op.like]: `%${nombre}%` };
  if (apellidoPaterno) wherePersona.apellidoPaterno = { [Op.like]: `%${apellidoPaterno}%` };
  if (apellidoMaterno) wherePersona.apellidoMaterno = { [Op.like]: `%${apellidoMaterno}%` };
  if (matricula) whereAlumno.matricula = { [Op.like]: `%${matricula}%` };

  checkers.throwErrorIfDataIsFalsy(
    Object.keys(wherePersona).length > 0
      || Object.keys(whereAlumno).length > 0
      || acuerdoRvoe
      || cct
      || institucionId,
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

  if (cct || institucionId) {
    const wherePlantel = {};
    if (cct) wherePlantel.claveCentroTrabajo = { [Op.like]: `%${cct}%` };
    if (institucionId) wherePlantel.institucionId = institucionId;

    const planteles = await findPlantelQuery(wherePlantel);
    checkers.throwErrorIfDataIsFalsy(planteles?.length, 'planteles', JSON.stringify(wherePlantel));
    const plantelIds = planteles.map((p) => p.id);

    const whereProgramas = { plantelId: { [Op.in]: plantelIds } };
    if (acuerdoRvoe) whereProgramas.acuerdoRvoe = { [Op.like]: `%${acuerdoRvoe}%` };

    const programas = await findAllProgramasQuery(whereProgramas);
    checkers.throwErrorIfDataIsFalsy(programas?.length, 'programas', JSON.stringify(whereProgramas));
    whereAlumno.programaId = { [Op.in]: programas.map((p) => p.id) };
  } else if (acuerdoRvoe) {
    const programas = await findAllProgramasQuery(
      { acuerdoRvoe: { [Op.like]: `%${acuerdoRvoe}%` } },
    );
    checkers.throwErrorIfDataIsFalsy(programas?.length, 'programas', acuerdoRvoe);
    whereAlumno.programaId = { [Op.in]: programas.map((p) => p.id) };
  }

  if (Object.keys(wherePersona).length > 0) {
    const personas = await findAllPersonasQuery(wherePersona);
    checkers.throwErrorIfDataIsFalsy(personas?.length, 'personas', JSON.stringify(wherePersona));
    whereAlumno.personaId = { [Op.in]: personas.map((p) => p.id) };
  }

  const alumnos = await findAllAlumnosQuery(whereAlumno, { include, strict: false });
  checkers.throwErrorIfDataIsFalsy(alumnos?.length, 'alumnos', JSON.stringify(whereAlumno));

  return alumnos;
};

module.exports = findGroupAlumnosPersona;
