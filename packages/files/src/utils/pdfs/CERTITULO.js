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
    'Con base en el capítulo 2 artículo 71 de la ley General de Educación Superior, se expide el presente título a:',
    57,
    150,
  );

  const baseY = 160;
  const blockX = 57;
  const blockWidth = 500;
  doc.setFillColor(252, 133, 32);
  doc.rect(blockX, baseY, blockWidth, 14, 'F');
  drawCenteredBlockTitle('Datos del titulado', blockX, blockWidth, baseY + 10);

  const datosY = baseY + 36;
  const colWidths = [160, 160, 160];
  const colX = [blockX, blockX + colWidths[0], blockX + colWidths[0] + colWidths[1]];

  centerTextInBox(certificado?.nombreAlumno || '', colX[0], colWidths[0], datosY, 8, false);
  centerTextInBox(certificado?.paternoAlumno || '', colX[1], colWidths[1], datosY, 8, false);
  centerTextInBox(certificado?.maternoAlumno || '', colX[2], colWidths[2], datosY, 8, false);

  drawLine(datosY + 4);

  centerTextInBox('Nombre(s)', colX[0], colWidths[0], datosY + 15, 8);
  centerTextInBox('Primer apellido', colX[1], colWidths[1], datosY + 15, 8);
  centerTextInBox('Segundo apellido', colX[2], colWidths[2], datosY + 15, 8);

  const curpY = datosY + 45;
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

  const institY = maxY + 40;
  doc.setFillColor(252, 133, 32);
  doc.rect(blockX, institY, blockWidth, 16, 'F');
  drawCenteredBlockTitle('Datos de la institución educativa', blockX, blockWidth, institY + 12);

  const instDatoY = institY + 36;
  const institWidth = blockWidth;
  const institX = blockX;
  centerTextInBox(certificado?.nombrePlantel || '', institX, institWidth, instDatoY, 8, false);
  drawLine(instDatoY + 4);
  centerTextInBox('Nombre o denominación', institX, institWidth, instDatoY + 15, 8);

  const expY = instDatoY + 40;
  doc.setFillColor(252, 133, 32);
  doc.rect(blockX, expY, blockWidth, 16, 'F');
  drawCenteredBlockTitle('Datos de expedición', blockX, blockWidth, expY + 12);

  const expDatoY = expY + 32;
  const colWidthsExp = [250, 250];
  const colXExp = [blockX, blockX + colWidthsExp[0]];

  centerTextInBox(certificado?.folioControl || '', colXExp[0], colWidthsExp[0], expDatoY, 8, false);
  centerTextInBox('Jalisco', colXExp[1], colWidthsExp[1], expDatoY, 8, false);

  drawLine(expDatoY + 4);
  centerTextInBox('Folio', colXExp[0], colWidthsExp[0], expDatoY + 15, 8);
  centerTextInBox('Entidad federativa', colXExp[1], colWidthsExp[1], expDatoY + 15, 8);

  const fechaY = expDatoY + 44;
  centerTextInBox(
    certificado?.fechaInicio || '',
    colXExp[0],
    colWidthsExp[0],
    fechaY,
    8,
    false,
  );
  centerTextInBox(
    certificado?.fechaTerminacion || '',
    colXExp[1],
    colWidthsExp[1],
    fechaY,
    8,
    false,
  );

  drawLine(fechaY + 4);
  centerTextInBox('Fecha de inicio', colXExp[0], colWidthsExp[0], fechaY + 15, 8);
  centerTextInBox('Fecha de terminación', colXExp[1], colWidthsExp[1], fechaY + 15, 8);

  const examenY = fechaY + 44;
  centerTextInBox(
    certificado?.fechaExamen || '',
    colXExp[0],
    colWidthsExp[0],
    examenY,
    8,
    false,
  );
  centerTextInBox(
    certificado?.fechaExpedicion || '',
    colXExp[1],
    colWidthsExp[1],
    examenY,
    8,
    false,
  );

  drawLine(examenY + 4);
  centerTextInBox('Fecha de examen o exención de examen profesional', colXExp[0], colWidthsExp[0], examenY + 15, 8);
  centerTextInBox('Fecha de expedición', colXExp[1], colWidthsExp[1], examenY + 15, 8);

  const promedioSeccionY = examenY + 44;
  doc.setFillColor(252, 133, 32);
  doc.rect(blockX, promedioSeccionY, blockWidth, 14, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(8);
  const promedioTitleText = 'Promedio General del Certificado';
  const promedioTitleWidth = doc.getTextWidth(promedioTitleText);
  doc.text(promedioTitleText, blockX
    + (blockWidth - promedioTitleWidth) / 2, promedioSeccionY + 10);

  const promedioDatoY = promedioSeccionY + 28;
  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(8);
  const promedioText = `PROMEDIO: ${certificado?.promedioGeneral || 'N/A'}`;
  const promedioTextWidth = doc.getTextWidth(promedioText);
  doc.text(promedioText, blockX + (blockWidth - promedioTextWidth) / 2, promedioDatoY);

  drawLine(promedioDatoY + 8);

  const fechaPromedioY = promedioDatoY + 22;
  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(8);
  const fechaPromedioText = certificado?.fechaPromedio || 'a 14 de octubre de 2025';
  const fechaPromedioWidth = doc.getTextWidth(fechaPromedioText);
  doc.text(fechaPromedioText, blockX + (blockWidth - fechaPromedioWidth) / 2, fechaPromedioY);

  const verificacionY = fechaPromedioY + 30;

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
