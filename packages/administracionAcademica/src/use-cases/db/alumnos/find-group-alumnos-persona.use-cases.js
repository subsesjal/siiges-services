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
      || cct,
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

  if (cct) {
    const planteles = await findPlantelQuery(
      { claveCentroTrabajo: { [Op.like]: `%${cct}%` } },
    );
    checkers.throwErrorIfDataIsFalsy(planteles?.length, 'planteles', cct);
    const plantelIds = planteles.map((p) => p.id);

    const whereProgramaCct = { plantelId: { [Op.in]: plantelIds } };
    if (acuerdoRvoe) whereProgramaCct.acuerdoRvoe = { [Op.like]: `%${acuerdoRvoe}%` };

    const programas = await findAllProgramasQuery(whereProgramaCct);
    checkers.throwErrorIfDataIsFalsy(programas?.length, 'programas', cct);
    const programaIds = programas.map((p) => p.id);
    whereAlumno.programaId = { [Op.in]: programaIds };
  } else if (acuerdoRvoe) {
    const programas = await findAllProgramasQuery(
      { acuerdoRvoe: { [Op.like]: `%${acuerdoRvoe}%` } },
    );
    checkers.throwErrorIfDataIsFalsy(programas?.length, 'programas', acuerdoRvoe);
    const programaIds = programas.map((p) => p.id);
    whereAlumno.programaId = { [Op.in]: programaIds };
  }

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
