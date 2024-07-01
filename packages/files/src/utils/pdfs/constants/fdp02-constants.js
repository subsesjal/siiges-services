const HEADER_NOMBRE_DATOS = ['Nombre', 'datos'];
const HEADER_INGRESO_EGRESO = [
  ['CONOCIMIENTOS', '                                                             '],
  ['HABILIDADES', '                                                             '],
  ['ACTITUDES', '                                                             '],
];

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
// const titulo_

const rowsDocente = (docente) => [
  [
    `${docente.apellidoPaterno} ${docente.apellidoMaterno} ${docente.nombre}`,
    // persona.formacionesDocentes.descripcion,
  ],
];

const columnStyles = {
  0: {
    fillColor: [172, 178, 183],
  },
  1: {
    fontStyle: 'bold',
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
const HEADER_SEGUNDO_SEM = ['2DO SEMESTRE / CUATRIMESTRE'];
const HEADER_TERCER_SEM = ['3ER SEMESTRE / CUATRIMESTRE'];
const HEADER_CUARTO_SEM = ['4TO SEMESTRE / CUATRIMESTRE'];
const HEADER_DOCENTE = [
  {
    content: 'ÁREA', rowsSpan: 2, styles: { halign: 'center' },
  },
  {
    content: 'ASIGNATURA O UNIDAD DE APRENDIZAJE', rowsSpan: 2, styles: { halign: 'center' },
  },
  {
    content: 'CLAVE', rowsSpan: 2, styles: { halign: 'center' },
  },
  {
    content: 'SERIACIÓN', rowsSpan: 2, styles: { halign: 'center' },
  },
  {
    content: 'HORAS', colSpan: 2, styles: { halign: 'center' },
  },
  {
    content: 'CRÉDITOS', rowSpan: 2, styles: { halign: 'center' },
  },
  {
    content: 'INSTALACIONES', rowSpan: 2, styles: { halign: 'center' },
  },
];

module.exports = {
  HEADER_NOMBRE_DATOS,
  HEADER_INGRESO_EGRESO,
  HEADER_MAIN_TITTLE,
  rowsDocente,
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
  HEADER_SEGUNDO_SEM,
  HEADER_TERCER_SEM,
  HEADER_CUARTO_SEM,
  HEADER_DOCENTE,
};
