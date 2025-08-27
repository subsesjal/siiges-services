const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
const QRCode = require('qrcode');
const { addNutmeg } = require('./pdfHandler');

const img7 = fs.readFileSync(path.join(__dirname, '/images/img7.png'), { encoding: 'base64' });

function formatearFecha(fechaString) {
  if (!fechaString) return '';

  const fecha = new Date(`${fechaString}T00:00:00`);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
}

async function agregarQR(doc, tituloElectronico, yBase) {
  const urlFront = process.env.BASE_URL_FRONT;
  const url = `${urlFront}/tituloElectronico/${tituloElectronico?.folioControl}/consultarFolio`;

  const qrDataUrl = await QRCode.toDataURL(url, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 1,
    margin: 1,
    width: 128,
  });

  const qrSize = 150;
  const pageWidth = doc.internal.pageSize.getWidth();
  const qrX = pageWidth - qrSize - 50;
  const qrY = yBase + 30;

  doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
}

async function GenerarTitulo(tituloElectronico, xmlString) {
  const JsPDF = jsPDF;
  const doc = new JsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  addNutmeg(doc);

  doc.addImage(img7, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
  doc.setTextColor(0, 0, 0);
  doc.setFont('Nutmeg', 'normal');

  const centerTextInBox = (
    text,
    x,
    width,
    y,
    size = 8,
    bold = false,
    alignBottom = false,
    refHeight = 0,
  ) => {
    if (!text) return { height: 0, lastY: y };

    doc.setFont('Nutmeg', bold ? 'bold' : 'normal');
    doc.setFontSize(size);

    const lines = doc.splitTextToSize(text, width);
    const lineHeight = size * 1.2;
    const totalHeight = lines.length * lineHeight;

    let startY = y;
    if (alignBottom && refHeight > totalHeight) {
      startY = y + (refHeight - totalHeight);
    }

    let lastY = startY;
    lines.forEach((line, i) => {
      const textWidth = doc.getTextWidth(line);
      const xCentered = x + (width - textWidth) / 2;
      lastY = startY + i * lineHeight;
      doc.text(line, xCentered, lastY);
    });

    return { height: totalHeight, lastY };
  };

  const drawCenteredBlockTitle = (text, xStart, width, y, fontSize = 8) => {
    const textWidth = doc.getTextWidth(text);
    const xCentered = xStart + (width - textWidth) / 2;
    doc.setFont('Nutmeg', 'bold');
    doc.setFontSize(fontSize);
    doc.text(text, xCentered, y);
  };

  const drawLine = (y) => {
    doc.line(57, y, 557, y);
  };

  doc.setFontSize(9);
  const centerX = doc.internal.pageSize.getWidth() / 2;
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
  doc.setFillColor(180, 206, 235);
  doc.rect(blockX, baseY, blockWidth, 14, 'F');
  drawCenteredBlockTitle('Datos del titulado', blockX, blockWidth, baseY + 10);

  const datosY = baseY + 36;
  const colWidths = [160, 160, 160];
  const colX = [blockX, blockX + colWidths[0], blockX + colWidths[0] + colWidths[1]];

  centerTextInBox(tituloElectronico?.nombre || '', colX[0], colWidths[0], datosY, 8, false);
  centerTextInBox(tituloElectronico?.primerApellido || '', colX[1], colWidths[1], datosY, 8, false);
  centerTextInBox(tituloElectronico?.segundoApellido || '', colX[2], colWidths[2], datosY, 8, false);

  drawLine(datosY + 4);

  centerTextInBox('Nombre(s)', colX[0], colWidths[0], datosY + 15, 8);
  centerTextInBox('Primer apellido', colX[1], colWidths[1], datosY + 15, 8);
  centerTextInBox('Segundo apellido', colX[2], colWidths[2], datosY + 15, 8);

  const curpY = datosY + 45;
  const colY2 = curpY;
  const colWidths2 = [250, 250];
  const colX2 = [blockX, blockX + colWidths2[0]];

  const programaBox = centerTextInBox(
    tituloElectronico?.nombreCarrera || '',
    colX2[1],
    colWidths2[1],
    colY2,
    8,
    false,
  );

  const curpBox = centerTextInBox(
    tituloElectronico?.curp || '',
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
  doc.setFillColor(180, 206, 235);
  doc.rect(blockX, institY, blockWidth, 16, 'F');
  drawCenteredBlockTitle('Datos de la institución educativa', blockX, blockWidth, institY + 12);

  const instDatoY = institY + 36;
  const institWidth = blockWidth;
  const institX = blockX;
  centerTextInBox(tituloElectronico?.nombreInstitucion || '', institX, institWidth, instDatoY, 8, false);
  drawLine(instDatoY + 4);
  centerTextInBox('Nombre o denominación', institX, institWidth, instDatoY + 15, 8);

  const expY = instDatoY + 40;
  doc.setFillColor(180, 206, 235);
  doc.rect(blockX, expY, blockWidth, 16, 'F');
  drawCenteredBlockTitle('Datos de expedición', blockX, blockWidth, expY + 12);

  const expDatoY = expY + 36;
  const colWidthsExp = [250, 250];
  const colXExp = [blockX, blockX + colWidthsExp[0]];

  centerTextInBox(tituloElectronico?.folioControl || '', colXExp[0], colWidthsExp[0], expDatoY, 8, false);
  centerTextInBox('Jalisco', colXExp[1], colWidthsExp[1], expDatoY, 8, false);

  drawLine(expDatoY + 4);
  centerTextInBox('Folio', colXExp[0], colWidthsExp[0], expDatoY + 15, 8);
  centerTextInBox('Entidad federativa', colXExp[1], colWidthsExp[1], expDatoY + 15, 8);

  const fechaY = expDatoY + 55;
  centerTextInBox(
    formatearFecha(tituloElectronico?.fechaInicio),
    colXExp[0],
    colWidthsExp[0],
    fechaY,
    8,
    false,
  );
  centerTextInBox(
    formatearFecha(tituloElectronico?.fechaTerminacion),
    colXExp[1],
    colWidthsExp[1],
    fechaY,
    8,
    false,
  );

  drawLine(fechaY + 4);
  centerTextInBox('Fecha de inicio', colXExp[0], colWidthsExp[0], fechaY + 15, 8);
  centerTextInBox('Fecha de terminación', colXExp[1], colWidthsExp[1], fechaY + 15, 8);

  const examenY = fechaY + 60;
  centerTextInBox(
    formatearFecha(tituloElectronico?.fechaExamenProfesional
      || tituloElectronico?.fechaExencionExamenProfesional),
    colXExp[0],
    colWidthsExp[0],
    examenY,
    8,
    false,
  );
  centerTextInBox(
    formatearFecha(tituloElectronico?.fechaExpedicion),
    colXExp[1],
    colWidthsExp[1],
    examenY,
    8,
    false,
  );

  drawLine(examenY + 4);
  centerTextInBox('Fecha de examen o exención de examen profesional', colXExp[0], colWidthsExp[0], examenY + 15, 8);
  centerTextInBox('Fecha de expedición', colXExp[1], colWidthsExp[1], examenY + 15, 8);

  const authY = examenY + 20;
  doc.setFontSize(5);

  let y = authY + 20;

  doc.setFont('Nutmeg', 'bold');
  doc.setTextColor(0);
  doc.text('Folio digital:', 57, y);
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  doc.text(tituloElectronico?.folioDigital || '', 57 + doc.getTextWidth('Folio digital:') + 4, y);

  y += 8;
  doc.setFont('Nutmeg', 'bold');
  doc.setTextColor(0);
  doc.text('Fecha de autenticación:', 57, y);
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  doc.text(formatearFecha(tituloElectronico?.fechaAutenticacion), 57 + doc.getTextWidth('Fecha de autenticación:') + 4, y);

  y += 8;
  doc.setFont('Nutmeg', 'bold');
  doc.setTextColor(0);
  doc.text('Sello digital del título:', 57, y);
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  const selloLines = doc.splitTextToSize(tituloElectronico?.selloTitulo || '', doc.internal.pageSize.getWidth() * 0.55);
  y += 7;
  doc.text(selloLines, 57, y);

  y += selloLines.length * 5 + 12;

  doc.setFont('Nutmeg', 'bold');
  doc.setTextColor(0);
  doc.text('Firmante institución:', 57, y);
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  doc.text(
    [
      tituloElectronico?.nombreResponsable,
      tituloElectronico?.primerApellidoResponsable,
      tituloElectronico?.segundoApellidoResponsable,
    ].filter(Boolean).join(' '),
    57 + doc.getTextWidth('Firmante institución:') + 4,
    y,
  );

  y += 8;
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  doc.text('No. de certificado:', 57, y);
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  doc.text(tituloElectronico?.noCertificadoResponsable || '', 57 + doc.getTextWidth('No. de certificado:') + 4, y);

  y += 8;
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  doc.text('Sello digital firmante:', 57, y);
  const selloFirmanteLines = doc.splitTextToSize(tituloElectronico?.sello || '', doc.internal.pageSize.getWidth() * 0.55);
  y += 8;
  doc.text(selloFirmanteLines, 57, y);

  y += selloFirmanteLines.length * 5 + 12;

  const firmantesAutoridad = {
    '00001000000516507690': 'FANNY GUADALUPE VALDIVIA MÁRQUEZ',
    '00001000000512437304': 'ILIANA JANETT HERNÁNDEZ PARTIDA',
    '00001000000506574908': 'JOSÉ ROSALÍO MUÑOZ CASTRO',
  };

  const nombreAutoridad = firmantesAutoridad[tituloElectronico?.noCertificadoAutoridad] || 'NOMBRE DESCONOCIDO';

  doc.setFont('Nutmeg', 'bold');
  doc.setTextColor(0);
  doc.text('Firmante autoridad:', 57, y);
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  doc.text(
    nombreAutoridad,
    57 + doc.getTextWidth('Firmante autoridad:') + 4,
    y,
  );

  y += 8;
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  doc.text('No. de certificado:', 57, y);
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  doc.text(tituloElectronico?.noCertificadoAutoridad || '', 57 + doc.getTextWidth('No. de certificado:') + 4, y);

  y += 8;
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  doc.text('Sello digital autoridad:', 57, y);
  const selloAutoridadLines = doc.splitTextToSize(tituloElectronico?.selloAutenticacion || '', doc.internal.pageSize.getWidth() * 0.55);
  y += 8;
  doc.text(selloAutoridadLines, 57, y);
  await agregarQR(doc, tituloElectronico, authY);

  doc.addPage();
  doc.setFontSize(8);
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  const maxXmlWidth = doc.internal.pageSize.getWidth() - 114;

  if (xmlString) {
    const xmlLines = doc.splitTextToSize(xmlString, maxXmlWidth);
    const startY = 80;
    doc.text(xmlLines, 57, startY);
  }

  return doc.output('arraybuffer');
}

module.exports = { GenerarTitulo };
