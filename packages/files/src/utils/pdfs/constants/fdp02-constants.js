const HEADER_NOMBRE_DATOS = ['', ''];
const HEADER_METODOS_INDUCCION = ['2. MÉTODOS DE INDUCCIÓN'];
const HEADER_SELECCION_ESTD = ['4. PROCESO DE SELECCIÓN DE ESTUDIANTES'];
const HEADER_MAPA_CURRICULAR = ['6. MAPA CURRICULAR'];
const HEADER_FLEX_CURRICULAR = ['7. FLEXIBILIDAD CURRICULAR'];
const HEADER_OBJ_GEN_PLAN = ['8. OBJETIVO GENERAL DEL PLAN DE ESTUDIOS'];
const HEADER_OBJ_PT_CMP_PLAN = ['9. OBJETIVOS PARTICULARES Y/ O COMPETENCIAS DEL PLAN DE ESTUDIOS'];
const HEADER_ESTRUCTURA_PLAN = ['10. ESTRUCTURA DEL PLAN DE ESTUDIOS'];
const HEADER_ACTUALIZACION_PLAN = ['13. ACTUALIZACIÓN DEL PLAN DE ESTUDIOS'];
const HEADER_PROYECTO_SEG = ['14. PROYECTO DE SEGUIMIENTO A EGRESADOS'];
const HEADER_VINCULACION = ['15. VINCULACIÓN CON COLEGIOS DE PROFESIONISTAS, ACADEMIAS, ASOCIACIONES PROFESIONALES, ETC.'];

const columnStyles = {
  0: {
    fillColor: [0, 0, 0],
  },
  1: {
    fontStyle: 'bold',
    font: 'Nutmegb',
  },
  2: {
    rowSpan: 2,
  },
};

const HEADER_MAIN_TITTLE = [
  'MODALIDAD',
  'DURACIÓN DEL CICLO',
  'DURACIÓN DEL PLAN DE ESTUDIOS',
  'CLAVE DEL PLAN DE ESTUDIOS',
];

const HEADER_APARTADO = ['APARTADO', 'DESCRIPCIÓN'];
const bodyApartado = [
  ['ÁREA', 'Indica la forma en que se organizan las asignaturas (por áreas).'],
  ['Formación General', 'Apoyarán al estudiante durante su trayectoria educativa, ejemplo; inglés, comunicación, estrategias de aprendizaje, etc.'],
  ['Formación Básica', 'Aquellas que recogen los aspectos básicos de la rama de conocimiento.'],
  ['Formación Disciplinar', 'Se orientan a obtener saberes que determinan con certeza a la profesión. Se adquirirán habilidades para la formulación y solución de problemas.'],
  ['Formación Especializante', 'Aquellas asignaturas que especializan al alumno en alguna rama del conocimiento de su futura profesión.'],
  ['Formación Técnica (son seriadas)', 'Asignaturas que son prácticas, en las cuales se desarrollan habilidades o destrezas de la carrera profesional.'],
  ['Formación Electiva', 'Está encaminada hacia otros saberes y experiencias de aprendizajes, distintos y complementarios a los de su disciplina y futura profesión.'],
  ['ASIGNATURA O UNIDAD DE APRENDIZAJE', 'Especificar el nombre con el que se identifica a cada una de las asignaturas. Elegir de acuerdo a la disciplina o campo de estudio y evitar el uso de abreviaturas o terminología extranjera.'],
  ['CLAVE DE ASIGNATURA O UNIDAD DE APRENDIZAJE', 'Identificar de manera numérico o alfanumérica cada una de las asignaturas. Ej. si es una Lic. en Ingeniería en Sistemas se redactaría de la siguiente manera LSI01, "L" indica el nivel educativo, la "I" indica Ingeniería y "S" indica Sistemas. El 01 indica la primera asignatura, enumerarse en lo sucesivo.'],
  ['SERIACIÓN', 'Enunciar la clave de la asignatura que previamente debió cursarse y que determina la secuencia temática con la actual. Para organización curricular por módulos este apartado es obligatorio.'],
  ['HORAS BAJO CONDUCCIÓN DOCENTE', 'Establecer el número de horas-clase que se dedicarán por ciclo a la asignatura. Considerar horas completas.'],
  ['HORAS INDEPENDIENTES', 'Proponer el número de horas que dedica el estudiante por ciclo para su estudio independiente.'],
  ['CRÉDITOS', 'Indicar el número de créditos establecidos para cada asignatura. Considerar 0.0625 por cada hora destinada al desarrollo de las actividades bajo conducción o de aprendizaje independientes por ciclo. Los créditos no pueden redondearse y son de carácter obligatorio.'],
  ['TIPO DE INSTALACIONES', 'Especificar el tipo de instalación (incluyendo especiales) que emplea para el desarrollo de las actividades de aprendizaje bajo la conducción de un académico. Vincular con el modelo educativo. Para el llenado de las instalaciones se abreviará de la siguiente manera: A= Aula AV= Ambiente Virtual. B= Biblioteca. C= Consultorios. L= Laboratorios. AM=Aula de usos Múltiples, CC=Centro de computo.'],
  ['SUMA TOTAL', 'Presentar los resultados obtenidos de la sumatoria de horas bajo conducción de un académico y de independientes y créditos, correspondientes al número de asignaturas que deberán cursarse para acreditar el plan de estudios.'],
];

