/* eslint-disable new-cap */
const fs = require('fs');

const path = require('path');

const NutmegFont = fs.readFileSync(path.resolve(__dirname, '../../../../../fonts/nutmeg-regular.ttf')).toString('base64');
const NutmegFontBold = fs.readFileSync(path.resolve(__dirname, '../../../../../fonts/nutmeg-bold.ttf')).toString('base64');

const { turnos } = require('./constants');
const { HEADER_MAIN_TITTLE } = require('./constants/fdp02-constants');

const textFont = 'Nutmeg';

function addNutmeg(doc) {
  doc.addFileToVFS('nutmeg-bold.ttf', NutmegFontBold);
  doc.addFont('nutmeg-bold.ttf', 'Nutmeg', 'bold');
  doc.addFileToVFS('nutmeg-regular.ttf', NutmegFont);
  doc.addFont('nutmeg-regular.ttf', 'Nutmeg', 'normal');
  doc.setFont('Nutmeg', 'normal');
}

function crearCelda(doc, x, y, width, height, texto) {
  doc.rect(x, y, width, height, 'F');
  doc.rect(x, y, width, height, 'S');

  doc.setFont(textFont, 'bold');
  doc.setFontSize(10);
  let setFillColor = [0, 0, 0];

  const textoWidth = (doc.getStringUnitWidth(texto) * doc.internal.getFontSize())
    / doc.internal.scaleFactor;
  const textoX = x + (width - textoWidth) / 2 + 10; // Calcula la posición X centrada

  if (texto.includes('FD')) setFillColor = [0, 0, 0];
  doc.setTextColor(setFillColor[0], setFillColor[1], setFillColor[2]);
  doc.text(texto, textoX, y + 5); // Usar la posición X centrada
}
function crearFilaFecha({
  currentPositionY: currentPosition, fecha, doc,
}) {
  let currentPositionY = currentPosition;

  const tableData = [
    ['FECHA', fecha],
  ];

  const pageWidth = doc.internal.pageSize.width;
  const rightMargin = 15; // Ajusta este valor para mover más a la derecha
  const tableWidth = 90; // Ajusta este valor para hacer la tabla más estrecha

  const tableOptions = {
    startY: currentPositionY,
    // eslint-disable-next-line max-len
    margin: { left: pageWidth - tableWidth - rightMargin, right: rightMargin }, // Posicionar la tabla más a la derecha
    tableWidth, // Ajustar el ancho de la tabla
    theme: 'grid',
    styles: {
      lineColor: [0, 0, 0],
      lineWidth: 0.3,
      fontSize: 8, // Ajustar el tamaño de fuente si es necesario
      cellPadding: 1, // Ajustar el padding para reducir la altura de las celdas
    },
    headStyles: {
      fontSize: 12,
    },
    showHead: false,
    columnStyles: {
      0: {
        fillColor: [255, 131, 0],
        cellWidth: tableWidth / 2, // Ajustar el ancho de la columna
      },
      1: {
        fontStyle: 'bold',
        cellWidth: tableWidth / 2, // Ajustar el ancho de la columna
      },
    },
  };

  // Calcular la altura del texto para verificar si es necesario agregar una nueva página
  const textHeight = doc.getTextDimensions(
    tableData.join('\n'),
    tableOptions,
  ).h;

  if (currentPositionY + textHeight > doc.internal.pageSize.height - 20) {
    doc.addPage();
    currentPositionY = 20; // Reiniciar la posición vertical en la nueva página
  }

  // Generar la tabla
  doc.autoTable({
    body: tableData,
    ...tableOptions,
  });

  // Actualizar la posición vertical después de la tabla
  currentPositionY = doc.previousAutoTable.finalY + 10; // Espacio después de la tabla
  return currentPositionY;
}
function generateTable({
  headers,
  tableData,
  startY,
  headStyles,
  showHead,
  doc,
  limit,
  marginTop,
  columnStyles,
}) {
  let finalY = startY;

  doc.autoTable({
    head: showHead ? [headers] : [],
    body: tableData,
    startY: finalY,
    theme: 'grid',
    styles: {
      lineColor: [0, 0, 0],
      lineWidth: 0.3,
      font: 'Nutmeg',
    },
    headStyles,
    columnStyles,
    didDrawPage: (data) => {
      finalY = data.cursor.y;
    },
    margin: { top: marginTop, bottom: 30 },
  });

  if (finalY > limit) {
    doc.addPage();
    finalY = marginTop; // Establecer el margen superior en la nueva página
  }

  return finalY;
}

