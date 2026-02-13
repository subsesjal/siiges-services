const { checkers } = require('@siiges-services/shared');

const formatDateDMY = (value) => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

const buildFileCertitulo = (
  findOneFolioDocumentoAlumnoQuery,
  findAllCalificacionesQuery,
  GenerarCertificado,
) => async (folioDocAlumnoId, tipoDocumento) => {
  const include = [
    {
      association: 'solicitudFolioAlumno',
    },
    {
      association: 'alumno',
      include: [
        { association: 'persona' },
        {
          association: 'programa',
          include: [
            {
              association: 'plantel',
              include: [
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
      ],
    },
  ];

  const folioDocAlumno = await findOneFolioDocumentoAlumnoQuery(
    { id: folioDocAlumnoId },
    { include, strict: false },
  );

  checkers.throwErrorIfDataIsFalsy(
    folioDocAlumno,
    'folioDocumentoAlumno',
    folioDocAlumnoId,
  );

  const includeCalificaciones = [
    { association: 'asignatura' },
    {
      association: 'grupo',
      include: [
        { association: 'cicloEscolar' },
        { association: 'grado' },
      ],
    },
  ];

  const calificaciones = await findAllCalificacionesQuery(
    { alumnoId: folioDocAlumno.alumno.id },
    { include: includeCalificaciones, strict: false },
  );

  checkers.throwErrorIfDataIsFalsy(
    calificaciones,
    'calificacion',
    folioDocAlumno.alumno.id,
  );

  const calificacionesPorGrado = {};

  calificaciones.forEach((c) => {
    const gradoId = c.grupo?.grado?.id || 'SIN_GRADO';
    const gradoNombre = c.grupo?.grado?.nombre || 'SIN GRADO';
    const gradoNumero = c.grupo?.grado?.numeroGrado || 0;
    const cicloNombre = c.grupo?.cicloEscolar?.nombre || 'SIN CICLO';

    if (!calificacionesPorGrado[gradoId]) {
      calificacionesPorGrado[gradoId] = {
        gradoId,
        gradoNombre,
        gradoNumero,
        asignaturas: [],
      };
    }

    calificacionesPorGrado[gradoId].asignaturas.push({
      asignaturaId: c.asignaturaId,
      nombre: c.asignatura?.nombre || '',
      periodo: cicloNombre,
      calificacion: c.calificacion,
      tipo: c.tipo,
      fechaExamen: c.fechaExamen,
    });
  });

  const gradosOrdenados = Object.values(calificacionesPorGrado).sort(
    (a, b) => a.gradoNumero - b.gradoNumero,
  );

  const calificacionesNumericas = calificaciones
    .map((c) => Number(c.calificacion))
    .filter((n) => !Number.isNaN(n) && n > 0);

  const promedioGeneral = calificacionesNumericas.length > 0
    ? (
      calificacionesNumericas.reduce((sum, n) => sum + n, 0)
      / calificacionesNumericas.length
    ).toFixed(1)
    : 'N/A';

  const certificado = {
    folioControl: folioDocAlumno.folioDocumento,
    nombreAlumno: folioDocAlumno.alumno.persona.nombre,
    paternoAlumno: folioDocAlumno.alumno.persona.apellidoPaterno,
    maternoAlumno: folioDocAlumno.alumno.persona.apellidoMaterno,
    curp: folioDocAlumno.alumno.persona.curp,
    matricula: folioDocAlumno.alumno.matricula,
    carrera: folioDocAlumno.alumno.programa.nombre,
    nombrePlantel: folioDocAlumno.alumno.programa.plantel.institucion.nombre,
    municipio: folioDocAlumno.alumno.programa.plantel.domicilio.municipio.nombre,
    fechaInicio: formatDateDMY(folioDocAlumno?.solicitudFolioAlumno?.fechaInicio),
    fechaTerminacion: formatDateDMY(folioDocAlumno?.solicitudFolioAlumno?.fechaTerminacion),
    fechaExamen: formatDateDMY(folioDocAlumno?.solicitudFolioAlumno?.fechaExamenProfesional
      || folioDocAlumno?.solicitudFolioAlumno?.fechaExencionExamenProfesional),
    fechaExpedicion: formatDateDMY(folioDocAlumno?.solicitudFolioAlumno?.fechaExpedicion),
    cct: folioDocAlumno.alumno.programa.plantel.claveCentroTrabajo,
    rvoe: folioDocAlumno.alumno.programa.acuerdoRvoe,
    totalAsignaturas: calificaciones.length,
    promedioGeneral,
    director:
      folioDocAlumno.alumno.programa.plantel.director
      || 'DIRECTOR DEL PLANTEL',
    grados: gradosOrdenados,
  };

  const file = await GenerarCertificado(certificado, tipoDocumento);

  return Buffer.from(file);
};

module.exports = { buildFileCertitulo };
