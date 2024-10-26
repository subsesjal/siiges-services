const fs = require('fs');

const { turnos } = require('./constants');
const { HEADER_MAIN_TITTLE } = require('./constants/fd02-constants');

const textFont = 'Nutmegb';

function crearCelda(doc, x, y, width, height, texto) {
  doc.rect(x, y, width, height, 'F');
  doc.rect(x, y, width, height, 'S');

  doc.setFont(textFont, 'bold');
  doc.setFontSize(8);
  let setFillColor = [0, 0, 0];

  const textoWidth = (doc.getStringUnitWidth(texto) * doc.internal.getFontSize())
    / doc.internal.scaleFactor;
  let textoX = x + (width - textoWidth) / 2 + 10; // Calcula la posición X centrada

  if (texto.includes('FDA') || texto.includes('FDP')) {
    setFillColor = [255, 255, 255];
    textoX = x + width - (doc.getStringUnitWidth(texto) * doc.internal.getFontSize()) / doc.internal.scaleFactor - 2; // Right aligned position with no margin
  }

  doc.setTextColor(setFillColor[0], setFillColor[1], setFillColor[2]);
  doc.text(texto, textoX, y + 5); // Adjust Y position as needed
}

function crearSeccion(currentPosition, doc, contenido, alineacion = 'justify') {
  const margenIzquierdo = 20;
  let currentPositionY = currentPosition;

  // Contenido de la sección
  doc.setFont(textFont); // Set the font family (assuming textFont is defined)
  doc.setFontSize(10); // Set the font size
  doc.setTextColor(0, 0, 0); // Set text color

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
    // Set font style to normal (not bold)
    doc.text(textX, currentPositionY, contenido, {
      maxWidth: 175,
      align: alineacion,
    });
  }
  doc.setFont('normal');
  // currentPositionY += textHeight + 5; // Espacio después de cada sección
  return currentPositionY;
}

function generarSeccionyTabla({
  titulo, tablaData, tableOptions = {}, doc, currentPosition,
}) {
  const pageHeight = doc.internal.pageSize.height;
  const margin = 5;
  const availableSpace = pageHeight - margin;
  const textHeight = doc.getTextDimensions(titulo, {
    align: 'justify',
    maxWidth: 175,
  }).h;

  let currentPositionY = currentPosition;
  if (currentPositionY + textHeight + 20 > availableSpace) {
    doc.addPage();
    currentPositionY = margin; // Reiniciar la posición vertical en la nueva página
  }

  // Título de la sección
  doc.setFillColor(170, 178, 183);
  crearCelda(
    doc,
    14, // cellX
    currentPositionY, // cellY
    182, // cellWidth
    7, // cellHeight
    titulo,
  );

  const startY = currentPositionY + (tableOptions.spaceBeforeTable || 5);

  const previousY = currentPositionY; // Guardar la posición antes de crear la tabla

  doc.autoTable({
    startY,
    head: [tablaData.headers], // Encabezados de la tabla
    body: tablaData.body, // Datos de la tabla
    theme: 'grid',
    styles: {
      lineColor: [0, 0, 0],
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: [172, 178, 183],
      fontSize: 12,
      textColor: [20, 20, 20],
    },
    ...tableOptions, // Opciones adicionales de la tabla
  });

  const tableHeight = currentPositionY - previousY; // Altura real de la tabla

  currentPositionY += tableHeight + 20; // Espacio después de la tabla

  return currentPositionY;
}

function generateTable({
  headers,
  tableData,
  startY,
  headStyles,
  showHead,
  doc,
}) {
  doc.autoTable({
    head: [headers],
    body: tableData,
    startY,
    theme: 'grid',
    styles: {
      lineColor: [0, 0, 0],
      lineWidth: 0.3,
      font: 'Nutmegb',
    },
    headStyles,
    showHead,
  });
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
        fillColor: [172, 178, 183],
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

function seccionIntitucionTabla({
  currentPositionY: currentPosition, solicitud, doc, niveles,
}) {
  let currentPositionY = currentPosition;
  const nombreNivel = niveles
    .find(({ id }) => +id === solicitud?.programa.nivelId).descripcion;
  const dataColumn1 = [
    solicitud.programa.plantel.institucion.nombre,
    `${nombreNivel} en ${solicitud.programa.nombre}`,
    solicitud.programa.duracionPeriodos,
    solicitud.programa.plantel.institucion.razonSocial,
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
      font: 'Nutmegb',
    },
    headStyles: {
      fontSize: 15,
    },
    showHead: false,
    columnStyles: {
      0: {
        fillColor: [172, 178, 183],
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

function generarTiposDeTurno(programaTurnos) {
  return programaTurnos.map((turno) => turnos.find(({ id }) => +id === turno.turnoId).nombre).join(', ');
}
function agregarTextoJustificado(doc, texto, x, y, width, fontSize) {
  const maxY = 260;
  const words = texto.split(/\s+/); // Divide el texto en palabras
  const spaceWidth = doc.getTextWidth(' ');
  const lineHeight = fontSize * 0.5; // Ajusta la altura de la línea según sea necesario
  let currentLine = '';
  const lines = [];

  doc.setFontSize(fontSize);

  words.forEach((word) => {
    const testLine = `${currentLine + word} `;
    const testWidth = doc.getTextWidth(testLine);
    if (testWidth > width && currentLine !== '') {
      lines.push(currentLine.trim());
      currentLine = `${word} `;
    } else {
      currentLine = testLine;
    }
  });

  lines.push(currentLine.trim()); // Agrega la última línea

  lines.forEach((line, index) => {
    // Verifica si la posición actual y más la altura de la línea superan el máximo permitido
    if (y + lineHeight > maxY) {
      doc.addPage(); // Añade una nueva página
      y = 55; // Reinicia la posición y en la nueva página (margen superior)
      doc.setFont('Nutmegb', 'normal');
      doc.setFontSize(12);
      doc.setFont(textFont);
    }

    const wordsInLine = line.split(' ');
    let gapSize = spaceWidth;

    if (index !== lines.length - 1 && wordsInLine.length > 1) {
      // Calcula el espacio adicional entre palabras para la justificación
      const lineWidth = doc.getTextWidth(line);
      const extraSpace = (width - lineWidth) / (wordsInLine.length - 1);
      gapSize += extraSpace;
    }

    let positionX = x;
    wordsInLine.forEach((word, wordIndex) => {
      doc.text(word, positionX, y);
      positionX += doc.getTextWidth(word) + (wordIndex < wordsInLine.length - 1 ? gapSize : 0);
    });

    y += lineHeight;
  });

  return y;
}

function configurarFuenteYAgregarTexto(doc, fuente, tamaño, color, texto, x, y) {
  doc.setFont(textFont, fuente);
  doc.setFontSize(tamaño);
  doc.setTextColor(...color);
  doc.text(texto, x, y);
}

function generateTableWithStyles(headers, tableData, doc, currentPositionY) {
  generateTable({
    headers,
    tableData,
    startY: currentPositionY,
    headStyles: {
      fillColor: [172, 178, 183],
      fontSize: 12,
      textColor: [20, 20, 20],
      font: 'Nutmegb',
      halign: 'center',
      valign: 'middle',
    },
    doc,
  });
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
  crearFilaFecha,
  agregarTextoJustificado,
};