function crearSeccion(currentPosition, doc, contenido, alineacion = 'justify') {
  const margenIzquierdo = 20;
  let currentPositionY = currentPosition;
  // Contenido de la sección
  doc.setFont(textFont);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  const textHeight = doc.getTextDimensions(contenido, { maxWidth: 175 }).h;

  if (currentPositionY + textHeight > doc.internal.pageSize.height - 20) {
    doc.addPage();
    currentPositionY = 20; // Reiniciar la posición vertical en la nueva página
  }

  // Calcular la posición X según la alineación
  const textX = alineacion === 'right'
    ? doc.internal.pageSize.width - margenIzquierdo
    : margenIzquierdo;

  if (alineacion === 'center') {
    const textoWidth = (doc.getStringUnitWidth(contenido) * doc.internal.getFontSize())
      / doc.internal.scaleFactor;
    const textoX = (doc.internal.pageSize.getWidth() - textoWidth) / 2;
    doc.text(contenido, textoX, currentPositionY, { maxWidth: 175 });
  } else {
    doc.text(textX, currentPositionY, contenido, {
      maxWidth: 175,
      align: alineacion,
    });
  }

  // currentPositionY += textHeight + 5; // Espacio después de cada sección
  return currentPositionY;
}

function generarSeccionyTabla({
  titulo, tablaData, tableOptions = {}, doc, currentPosition,
}) {
  const pageHeight = doc.internal.pageSize.height;
  const limit = pageHeight - 30; // Define el límite inferior de la página
  const textHeight = doc.getTextDimensions(titulo, {
    align: 'justify',
    maxWidth: 175,
  }).h;

  let currentPositionY = currentPosition;
  if (currentPositionY + textHeight + 20 > limit) {
    doc.addPage();
    currentPositionY = 40; // Reiniciar la posición vertical en la nueva página
  }

  // Título de la sección
  doc.setFillColor(255, 131, 0);
  crearCelda(
    doc,
    14, // cellX
    currentPositionY, // cellY
    182, // cellWidth
    7, // cellHeight
    titulo,
  );

  const startY = currentPositionY + (tableOptions.spaceBeforeTable || 5);

  // Generar la tabla
  currentPositionY = generateTable({
    headers: tablaData.headers,
    tableData: tablaData.body,
    startY,
    headStyles: {
      fillColor: [255, 131, 0],
      fontSize: 12,
      textColor: [20, 20, 20],
      font: 'Nutmeg',
      halign: 'center',
      valign: 'middle',
    },
    showHead: true, // Mostrar encabezados solo en la primera página
    doc,
    limit,
    marginTop: 40,
  });

  return currentPositionY;
}

