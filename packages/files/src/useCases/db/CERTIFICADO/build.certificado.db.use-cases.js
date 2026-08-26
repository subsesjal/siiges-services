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

const buildFileCertificado = (
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

  const asignaturasPrograma = await findAllAsignaturasQuery({ programaId: folioDocAlumno.alumno.programaId, tipo: 1 }, { include: [{ association: 'grado' }], strict: false });

  const procesarCalificacionCruda = (valor) => {
    if (typeof valor === 'string' && valor.includes('(')) {
      return valor.substring(0, 2).trim();
    }
    return valor;
  };

  const calificacionesTodasPorAsignaturaId = {};
  calificaciones.forEach((c) => {
    if (!calificacionesTodasPorAsignaturaId[c.asignaturaId]) {
      calificacionesTodasPorAsignaturaId[c.asignaturaId] = [];
    }
    calificacionesTodasPorAsignaturaId[c.asignaturaId].push(c);
  });

  Object.values(calificacionesTodasPorAsignaturaId).forEach((lista) => {
    lista.sort((a, b) => {
      const tipoA = a.tipo === 2 || a.tipo === '2' ? 2 : 1;
      const tipoB = b.tipo === 2 || b.tipo === '2' ? 2 : 1;
      return tipoA - tipoB;
    });
  });

  const calificacionVigentePorAsignaturaId = {};
  calificaciones.forEach((c) => {
    const existente = calificacionVigentePorAsignaturaId[c.asignaturaId];
    const esExtra = c.tipo === 2 || c.tipo === '2';
    const existenteEsExtra = existente && (existente.tipo === 2 || existente.tipo === '2');

    if (!existente || (esExtra && !existenteEsExtra)) {
      calificacionVigentePorAsignaturaId[c.asignaturaId] = c;
    }
  });

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

    const calificacionesDeEstaAsignatura = calificacionesTodasPorAsignaturaId[asignatura.id] || [];

    if (calificacionesDeEstaAsignatura.length === 0) {
      calificacionesPorGrado[gradoId].asignaturas.push({
        asignaturaId: asignatura.id,
        nombre: asignatura.nombre || '',
        clave: asignatura.clave || '',
        periodo: 'SIN CICLO',
        calificacion: null,
        tipo: undefined,
        sinCalificacion: true,
      });
    } else {
      calificacionesDeEstaAsignatura.forEach((c) => {
        calificacionesPorGrado[gradoId].asignaturas.push({
          asignaturaId: asignatura.id,
          nombre: asignatura.nombre || '',
          clave: asignatura.clave || '',
          periodo: c.grupo?.cicloEscolar?.nombre || 'SIN CICLO',
          calificacion: procesarCalificacionCruda(c.calificacion),
          tipo: c.tipo,
          sinCalificacion: false,
        });
      });
    }
  });

  const asignaturaIdsOptativas = new Set();

  calificaciones.forEach((c) => {
    const tipoCatalogo = c.asignatura?.tipo;
    const esOptativaDeCatalogo = tipoCatalogo === 2 || tipoCatalogo === '2';
    if (!esOptativaDeCatalogo) return;

    asignaturaIdsOptativas.add(c.asignaturaId);

    const gradoReal = c.grupo?.grado;
    const gradoId = gradoReal?.id || 'SIN_GRADO';
    const gradoNombre = gradoReal?.nombre || 'SIN GRADO';
    const gradoNumero = gradoReal?.numeroGrado || 0;

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
      clave: c.asignatura?.clave || '',
      periodo: c.grupo?.cicloEscolar?.nombre || 'SIN CICLO',
      calificacion: procesarCalificacionCruda(c.calificacion),
      tipo: c.tipo,
      sinCalificacion: false,
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

  const obtenerCalificacionesNumericasVigentes = (asignaturaIds) => asignaturaIds
    .map((asignaturaId) => {
      const vigente = calificacionVigentePorAsignaturaId[asignaturaId];
      if (!vigente) return null;

      const calProcesada = procesarCalificacionCruda(vigente.calificacion);
      const cal = typeof calProcesada === 'string' && calProcesada.includes('(')
        ? null
        : Number(calProcesada);
      return cal;
    })
    .filter((n) => n !== null && !Number.isNaN(n) && n > 0);

  const calificacionesNumericasObligatorias = obtenerCalificacionesNumericasVigentes(
    asignaturasPrograma.map((asignatura) => asignatura.id),
  );
  const calificacionesNumericasOptativas = obtenerCalificacionesNumericasVigentes(
    Array.from(asignaturaIdsOptativas),
  );
  const calificacionesNumericasTotales = [
    ...calificacionesNumericasObligatorias,
    ...calificacionesNumericasOptativas,
  ];

  let promedioGeneral = 'N/A';
  if (calificacionesNumericasTotales.length > 0) {
    const promedioNumerico = calificacionesNumericasTotales.reduce((sum, n) => sum + n, 0)
      / calificacionesNumericasTotales.length;
    const calificacionMaximaNum = Number(folioDocAlumno.alumno.programa?.calificacionMaxima);

    const esNotaPerfecta = !Number.isNaN(calificacionMaximaNum)
      && Math.abs(promedioNumerico - calificacionMaximaNum) < 0.005;

    if (esNotaPerfecta) {
      promedioGeneral = String(calificacionMaximaNum);
    } else {
      const promedioTruncado = Math.trunc(promedioNumerico * 100) / 100;
      promedioGeneral = promedioTruncado.toFixed(2);
    }
  }

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
    totalAsignaturas: asignaturasPrograma.length,
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
    sitioVerificacion: documentoFirmado
      ? `https://portalvalidacion.jalisco.gob.mx/#/resultado/${documentoFirmado.uriValidacionSicyt}`
      : null,
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

module.exports = { buildFileCertificado };
