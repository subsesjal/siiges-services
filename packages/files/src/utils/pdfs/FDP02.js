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
  HEADER_ACTUALIZACION_PLAN,
  HEADER_PROYECTO_SEG,
  HEADER_VINCULACION,
  HEADER_DOCENTE,
  HEADER_HORAS_2,
  HEADER_HORAS_4,
  getSemesterTitle,
  sortAsignaturas,
  getAreaName,
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
  generateTotalsTable,
} = require('./pdfHandler02');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.setFillColor(6, 98, 211);
}
function redefineAddPage(doc) {
  const originalAddPage = doc.addPage;
  // eslint-disable-next-line no-param-reassign
  doc.addPage = function (...args) {
    originalAddPage.apply(this, args);
    addHeaderContent(this);
    return this;
  };
}

function GenerarFDP02(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 67;

  redefineAddPage(doc);
  addHeaderContent(doc);

  const fechaFormateada = formatearFecha(solicitud.createdAt);
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const ciclosTipo = buscarDescripcionPorId(ciclos, solicitud.programa.cicloId);
  const fechaVigencia = formatearFecha(solicitud.programa.vigencia);

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
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [125, 125, 125], fechaVigencia || '', 50, 80);
  currentPositionY += 20;

  currentPositionY += seccionIntitucionTabla({
    doc, solicitud, niveles, modalidadTipo, ciclosTipo, currentPositionY,
  });

  currentPositionY = updateCurrentPositionY(doc);
  currentPositionY = updateCurrentPositionY(doc, -20);
  currentPositionY = updateCurrentPositionY(doc, -20);

  currentPositionY = updateCurrentPositionY(doc);

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
      [{ content: 'CONOCIMIENTOS', styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } }, solicitud.programa.perfilIngresoConocimientos],
      [{ content: 'HABILIDADES', styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } }, solicitud.programa.perfilIngresoHabilidades],
      [{ content: 'ACTITUDES', styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } }, solicitud.programa.perfilIngresoActitudes],
    ],
    showHead: false,
    columnStyles,
  };

  currentPositionY += generateTableAndSection('3. PERFIL DE INGRESO', perfilIngreso, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;
  currentPositionY += 5;

  const tablaModelo = [[solicitud.programa.procesoSeleccion]];
  generateTableWithStyles(HEADER_SELECCION_ESTD, tablaModelo, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const perfilEgreso = {
    headers: HEADER_NOMBRE_DATOS,
    body: [
      [{ content: 'CONOCIMIENTOS', styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } }, solicitud.programa.perfilEgresoConocimientos],
      [{ content: 'HABILIDADES', styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } }, solicitud.programa.perfilEgresoHabilidades],
      [{ content: 'ACTITUDES', styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } }, solicitud.programa.perfilEgresoActitudes],
    ],
    showHead: false,
    columnStyles,
  };

  currentPositionY += generateTableAndSection('5. PERFIL DE EGRESO', perfilEgreso, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;
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

  doc.addPage();
  currentPositionY = 40;
  generateTableWithStyles(HEADER_ESTRUCTURA_PLAN, [], doc, currentPositionY, 'center');
  currentPositionY = doc.previousAutoTable.finalY;

  const asignaturas = sortAsignaturas(solicitud.programa.asignaturas);

  const asignaturasPorSemestre = asignaturas.reduce((acc, asignatura) => {
    if (!acc[asignatura.gradoId]) acc[asignatura.gradoId] = { generales: [], electivas: [] };
    if (asignatura.areaId === 4) {
      acc[asignatura.gradoId].electivas.push(asignatura);
    } else {
      acc[asignatura.gradoId].generales.push(asignatura);
    }
    return acc;
  }, {});

  let totalHorasDocente = 0;
  let totalHorasIndependiente = 0;
  let totalCreditosAsig = 0;
  let tablaContador = 0;

  Object.keys(asignaturasPorSemestre).forEach((gradoId, index, array) => {
    if (asignaturasPorSemestre[gradoId].generales.length > 0) {
      const tituloSemestre = getSemesterTitle(parseInt(gradoId, 10), solicitud.programa.cicloId);
      const tablaSemestre = {
        headers: HEADER_DOCENTE,
        body: [
          ['', '', '', '',
            {
              content: 'CON DOCENTE:',
              styles: {
                halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fontStyle: 'bold', fillColor: [172, 178, 183], font: 'Nutmegb',
              },
            },
            {
              content: 'INDEP:',
              styles: {
                halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fontStyle: 'bold', fillColor: [172, 178, 183], font: 'Nutmegb',
              },
            },
            '',
          ],
          ...asignaturasPorSemestre[gradoId].generales.map((asignatura) => [
            { content: `${getAreaName(asignatura.areaId)}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.nombre}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.clave}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.seriacion}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.horasDocente}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.horasIndependiente}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.creditos}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.academia}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
          ]),
        ],
      };

      currentPositionY += generateTableAndSection(
        tituloSemestre,
        tablaSemestre,
        doc,
        currentPositionY,
      );
      currentPositionY = doc.previousAutoTable.finalY;

      const totalDocente = asignaturasPorSemestre[gradoId].generales
        .reduce((sum, asignatura) => sum + (asignatura.horasDocente || 0), 0);
      const totalIndep = asignaturasPorSemestre[gradoId].generales
        .reduce((sum, asignatura) => sum + (asignatura.horasIndependiente || 0), 0);
      const totalCreditos = asignaturasPorSemestre[gradoId].generales
        .reduce((sum, asignatura) => sum + parseFloat(asignatura.creditos || 0), 0);

      totalHorasDocente += totalDocente;
      totalHorasIndependiente += totalIndep;
      totalCreditosAsig += totalCreditos;

      const HEADER_TOTAL = [
        {
          content: `TOTAL DOCENTE:  ${totalDocente}`,
          styles: {
            halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
          },
        },
        {
          content: `TOTAL INDEP:  ${totalIndep}`,
          styles: {
            halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
          },
        },
        {
          content: `TOTAL CRÉDITOS:   ${totalCreditos}`,
          styles: {
            halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb',
          },
        },
      ];

      currentPositionY = generateTotalsTable(HEADER_TOTAL, doc, currentPositionY);
      currentPositionY = updateCurrentPositionY(doc);

      tablaContador += 1;
      if (tablaContador % 1 === 0 && index !== array.length - 1) {
        doc.addPage();
        currentPositionY = 40;
      }

      if (index === array.length - 1) {
        doc.addPage();
        currentPositionY = 40;
      }
    }
  });

  Object.keys(asignaturasPorSemestre).forEach((gradoId, index, array) => {
    if (asignaturasPorSemestre[gradoId].electivas.length > 0) {
      const tituloSemestre = `ELECTIVA - ${getSemesterTitle(parseInt(gradoId, 10), solicitud.programa.cicloId)}`;
      const tablaSemestre = {
        headers: HEADER_DOCENTE,
        body: [
          ['', '', '', '',
            {
              content: 'CON DOCENTE:',
              styles: {
                halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fontStyle: 'bold', fillColor: [172, 178, 183], font: 'Nutmegb',
              },
            },
            {
              content: 'INDEP:',
              styles: {
                halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fontStyle: 'bold', fillColor: [172, 178, 183], font: 'Nutmegb',
              },
            },
            '',
          ],
          ...asignaturasPorSemestre[gradoId].electivas.map((asignatura) => [
            { content: `${getAreaName(asignatura.areaId)}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.nombre}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.clave}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.seriacion}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.horasDocente}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.horasIndependiente}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.creditos}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
            { content: `${asignatura.academia}`, styles: { halign: 'center', valign: 'middle', font: 'Nutmegb' } },
          ]),
        ],
      };

      currentPositionY += generateTableAndSection(
        tituloSemestre,
        tablaSemestre,
        doc,
        currentPositionY,
      );
      currentPositionY = doc.previousAutoTable.finalY;

      tablaContador += 1;
      if (tablaContador % 1 === 0 && index !== array.length - 1) {
        doc.addPage();
        currentPositionY = 40;
      }
    }

    if (index === array.length - 1) {
      currentPositionY = updateCurrentPositionY(doc, 5);
      currentPositionY = doc.previousAutoTable.finalY;

      const HEADER_HORAS_1 = [
        {
          content: 'NÚMERO MÍNIMO DE HORAS QUE SE DEBERÁN ACREDITAR EN LAS ASIGNATURAS DE FORMACIÓN ELECTIVA, BAJO LA CONDUCCIÓN DE UN DOCENTE',
          styles: {
            halign: 'center', valign: 'middle', fontSize: 7, fillColor: [255, 255, 255], font: 'Nutmegb',
          },
        },
        {
          content: solicitud.programa.minimoHorasOptativas || 0,
          styles: {
            halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb', cellWidth: 20,
          },
        },
      ];

      const horasMinBody = [
        [HEADER_HORAS_2, {
          content: [solicitud.programa.minimoCreditosOptativas || 0],
          styles: {
            halign: 'center', valign: 'middle', fontSize: 7, textColor: [0, 0, 0], fillColor: [172, 178, 183], fontStyle: 'bold',
          },
        }],
      ];

      generateTableWithStyles(HEADER_HORAS_1, horasMinBody, doc, currentPositionY);
      currentPositionY = updateCurrentPositionY(doc);
    }
  });

  currentPositionY = updateCurrentPositionY(doc, 5);
  currentPositionY = doc.previousAutoTable.finalY + 5;

  const HEADER_HORAS_3 = [
    {
      content: 'TOTAL DE HORAS DE TRABAJO BAJO LA CONDUCCIÓN DE UN DOCENTE DURANTE TODA LA CARRERA',
      styles: {
        halign: 'center', valign: 'middle', fontSize: 7, fillColor: [255, 255, 255], font: 'Nutmegb',
      },
    },
    {
      content: [totalHorasDocente],
      styles: {
        halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb', fontStyle: 'bold',
      },
    },
  ];

  const horasBody = [
    [HEADER_HORAS_4, {
      content: [totalHorasIndependiente],
      styles: {
        halign: 'center', valign: 'middle', fontSize: 7, fontStyle: 'bold', textColor: [0, 0, 0], fillColor: [172, 178, 183], font: 'Nutmegb', cellWidth: 20,
      },
    },
    ],
  ];
  generateTableWithStyles(HEADER_HORAS_3, horasBody, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;

  const HEADER_HORAS_5 = [{
    content: 'TOTAL DE CRÉDITOS DE LA CARRERA',
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, fillColor: [255, 255, 255], font: 'Nutmegb',
    },
  },
  {
    content: [`${totalCreditosAsig}`],
    styles: {
      halign: 'center', valign: 'middle', fontSize: 7, font: 'Nutmegb', cellWidth: 20,
    },
  },
  ];
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

  currentPositionY = updateCurrentPositionY(doc);
  currentPositionY = doc.previousAutoTable.finalY;
  currentPositionY += 15;

  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY = doc.previousAutoTable.finalY;
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