function seccionIntitucionTabla({
  currentPositionY: currentPosition, solicitud, doc, niveles, modalidadTipo, ciclosTipo,
}) {
  let currentPositionY = currentPosition;
  const nombreNivel = niveles
    .find(({ id }) => +id === solicitud?.programa.nivelId).descripcion;
  const dataColumn1 = [
    modalidadTipo,
    ciclosTipo,
    `${solicitud.programa.duracionPeriodos} Periodos`,
    `${nombreNivel} en ${solicitud.programa.nombre}`,
    `${solicitud.programa.plantel.domicilio.calle} ${solicitud.programa.plantel.domicilio.numeroExterior} ${solicitud.programa.plantel.domicilio.numeroInterior} ${solicitud.programa.plantel.domicilio.colonia} CP. ${solicitud.programa.plantel.domicilio.codigoPostal} / Núm. ${solicitud.programa.plantel.telefono1}`,
  ];

  const tableData = HEADER_MAIN_TITTLE.map((header, index) => [
    header,
    dataColumn1[index],
  ]);

  const tableOptions = {
    startY: currentPositionY,
    margin: { right: 14, left: 14 },
    theme: 'grid',
    styles: {
      lineColor: [0, 0, 0],
      lineWidth: 0.3,
      font: 'Nutmeg',
    },
    headStyles: {
      fontSize: 15,
    },
    showHead: false,
    columnStyles: {
      0: {
        fillColor: [255, 131, 0],
      },
      1: {
        fontStyle: 'bold',
      },
    },
  };

  const textHeight = doc.getTextDimensions(
    tableData.join('\n'),
    tableOptions,
  ).h;

  if (currentPositionY + textHeight > doc.internal.pageSize.height - 20) {
    doc.addPage();
    currentPositionY = 20; // Reiniciar la posición vertical en la nueva página
  }

  doc.autoTable({
    body: tableData,
    ...tableOptions,
  });

  currentPositionY = doc.previousAutoTable.finalY + 10; // Espacio después de la tabla
  return currentPositionY;
}

function formatearFecha(fechaCreacion) {
  const meses = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE',
  ];

  const fecha = new Date(fechaCreacion);
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();

  return `${dia} DE ${mes} DE ${año}`;
}

function buscarDescripcionPorId(array, id) {
  return array.find(({ id: itemId }) => +itemId === id).descripcion;
}

function buscarNombrePorId(array, id) {
  return array.find(({ id: itemId }) => +itemId === id).nombre;
}

function generarTiposDeTurno(programaTurnos) {
  return programaTurnos.map((turno) => turnos.find(({ id }) => +id === turno.turnoId).nombre).join(', ');
}

function configurarFuenteYAgregarTexto(doc, fuente, tamaño, color, texto, x, y) {
  doc.setFont(textFont, fuente);
  doc.setFontSize(tamaño);
  doc.setTextColor(...color);
  doc.text(texto, x, y);
}

function generateTableWithStyles(headers, tableData, doc, currentPositionY, showHead = true) {
  const pageHeight = doc.internal.pageSize.height;
  const footerHeight = 30; // Ajusta según el tamaño del pie de página
  const marginTop = 40;
  const limit = pageHeight - footerHeight;

  let finalY = currentPositionY;

  if (tableData.length === 0) {
    // Mostrar solo el encabezado si el cuerpo está vacío
    doc.autoTable({
      head: [headers],
      body: [], // Tabla vacía
      startY: finalY,
      theme: 'grid',
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
        font: 'Nutmeg',
      },
      headStyles: {
        fillColor: [255, 131, 0],
        fontSize: 12,
        textColor: [20, 20, 20],
        font: 'Nutmeg',
        halign: 'center',
        valign: 'middle',
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, // Ajusta el ancho de la primera columna
        1: { cellWidth: 'auto' }, // Ajusta el ancho de la segunda columna
      },
      margin: { top: marginTop, bottom: 30 },
    });

    finalY = doc.previousAutoTable.finalY;
  } else {
    // Dividir la tabla en filas individuales para manejar el salto de página
    tableData.forEach((row) => {
      if (finalY + 20 > limit) { // Si la posición final más un margen de seguridad supera el límite
        doc.addPage();
        finalY = marginTop; // Establecer el margen superior en la nueva página
      }
      finalY = generateTable({
        headers,
        tableData: [row],
        startY: finalY,
        headStyles: {
          fillColor: [255, 131, 0],
          fontSize: 12,
          textColor: [20, 20, 20],
          font: 'Nutmeg',
          halign: 'center',
          valign: 'middle',
        },
        columnStyles: {
          0: { cellWidth: 'auto' }, // Ajusta el ancho de la primera columna
          1: { cellWidth: 'auto' }, // Ajusta el ancho de la segunda columna
        },
        doc,
        limit,
        marginTop,
        showHead,
      });
      // eslint-disable-next-line no-param-reassign
      showHead = false; // Mostrar encabezado solo en la primera página
    });
  }

  return finalY;
}

