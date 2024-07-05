const HEADER_NOMBRE_DATOS = ['Nombre', 'datos'];
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
    fillColor: [172, 178, 183],
  },
  1: {
    fontStyle: 'bold',
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

const HEADER_PRIM_SEM = '1ER SEMESTRE / CUATRIMESTRE';
const HEADER_SEG_SEM = '2DO SEMESTRE / CUATRIMESTRE';
const HEADER_TERC_SEM = '3ER SEMESTRE / CUATRIMESTRE';
const HEADER_CUAR_SEM = '4TO SEMESTRE / CUATRIMESTRE';
const HEADER_DOCENTE = [
  {
    content: 'ÁREA', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'ASIGNATURA\n O\n UNIDAD DE APRENDIZAJE', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'CLAVE', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'SERIACIÓN', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'HORAS', colSpan: 2, styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'CRÉDITOS', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'INSTALACIONES', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
];

const HEADER_TOTAL = [
  { content: 'TOTAL CON DOCENTE: ', rowSpan: 2, styles: { halign: 'left', valign: 'middle', fontSize: 7 } },
  { content: 'TOTAL INDEPENDIENTE: ', rowSpan: 2, styles: { halign: 'left', valign: 'middle', fontSize: 7 } },
  { content: 'TOTAL DE CRÉDITOS: ', rowSpan: 2, styles: { halign: 'left', valign: 'middle', fontSize: 7 } },
];

const HEADER_AREA = [
  {
    content: 'ÁREA', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'ASIGNATURA\n O\n UNIDAD DE APRENDIZAJE', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'CLAVE', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'SERIACIÓN', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'HORAS', cellWidth: 'auto', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'CRÉDITOS', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'INSTALACIONES', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  }];

const HEADER_FORM = {
  content: 'FORMACIÓN ELECTIVA',
  styles:
  {
    halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fontStyle: 'bold', fillColor: [172, 178, 183],
  },
};

const HEADER_HORAS_1 = [
  {
    content: 'NÚMERO MÍNIMO DE HORAS QUE SE DEBERÁN ACREDITAR EN LAS ASIGNATURAS DE FORMACIÓN ELECTIVA, BAJO LA CONDUCCIÓN DE UN DOCENTE',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, fillColor: [255, 255, 255],
    },
  },
  { content: '                                                                ', styles: { halign: 'center', valign: 'middle', fontSize: 7 } },
];
const HEADER_HORAS_2 = {
  content: 'NÚMERO MÍNIMO DE CRÉDITOS QUE SE DEBERÁN ACREDITAR EN LAS ASIGNATURAS DE FORMACIÓN ELECTIVA',
  styles: {
    halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fontStyle: 'bold',
  },
};
const HEADER_HORAS_3 = [
  {
    content: 'TOTAL DE HORAS DE TRABAJO BAJO LA CONDUCCIÓN DE UN DOCENTE DURANTE TODA LA CARRERA',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, fillColor: [255, 255, 255],
    },
  },
  { content: '                                                                ', styles: { halign: 'center', valign: 'middle', fontSize: 7 } },
];
const HEADER_HORAS_4 = {
  content: 'TOTAL DE HORAS DE TRABAJO DE MANERA INDEPENDIENTE DURANTE TODA LA CARRERA',
  styles: {
    halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fontStyle: 'bold', fillColor: [255, 255, 255],
  },
};
const HEADER_HORAS_5 = [{
  content: '                                                         TOTAL DE CRÉDITOS DE LA CARRERA                                                         ',
  styles: {
    halign: 'center', valign: 'middle', fontSize: 7, fillColor: [255, 255, 255],
  },
},
{ content: '                                                                ', styles: { halign: 'center', valign: 'middle', fontSize: 7 } },
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
  HEADER_PRIM_SEM,
  HEADER_SEG_SEM,
  HEADER_TERC_SEM,
  HEADER_CUAR_SEM,
  HEADER_DOCENTE,
  HEADER_TOTAL,
  HEADER_AREA,
  HEADER_FORM,
  HEADER_HORAS_1,
  HEADER_HORAS_2,
  HEADER_HORAS_3,
  HEADER_HORAS_4,
  HEADER_HORAS_5,
  cicloTxt,
  gradoTxt,
};
