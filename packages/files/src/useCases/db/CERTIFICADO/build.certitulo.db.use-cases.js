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
  findAllAsignaturasQuery,
  findOneDocumentoFirmadoQuery,
  updateDocumentoFirmadoQuery,
  GenerarCertificado,
) => async (folioDocAlumnoId, tipoDocumento) => {
  const include = [
    {
      association: 'solicitudFolioAlumno',
      include: [
        {
          association: 'solicitudFolio',
          include: [{ association: 'tipoSolicitudFolio' }],
        },
      ],
    },
    { association: 'libro' },
    { association: 'foja' },
    {
      association: 'alumno',
      include: [
        { association: 'persona' },
        {
          association: 'alumnoGrupos',
          include: [{ association: 'grupo' }],
        },
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
            { association: 'nivel' },
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

  let documentoFirmado = null;
  if (folioDocAlumno.folioDocumento) {
    documentoFirmado = await findOneDocumentoFirmadoQuery({
      folioInterno: folioDocAlumno.folioDocumento,
    });
  }

  let fechaExpedicionFinal;

  if (documentoFirmado?.fechaExpedicion) {
    fechaExpedicionFinal = documentoFirmado.fechaExpedicion;
  } else if (documentoFirmado) {
    fechaExpedicionFinal = new Date();
    await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      { fechaExpedicion: fechaExpedicionFinal },
    );
  } else {
    fechaExpedicionFinal = new Date();
  }

  const includeCalificaciones = [
    { association: 'asignatura' },
    {
      association: 'grupo',
      include: [{ association: 'cicloEscolar' }],
    },
  ];

  const calificaciones = await findAllCalificacionesQuery(
    { alumnoId: folioDocAlumno.alumno.id },
    { include: includeCalificaciones, strict: false },
  );

  const asignaturasPrograma = await findAllAsignaturasQuery({ programaId: folioDocAlumno.alumno.programaId, tipo: 1 }, { include: [{ association: 'grado' }], strict: false });

  const calificacionesPorAsignaturaId = {};
  calificaciones.forEach((c) => {
    calificacionesPorAsignaturaId[c.asignaturaId] = c;
  });

  const procesarCalificacionCruda = (valor) => {
    if (typeof valor === 'string' && valor.includes('(')) {
      return valor.substring(0, 2).trim();
    }
    return valor;
  };

  const calificacionesPorGrado = {};

  asignaturasPrograma.forEach((asignatura) => {
    const gradoId = asignatura.grado?.id || asignatura.gradoId || 'SIN_GRADO';
    const gradoNombre = asignatura.grado?.nombre || 'SIN GRADO';
    const gradoNumero = asignatura.grado?.numeroGrado || 0;

    if (!calificacionesPorGrado[gradoId]) {
      calificacionesPorGrado[gradoId] = {
        gradoId,
        gradoNombre,
        gradoNumero,
        asignaturas: [],
      };
    }

    const calificacionAlumno = calificacionesPorAsignaturaId[asignatura.id];

    calificacionesPorGrado[gradoId].asignaturas.push({
      asignaturaId: asignatura.id,
      nombre: asignatura.nombre || '',
      clave: asignatura.clave || '',
      periodo: calificacionAlumno?.grupo?.cicloEscolar?.nombre || 'SIN CICLO',
      calificacion: calificacionAlumno
        ? procesarCalificacionCruda(calificacionAlumno.calificacion) : null,
      tipo: calificacionAlumno?.tipo,
      sinCalificacion: !calificacionAlumno,
    });
  });

  Object.values(calificacionesPorGrado).forEach((grado) => {
    grado.asignaturas.sort((a, b) => {
      const nombreCompare = (a.nombre || '').localeCompare(b.nombre || '');
      if (nombreCompare !== 0) return nombreCompare;

      const tipoA = a.tipo === 2 || a.tipo === '2' ? 2 : 1;
      const tipoB = b.tipo === 2 || b.tipo === '2' ? 2 : 1;
      return tipoA - tipoB;
    });
  });

  const gradosOrdenados = Object.values(calificacionesPorGrado)
    .sort((a, b) => a.gradoNumero - b.gradoNumero);

  const asignaturasOptativas = calificaciones
    .filter((c) => {
      const tipoCatalogo = c.asignatura?.tipo;
      return tipoCatalogo === 2 || tipoCatalogo === '2';
    })
    .map((c) => ({
      asignaturaId: c.asignaturaId,
      nombre: c.asignatura?.nombre || '',
      clave: c.asignatura?.clave || '',
      periodo: c.grupo?.cicloEscolar?.nombre || 'SIN CICLO',
      calificacion: procesarCalificacionCruda(c.calificacion),
      tipo: c.tipo,
      mostrarSoloAprobado: true,
    }));

  if (asignaturasOptativas.length > 0) {
    gradosOrdenados.push({
      gradoId: 'OPTATIVA',
      gradoNombre: 'OPTATIVAS ASIGNADAS',
      gradoNumero: gradosOrdenados.length > 0
        ? Math.max(...gradosOrdenados.map((g) => g.gradoNumero)) + 1 : 1,
      asignaturas: asignaturasOptativas,
    });
  }

  const calificacionesNumericas = calificaciones
    .map((c) => {
      const cal = typeof c.calificacion === 'string' && c.calificacion.includes('(') ? null : Number(c.calificacion);
      return cal;
    })
    .filter((n) => n !== null && !Number.isNaN(n) && n > 0);

  const promedioGeneral = calificacionesNumericas.length > 0 ? (calificacionesNumericas.reduce((sum, n) => sum + n, 0) / calificacionesNumericas.length).toFixed(1) : 'N/A';

  const grupos = folioDocAlumno.alumno.alumnoGrupos?.map((ag) => ag.grupo).filter(Boolean) || [];

  const fechaInicioRaw = grupos
    .map((g) => g.generacionFechaInicio)
    .filter(Boolean)
    .sort((a, b) => new Date(a) - new Date(b))[0] || null;

  const fechaTerminacionRaw = grupos
    .map((g) => g.generacionFechaFin)
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a))[0] || null;

  const certificado = {
    folioControl: folioDocAlumno.folioDocumento,
    nombreAlumno: folioDocAlumno.alumno.persona.nombre,
    paternoAlumno: folioDocAlumno.alumno.persona.apellidoPaterno,
    maternoAlumno: folioDocAlumno.alumno.persona.apellidoMaterno,
    curp: folioDocAlumno.alumno.persona.curp,
    matricula: folioDocAlumno.alumno.matricula,
    carrera: folioDocAlumno.alumno.programa.nombre,
    nivelId: folioDocAlumno.alumno.programa.nivelId,
    nombreNivel: folioDocAlumno.alumno.programa.nivel?.descripcion,
    calificacionDecimal: folioDocAlumno.alumno.programa?.calificacionDecimal,
    nombrePlantel: folioDocAlumno.alumno.programa.plantel.institucion.nombre,
    municipio: folioDocAlumno.alumno.programa.plantel.domicilio.municipio.nombre,
    fechaInicio: formatDateDMY(fechaInicioRaw),
    fechaTerminacion: formatDateDMY(fechaTerminacionRaw),
    fechaExamen: formatDateDMY(folioDocAlumno?.solicitudFolioAlumno?.fechaExamenProfesional
      || folioDocAlumno?.solicitudFolioAlumno?.fechaExencionExamenProfesional),
    fechaExpedicion: formatDateDMY(fechaExpedicionFinal),
    cct: folioDocAlumno.alumno.programa.plantel.claveCentroTrabajo,
    rvoe: folioDocAlumno.alumno.programa.acuerdoRvoe,
    fechaRvoe: formatDateDMY(folioDocAlumno.alumno.programa.fechaSurteEfecto),
    totalAsignaturas: calificaciones.length,
    promedioGeneral,
    director:
      folioDocAlumno.alumno.programa.plantel.director
      || 'DIRECTOR DEL PLANTEL',
    grados: gradosOrdenados,
    tipoCertificado: folioDocAlumno?.solicitudFolioAlumno
      ?.solicitudFolio?.tipoSolicitudFolio?.descripcion,
    libro: folioDocAlumno.libro?.nombre,
    foja: folioDocAlumno.foja?.nombre,
    creditosPrograma: folioDocAlumno.alumno.programa?.creditos,
    calificacionMinima: folioDocAlumno.alumno.programa?.calificacionMinima,
    calificacionMaxima: folioDocAlumno.alumno.programa?.calificacionMaxima,
    calificacionAprobatoria: folioDocAlumno.alumno.programa?.calificacionAprobatoria,
    claveInstitucionDGP: folioDocAlumno?.solicitudFolioAlumno?.solicitudFolio?.claveInstitucionDGP,
    claveCarreraDGP: folioDocAlumno?.solicitudFolioAlumno?.solicitudFolio?.claveCarreraDGP,
    identificadorDocumento: documentoFirmado?.identificadorDocumentoSicyt,
    sitioVerificacion: `https://portalvalidacion.jalisco.gob.mx/#/resultado/${documentoFirmado?.uriValidacionSicyt}`,
    nombreFirmanteIes: documentoFirmado?.nombreFirmanteIes,
    cargoFirmanteIes: documentoFirmado?.cargoFirmanteIes,
    secuenciaDocumentoIes: documentoFirmado?.secuenciaDocumentoIes,
    fechaFirmadoIes: formatDateDMY(documentoFirmado?.fechaFirmadoIes),
    firmaElectronicaIes: documentoFirmado?.firmaDigitalIes,
    nombreFirmanteSicyt: documentoFirmado?.nombreFirmanteSicyt,
    cargoFirmanteSicyt: documentoFirmado?.cargoFirmanteSicyt,
    secuenciaDocumentoSicyt: documentoFirmado?.secuenciaDocumentoSicyt,
    fechaFirmadoSicyt: formatDateDMY(documentoFirmado?.fechaFirmadoSicyt),
    firmaElectronicaSicyt: documentoFirmado?.firmaDigitalSicyt,
  };

  const file = await GenerarCertificado(certificado, tipoDocumento);

  return Buffer.from(file);
};

module.exports = { buildFileCertitulo };