function updateCurrentPositionY(doc, offset = 5) {
  return doc.previousAutoTable.finalY + offset;
}

function generarTablaData(headers, body) {
  return {
    headers,
    body,
  };
}

function generateTableAndSection(titulo, tablaData, doc, currentPosition) {
  let currentPositionY = currentPosition;
  currentPositionY += generarSeccionyTabla({
    titulo,
    tablaData,
    tableOptions: {
      spaceBeforeTable: 7,
      marginTop: 40,
      marginBottom: 30,
      ...tablaData,
    },
    doc,
    currentPosition: currentPositionY,
  });
  return currentPositionY;
}

function createSection(currentPosition, doc, text, align) {
  let currentPositionY = currentPosition;
  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    text,
    align,
  );
  return currentPositionY;
}

function agregarImagenYPaginaPie(doc, img) {
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i += 1) {
    doc.setPage(i);
    doc.setFont(textFont, 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const pageNumberText = `Página ${i} de ${totalPages}`;
    const pageNumberTextWidth = (doc
      .getStringUnitWidth(pageNumberText) * doc.internal.getFontSize())
      / doc.internal.scaleFactor;
    const pageNumberTextX = pageWidth - 20 - pageNumberTextWidth;
    const pageNumberTextY = pageHeight - 10;

    doc.text(pageNumberText, pageNumberTextX, pageNumberTextY);

    const imgBottomLeftX = 10;
    const imgBottomLeftY = pageHeight - 10;
    const imgBottomLeftWidth = 18;
    const imgBottomLeftHeight = 18;

    doc.addImage(
      img,
      'JPEG',
      imgBottomLeftX,
      imgBottomLeftY - imgBottomLeftHeight,
      imgBottomLeftWidth,
      imgBottomLeftHeight,
    );
  }
}

function generarPDF(doc, rutaArchivo) {
  const pdfDataUri = doc.output('arraybuffer');
  fs.writeFileSync(rutaArchivo, new Buffer.from(pdfDataUri));
}

function generateTotalsTable(headers, doc, currentPositionY) {
  const pageHeight = doc.internal.pageSize.height;
  const footerHeight = 30; // Ajusta según el tamaño del pie de página
  const marginTop = 40;
  const limit = pageHeight - footerHeight;

  let finalY = currentPositionY;

  if (finalY + 20 > limit) {
    doc.addPage();
    finalY = marginTop;
  }

  doc.autoTable({
    head: [headers],
    body: [],
    startY: finalY,
    theme: 'grid',
    styles: {
      lineColor: [0, 0, 0],
      lineWidth: 0.3,
      font: 'Nutmeg',
    },
    headStyles: {
      fillColor: [255, 131, 0],
      fontSize: 12,
      textColor: [20, 20, 20],
      font: 'Nutmeg',
      halign: 'center',
      valign: 'middle',
    },
    margin: { top: marginTop, bottom: 30 },
  });

  return finalY;
}

module.exports = {
  crearCelda,
  crearSeccion,
  generarSeccionyTabla,
  generateTable,
  seccionIntitucionTabla,
  formatearFecha,
  buscarDescripcionPorId,
  generarTiposDeTurno,
  configurarFuenteYAgregarTexto,
  generateTableWithStyles,
  updateCurrentPositionY,
  generateTableAndSection,
  createSection,
  agregarImagenYPaginaPie,
  generarPDF,
  generarTablaData,
  buscarNombrePorId,
  generateTotalsTable,
  crearFilaFecha,
  addNutmeg,
};
