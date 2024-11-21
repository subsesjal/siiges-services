const HEADER_SEMESTRE = [
  {
    content: 'No.',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmeg',
    },
  },
  {
    content: 'NOMBRE DEL DOCENTE',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmeg',
    },
  },
  {
    content: 'FORMACIÓN PROFESIONAL',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmeg',
    },
  },
  {
    content: 'ASIGNATURA PARA LA QUE SE PROPONE',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmeg',
    },
  },
  {
    content: 'EXPERIENCIA LABORAL',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmeg',
    },
  },
  {
    content: 'DOCENTE DE ASIGNATURA Ó TIEMPO COMPLETO',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmeg',
    },
  },
  {
    content: 'SE ACEPTA',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 6, font: 'Nutmeg',
    },
  },
  {
    content: 'OBSERVACIONES',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmeg',
    },
  },
];

const cicloTxt = {
  1: 'SEMESTRE',
  2: 'CUATRIMESTRE',
  3: 'SEMESTRE CURRICULUM FLEXIBLE',
  4: 'CUATRIMESTRE CURRICULUM FLEXIBLE',
};

const gradoTxt = {
  1: 'PRIMER',
  2: 'SEGUNDO',
  3: 'TERCERO',
  4: 'CUARTO',
  5: 'QUINTO',
  6: 'SEXTO',
  7: 'SÉPTIMO',
  8: 'OCTAVO',
  9: 'NOVENO',
  10: 'DÉCIMO',
  11: 'UNDÉCIMO',
  12: 'DUODÉCIMO',
};

const obtenerGradosUnicos = (asignaturas) => {
  const grados = asignaturas.map((asignatura) => asignatura.gradoId);
  return [...new Set(grados)].sort((a, b) => a - b); // Ordenar grados en orden ascendente
};

const docenteBody = (docentes) => docentes.map((docente, index) => [
  (index + 1).toString(),
  `${docente.persona.apellidoPaterno} ${docente.persona.apellidoMaterno} ${docente.persona.nombre}`,
  docente.formacionesDocentes[0]?.formacion.nombre || '',
  docente.asignaturasDocentes[0]?.asignatura.nombre || '',
  docente.experiencias,
  docente.tipoDocente === 1 ? 'DOCENTE DE ASIGNATURA' : 'TIEMPO COMPLETO',
  docente.esAceptado ? 'ACEPTADO' : 'PENDIENTE',
  docente.observaciones,
]);

const tablaGrado = (
  solicitud,
  doc,
  currentPositionY,
  generateTableAndSection,
) => {
  const grados = obtenerGradosUnicos(solicitud.programa.asignaturas);
  grados.forEach((grado, index) => {
    const docentesEnGrado = solicitud.programa.docentes.filter(
      (docente) => docente.asignaturasDocentes.some(
        (asignaturaDocente) => asignaturaDocente.asignatura.gradoId === grado,
      ),
    );

    const cicloText = cicloTxt[solicitud.programa.cicloId] || '';
    const gradoText = gradoTxt[grado] || '';

    const tabla = {
      headers: HEADER_SEMESTRE,
      body: docenteBody(docentesEnGrado),
    };

    const tituloGrado = `${gradoText} ${cicloText}`;

    if (index !== 0) {
      doc.addPage();
      // eslint-disable-next-line no-param-reassign
      currentPositionY = 45;
    }

    // eslint-disable-next-line no-param-reassign
    currentPositionY += generateTableAndSection(tituloGrado, tabla, doc, currentPositionY);
    // Añadir separación entre tablas
    if (index < grados.length - 1) {
      // eslint-disable-next-line no-param-reassign
      currentPositionY += 5;
    }
  });

  return currentPositionY;
};

const columnStyles = {
  0: {
    fillColor: [172, 178, 183],
  },
  1: {
    fontStyle: 'bold',
    font: 'Nutmeg',
  },
};

const HEADER_MAIN_TITTLE = [
  'NOMBRE DE LA INSTITUCIÓN',
  'NIVEL EDUCATIVO Y NOMBRE DEL PLAN DE ESTUDIOS',
  'MODALIDAD',
  'DURACIÓN DEL PROGRAMA',
  'TIPO DE TRÁMITE',
  'DOMICILIO Y NÚMERO DE TELÉFONO',
];

module.exports = {
  HEADER_SEMESTRE,
  HEADER_MAIN_TITTLE,
  columnStyles,
  docenteBody,
  tablaGrado,
};
