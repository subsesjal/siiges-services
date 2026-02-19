const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
const QRCode = require('qrcode');
const { addNutmeg } = require('./pdfHandler');

const img7 = fs.readFileSync(path.join(__dirname, '/images/img7.png'), { encoding: 'base64' });

function numeroALetras(num) {
  const letras = {
    0: 'CERO',
    1: 'UNO',
    2: 'DOS',
    3: 'TRES',
    4: 'CUATRO',
    5: 'CINCO',
    6: 'SEIS',
    7: 'SIETE',
    8: 'OCHO',
    9: 'NUEVE',
    10: 'DIEZ',
    20: 'VEINTE',
    30: 'TREINTA',
    40: 'CUARENTA',
    50: 'CINCUENTA',
    60: 'SESENTA',
    70: 'SETENTA',
    80: 'OCHENTA',
    90: 'NOVENTA',
    100: 'CIEN',
  };
  return letras[num] || '';
}

async function agregarQR(doc, url, xPos, yPos, size = 80) {
  const qrDataUrl = await QRCode.toDataURL(url, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 1,
    margin: 1,
    width: 128,
  });

  doc.addImage(qrDataUrl, 'PNG', xPos, yPos, size, size);
}

async function GenerarCertificado(certificado) {
  const JsPDF = jsPDF;
  const doc = new JsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  addNutmeg(doc);

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  doc.addImage(img7, 'PNG', 0, 0, width, height);
  doc.setTextColor(0, 0, 0);
  doc.setFont('Nutmeg', 'normal');

  const centerTextInBox = (
    text,
    x,
    boxWidth,
    y,
    size = 8,
    bold = false,
    alignBottom = false,
    refHeight = 0,
  ) => {
    if (!text) return { height: 0, lastY: y };

    doc.setFont('Nutmeg', bold ? 'bold' : 'normal');
    doc.setFontSize(size);

    const lines = doc.splitTextToSize(text, boxWidth);
    const lineHeight = size * 1.2;
    const totalHeight = lines.length * lineHeight;

    let startY = y;
    if (alignBottom && refHeight > totalHeight) {
      startY = y + (refHeight - totalHeight);
    }

    let lastY = startY;
    lines.forEach((line, i) => {
      const textWidth = doc.getTextWidth(line);
      const xCentered = x + (boxWidth - textWidth) / 2;
      lastY = startY + i * lineHeight;
      doc.text(line, xCentered, lastY);
    });

    return { height: totalHeight, lastY };
  };

  const drawCenteredBlockTitle = (text, xStart, boxWidth, y, fontSize = 8) => {
    const textWidth = doc.getTextWidth(text);
    const xCentered = xStart + (boxWidth - textWidth) / 2;
    doc.setFont('Nutmeg', 'bold');
    doc.setFontSize(fontSize);
    doc.text(text, xCentered, y);
  };

  const drawLine = (y) => {
    doc.line(57, y, 557, y);
  };

  doc.setFontSize(9);
  const centerX = width / 2;
  doc.text('SECRETARÍA DE INNOVACIÓN, CIENCIA', centerX, 70, { align: 'center' });
  doc.text('Y TECNOLOGÍA DE JALISCO.', centerX, 85, { align: 'center' });
  doc.text('SUBSECRETARÍA DE EDUCACIÓN SUPERIOR.', centerX, 100, { align: 'center' });

  doc.setFontSize(8.5);
  doc.setFont('Nutmeg', 'normal');
  doc.text(
    'Con base en el 16 de la Ley de Educación Superior del Estado de Jalisco, se expide el presente CERTIFICADO a:',
    57,
    130,
  );

  const baseY = 135;
  const blockX = 57;
  const blockWidth = 500;
  doc.setFillColor(252, 133, 32);
  doc.rect(blockX, baseY, blockWidth, 14, 'F');
  drawCenteredBlockTitle('Datos del titulado', blockX, blockWidth, baseY + 10);

  const datosY = baseY + 26;
  const colWidths = [160, 160, 160];
  const colX = [blockX, blockX + colWidths[0], blockX + colWidths[0] + colWidths[1]];

  centerTextInBox(certificado?.nombreAlumno || '', colX[0], colWidths[0], datosY, 8, false);
  centerTextInBox(certificado?.paternoAlumno || '', colX[1], colWidths[1], datosY, 8, false);
  centerTextInBox(certificado?.maternoAlumno || '', colX[2], colWidths[2], datosY, 8, false);

  drawLine(datosY + 4);

  centerTextInBox('Nombre(s)', colX[0], colWidths[0], datosY + 15, 8);
  centerTextInBox('Primer apellido', colX[1], colWidths[1], datosY + 15, 8);
  centerTextInBox('Segundo apellido', colX[2], colWidths[2], datosY + 15, 8);

  const curpY = datosY + 30;
  const colY2 = curpY;
  const colWidths2 = [250, 250];
  const colX2 = [blockX, blockX + colWidths2[0]];

  const programaBox = centerTextInBox(
    certificado?.carrera || '',
    colX2[1],
    colWidths2[1],
    colY2,
    8,
    false,
  );

  const curpBox = centerTextInBox(
    certificado?.curp || '',
    colX2[0],
    colWidths2[0],
    colY2,
    8,
    false,
    true,
    programaBox.height,
  );

  const maxY = Math.max(curpBox.lastY, programaBox.lastY);
  drawLine(maxY + 4);

  centerTextInBox('CURP', colX2[0], colWidths2[0], maxY + 15, 8);
  centerTextInBox('Nombre del programa', colX2[1], colWidths2[1], maxY + 15, 8);

  // NUEVA SECCIÓN EN DOS COLUMNAS (ajustadas las proporciones)
  const dobleColumnaY = maxY + 25;

  // Columna izquierda: Datos de la institución educativa (MÁS PEQUEÑA)
  const colIzqX = blockX;
  const colIzqWidth = 200; // Reducido de 240 a 200

  doc.setFillColor(252, 133, 32);
  doc.rect(colIzqX, dobleColumnaY, colIzqWidth, 16, 'F');
  drawCenteredBlockTitle('Datos de la institución educativa', colIzqX, colIzqWidth, dobleColumnaY + 12);

  const institDatoY = dobleColumnaY + 26;
  centerTextInBox(certificado?.nombrePlantel || '', colIzqX, colIzqWidth, institDatoY, 8, false);
  doc.line(colIzqX, institDatoY + 4, colIzqX + colIzqWidth, institDatoY + 4);
  centerTextInBox('Nombre o denominación', colIzqX, colIzqWidth, institDatoY + 15, 8);

  // CCT, RVOE, FECHA DEL RVOE (lista vertical con valores alineados a la derecha)
  let institExtraY = institDatoY + 35;
  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(7);

  doc.text('CCT:', colIzqX, institExtraY);
  doc.text(certificado?.cct || 'N/A', colIzqX + colIzqWidth, institExtraY, { align: 'right' });
  institExtraY += 12;

  doc.text('RVOE:', colIzqX, institExtraY);
  doc.text(certificado?.rvoe || 'N/A', colIzqX + colIzqWidth, institExtraY, { align: 'right' });
  institExtraY += 12;

  doc.text('FECHA DEL RVOE:', colIzqX, institExtraY);
  doc.text(certificado?.fechaRvoe || 'N/A', colIzqX + colIzqWidth, institExtraY, { align: 'right' });
  institExtraY += 12;

  doc.text('CLAVE DE INSTITUCIÓN:', colIzqX, institExtraY);
  doc.text('14337', colIzqX + colIzqWidth, institExtraY, { align: 'right' });
  institExtraY += 12;

  doc.text('CLAVE DE CARRERA:', colIzqX, institExtraY);
  doc.text('21010', colIzqX + colIzqWidth, institExtraY, { align: 'right' });

  // Columna derecha: Datos de expedición (MÁS GRANDE)
  const colDerX = colIzqX + colIzqWidth + 20;
  const colDerWidth = 280; // Aumentado de 240 a 280

  doc.setFillColor(252, 133, 32);
  doc.rect(colDerX, dobleColumnaY, colDerWidth, 16, 'F');
  drawCenteredBlockTitle('Datos de expedición', colDerX, colDerWidth, dobleColumnaY + 12);

  const expDatoY = dobleColumnaY + 26;

  // Dos columnas dentro de Datos de expedición (Folio y Fecha expedición)
  const colFolioWidth = 140; // Aumentado de 120 a 140
  const colFechaWidth = 140; // Aumentado de 120 a 140
  const colFolioX = colDerX;
  const colFechaX = colDerX + colFolioWidth;

  // Folio (columna izquierda)
  centerTextInBox(certificado?.folioControl || '', colFolioX, colFolioWidth, expDatoY, 8, false);
  doc.line(colFolioX, expDatoY + 4, colFolioX + colFolioWidth, expDatoY + 4);
  centerTextInBox('Folio', colFolioX, colFolioWidth, expDatoY + 15, 8);

  // Fecha de expedición (columna derecha)
  centerTextInBox(certificado?.fechaExpedicion || '', colFechaX, colFechaWidth, expDatoY, 8, false);
  doc.line(colFechaX, expDatoY + 4, colFechaX + colFechaWidth, expDatoY + 4);
  centerTextInBox('Fecha de expedición', colFechaX, colFechaWidth, expDatoY + 15, 8);

  let expExtraY = expDatoY + 35;

  // Columna izquierda interna (Libro, Foja, fechas)
  const colExpIzqX = colDerX;
  const colExpIzqWidth = 140; // Aumentado de 120 a 140

  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(7);

  doc.text('Libro', colExpIzqX, expExtraY);
  doc.text(certificado?.libro || 'N/A', colExpIzqX + colExpIzqWidth, expExtraY, { align: 'right' });
  expExtraY += 12;

  doc.text('Foja', colExpIzqX, expExtraY);
  doc.text(certificado?.foja || 'N/A', colExpIzqX + colExpIzqWidth, expExtraY, { align: 'right' });
  expExtraY += 12;

  doc.text('Fecha de inicio', colExpIzqX, expExtraY);
  doc.text(certificado?.fechaInicio || 'N/A', colExpIzqX + colExpIzqWidth, expExtraY, { align: 'right' });
  expExtraY += 12;

  doc.text('Fecha de terminación', colExpIzqX, expExtraY);
  doc.text(certificado?.fechaTerminacion || 'N/A', colExpIzqX + colExpIzqWidth, expExtraY, { align: 'right' });

  // Columna derecha interna (Entidad federativa - SIN LÍNEA)
  const colExpDerX = colDerX + colExpIzqWidth;
  const colExpDerWidth = 140;

  const expDerY = expDatoY + 32;
  // Mover "Jalisco" y "Entidad federativa" más a la derecha
  const offsetDerecha = 10; // Ajusta este valor para mover más o menos
  centerTextInBox('Jalisco', colExpDerX + offsetDerecha, colExpDerWidth - offsetDerecha, expDerY, 8, false);
  centerTextInBox('Entidad federativa', colExpDerX + offsetDerecha, colExpDerWidth - offsetDerecha, expDerY + 12, 8);

  // Tercera fila: Promedio General del Certificado y Tipo de Certificado
  const promedioTipoY = expDerY + 22;

  // Dividir la columna derecha en dos sub-columnas con separación - MÁS A LA DERECHA
  const subColWidth = (colExpDerWidth - 2) / 2;
  const subColPromedioX = colExpDerX + offsetDerecha; // Movido a la derecha
  const subColTipoX = colExpDerX + subColWidth + 2 + offsetDerecha; // Movido a la derecha

  // Promedio (sub-columna izquierda)
  doc.setFillColor(252, 133, 32);
  doc.rect(subColPromedioX, promedioTipoY, subColWidth - 10, 16, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(5);
  const promedioText = 'Promedio General del Certificado';
  const promedioLines = doc.splitTextToSize(promedioText, subColWidth - 14);
  let promedioTextY = promedioTipoY + 6; // Aumentado de 5 a 6
  promedioLines.forEach((line) => {
    const lineWidth = doc.getTextWidth(line);
    doc.text(line, subColPromedioX + ((subColWidth - 10) - lineWidth) / 2, promedioTextY);
    promedioTextY += 5; // Aumentado de 4 a 5
  });

  const promedioValorY = promedioTipoY + 23; // Aumentado de 22 a 23
  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(6);
  const promedioValor = `PROMEDIO: ${certificado?.promedioGeneral || 'N/A'}`;
  const promedioValorWidth = doc.getTextWidth(promedioValor);
  doc.text(promedioValor, subColPromedioX
    + ((subColWidth - 10) - promedioValorWidth) / 2, promedioValorY);

  // Tipo de Certificado (sub-columna derecha)
  doc.setFillColor(252, 133, 32);
  doc.rect(subColTipoX, promedioTipoY, subColWidth - 10, 16, 'F');
  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(6);
  const tipoText = 'Tipo de Certificado';
  const tipoLines = doc.splitTextToSize(tipoText, subColWidth - 14);
  let tipoTextY = promedioTipoY + 6; // Aumentado de 5 a 6
  tipoLines.forEach((line) => {
    const lineWidth = doc.getTextWidth(line);
    doc.text(line, subColTipoX + ((subColWidth - 10) - lineWidth) / 2, tipoTextY);
    tipoTextY += 5; // Aumentado de 4 a 5
  });

  const tipoValorY = promedioTipoY + 23; // Aumentado de 22 a 23
  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(6);
  const tipoValor = certificado?.tipoCertificado || 'TOTAL';
  const tipoValorWidth = doc.getTextWidth(tipoValor);
  doc.text(tipoValor, subColTipoX + ((subColWidth - 10) - tipoValorWidth) / 2, tipoValorY);

  // Continuar con el resto del documento
  const verificacionY = Math.max(institExtraY, promedioValorY) + 20;

  const datosVerificacion = {
    identificadorDocumento: certificado?.identificadorUnico,
    noSecuencia: certificado?.secuenciaDocumento,
    fechaFirmado: certificado?.fechaFirmado,
    selloDigital: certificado?.firmaDigital,
    sitioVerificacion: certificado?.sitioVerificacion,
    nombreFirmante: certificado?.nombreFirmante,
    cargoFirmante: certificado?.cargoFirmante,
    firmaElectronica: certificado?.firmaElectronica,
  };

  const leftColumnX = blockX;
  const leftColumnWidth = 330;
  const qrX = blockX + leftColumnWidth + 20;
  const qrSize = 150;
  const lineSpacing = 10;
  const sectionSpacing = 16;
  const grayColor = [120, 120, 120];
  const blackColor = [0, 0, 0];

  let y = verificacionY;

  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...blackColor);
  doc.text('Datos de verificación', leftColumnX, y);
  y += lineSpacing + 2;

  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(...grayColor);
  doc.text(`Identificador de documento: ${datosVerificacion.identificadorDocumento}`, leftColumnX, y);
  y += lineSpacing;

  doc.text(`No. de secuencia: ${datosVerificacion.noSecuencia}`, leftColumnX, y);
  y += lineSpacing;

  doc.text(`Fecha de firmado: ${datosVerificacion.fechaFirmado}`, leftColumnX, y);
  y += lineSpacing + 4;

  doc.text('Sello digital:', leftColumnX, y);
  y += 6;
  const selloLines = doc.splitTextToSize(datosVerificacion.selloDigital, leftColumnWidth);
  doc.text(selloLines, leftColumnX, y);
  y += selloLines.length * 5 + 6;

  doc.text(`Sitio de verificación: ${datosVerificacion.sitioVerificacion}`, leftColumnX, y);
  y += sectionSpacing;

  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...blackColor);
  doc.text('Autorizó / Firma electrónica', leftColumnX, y);
  y += lineSpacing + 2;

  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(...grayColor);
  doc.text(datosVerificacion.nombreFirmante, leftColumnX, y);
  y += lineSpacing;

  doc.text(datosVerificacion.cargoFirmante, leftColumnX, y);
  y += lineSpacing + 4;

  doc.text('Firma electrónica:', leftColumnX, y);
  y += 6;
  const firmaLines = doc.splitTextToSize(datosVerificacion.firmaElectronica, leftColumnWidth);
  doc.text(firmaLines, leftColumnX, y);

  const qrUrl = datosVerificacion.sitioVerificacion;
  await agregarQR(doc, qrUrl, qrX, verificacionY, qrSize);

  doc.addPage();
  doc.addImage(img7, 'PNG', 0, 0, width, height);
  doc.setTextColor(0, 0, 0);
  doc.setFont('Nutmeg', 'normal');

  doc.setFontSize(9);
  doc.text('SECRETARÍA DE INNOVACIÓN, CIENCIA', centerX, 70, { align: 'center' });
  doc.text('Y TECNOLOGÍA DE JALISCO.', centerX, 85, { align: 'center' });
  doc.text('SUBSECRETARÍA DE EDUCACIÓN SUPERIOR.', centerX, 100, { align: 'center' });

  doc.setFontSize(8.5);
  doc.setFont('Nutmeg', 'bold');
  doc.text('CERTIFICADO TOTAL DE ESTUDIOS', centerX, 115, { align: 'center' });

  doc.setFontSize(7);
  doc.setFont('Nutmeg', 'normal');
  doc.text(
    'Con base en el capítulo 2 art. 71 de la ley General de Educación Superior, se expide el presente certificado a:',
    57,
    135,
  );

  const datosSeccionY = 145;
  doc.setFillColor(252, 133, 32);
  doc.rect(blockX, datosSeccionY, blockWidth, 14, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(8);
  const datosCertText = 'Datos del certificado';
  const datosCertWidth = doc.getTextWidth(datosCertText);
  doc.text(datosCertText, blockX + (blockWidth - datosCertWidth) / 2, datosSeccionY + 10);
  doc.setTextColor(0, 0, 0);

  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(6);
  const textoDescriptivo = `Cuya fotografía aparece al margen, cursó y aprobó las asignaturas que se consignan en el plan de estudios de la ${certificado?.carrera?.toUpperCase() || ''}.`;
  const textoDescriptivoLines = doc.splitTextToSize(textoDescriptivo, blockWidth);
  doc.text(textoDescriptivoLines, blockX, datosSeccionY + 28);

  const tablaY = datosSeccionY + 42;
  const tablaX = blockX;
  const tablaAncho = blockWidth;

  const colAsignaturaAncho = tablaAncho * 0.50;
  const colPeriodoAncho = tablaAncho * 0.18;
  const colNumAncho = tablaAncho * 0.08;
  const colLetraAncho = tablaAncho * 0.24;

  const xAsignatura = tablaX;
  const xPeriodo = tablaX + colAsignaturaAncho;
  const xNum = xPeriodo + colPeriodoAncho;
  const xLetra = xNum + colNumAncho;

  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(6);

  doc.text('ASIGNATURAS', xAsignatura + 5, tablaY);
  doc.text('PERIODO', xPeriodo + (colPeriodoAncho / 2) - (doc.getTextWidth('PERIODO') / 2), tablaY);
  doc.text('NÚM', xNum + (colNumAncho / 2) - (doc.getTextWidth('NÚM') / 2), tablaY);
  doc.text('CALIFICACIÓN LETRA', xLetra + (colLetraAncho / 2) - (doc.getTextWidth('CALIFICACIÓN LETRA') / 2), tablaY);

  const grados = certificado?.grados || [];
  let yPos = tablaY + 12;
  const altoFila = 8;
  const margenInferior = 60;
  const posicionNuevaPagina = 140;

  const addNewPage = () => {
    doc.addPage();
    doc.addImage(img7, 'PNG', 0, 0, width, height);
    doc.setTextColor(0, 0, 0);
    return posicionNuevaPagina;
  };

  grados.forEach((grado) => {
    const asignaturas = grado.asignaturas || [];
    const alturaGradoCompleto = altoFila + (asignaturas.length * altoFila) + 4;

    if (yPos + alturaGradoCompleto > height - margenInferior) {
      yPos = addNewPage();
    }

    doc.setFont('Nutmeg', 'bold');
    doc.setFontSize(6);
    doc.text((grado.gradoNombre || '').toUpperCase(), xAsignatura + 5, yPos);
    yPos += altoFila;

    asignaturas.forEach((asig) => {
      doc.setFont('Nutmeg', 'normal');
      doc.setFontSize(6);

      const nombreAsig = (asig.nombre || '').toUpperCase();
      doc.text(nombreAsig, xAsignatura + 15, yPos);

      const periodo = asig.periodo || '';
      const periodoWidth = doc.getTextWidth(periodo);
      doc.text(periodo, xPeriodo + (colPeriodoAncho / 2) - (periodoWidth / 2), yPos);

      const calNum = asig.calificacion?.toString() || '';
      const calNumWidth = doc.getTextWidth(calNum);
      doc.text(calNum, xNum + (colNumAncho / 2) - (calNumWidth / 2), yPos);

      const calLetra = asig.calificacionLetra || numeroALetras(parseInt(asig.calificacion, 10)) || '';
      const calLetraWidth = doc.getTextWidth(calLetra);
      doc.text(calLetra, xLetra + (colLetraAncho / 2) - (calLetraWidth / 2), yPos);

      yPos += altoFila;
    });

    yPos += 4;
  });

  return doc.output('arraybuffer');
}

module.exports = { GenerarCertificado };
