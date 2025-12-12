const { checkers } = require('@siiges-services/shared');

const buildFileCertitulo = (
  findOneFolioDocumentoAlumnoQuery,
  findAllCalificacionesQuery,
  GenerarCertificado,
) => async (folioDocAlumnoId, tipoDocumento) => {
  const include = [
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

  checkers.throwErrorIfDataIsFalsy(folioDocAlumno, 'folioDocumentoAlumno', folioDocAlumnoId);

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

  checkers.throwErrorIfDataIsFalsy(calificaciones, 'calificacion', folioDocAlumno.alumno.id);

  const calificacionesAgrupadas = {};

  calificaciones.forEach((c) => {
    const cicloId = c.grupo?.cicloEscolarId || 'SIN_CICLO';
    const cicloNombre = c.grupo?.cicloEscolar?.nombre || 'SIN NOMBRE';

    if (!calificacionesAgrupadas[cicloId]) {
      calificacionesAgrupadas[cicloId] = {
        cicloId,
        cicloNombre,
        asignaturas: [],
      };
    }

    calificacionesAgrupadas[cicloId].asignaturas.push({
      asignaturaId: c.asignaturaId,
      nombre: c.asignatura?.nombre || '',
      calificacion: c.calificacion,
      tipo: c.tipo,
      fechaExamen: c.fechaExamen,
      grado: c.grupo?.grado?.nombre || '',
      ciclo: c.grupo?.cicloEscolar?.nombre || '',
    });
  });

  const ciclosOrdenados = Object.values(calificacionesAgrupadas).sort((a, b) => {
    if (a.cicloNombre < b.cicloNombre) return -1;
    if (a.cicloNombre > b.cicloNombre) return 1;
    return 0;
  });

  const calificacionesNumericas = calificaciones
    .map((c) => Number(c.calificacion))
    .filter((n) => !Number(n));

  const promedioGeneral = calificacionesNumericas.length > 0
    ? (calificacionesNumericas.reduce((sum, n) => sum
    + n, 0) / calificacionesNumericas.length).toFixed(1)
    : 'N/A';

  const certificado = {
    folioControl: folioDocAlumno.folioDocumento,
    nombreAlumno: `${folioDocAlumno.alumno.persona.nombre} ${folioDocAlumno.alumno.persona.apellidoPaterno} ${folioDocAlumno.alumno.persona.apellidoMaterno}`,
    curp: folioDocAlumno.alumno.persona.curp,
    matricula: folioDocAlumno.alumno.matricula,
    nombrePlantel: folioDocAlumno.alumno.programa.plantel.institucion.nombre,
    municipio: folioDocAlumno.alumno.programa.plantel.domicilio.municipio.nombre,
    cct: folioDocAlumno.alumno.programa.plantel.claveCentroTrabajo,
    rvoe: folioDocAlumno.alumno.programa.acuerdoRvoe,
    totalAsignaturas: calificaciones.length,
    promedioGeneral,
    director: folioDocAlumno.alumno.programa.plantel.director || 'DIRECTOR DEL PLANTEL',
    ciclos: ciclosOrdenados,
  };

  const jsonOriginal = calificaciones.map((c) => (c.toJSON ? c.toJSON() : c));
  console.log(JSON.stringify(jsonOriginal, null, 2));
  console.log(JSON.stringify(ciclosOrdenados, null, 2));
  console.log(JSON.stringify(certificado, null, 2));

  const file = await GenerarCertificado(certificado, tipoDocumento);
  return Buffer.from(file);
};

module.exports = { buildFileCertitulo };
