const TITLE_PRIMER_SC = 'PRIMER SEMESTRE / CUATRIMESTRE';
const HEADER_SEMESTRE = [
  {
    content: 'No.', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'NOMBRE DEL DOCENTE', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'FORMACIÓN PROFESIONAL', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'DOCUMENTACIÓN PRESENTADA', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'ASIGNATURA PARA LA QUE SE PROPONE', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'EXPERIENCIA LABORAL', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'DOCENTE DE ASIGNATURA Ó TIEMPO COMPLETO', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'SE ACEPTA  SI / NO', colSpan: 2, styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
  {
    content: 'OBSERVACIONES', styles: { halign: 'center', valign: 'middle', fontSize: 7 },
  },
];

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
  'NOMBRE DE LA INSTITUCIÓN',
  'NIVEL EDUCATIVO Y NOMBRE DEL PLAN DE ESTUDIOS',
  'MODALIDAD',
  'DURACIÓN DEL PROGRAMA',
  'TIPO DE TRÁMITE',
  'DOMICILIO Y NÚMERO DE TELÉFONO',
];

module.exports = {
  TITLE_PRIMER_SC,
  HEADER_SEMESTRE,
  HEADER_MAIN_TITTLE,
  rowsDocente,
  columnStyles,
};
