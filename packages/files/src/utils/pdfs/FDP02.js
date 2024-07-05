/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  modalidades, niveles, ciclos,
} = require('./constants');
const {
  HEADER_NOMBRE_DATOS,
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
  // HEADER_PRIM_SEM,
  HEADER_DOCENTE,
  HEADER_TOTAL,
  // HEADER_SEG_SEM,
  // HEADER_TERC_SEM,
  // HEADER_CUAR_SEM,
  HEADER_AREA,
  HEADER_FORM,
  HEADER_HORAS_1,
  HEADER_HORAS_2,
  HEADER_HORAS_3,
  HEADER_HORAS_4,
  HEADER_HORAS_5,
  gradoTxt,
  cicloTxt,
} = require('./constants/fdp02-constants');
const {
  crearCelda, crearSeccion,
  seccionIntitucionTabla,
  formatearFecha,
  configurarFuenteYAgregarTexto,
  generateTableWithStyles,
  updateCurrentPositionY,
  generateTableAndSection,
  agregarImagenYPaginaPie,
  buscarDescripcionPorId,
} = require('./pdfHandler02');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function GenerarFDP02(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 67;

  const fechaFormateada = formatearFecha(solicitud.createdAt);
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const ciclosTipo = buscarDescripcionPorId(ciclos, solicitud.programa.cicloId);

  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(0, 127, 204);
  crearCelda(doc, 150, 40, 45, 7, 'FDP02');

  const nombreNivel = niveles
    .find(({ id }) => +id === solicitud?.programa.nivelId).descripcion;

  configurarFuenteYAgregarTexto(doc, 'bold', 11, [69, 133, 244], 'PLAN DE ESTUDIOS', 20, 50);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [0, 0, 0], fechaFormateada, 152, 58);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [125, 125, 125], solicitud.programa.plantel.institucion.nombre, 50, 60);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [125, 125, 125], `${nombreNivel} en ${solicitud.programa.nombre}`, 50, 70);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [125, 125, 125], solicitud.programa.vigencia || 'Donde está la vigencia???', 50, 80);
  currentPositionY += 20;

  currentPositionY += seccionIntitucionTabla({
    doc, solicitud, niveles, modalidadTipo, ciclosTipo, currentPositionY,
  });

  currentPositionY = updateCurrentPositionY(doc);
  currentPositionY = updateCurrentPositionY(doc, -20);
  currentPositionY = updateCurrentPositionY(doc, -20);

  // configurarFuenteYAgregarTexto(doc, 'bold', 10, [125, 125, 125],
  // 'SOLO APLICA PARA EL 1° Y 2° CICLO ESCOLAR (SEMESTRE O CUATRIMESTRE) POR CADA ASIGNATURA',
  // 10, 140);

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  const headerEstudio = ['1. ANTECEDENTES ACADÉMICOS DE INGRESO'];
  const tablaEstudio = [[solicitud.programa.antecedenteAcademico]];
  generateTableWithStyles(headerEstudio, tablaEstudio, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaInduccion = [[solicitud.programa.metodosInduccion]];
  generateTableWithStyles(HEADER_METODOS_INDUCCION, tablaInduccion, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const perfilIngreso = {
    headers: HEADER_NOMBRE_DATOS,
    body: [
      ['CONOCIMIENTOS', solicitud.programa.perfilIngresoConocimientos],
      ['HABILIDADES', solicitud.programa.perfilIngresoHabilidades],
      ['ACTITUDES', solicitud.programa.perfilIngresoActitudes],
    ],
    showHead: false,
    columnStyles,
  };

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  currentPositionY += generateTableAndSection('3. PERFIL DE INGRESO', perfilIngreso, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 5;

  const tablaModelo = [[solicitud.programa.procesoSeleccion]];
  generateTableWithStyles(HEADER_SELECCION_ESTD, tablaModelo, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  currentPositionY = updateCurrentPositionY(doc, 60); // Espacio después de la celda

  const perfilEgreso = {
    headers: HEADER_NOMBRE_DATOS,
    body: [
      ['CONOCIMIENTOS', solicitud.programa.perfilEgresoConocimientos],
      ['HABILIDADES', solicitud.programa.perfilEgresoHabilidades],
      ['ACTITUDES', solicitud.programa.perfilEgresoActitudes],
    ],
    showHead: false,
    columnStyles,
  };

  currentPositionY += generateTableAndSection('5. PERFIL DE EGRESO', perfilEgreso, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 5;

  const tablaMapa = [[solicitud.programa.mapaCurricular]];
  generateTableWithStyles(HEADER_MAPA_CURRICULAR, tablaMapa, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaFlex = [[solicitud.programa.flexibilidadCurricular]];
  generateTableWithStyles(HEADER_FLEX_CURRICULAR, tablaFlex, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaObjGeneral = [[solicitud.programa.objetivoGeneral]];
  generateTableWithStyles(HEADER_OBJ_GEN_PLAN, tablaObjGeneral, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaCompetencias = [[solicitud.programa.objetivosParticulares]];
  generateTableWithStyles(HEADER_OBJ_PT_CMP_PLAN, tablaCompetencias, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  generateTableWithStyles(HEADER_ESTRUCTURA_PLAN, [], doc, currentPositionY, 'center');
  currentPositionY += updateCurrentPositionY(doc, 20);

  const apartadoBody = bodyApartado;
  generateTableWithStyles(HEADER_APARTADO, apartadoBody, doc, currentPositionY);
  currentPositionY += updateCurrentPositionY(doc); // Espacio después de la celda

  // const tablaPrimSem = {
  //   headers: HEADER_DOCENTE,
  //   body: [
  //     ['', '', '', '',
  //       {
  //         content: 'CON DOCENTE:',
  //         styles: {
  //           halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fontStyle: 'bold', fillColor: [172, 178, 183],
  //         },
  //       },
  //       {
  //         content: 'INDEP:',
  //         styles: {
  //           halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fontStyle: 'bold', fillColor: [172, 178, 183],
  //         },
  //       },
  //       ''], ['Formación General'], ['Formación Básica'], ['Formación Disciplinar'], ['Formación Especializante'], ['Formación Técnica'],
  //   ],
  // };

  // currentPositionY += generateTableAndSection(HEADER_PRIM_SEM, tablaPrimSem, doc, currentPositionY);
  // currentPositionY = doc.previousAutoTable.finalY;

  // // Primer Semestre
  // const correoDirectorBody = [
  //   ['', '', ''],
  // ];
  // generateTableWithStyles(HEADER_TOTAL, correoDirectorBody, doc, currentPositionY);
  // currentPositionY = updateCurrentPositionY(doc);

  // // Segundo Semestre
  // currentPositionY += generateTableAndSection(HEADER_SEG_SEM, tablaPrimSem, doc, currentPositionY);
  // currentPositionY = doc.previousAutoTable.finalY;

  // generateTableWithStyles(HEADER_TOTAL, correoDirectorBody, doc, currentPositionY);
  // currentPositionY = updateCurrentPositionY(doc);

  // // Tercer Semestre
  // currentPositionY += generateTableAndSection(HEADER_TERC_SEM, tablaPrimSem, doc, currentPositionY);
  // currentPositionY = doc.previousAutoTable.finalY;

  // generateTableWithStyles(HEADER_TOTAL, correoDirectorBody, doc, currentPositionY);
  // currentPositionY = updateCurrentPositionY(doc);

  // // Cuarto Semestre
  // currentPositionY += generateTableAndSection(HEADER_CUAR_SEM, tablaPrimSem, doc, currentPositionY);
  // currentPositionY = doc.previousAutoTable.finalY;

  // generateTableWithStyles(HEADER_TOTAL, correoDirectorBody, doc, currentPositionY);
  // currentPositionY = updateCurrentPositionY(doc);

  // Funciona a medias, ya muestra las tablas con los semestres, falta mostrar los datos.
  const obtenerMateriasPorSemestre = (materias) => {
    const semestres = {};

    materias.forEach((materia) => {
      const { gradoId, consecutivo, id } = materia;
      if (!semestres[gradoId]) {
        semestres[gradoId] = [];
      }
      semestres[gradoId].push({ ...materia, key: consecutivo || id });
    });

    Object.keys(semestres).forEach((semestre) => {
      semestres[semestre].sort((a, b) => a.key - b.key);
    });

    return semestres;
  };

  const areaTxt = {
    1: 'Formación General',
    2: 'Formación Básica',
    3: 'Formación Disciplinar',
    4: 'Formación Electiva',
    5: 'Formación Técnica',
    6: 'Formación Especializante',
  };

  const semestres = obtenerMateriasPorSemestre(solicitud.programa.asignaturas);

  Object.keys(semestres).forEach((semestre) => {
    const materias = semestres[semestre].map((materia) => ({
      area: areaTxt[materia.areaId] || '',
      nombre: materia.nombre,
      clave: materia.clave,
      seriacion: materia.seriacion,
      horasDocente: materia.horasDocente,
      horasIndependiente: materia.horasIndependiente,
      creditos: materia.creditos,
      instalaciones: materia.academia,
    }));

    const tablaSemestre = {
      headers: HEADER_DOCENTE,
      body: materias.map(({
        area,
        nombre,
        clave,
        seriacion,
        horasDocente,
        horasIndependiente,
        creditos,
        instalaciones,
      }) => [
        area,
        nombre,
        clave,
        seriacion,
        horasDocente,
        horasIndependiente,
        creditos,
        instalaciones,
      ]),
    };

    const headerSemestre = `${gradoTxt[semestre]} ${cicloTxt[solicitud.programa.cicloId]}`;

    currentPositionY += generateTableAndSection(
      headerSemestre,
      tablaSemestre,
      doc,
      currentPositionY,
    );
    currentPositionY = doc.previousAutoTable.finalY;

    const totalCreditos = materias.reduce((total, { creditos }) => total + creditos, 0);
    const totalHorasDocente = materias.reduce((total, { horasDocente }) => total + horasDocente, 0);
    const totalHorasIndependiente = materias
      .reduce((total, { horasIndependiente }) => total + horasIndependiente, 0);

    const totalesBody = [
      [`Total Horas con Docente: ${totalHorasDocente}`, `Total Horas Independientes: ${totalHorasIndependiente}`, `Total Créditos: ${totalCreditos}`],
    ];

    generateTableWithStyles(HEADER_TOTAL, totalesBody, doc, currentPositionY);
    currentPositionY = updateCurrentPositionY(doc, 5);
  });

  const formBody = [
    [HEADER_FORM, '', '', '', '', ''],
  ];

  generateTableWithStyles(HEADER_AREA, formBody, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;

  // Dos recuadros
  const horasMinBody = [
    [HEADER_HORAS_2, {
      content: '                                                                ',
      styles: {
        halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fillColor: [172, 178, 183],
      },
    }],
  ];

  generateTableWithStyles(HEADER_HORAS_1, horasMinBody, doc, currentPositionY);
  currentPositionY = updateCurrentPositionY(doc);

  const horasBody = [
    [HEADER_HORAS_4, {
      content: '                                                                ',
      styles: {
        halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fillColor: [172, 178, 183],
      },
    },
    {
      content: '                                                                ',
      styles: {
        halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fillColor: [172, 178, 183],
      },
    }],
  ];
  generateTableWithStyles(HEADER_HORAS_3, horasBody, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;

  generateTableWithStyles(HEADER_HORAS_5, [], doc, currentPositionY);
  currentPositionY = updateCurrentPositionY(doc);

  const tablaActualizacionPlan = [[solicitud.programa.actualizacion]];
  generateTableWithStyles(HEADER_ACTUALIZACION_PLAN, tablaActualizacionPlan, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaProyectoSeg = [[solicitud.programa.seguimientoEgresados]];
  generateTableWithStyles(HEADER_PROYECTO_SEG, tablaProyectoSeg, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaVinculacion = [[solicitud.programa.conveniosVinculacion]];
  generateTableWithStyles(HEADER_VINCULACION, tablaVinculacion, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 15;

  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 20;
  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    `${solicitud.usuario.persona.nombre} ${solicitud.usuario.persona.apellidoPaterno} ${solicitud.usuario.persona.apellidoMaterno}`,
    'center',
  );

  agregarImagenYPaginaPie(doc, img3);
  const pdfDataUri = doc.output('arraybuffer');

  return pdfDataUri;
}

module.exports = { GenerarFDP02 };