const HEADER_DOCENTE = [
  {
    content: 'ÁREA',
    rowSpan: 2,
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'ASIGNATURA\n O\n UNIDAD DE APRENDIZAJE',
    rowSpan: 2,
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'CLAVE',
    rowSpan: 2,
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'SERIACIÓN',
    rowSpan: 2,
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'HORAS',
    colSpan: 2,
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'CRÉDITOS',
    rowSpan: 2,
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'INSTALACIONES',
    rowSpan: 2,
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
];

const HEADER_TOTAL = [
  {
    content: 'TOTAL CON DOCENTE: ',
    styles: {
      halign: 'left', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'TOTAL INDEP: ',
    styles: {
      halign: 'left', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'TOTAL CRÉDITOS: ',
    styles: {
      halign: 'left', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
];

const HEADER_AREA = [
  {
    content: 'ÁREA',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'ASIGNATURA\n O\n UNIDAD DE APRENDIZAJE',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'CLAVE',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'SERIACIÓN',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'HORAS',
    cellWidth: 'auto',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'CRÉDITOS',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
  {
    content: 'INSTALACIONES',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  }];

const HEADER_FORM = {
  content: 'FORMACIÓN ELECTIVA',
  styles: {
    halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
  },
};

const HEADER_HORAS_1 = [
  {
    content: 'NÚMERO MÍNIMO DE HORAS QUE SE DEBERÁN ACREDITAR EN LAS ASIGNATURAS DE FORMACIÓN ELECTIVA, BAJO LA CONDUCCIÓN DE UN DOCENTE',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, fillColor: [255, 255, 255], font: 'Nutmegb',
    },
  },
  {
    content: '                                                                ',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
    },
  },
];
const HEADER_HORAS_2 = {
  content: 'NÚMERO MÍNIMO DE CRÉDITOS QUE SE DEBERÁN ACREDITAR EN LAS ASIGNATURAS DE FORMACIÓN ELECTIVA',
  styles: {
    halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fontStyle: 'bold', font: 'Nutmegb',
  },
};

const HEADER_HORAS_4 = {
  content: 'TOTAL DE HORAS DE TRABAJO DE MANERA INDEPENDIENTE DURANTE TODA LA CARRERA',
  styles: {
    halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fontStyle: 'bold', fillColor: [255, 255, 255], font: 'Nutmegb',
  },
};

const SEMESTER_NAMES = {
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

const CYCLE_NAMES = {
  1: 'SEMESTRE',
  2: 'CUATRIMESTRAL',
  3: 'SEMESTRAL CURRICULUM FLEXIBLE',
  4: 'CUATRIMESTRAL CURRICULUM FLEXIBLE',
};

const AREA_NAMES = {
  1: 'Formación General',
  2: 'Formación Básica',
  3: 'Formación Disciplinar',
  4: 'Formación Electiva',
  5: 'Formación Técnica',
  6: 'Formación Especializante',
};

function getAreaName(areaId) {
  return AREA_NAMES[areaId] || '';
}

function getSemesterTitle(gradoId, cicloId) {
  const semesterName = SEMESTER_NAMES[gradoId] || '';
  const cycleName = CYCLE_NAMES[cicloId] || '';
  return `${semesterName} ${cycleName}`;
}

function sortAsignaturas(asignaturas) {
  return asignaturas.sort((a, b) => {
    if (a.consecutivo == null && b.consecutivo == null) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (a.consecutivo == null) return 1;
    if (b.consecutivo == null) return -1;
    return a.consecutivo - b.consecutivo;
  });
}

module.exports = {
  HEADER_NOMBRE_DATOS,
  HEADER_MAIN_TITTLE,
  columnStyles,
  HEADER_METODOS_INDUCCION,
  HEADER_SELECCION_ESTD,
  HEADER_MAPA_CURRICULAR,
  HEADER_FLEX_CURRICULAR,
  HEADER_OBJ_GEN_PLAN,
  HEADER_OBJ_PT_CMP_PLAN,
  HEADER_ESTRUCTURA_PLAN,
  HEADER_APARTADO,
  bodyApartado,
  HEADER_ACTUALIZACION_PLAN,
  HEADER_PROYECTO_SEG,
  HEADER_VINCULACION,
  HEADER_DOCENTE,
  HEADER_TOTAL,
  HEADER_AREA,
  HEADER_FORM,
  HEADER_HORAS_1,
  HEADER_HORAS_2,
  HEADER_HORAS_4,
  getAreaName,
  getSemesterTitle,
  sortAsignaturas,
};
